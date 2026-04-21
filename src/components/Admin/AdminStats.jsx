import React from 'react';
import { ShoppingCart, Package, TrendingUp, AlertTriangle, Monitor, Tv, Box } from 'lucide-react';

export default function AdminStats({ inventory, sales }) {
    // Calculamos las estadísticas
    const totalLaptops = inventory.filter(p => p.category === 'laptop').length;
    const totalSoftware = inventory.filter(p => p.category === 'software').length;
    const totalStreaming = inventory.filter(p => p.category === 'streaming').length;
    
    const totalValorInventario = inventory.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.stock) || 0)), 0);
    const productosEnPromo = inventory.filter(item => item.is_promotion).length;
    const stockBajo = inventory.filter(item => parseInt(item.stock) < 3 && item.category === 'laptop').length;

    // Calculate percentage for CSS chart
    const maxItems = Math.max(totalLaptops, totalSoftware, totalStreaming, 1);
    
    // Altura relativa (max 180px)
    const getBarHeight = (count) => `${Math.max((count / maxItems) * 160, 20)}px`;

    const statCards = [
        {
            title: 'Valor del Inventario',
            value: `$${totalValorInventario.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            subtitle: 'Estimado global en sistema',
            icon: <ShoppingCart size={24} />,
            colorClass: 'cyan'
        },
        {
            title: 'Equipos (Hardware)',
            value: totalLaptops.toString(),
            subtitle: 'Laptops Físicas',
            icon: <Monitor size={24} />,
            colorClass: 'emerald'
        },
        {
            title: 'En Oferta',
            value: productosEnPromo.toString(),
            subtitle: 'Con descuento activo',
            icon: <TrendingUp size={24} />,
            colorClass: 'purple'
        },
        {
            title: 'Alerta Stock',
            value: stockBajo.toString(),
            subtitle: 'Equipos < 3 uds.',
            icon: <AlertTriangle size={24} />,
            colorClass: 'red'
        }
    ];

    return (
        <div>
            <div className="admin-banner">
                <div className="admin-banner-dot"></div>
                <div className="admin-banner-text">Métricas en vivo. Servidor sincronizado automáticamente con Google Sheets.</div>
            </div>

            <div className="admin-actions-bar">
                <div className="admin-search-box">
                    {/* Placeholder for future specific dashboard actions if needed */}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="admin-btn" onClick={() => window.print()}>
                        Imprimir Reporte
                    </button>
                    <button className="admin-btn admin-btn-primary" onClick={() => window.location.reload()}>
                        Forzar Sincronización
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                {statCards.map((card, index) => (
                    <div key={index} className={`stat-card ${card.colorClass}`}>
                        <div className="stat-header">
                            <div className={`stat-icon ${card.colorClass}`}>
                                {card.icon}
                            </div>
                        </div>
                        <h3 className="stat-value">{card.value}</h3>
                        <p className="stat-label">{card.title}</p>
                        <span className="stat-subtext">{card.subtitle}</span>
                    </div>
                ))}
            </div>

            <div className="admin-card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Distribución del Catálogo</h3>
                <p style={{ color: '#9e9e9e', fontSize: '0.9rem' }}>Volumen de productos registrados en base de datos separados por categoría principal.</p>
                
                <div className="admin-chart-container">
                    {/* Bar 1: Laptops */}
                    <div className="admin-chart-bar cyan" style={{ height: getBarHeight(totalLaptops) }}>
                        <div className="admin-chart-tooltip">{totalLaptops} Laptops</div>
                        <div className="admin-chart-label">Laptops</div>
                    </div>
                    
                    {/* Bar 2: Software */}
                    <div className="admin-chart-bar purple" style={{ height: getBarHeight(totalSoftware) }}>
                        <div className="admin-chart-tooltip">{totalSoftware} Licencias</div>
                        <div className="admin-chart-label">Software</div>
                    </div>

                    {/* Bar 3: Streaming */}
                    <div className="admin-chart-bar emerald" style={{ height: getBarHeight(totalStreaming) }}>
                        <div className="admin-chart-tooltip">{totalStreaming} Cuentas</div>
                        <div className="admin-chart-label">Streaming</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
