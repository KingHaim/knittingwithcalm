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
     * Creates a new pattern with images and PDF
     */
    async createPattern(patternData, images, pdf) {
        try {
            // 1. Upload PDF
            let pdfUrl = '';
            if (pdf) {
                pdfUrl = await this.uploadFile(pdf, 'patterns-pdf');
            }

            // 2. Upload Images
            const imageUrls = await Promise.all(
                images.map(image => this.uploadFile(image, 'patterns-images'))
            );

            // 3. Clean up data and map fields
            const { images: _, pdf: __, ...cleanedData } = patternData;

            const payload = {
                ...cleanedData,
                skill_level: cleanedData.difficulty_level || 'Principiante',
                pdf_url: pdfUrl,
                images: imageUrls,
                updated_at: new Date()
            };

            // 4. Save pattern to database
            const { data, error } = await supabase
                .from('patterns')
                .insert([payload])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating pattern:', error);
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
    async deletePattern(id, pdfUrl, imageUrls) {
        // 1. Delete record from database
        const { error: dbError } = await supabase
            .from('patterns')
            .delete()
            .eq('id', id);

        if (dbError) throw dbError;

        // 2. Cleanup Storage (Best effort, don't fail if files are already gone)
        try {
            // Cleanup PDF
            if (pdfUrl) {
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
            // We don't throw here to ensure the UI thinks deletion was successful if DB record is gone
        }
    }
};
