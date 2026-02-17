import React, { useState, useEffect } from 'react';
import { useSupabase } from '../context/SupabaseContext';
import { Plus, Edit, Trash, Save, X, DollarSign, Package, Upload, Search, Lock, LogOut, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
    const { inventory, sales, loading, fetchInventory, fetchSales, addProduct, updateProduct, deleteProduct } = useSupabase();

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Dashboard State
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'form'
    const [activeTab, setActiveTab] = useState('inventory');
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
        condition: 'Reacondicionada'
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
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecsChange = (e) => {
        setFormData(prev => ({ ...prev, specs: e.target.value }));
    };

    const handleViewSwitch = (mode, product = null) => {
        setViewMode(mode);
        if (mode === 'form') {
            if (product) {
                setEditingProduct(product);
                setFormData({
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    image_url: product.image_url || '',
                    images: product.images || (product.image_url ? [product.image_url] : []),
                    specs: JSON.stringify(product.specs, null, 2),
                    condition: product.specs?.condition || 'Reacondicionada'
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
                    condition: 'Reacondicionada'
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let specsJson = {};
        try {
            specsJson = JSON.parse(formData.specs);
        } catch (err) {
            alert("El formato de Specs debe ser JSON válido. Ejemplo: {\"ram\": \"16GB\"}");
            return;
        }

        if (formData.category === 'laptop') {
            specsJson.condition = formData.condition || 'Reacondicionada';
        }
        if (formData.category === 'software') {
            specsJson.condition = formData.condition || 'licencia';
        }
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            specs: specsJson,
            image_url: formData.images.length > 0 ? formData.images[0] : null
        };

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await addProduct(productData);
            }
            alert("Producto guardado exitosamente");
            handleViewSwitch('list');
        } catch (error) {
            alert("Error al guardar: " + error.message);
        }
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const files = Array.from(e.target.files);
            if (files.length === 0) return;

            const newImages = [];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('products').getPublicUrl(filePath);
                newImages.push(data.publicUrl);
            }

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...newImages],
                image_url: prev.image_url || newImages[0] // Set main image if empty
            }));

            alert(`${newImages.length} imagen(es) subida(s) correctamente!`);
        } catch (error) {
            alert('Error subiendo imagen: ' + error.message);
        } finally {
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

    // --- LOCK SCREEN ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black/95">
                <div className="bg-[#121212] p-8 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <div className="mx-auto bg-cyan-500/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 border border-cyan-500/20">
                            <Lock size={32} className="text-cyan-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-white">Acceso Restringido</h2>
                        <p className="text-gray-400 mb-8 text-sm">Ingresa la contraseña de administrador para continuar.</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                                placeholder="Contraseña..."
                                autoFocus
                            />
                            {authError && <p className="text-red-400 text-sm">{authError}</p>}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]"
                            >
                                Acceder al Panel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // --- HELPERS FOR GROUPING ---
    const groupedInventory = inventory.reduce((acc, item) => {
        const cat = item.category || 'Otros';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    const categories = Object.keys(groupedInventory);

    // --- DASHBOARD UI ---
    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-cyan-500/30">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-[#121212]/80 backdrop-blur-md sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold text-sm">

                        </div>
                        <h1 className="text-lg font-bold tracking-tight text-white">SIATEC <span className="text-cyan-400 font-normal">Admin</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400 hidden md:block">Sesión Activa</span>
                        <button onClick={handleLogout} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-6">

                {/* VIEW: LIST (Inventory & Sales) */}
                {viewMode === 'list' && (
                    <>
                        {/* Stats / Actions Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex bg-[#1E1E1E] p-1 rounded-lg border border-white/5">
                                <button
                                    onClick={() => setActiveTab('inventory')}
                                    className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${activeTab === 'inventory' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-900/20' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    <Package size={16} /> Inventario
                                </button>
                                <button
                                    onClick={() => setActiveTab('sales')}
                                    className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium transition-all ${activeTab === 'sales' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-900/20' : 'text-gray-400 hover:text-gray-200'}`}
                                >
                                    <DollarSign size={16} /> Ventas
                                </button>
                            </div>

                            {activeTab === 'inventory' && (
                                <div className="flex gap-2 w-full md:w-auto">
                                    <div className="relative group flex-grow md:flex-grow-0">
                                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Buscar por nombre..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full md:w-48 bg-[#1E1E1E] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:border-cyan-500/50 focus:outline-none transition-all"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsBulkEdit(!isBulkEdit)}
                                        className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-medium transition-all ${isBulkEdit ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-[#1E1E1E] border-white/10 hover:border-white/20 text-gray-300'}`}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleViewSwitch('form')}
                                        className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                                    >
                                        <Plus size={16} strokeWidth={3} /> Nuevo
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Content Area */}
                        {activeTab === 'inventory' && (
                            <div className="space-y-8">
                                {categories.map(category => {
                                    const categoryItems = groupedInventory[category].filter(item =>
                                        item.title.toLowerCase().includes(searchTerm.toLowerCase())
                                    );

                                    if (categoryItems.length === 0) return null;

                                    return (
                                        <div key={category} className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-xl">
                                            <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">{category}</h3>
                                                <span className="text-xs text-gray-500 bg-black/40 px-2 py-0.5 rounded-full">{categoryItems.length} items</span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-white/10 text-gray-500 text-[10px] uppercase tracking-wider bg-black/20">
                                                            <th className="p-3 pl-4 w-1/2">Producto</th>
                                                            {category === 'laptop' && <th className="p-3">Condición</th>}
                                                            <th className="p-3">Precio</th>
                                                            <th className="p-3">Stock</th>
                                                            <th className="p-3 text-right pr-4">Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-white/5 text-sm">
                                                        {categoryItems.map(item => (
                                                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                                                <td className="p-2 pl-4">
                                                                    <div>
                                                                        <h3 className="font-medium text-white text-sm">{item.title}</h3>
                                                                        <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">ID: {item.id}</span>
                                                                    </div>
                                                                </td>
                                                                {category === 'laptop' && (
                                                                    <td className="p-2">
                                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${item.specs?.condition === 'Nueva' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                                                                            {item.specs?.condition || 'Reacondicionada'}
                                                                        </span>
                                                                    </td>
                                                                )}
                                                                <td className="p-2 font-mono text-cyan-400 text-xs">
                                                                    {isBulkEdit ? (
                                                                        <input
                                                                            type="number"
                                                                            defaultValue={item.price}
                                                                            onBlur={(e) => handleBulkPriceUpdate(item.id, e.target.value)}
                                                                            className="w-20 bg-black/50 border border-white/20 rounded px-1 py-0.5 text-right focus:border-cyan-500 outline-none"
                                                                        />
                                                                    ) : (
                                                                        `$${item.price.toLocaleString()}`
                                                                    )}
                                                                </td>
                                                                <td className="p-2">
                                                                    <span className={`font-mono text-xs ${item.stock < 3 ? 'text-red-400' : 'text-gray-300'}`}>
                                                                        {item.stock}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 pr-4">
                                                                    <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                                        <button onClick={() => handleViewSwitch('form', item)} className="p-1.5 hover:bg-cyan-500/10 rounded-md text-gray-400 hover:text-cyan-400 transition-colors">
                                                                            <Edit size={14} />
                                                                        </button>
                                                                        <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-400 hover:text-red-400 transition-colors">
                                                                            <Trash size={14} />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    );
                                })}

                                {Object.keys(groupedInventory).length === 0 && (
                                    <div className="p-12 text-center text-gray-500 border border-white/5 rounded-xl bg-[#121212]">
                                        <div className="flex flex-col items-center gap-2">
                                            <Search size={32} strokeWidth={1.5} className="opacity-20" />
                                            <p className="text-sm">No se encontraron productos.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'sales' && (
                            <div className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                <div className="relative z-10 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 text-gray-500 text-[10px] uppercase tracking-wider bg-white/5">
                                                <th className="p-3 pl-4">Fecha</th>
                                                <th className="p-3">Producto</th>
                                                <th className="p-3">Cliente / Contacto</th>
                                                <th className="p-3 text-right pr-4">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-sm">
                                            {sales.map(sale => (
                                                <tr key={sale.id} className="hover:bg-white/[0.02] transition-colors">
                                                    <td className="p-3 pl-4 text-gray-300">
                                                        {new Date(sale.sale_date).toLocaleDateString()}
                                                        <span className="block text-[10px] text-gray-500">{new Date(sale.sale_date).toLocaleTimeString()}</span>
                                                    </td>
                                                    <td className="p-3 font-medium text-white">{sale.inventory?.title || 'Producto Eliminado'}</td>
                                                    <td className="p-3 text-gray-300">
                                                        {sale.customer_contact || <span className="text-gray-600 italic">No registrado</span>}
                                                    </td>
                                                    <td className="p-3 pr-4 text-right font-mono text-cyan-400 font-bold">
                                                        ${sale.total_amount.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                            {sales.length === 0 && (
                                                <tr><td colSpan="4" className="p-6 text-center text-gray-500 text-sm">No hay ventas registradas.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* VIEW: FORM (Add/Edit) */}
                {viewMode === 'form' && (
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() => handleViewSwitch('list')}
                                className="p-2 rounded-lg bg-[#1E1E1E] border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-bold text-white">
                                {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                            </h2>
                        </div>

                        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium">Título del Producto</label>
                                        <input required name="title" value={formData.title} onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:bg-black/60 transition-all placeholder:text-gray-600"
                                            placeholder="Ej. MacBook Pro M1"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium">Categoría</label>
                                        <div className="relative">
                                            <select name="category" value={formData.category} onChange={handleInputChange}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:border-cyan-500/50 focus:outline-none transition-all cursor-pointer"
                                            >
                                                <option value="laptop">Laptop</option>
                                                <option value="software">Software</option>
                                                <option value="streaming">Streaming</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium">Precio (MXN)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input required type="number" name="price" value={formData.price} onChange={handleInputChange}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-all font-mono"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 font-medium">Stock Disponible</label>
                                        <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-all font-mono"
                                            placeholder="0"
                                        />
                                    </div>

                                    {formData.category === 'laptop' && (
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm text-gray-400 font-medium">Condición del Equipo</label>
                                            <div className="flex gap-4">
                                                <label className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 transition-all ${formData.condition === 'Reacondicionada' ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'border-white/10 hover:bg-white/5 text-gray-400'}`}>
                                                    <input type="radio" name="condition" value="Reacondicionada" checked={formData.condition === 'Reacondicionada'} onChange={handleInputChange} className="hidden" />
                                                    Reacondicionada
                                                </label>
                                                <label className={`flex-1 cursor-pointer border rounded-lg p-3 flex items-center justify-center gap-2 transition-all ${formData.condition === 'Nueva' ? 'bg-green-500/10 border-green-500 text-green-400' : 'border-white/10 hover:bg-white/5 text-gray-400'}`}>
                                                    <input type="radio" name="condition" value="Nueva" checked={formData.condition === 'Nueva'} onChange={handleInputChange} className="hidden" />
                                                    Nueva
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium flex justify-between">
                                        Imágenes
                                        <span className="text-xs text-cyan-500">{formData.images.length} subidas</span>
                                    </label>

                                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                                        <label className="aspect-square border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group">
                                            <Upload className="text-gray-500 group-hover:text-cyan-500 mb-2" size={20} />
                                            <span className="text-[10px] text-gray-500 group-hover:text-cyan-500 text-center px-1">
                                                {uploading ? '...' : 'Subir'}
                                            </span>
                                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
                                        </label>

                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                                                <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button type="button" onClick={() => removeImage(idx)} className="bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600 transform hover:scale-110 transition-all">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                                {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-cyan-600 text-[10px] text-center text-white font-bold py-0.5">PRINCIPAL</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium flex justify-between">
                                        Especificaciones Técnicas (JSON)
                                        <a href="#" className="text-xs text-cyan-500 hover:underline">Ver ejemplos</a>
                                    </label>
                                    <textarea
                                        name="specs"
                                        value={formData.specs}
                                        onChange={handleSpecsChange}
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg p-4 text-sm font-mono text-gray-300 focus:border-cyan-500/50 focus:outline-none transition-all h-32 leading-relaxed"
                                        placeholder='{ "procesador": "Intel Core i5", "ram": "16GB" }'
                                    />
                                </div>

                                <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                                    <button type="button" onClick={() => handleViewSwitch('list')} className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all transform hover:translate-y-px">
                                        {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
