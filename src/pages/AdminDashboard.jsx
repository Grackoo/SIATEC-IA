import React, { useState, useEffect } from 'react';
import '../admin.css';
import { useSheets } from '../context/SheetsContext';
import { Lock } from 'lucide-react';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminStats from '../components/Admin/AdminStats';
import AdminInventoryTable from '../components/Admin/AdminInventoryTable';
import AdminProductForm from '../components/Admin/AdminProductForm';

export default function AdminDashboard() {
    const { inventory, sales, loading, fetchInventory, fetchSales, addProduct, updateProduct, deleteProduct } = useSheets();

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Dashboard State
    const [activeTab, setActiveTab] = useState('dashboard');
    const [editingProduct, setEditingProduct] = useState(null);
    const [isBulkEdit, setIsBulkEdit] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'laptop',
        price: '',
        stock: '',
        image_url: '',
        images: [],
        specs: '{}',
        condition: 'Reacondicionada',
        is_promotion: false,
        discount_percentage: '',
        // Laptop Specific
        gama: 'Media',
        procesador: '',
        ram: '',
        almacenamiento: '',
        display: '',
        gpu: '',
        sistema_operativo: ''
    });

    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('siatec_admin_auth');
        if (sessionAuth === 'true') {
            setIsAuthenticated(true);
            fetchInventory();
            fetchSales();
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin') { // Simple client-side protection
            setIsAuthenticated(true);
            sessionStorage.setItem('siatec_admin_auth', 'true');
            fetchInventory();
            fetchSales();
            setAuthError('');
        } else {
            setAuthError('Contraseña incorrecta');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('siatec_admin_auth');
        setPassword('');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSpecsChange = (e) => {
        setFormData(prev => ({ ...prev, specs: e.target.value }));
    };

    const handleViewSwitch = (mode, product = null) => {
        setActiveTab(mode);
        if (mode === 'form') {
            if (product) {
                setEditingProduct(product);
                setFormData({
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    image_url: product.image_url || '',
                    images: product.images || (product.image_url ? product.image_url.split(',').map(url => url.trim()).filter(Boolean) : []),
                    specs: JSON.stringify(product.specs, null, 2),
                    condition: product.specs?.condition || 'Reacondicionada',
                    is_promotion: product.is_promotion || false,
                    discount_percentage: product.discount_percentage || '',
                    gama: product.specs?.gama || 'Media',
                    procesador: product.specs?.procesador || '',
                    ram: product.specs?.ram || '',
                    almacenamiento: product.specs?.almacenamiento || '',
                    display: product.specs?.display || '',
                    gpu: product.specs?.tarjeta_grafica || '',
                    sistema_operativo: product.specs?.sistema_operativo || ''
                });
            } else {
                setEditingProduct(null);
                setFormData({
                    title: '',
                    category: 'laptop',
                    price: '',
                    stock: '',
                    image_url: '',
                    images: [],
                    specs: '{}',
                    condition: 'Reacondicionada',
                    is_promotion: false,
                    discount_percentage: '',
                    gama: 'Media',
                    procesador: '',
                    ram: '',
                    almacenamiento: '',
                    display: '',
                    gpu: '',
                    sistema_operativo: ''
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let specsJson = {};

        if (formData.category === 'laptop') {
            // Build specs from individual fields
            specsJson = {
                condition: formData.condition || 'Reacondicionada',
                gama: formData.gama,
                procesador: formData.procesador,
                ram: formData.ram,
                almacenamiento: formData.almacenamiento,
                display: formData.display,
                gpu: formData.tarjeta_grafica,
                sistema_operativo: formData.sistema_operativo
            };
        } else {
            // Parse manual JSON for other categories
            try {
                specsJson = JSON.parse(formData.specs);
            } catch (err) {
                alert("El formato de Specs debe ser JSON válido. Ejemplo: {\"ram\": \"16GB\"}");
                return;
            }
            if (formData.category === 'software') {
                specsJson.condition = formData.condition || 'Antivirus';
            }
        }

        specsJson.is_promotion = formData.is_promotion;
        if (formData.is_promotion) {
            specsJson.discount_percentage = parseInt(formData.discount_percentage) || 0;
        }

        // Separamos URLs existentes de las nuevas imágenes base64
        const existingUrls = formData.images.filter(img => typeof img === 'string' && !img.startsWith('data:image'));
        const newBase64s = formData.images.filter(img => typeof img === 'string' && img.startsWith('data:image'));
        
        const filesToUpload = newBase64s.map((base64, idx) => ({
            base64: base64,
            name: `image_${Date.now()}_${idx}.png`
        }));

        // Destructuramos los campos temporales del formulario para no enviarlos como columnas directas
        const { condition, gama, procesador, ram, almacenamiento, display, gpu, sistema_operativo, is_promotion, discount_percentage, images, image_url, ...restFormData } = formData;

        const productData = {
            ...restFormData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            specs: specsJson,
            existing_urls: existingUrls.join(','),
            files_to_upload: filesToUpload
        };

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await addProduct(productData);
            }
            alert("Producto guardado exitosamente");
            handleViewSwitch('inventory');
        } catch (error) {
            alert("Error al guardar: " + error.message);
        }
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            const file = files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Str = reader.result;
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, base64Str]
                }));
                alert(`Imagen procesada correctamente. Se subirá a Drive al guardar el producto.`);
                setUploading(false);
            };
            
            reader.onerror = (error) => {
                throw error;
            };

        } catch (error) {
            alert('Error procesando imagen: ' + error.message);
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            try {
                await deleteProduct(id);
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
    };

    const handleBulkPriceUpdate = async (id, newPrice) => {
        try {
            await updateProduct(id, { price: parseFloat(newPrice) });
        } catch (error) {
            console.error("Error updating price:", error);
        }
    };

    // --- ERROR MESSAGE (si no se han cargado datos) ---
    // Removemos esta constante, lo manejaremos directo.

    // --- LOCK SCREEN ---
    if (!isAuthenticated) {
        return (
            <div className="admin-lock-screen">
                <div className="admin-lock-box">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <div style={{ background: 'rgba(0,184,212,0.1)', padding: '20px', borderRadius: '50%' }}>
                            <Lock size={40} color="#00B8D4" />
                        </div>
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Acceso Restringido</h2>
                    <p style={{ color: '#9E9E9E', marginBottom: '30px', fontSize: '0.9rem' }}>Ingresa la contraseña de administrador para continuar.</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="admin-form-input"
                            style={{ textAlign: 'center', letterSpacing: '2px', fontSize: '1.2rem' }}
                            placeholder="••••••••"
                            autoFocus
                        />
                        {authError && <p style={{ color: '#FF5252', fontSize: '0.85rem' }}>{authError}</p>}
                        <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
                            Acceder al Panel
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- DASHBOARD UI ---
    return (
        <div className="admin-layout">
            <AdminSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                handleLogout={handleLogout} 
            />

            <main className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-title">
                        {activeTab === 'dashboard' && 'Resumen Financiero y Gestión'}
                        {activeTab === 'inventory' && 'Gestión de Inventario'}
                        {activeTab === 'sales' && 'Historial de Ventas'}
                        {activeTab === 'form' && 'Registro de Productos'}
                    </h2>
                    <p className="admin-subtitle">Supervisa, administra y mantén el control total del catálogo de SIATEC.</p>
                </header>

                <div className="admin-content-wrapper">
                    {activeTab === 'dashboard' && (
                        <AdminStats inventory={inventory} sales={sales} />
                    )}

                    {activeTab === 'inventory' && (
                        <AdminInventoryTable 
                            inventory={inventory} 
                            handleViewSwitch={handleViewSwitch} 
                            handleDelete={handleDelete} 
                            updateProduct={updateProduct} 
                        />
                    )}

                    {activeTab === 'form' && (
                        <AdminProductForm 
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSpecsChange={handleSpecsChange}
                            handleImageUpload={handleImageUpload}
                            removeImage={removeImage}
                            handleSubmit={handleSubmit}
                            handleViewSwitch={handleViewSwitch}
                            editingProduct={editingProduct}
                            uploading={uploading}
                        />
                    )}

                    {activeTab === 'sales' && (
                        <div className="admin-card text-center" style={{ padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <DollarSign size={64} color="#424242" style={{ marginBottom: '20px' }} />
                            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '10px' }}>Módulo de Ventas</h3>
                            <p style={{ color: '#757575' }}>Próximamente. Se integrará con los cierres de caja en futuras actualizaciones.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
