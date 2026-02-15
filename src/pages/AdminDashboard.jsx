
import React, { useState, useEffect } from 'react';
import { useSupabase } from '../context/SupabaseContext';
import { Plus, Edit, Trash, Save, X, DollarSign, Package, Upload } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
    const { inventory, sales, loading, fetchInventory, fetchSales, addProduct, updateProduct, deleteProduct } = useSupabase();
    const [activeTab, setActiveTab] = useState('inventory');
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAddingString, setIsAddingString] = useState(false);
    const [isBulkEdit, setIsBulkEdit] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'laptop',
        price: '',
        stock: '',
        image_url: '',
        specs: '{}'
    });

    useEffect(() => {
        fetchInventory();
        fetchSales();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecsChange = (e) => {
        setFormData(prev => ({ ...prev, specs: e.target.value }));
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

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            specs: specsJson
        };

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await addProduct(productData);
            }
            setFormData({ title: '', category: 'laptop', price: '', stock: '', image_url: '', specs: '{}' });
            setEditingProduct(null);
            setIsAddingString(false);
            alert("Producto guardado exitosamente");
        } catch (error) {
            alert("Error al guardar: " + error.message);
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            category: product.category,
            price: product.price,
            stock: product.stock,
            image_url: product.image_url || '',
            specs: JSON.stringify(product.specs, null, 2)
        });
        setIsAddingString(true);
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('products').getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
            alert("Imagen subida correctamente!");
        } catch (error) {
            alert('Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
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

    return (
        <div className="section container" style={{ paddingTop: '8rem' }}>
            <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

            <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('inventory')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
                >
                    <Package size={20} /> Inventario
                </button>
                <button
                    onClick={() => setActiveTab('sales')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'hover:bg-white/5'}`}
                >
                    <DollarSign size={20} /> Ventas
                </button>
            </div>

            {activeTab === 'inventory' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Inventario</h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsBulkEdit(!isBulkEdit)}
                                className={`btn flex items-center gap-2 ${isBulkEdit ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                <DollarSign size={20} /> {isBulkEdit ? 'Guardar Cambios' : 'Edición Masiva de Precios'}
                            </button>
                            {!isAddingString && !isBulkEdit && (
                                <button
                                    onClick={() => { setIsAddingString(true); setEditingProduct(null); setFormData({ title: '', category: 'laptop', price: '', stock: '', image_url: '', specs: '{}' }); }}
                                    className="btn btn-primary flex items-center gap-2"
                                >
                                    <Plus size={20} /> Nuevo Producto
                                </button>
                            )}
                        </div>
                    </div>

                    {isAddingString && (
                        <div className="bg-white/5 p-6 rounded-xl mb-8 border border-white/10">
                            <h3 className="text-xl font-bold mb-4">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Título</label>
                                    <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 rounded bg-black/50 border border-white/20" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Categoría</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 rounded bg-black/50 border border-white/20">
                                        <option value="laptop">Laptop</option>
                                        <option value="software">Software</option>
                                        <option value="streaming">Streaming</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Precio</label>
                                    <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 rounded bg-black/50 border border-white/20" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Stock</label>
                                    <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full p-2 rounded bg-black/50 border border-white/20" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm mb-1">Imagen del Producto</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            name="image_url"
                                            value={formData.image_url}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded bg-black/50 border border-white/20"
                                            placeholder="URL de imagen o subir archivo ->"
                                        />
                                        <label className="btn btn-secondary cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                                            <Upload size={18} />
                                            {uploading ? '...' : 'Subir'}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>
                                    {formData.image_url && <img src={formData.image_url} alt="Vista previa" className="h-20 rounded border border-white/10" />}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm mb-1">Especificaciones (JSON)</label>
                                    <textarea
                                        name="specs"
                                        value={formData.specs}
                                        onChange={handleSpecsChange}
                                        className="w-full p-2 rounded bg-black/50 border border-white/20 font-mono text-sm h-32"
                                        placeholder='{"ram": "16GB", "processor": "i5"}'
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Ingresa un objeto JSON válido.</p>
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                    <button type="button" onClick={() => setIsAddingString(false)} className="px-4 py-2 rounded hover:bg-white/10 flex items-center gap-2">
                                        <X size={18} /> Cancelar
                                    </button>
                                    <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                                        <Save size={18} /> Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400">
                                    <th className="p-3">Producto</th>
                                    <th className="p-3">Categoría</th>
                                    <th className="p-3">Precio</th>
                                    <th className="p-3">Stock</th>
                                    <th className="p-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="p-3 font-medium">{item.title}</td>
                                        <td className="p-3 capitalize">{item.category}</td>
                                        <td className="p-3">
                                            {isBulkEdit ? (
                                                <input
                                                    type="number"
                                                    defaultValue={item.price}
                                                    onBlur={(e) => handleBulkPriceUpdate(item.id, e.target.value)}
                                                    className="w-24 p-1 rounded bg-black/50 border border-white/20"
                                                />
                                            ) : (
                                                `$${item.price}`
                                            )}
                                        </td>
                                        <td className="p-3">{item.stock}</td>
                                        <td className="p-3 flex justify-end gap-2">
                                            <button onClick={() => startEdit(item)} className="p-2 hover:text-blue-400 text-gray-400">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 hover:text-red-400 text-gray-400">
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {inventory.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">
                                            No hay productos en el inventario.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'sales' && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Registro de Ventas</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400">
                                    <th className="p-3">Fecha</th>
                                    <th className="p-3">Producto</th>
                                    <th className="p-3">Cliente</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map(sale => (
                                    <tr key={sale.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="p-3">{new Date(sale.sale_date).toLocaleDateString()}</td>
                                        <td className="p-3">{sale.inventory?.title || 'Producto Eliminado'}</td>
                                        <td className="p-3">{sale.customer_contact || 'N/A'}</td>
                                        <td className="p-3">${sale.total_amount}</td>
                                    </tr>
                                ))}
                                {sales.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-gray-500">
                                            No hay ventas registradas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
