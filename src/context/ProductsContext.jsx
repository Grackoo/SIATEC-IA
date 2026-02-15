import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSupabase } from './SupabaseContext';

const ProductsContext = createContext();

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}

export function ProductsProvider({ children }) {
    const { inventory, loading: supabaseLoading } = useSupabase();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!supabaseLoading && inventory) {
            const mappedProducts = inventory
                .filter(item => item.category === 'laptop' || item.category === 'software') // Filter relevant categories
                .map(item => ({
                    id: item.id,
                    name: item.title,
                    price: Number(item.price),
                    condition: item.specs?.condition || 'Reacondicionada', // Default fallback
                    specs: formatSpecs(item.specs),
                    specsRaw: item.specs, // Keep raw specs for tooltip
                    images: item.images && item.images.length > 0 ? item.images : (item.image_url ? [item.image_url] : ['https://via.placeholder.com/400']),
                    category: item.category,
                    inStock: item.stock > 0
                }));
            setProducts(mappedProducts);
        }
    }, [inventory, supabaseLoading]);

    // Helper to format specs object to string
    const formatSpecs = (specs) => {
        if (!specs) return '';
        // If it's already a string, return it
        if (typeof specs === 'string') return specs;

        // Exclude internal fields like 'condition'
        const { condition, ...rest } = specs;

        // Join values
        return Object.values(rest).join(', ');
    };

    // Legacy functions shimmed to warn or do nothing, as we now use SupabaseContext for mutations
    const addProduct = () => console.warn("Use useSupabase for adding products");
    const updateProduct = () => console.warn("Use useSupabase for updating products");
    const deleteProduct = () => console.warn("Use useSupabase for deleting products");

    const getProductById = (productId) => {
        return products.find((product) => product.id === productId);
    };

    const getProductsByCondition = (condition) => {
        return products.filter((product) => product.condition === condition);
    };

    const value = {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCondition,
        loading: supabaseLoading
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}
