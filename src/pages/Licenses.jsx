import React from 'react';
import { Shield, AppWindow, Key, Package } from 'lucide-react';
import LicenseCard from '../components/Licenses/LicenseCard';
import { useProducts } from '../context/ProductsContext';

export default function Licenses() {
    const { products, loading } = useProducts();

    // 1. Loading State
    if (loading) {
        return (
            <div className="licenses-page min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-400 animate-pulse">Cargando catálogo de software...</div>
            </div>
        );
    }

    // 2. Filter software products
    const softwareProducts = products.filter(p => p.category === 'software');

    // 3. Robust categorization
    const windowsLicenses = softwareProducts.filter(p => {
        const type = p.specsRaw?.type || '';
        const name = p.name || '';
        return type === 'Sistema Operativo' || name.toLowerCase().includes('windows') || name.toLowerCase().includes('microsoft');
    });

    // New category for Antivirus
    const antivirusLicenses = softwareProducts.filter(p => {
        const type = p.specsRaw?.type || '';
        const name = p.name || '';
        return type === 'Antivirus' || name.toLowerCase().includes('antivirus') || name.toLowerCase().includes('security') || name.toLowerCase().includes('kaspersky') || name.toLowerCase().includes('eset') || name.toLowerCase().includes('mcafee');
    });

    // Everything else
    const otherLicenses = softwareProducts.filter(p => !windowsLicenses.includes(p) && !antivirusLicenses.includes(p));

    return (
        <div className="licenses-page">
            {/* Header */}
            <section className="page-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-icon">
                            <Key size={48} />
                        </div>
                        <h1>Licencias de Software</h1>
                        <p>Licencias originales con soporte oficial y actualizaciones garantizadas</p>
                    </div>
                </div>
            </section>

            {/* Software Content */}
            <section className="licenses-section section">
                <div className="container">
                    {softwareProducts.length === 0 ? (
                        <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-xl text-gray-400 mb-2">No hay licencias disponibles en este momento.</p>
                            <p className="text-sm text-gray-500">Intenta agregar productos en el panel de administración con categoría 'Software'.</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {/* Windows Section */}
                            {windowsLicenses.length > 0 && (
                                <div>
                                    <div className="section-title-group mb-8">
                                        <AppWindow size={32} className="section-icon" />
                                        <div>
                                            <h2>Sistemas Operativos</h2>
                                            <p>Windows y Software de Microsoft</p>
                                        </div>
                                    </div>
                                    <div className="licenses-grid">
                                        {windowsLicenses.map((product) => (
                                            <LicenseCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Antivirus Section */}
                            {antivirusLicenses.length > 0 && (
                                <div>
                                    <div className="section-title-group mb-8">
                                        <Shield size={32} className="section-icon" />
                                        <div>
                                            <h2>Antivirus y Seguridad</h2>
                                            <p>Protege tus equipos contra amenazas</p>
                                        </div>
                                    </div>
                                    <div className="licenses-grid">
                                        {antivirusLicenses.map((product) => (
                                            <LicenseCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Other Software */}
                            {otherLicenses.length > 0 && (
                                <div>
                                    <div className="section-title-group mb-8">
                                        <Package size={32} className="section-icon" />
                                        <div>
                                            <h2>Otros Programas</h2>
                                            <p>Herramientas, Utilidades y Más</p>
                                        </div>
                                    </div>
                                    <div className="licenses-grid">
                                        {otherLicenses.map((product) => (
                                            <LicenseCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}