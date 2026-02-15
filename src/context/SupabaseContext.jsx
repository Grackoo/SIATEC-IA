
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const SupabaseContext = createContext();

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('inventory')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setInventory(data || []);
        } catch (err) {
            console.error('Error fetching inventory:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSales = async () => {
        try {
            const { data, error } = await supabase
                .from('sales')
                .select('*, inventory(title, category)')
                .order('sale_date', { ascending: false });

            if (error) throw error;
            setSales(data || []);
        } catch (err) {
            console.error('Error fetching sales:', err);
        }
    };

    const addProduct = async (product) => {
        const { data, error } = await supabase
            .from('inventory')
            .insert([product])
            .select();

        if (error) throw error;
        setInventory(prev => [data[0], ...prev]);
        return data;
    };

    const updateProduct = async (id, updates) => {
        const { data, error } = await supabase
            .from('inventory')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) throw error;
        setInventory(prev => prev.map(item => item.id === id ? data[0] : item));
        return data;
    };

    const deleteProduct = async (id) => {
        const { error } = await supabase
            .from('inventory')
            .delete()
            .eq('id', id);

        if (error) throw error;
        setInventory(prev => prev.filter(item => item.id !== id));
    };

    useEffect(() => {
        if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
            fetchInventory();
        }
    }, []);

    return (
        <SupabaseContext.Provider value={{
            inventory,
            sales,
            loading,
            error,
            fetchInventory,
            fetchSales,
            addProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </SupabaseContext.Provider>
    );
};
