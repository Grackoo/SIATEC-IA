import React, { useState } from 'react';
import { Search, Edit, Trash, Package, DollarSign } from 'lucide-react';

export default function AdminInventoryTable({ inventory, handleViewSwitch, handleDelete, updateProduct }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isBulkEdit, setIsBulkEdit] = useState(false);

    // Agrupar por categoría
    const groupedInventory = inventory.reduce((acc, item) => {
        const cat = item.category || 'Otros';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    const categories = Object.keys(groupedInventory);

    const formatImageUrl = (url) => {
        if (!url) return '';
        if (url.includes('drive.google.com/uc')) {
            try {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                const id = urlParams.get('id');
                if (id) {
                    return `https://drive.google.com/thumbnail?id=${id}&sz=w200`; // Smaller size for thumbnail
                }
            } catch (e) {
                return url;
            }
        }
        return url;
    };

    const handleBulkPriceUpdate = async (id, newPrice) => {
        try {
            await updateProduct(id, { price: parseFloat(newPrice) });
        } catch (error) {
            console.error("Error updating price:", error);
        }
    };

    return (
        <div className="admin-card">
            <div className="admin-actions-bar">
                <div className="admin-search-box">
                    <Search size={16} className="admin-search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar producto por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="admin-form-input"
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setIsBulkEdit(!isBulkEdit)}
                        className={`admin-btn ${isBulkEdit ? 'admin-btn-primary' : ''}`}
                        title="Modificar precio de varios productos con un clic"
                    >
                        <DollarSign size={16} />
                        Editar Precios Rápido
                    </button>
                    <button
                        onClick={() => handleViewSwitch('form')}
                        className="admin-btn admin-btn-primary"
                    >
                        + Nuevo
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {categories.map(category => {
                    const categoryItems = groupedInventory[category].filter(item =>
                        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (categoryItems.length === 0) return null;

                    return (
                        <div key={category} className="admin-table-wrapper" style={{ marginBottom: '30px' }}>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontWeight: 'bold', color: '#fff', textTransform: 'uppercase', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Package size={18} color="#00B8D4" />
                                    {category}
                                </h3>
                                <span style={{ background: 'rgba(0,184,212,0.1)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#00E5FF' }}>
                                    {categoryItems.length} items
                                </span>
                            </div>
                            
                            <div style={{ overflowX: 'auto' }}>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Img</th>
                                            <th>Producto</th>
                                            <th>Precio / Tipo</th>
                                            <th>Inventario</th>
                                            <th style={{ textAlign: 'right' }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryItems.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="admin-td-img">
                                                        {item.image_url ? (
                                                            <img src={formatImageUrl(item.image_url)} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                                        ) : (
                                                            <Package size={20} color="#757575" />
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <h4 className="admin-td-title">{item.title}</h4>
                                                    <p className="admin-td-sub">ID: {item.id}</p>
                                                    {item.is_promotion && <span className="admin-badge admin-badge-danger" style={{ marginTop: '4px' }}>¡OFERTA {item.discount_percentage}%!</span>}
                                                </td>
                                                <td>
                                                    {isBulkEdit ? (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <span style={{ color: '#757575' }}>$</span>
                                                            <input
                                                                type="number"
                                                                defaultValue={item.price}
                                                                onBlur={(e) => handleBulkPriceUpdate(item.id, e.target.value)}
                                                                className="admin-form-input"
                                                                style={{ width: '100px', padding: '6px 10px' }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span style={{ fontWeight: 'bold', color: '#00E5FF' }}>${(item.price || 0).toLocaleString()}</span>
                                                    )}
                                                    
                                                    {item.specs?.condition && (
                                                        <span className="admin-badge admin-badge-info" style={{ display: 'block', marginTop: '6px', width: 'fit-content' }}>
                                                            {item.specs.condition}
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <span className={`admin-badge ${parseInt(item.stock) > 2 ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: parseInt(item.stock) > 2 ? '#69F0AE' : '#FF5252' }}></div>
                                                        {item.stock} {parseInt(item.stock) === 1 ? 'ud.' : 'uds.'}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                        <button 
                                                            onClick={() => handleViewSwitch('form', item)} 
                                                            className="admin-btn admin-btn-icon"
                                                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'transparent' }}
                                                            title="Editar Producto"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(item.id)} 
                                                            className="admin-btn admin-btn-icon admin-btn-danger"
                                                            title="Eliminar permanentemente"
                                                        >
                                                            <Trash size={16} />
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
                    <div className="py-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-gray-800 font-bold mb-1">Sin productos encontrados</h3>
                        <p className="text-gray-500 text-sm">Tu inventario está vacío o la búsqueda no coincide.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
