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
        // Delete files logic would go here (optional but recommended for cleanup)
        const { error } = await supabase
            .from('patterns')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
