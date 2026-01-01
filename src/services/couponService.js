import { supabase } from '../config/supabase';

export const couponService = {
    async getCoupons() {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async createCoupon(couponData) {
        const { data, error } = await supabase
            .from('coupons')
            .insert([couponData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateCoupon(id, couponData) {
        const { data, error } = await supabase
            .from('coupons')
            .update(couponData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteCoupon(id) {
        const { error } = await supabase
            .from('coupons')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async validateCoupon(code) {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', code.toUpperCase())
            .single();

        if (error) throw new Error('Invalid coupon code');

        const now = new Date();
        if (new Date(data.start_date) > now) throw new Error('Coupon is not yet active');
        if (data.end_date && new Date(data.end_date) < now) throw new Error('Coupon has expired');
        if (data.usage_limit && data.used_count >= data.usage_limit) throw new Error('Coupon usage limit reached');

        return data;
    }
};
