import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SheetsContext = createContext();
export const useSheets = () => useContext(SheetsContext);

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAGJXIgMSCRV_UpjrDOizfhf6HJDBvvmTaszCuGE4W27CRqiQ66dpkOMnZojZ4pQhqrA/exec";

// Helper function to safely send requests to Google Apps Script bypassing CORS preflights
const sheetRequest = async (payload) => {
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow', // Crucial for Apps Script redirects
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
};

export const SheetsProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [sales, setSales] = useState([]); // Preserved for UI compatibility
    const [loading, setLoading] = useState(true);

    const fetchInventory = useCallback(async () => {
        setLoading(true);
        try {
            const data = await sheetRequest({ action: 'read' });
            
            // Parse specs JSON string back into an object if it comes as a string from Google Sheets
            const parsedData = Array.isArray(data) ? data.map(item => ({
                ...item,
                specs: typeof item.specs === 'string' ? validateJSON(item.specs) : (item.specs || {})
            })) : [];
            
            setInventory(parsedData);
        } catch (error) {
            console.error('Error fetching inventory from Google Sheets:', error);
            setInventory([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSales = useCallback(async () => {
        // Placeholder implementation for potential Sales sheet
        setSales([]);
    }, []);

    const validateJSON = (str) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            return {};
        }
    };

    const addProduct = async (productData) => {
        try {
            const result = await sheetRequest({ action: 'create', ...productData });
            if (result.success) {
                await fetchInventory();
            }
            return result;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    };

    const updateProduct = async (id, updates) => {
        try {
            const result = await sheetRequest({ action: 'update', id, ...updates });
            if (result.success) {
                await fetchInventory();
            }
            return result;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const result = await sheetRequest({ action: 'delete', id });
            if (result.success) {
                await fetchInventory();
            }
            return result;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchInventory();
        fetchSales();
    }, [fetchInventory, fetchSales]);

    return (
        <SheetsContext.Provider value={{
            inventory,
            sales,
            loading,
            fetchInventory,
            fetchSales,
            addProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </SheetsContext.Provider>
    );
};
