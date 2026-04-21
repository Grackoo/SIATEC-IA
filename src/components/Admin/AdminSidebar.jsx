import React from 'react';
import { LayoutDashboard, Package, PlusCircle, DollarSign, LogOut } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, handleLogout }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'inventory', label: 'Inventario Actual', icon: <Package size={20} /> },
        { id: 'form', label: 'Registrar Producto', icon: <PlusCircle size={20} /> },
        { id: 'sales', label: 'Ventas', icon: <DollarSign size={20} /> },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <div className="admin-logo-mark">
                    S
                </div>
                <h1 className="admin-sidebar-brand">
                    SIATEC <span>Admin</span>
                </h1>
            </div>

            <nav className="admin-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}

                <button 
                    onClick={handleLogout}
                    className="admin-nav-item logout"
                    style={{ marginTop: 'auto', position: 'absolute', bottom: '20px' }}
                >
                    <LogOut size={20} />
                    Cerrar Sesión
                </button>
            </nav>
        </aside>
    );
}
