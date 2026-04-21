import React from 'react';
import { X, Upload, Save } from 'lucide-react';

export default function AdminProductForm({
    formData,
    handleInputChange,
    handleSpecsChange,
    handleImageUpload,
    removeImage,
    handleSubmit,
    handleViewSwitch,
    editingProduct,
    uploading
}) {
    return (
        <div className="admin-card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                        {editingProduct ? 'Editar Producto Existente' : 'Registrar Nuevo Producto'}
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: '#9E9E9E', marginTop: '4px' }}>
                        Llena los detalles. El producto se sincronizará con Google Sheets al guardar.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => handleViewSwitch('inventory')}
                    className="admin-btn admin-btn-icon"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'transparent' }}
                    title="Cancelar y Volver"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    
                    {/* INFO BÁSICA */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#00B8D4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Información Básica</h3>
                        
                        <div className="admin-form-group">
                            <label className="admin-form-label">Título del Producto *</label>
                            <input required name="title" value={formData.title} onChange={handleInputChange}
                                className="admin-form-input"
                                placeholder="Ej. MacBook Pro M1 2020"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Categoría *</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="admin-form-select">
                                    <option value="laptop">Laptop / PC</option>
                                    <option value="software">Software / Licencia</option>
                                    <option value="streaming">Streaming</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Condición</label>
                                {formData.category === 'laptop' ? (
                                    <select name="condition" value={formData.condition} onChange={handleInputChange} className="admin-form-select">
                                        <option value="Reacondicionada">Reacondicionada</option>
                                        <option value="Nueva">Nueva</option>
                                    </select>
                                ) : formData.category === 'software' ? (
                                    <select name="condition" value={formData.condition} onChange={handleInputChange} className="admin-form-select">
                                        <option value="Antivirus">Antivirus</option>
                                        <option value="Paquetería">Paquetería</option>
                                        <option value="Software">Otro</option>
                                    </select>
                                ) : (
                                    <input value="N/A" disabled className="admin-form-input" style={{ opacity: 0.5 }} />
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Precio (MXN) *</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#757575', fontWeight: 'bold' }}>$</span>
                                    <input required type="number" name="price" value={formData.price} onChange={handleInputChange}
                                        className="admin-form-input"
                                        style={{ paddingLeft: '28px', fontFamily: 'monospace' }}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Inventario (Stock) *</label>
                                <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange}
                                    className="admin-form-input"
                                    style={{ fontFamily: 'monospace' }}
                                    placeholder="1"
                                />
                            </div>
                        </div>

                        {/* PROMOCIÓN */}
                        <div style={{ padding: '16px', backgroundColor: 'rgba(255, 214, 0, 0.05)', border: '1px solid rgba(255, 214, 0, 0.2)', borderRadius: '12px', marginTop: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                <input type="checkbox" name="is_promotion" checked={formData.is_promotion} onChange={handleInputChange}
                                    style={{ width: '18px', height: '18px', accentColor: '#FFD600' }}
                                />
                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#FFD600' }}>Este producto tiene descuento</span>
                            </label>
                            {formData.is_promotion && (
                                <div style={{ marginTop: '12px', position: 'relative', width: '50%' }}>
                                    <input required={formData.is_promotion} type="number" name="discount_percentage" value={formData.discount_percentage} onChange={handleInputChange}
                                        className="admin-form-input"
                                        style={{ paddingRight: '28px', borderColor: 'rgba(255,214,0,0.5)', fontFamily: 'monospace' }}
                                        placeholder="Ej. 10" min="1" max="99"
                                    />
                                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#FFD600', fontWeight: 'bold' }}>%</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* IMAGEN Y DETALLES */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#00B8D4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Imagen / Multimedia</h3>
                        
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '140px', position: 'relative' }}>
                            {formData.images.length > 0 ? (
                                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} style={{ position: 'relative', width: '96px', height: '96px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <img src={img} alt={`Upload ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#FF5252', color: '#fff', borderRadius: '50%', padding: '4px', border: 'none', cursor: 'pointer' }}>
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <label style={{ width: '96px', height: '96px', borderRadius: '8px', border: '2px dashed rgba(0,184,212,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'rgba(0,184,212,0.05)' }}>
                                        <Upload size={16} color="#00B8D4" style={{ marginBottom: '4px' }} />
                                        <span style={{ fontSize: '10px', color: '#00B8D4' }}>Añadir otra</span>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                                    </label>
                                </div>
                            ) : (
                                <label style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', width: '100%', height: '100%' }}>
                                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0,184,212,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                                        <Upload size={20} color="#00B8D4" />
                                    </div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#E0E0E0' }}>Subir imagen principal</span>
                                    <span style={{ fontSize: '0.75rem', color: '#757575', marginTop: '4px' }}>{uploading ? 'Procesando archivo...' : 'Soporta PNG, JPG, WEBP'}</span>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                                </label>
                            )}
                        </div>

                        <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#00B8D4', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', marginTop: '16px' }}>Especificaciones Técnicas</h3>
                        
                        {formData.category === 'laptop' ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                    <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Gama</label>
                                    <select name="gama" value={formData.gama} onChange={handleInputChange} className="admin-form-select" style={{ padding: '8px', fontSize: '0.85rem' }}>
                                        <option value="Baja">Baja</option>
                                        <option value="Media">Media</option>
                                        <option value="Alta">Alta</option>
                                    </select>
                                </div>
                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                    <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Procesador</label>
                                    <input name="procesador" value={formData.procesador} onChange={handleInputChange} className="admin-form-input" style={{ padding: '8px', fontSize: '0.85rem' }} placeholder="Intel i5..." />
                                </div>
                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                    <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Memoria RAM</label>
                                    <input name="ram" value={formData.ram} onChange={handleInputChange} className="admin-form-input" style={{ padding: '8px', fontSize: '0.85rem' }} placeholder="8GB..." />
                                </div>
                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                    <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Disco / SSD</label>
                                    <input name="almacenamiento" value={formData.almacenamiento} onChange={handleInputChange} className="admin-form-input" style={{ padding: '8px', fontSize: '0.85rem' }} placeholder="256GB SSD..." />
                                </div>
                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                    <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Pantalla</label>
                                    <input name="display" value={formData.display} onChange={handleInputChange} className="admin-form-input" style={{ padding: '8px', fontSize: '0.85rem' }} placeholder="15.6 FHD..." />
                                </div>
                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                    <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Sis. Operativo</label>
                                    <input name="sistema_operativo" value={formData.sistema_operativo} onChange={handleInputChange} className="admin-form-input" style={{ padding: '8px', fontSize: '0.85rem' }} placeholder="Win 11..." />
                                </div> 
                                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                                    <label className="admin-form-label" style={{ fontSize: '0.75rem' }}>Tarjeta Gráfica</label>
                                    <input name="tarjeta_grafica" value={formData.tarjeta_grafica} onChange={handleInputChange} className="admin-form-input" style={{ padding: '8px', fontSize: '0.85rem' }} placeholder="RTX 3050..." />
                                </div> 
                            </div>
                        ) : (
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <label className="admin-form-label" style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                                    Objeto JSON
                                    <span style={{ color: '#00B8D4', cursor: 'pointer' }}>Sintaxis</span>
                                </label>
                                <textarea
                                    name="specs"
                                    value={formData.specs}
                                    onChange={handleSpecsChange}
                                    className="admin-form-textarea"
                                    style={{ height: '120px', fontFamily: 'monospace', fontSize: '0.85rem' }}
                                    placeholder='{ "duracion": "1 mes", "dispositivos": 4 }'
                                />
                                <p style={{ fontSize: '0.7rem', color: '#757575', marginTop: '8px' }}>Para software o streaming. Escríbelo en formato de objeto JSON válido.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* BOTONERA INFERIOR */}
                <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <button type="button" onClick={() => handleViewSwitch('inventory')} className="admin-btn">
                        Descartar
                    </button>
                    <button type="submit" className="admin-btn admin-btn-primary">
                        <Save size={18} />
                        {editingProduct ? 'Sobreescribir Producto' : 'Guardar y Publicar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
