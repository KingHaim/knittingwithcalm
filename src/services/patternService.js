import { supabase } from '../config/supabase';

export const patternService = {
    /**
     * Uploads a file to Supabase storage with a random UUID name for security
     * @param {File} file The file to upload
     * @param {string} bucket The bucket name (patterns, images)
     * @returns {Promise<string>} The public URL of the uploaded file
     */
    async uploadFile(file, bucket) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return publicUrl;
    },

    /**
     * Creates or updates a pattern with multiple images and localized PDFs
     */
    async createPattern(fullData) {
        try {
            const { images, pdf_files, main_image, ...patternData } = fullData;

            // 1. Upload Images and map URLs
            const uploadedImageUrls = await Promise.all(
                images.map(async (img) => {
                    if (img instanceof File) {
                        return await this.uploadFile(img, 'patterns-images');
                    }
                    return img; // Already a URL
                })
            );

            // 2. Map Main Image (if it was a file, find its new URL)
            let finalMainImage = mainImage;
            if (mainImage instanceof File || (mainImage && mainImage.preview)) {
                // Find matching file in original images to get the index, then use corresponding uploaded URL
                const index = images.findIndex(img =>
                    (img.preview === mainImage.preview) || (img === mainImage)
                );
                if (index !== -1) {
                    finalMainImage = uploadedImageUrls[index];
                }
            }

            // 3. Upload PDFs with language metadata
            const finalPdfFiles = await Promise.all(
                pdf_files.map(async (pdfItem) => {
                    if (pdfItem.file) {
                        const url = await this.uploadFile(pdfItem.file, 'patterns-pdf');
                        return { url, language: pdfItem.language };
                    }
                    return { url: pdfItem.url, language: pdfItem.language };
                })
            );

            // 4. Map the first PDF to pdf_url for backward compatibility (optional but safe)
            const primaryPdfUrl = finalPdfFiles.length > 0 ? finalPdfFiles[0].url : '';

            // 5. Build Final Payload
            const payload = {
                ...patternData,
                skill_level: patternData.difficulty_level || 'Principiante',
                images: uploadedImageUrls,
                main_image: finalMainImage || uploadedImageUrls[0],
                pdf_files: finalPdfFiles,
                pdf_url: primaryPdfUrl, // Keep for legacy if needed
                updated_at: new Date()
            };

            // Remove temporary UI fields
            delete payload.pdf; // Old field

            // 6. Save to database (Upsert)
            const { data, error } = await supabase
                .from('patterns')
                .upsert([payload])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error in createPattern:', error);
            throw error;
        }
    },

    /**
     * Fetches all patterns
     */
    async getPatterns() {
        const { data, error } = await supabase
            .from('patterns')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Deletes a pattern and its associated files
     */
    async deletePattern(id, pdfUrl, imageUrls, pdfFiles = []) {
        // 1. Delete record from database
        const { error: dbError } = await supabase
            .from('patterns')
            .delete()
            .eq('id', id);

        if (dbError) throw dbError;

        // 2. Cleanup Storage (Best effort)
        try {
            // Cleanup PDF files (new structure)
            if (pdfFiles && pdfFiles.length > 0) {
                const pdfPaths = pdfFiles.map(p => p.url.split('/').pop());
                await supabase.storage.from('patterns-pdf').remove(pdfPaths);
            } else if (pdfUrl) {
                // Legacy cleanup
                const pdfPath = pdfUrl.split('/').pop();
                await supabase.storage.from('patterns-pdf').remove([pdfPath]);
            }

            // Cleanup Images
            if (imageUrls && imageUrls.length > 0) {
                const imagePaths = imageUrls.map(url => url.split('/').pop());
                await supabase.storage.from('patterns-images').remove(imagePaths);
            }
        } catch (storageError) {
            console.warn('Failed to cleanup storage files:', storageError);
        }
    }
};
