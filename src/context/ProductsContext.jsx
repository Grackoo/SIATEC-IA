import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSheets } from './SheetsContext';

const ProductsContext = createContext();

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}

export function ProductsProvider({ children }) {
    const { inventory, loading: sheetsLoading } = useSheets();
    const [products, setProducts] = useState([]);

    // Helper to format Google Drive URLs for reliable embedding
    const formatImageUrl = (url) => {
        if (!url) return '';
        if (url.includes('drive.google.com/uc')) {
            try {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const id = urlParams.get('id');
                if (id) {
                    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
                }
            } catch (e) {
                return url;
            }
        }
        return url;
    };

    useEffect(() => {
        if (!sheetsLoading && inventory) {
            const mappedProducts = inventory
                .filter(item => item.category === 'laptop' || item.category === 'software' || item.category === 'streaming') // Include streaming
                .map(item => ({
                    id: item.id,
                    name: item.title,
                    price: Number(item.price),
                    condition: item.specs?.condition || 'Reacondicionada', // Default fallback
                    specs: formatSpecs(item.specs),
                    specsRaw: item.specs, // Keep raw specs for tooltip
                    images: item.images && item.images.length > 0 
                        ? item.images.map(formatImageUrl) 
                        : (item.image_url ? item.image_url.split(',').map(url => formatImageUrl(url.trim())).filter(Boolean) : ['https://via.placeholder.com/400']),
                    category: item.category,
                    is_promotion: item.specs?.is_promotion || false,
                    discount_percentage: item.specs?.discount_percentage || null,
                    inStock: item.stock > 0,
                    stock: item.stock || 0
                }));
            setProducts(mappedProducts);
        }
    }, [inventory, sheetsLoading]);

    // Helper to format specs object to string
    const formatSpecs = (specs) => {
        if (!specs) return '';
        // If it's already a string, return it
        if (typeof specs === 'string') return specs;

        // Exclude internal fields
        const { condition, is_promotion, discount_percentage, ...rest } = specs;

        // Join values
        return Object.values(rest).join(', ');
    };

    // Legacy functions shimmed to warn or do nothing, as we now use SheetsContext for mutations
    const addProduct = () => console.warn("Use useSheets for adding products");
    const updateProduct = () => console.warn("Use useSheets for updating products");
    const deleteProduct = () => console.warn("Use useSheets for deleting products");

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
        loading: sheetsLoading
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}
