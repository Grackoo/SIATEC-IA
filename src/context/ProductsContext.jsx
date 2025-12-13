import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';

const ProductsContext = createContext();

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState(() => {
        // Load products from localStorage, or use initial products
        const savedProducts = localStorage.getItem('siatec-products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    // Save products to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('siatec-products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: `laptop-${Date.now()}`,
            category: 'laptop',
            inStock: true,
        };
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        return newProduct;
    };

    const updateProduct = (productId, updatedData) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, ...updatedData } : product
            )
        );
    };

    const deleteProduct = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

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
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}
