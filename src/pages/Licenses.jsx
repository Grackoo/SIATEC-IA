import React from 'react';
// CORRECCIÓN: Cambiamos 'Windows' por 'AppWindow' (un icono genérico de ventana)
import { Shield, AppWindow, Key } from 'lucide-react';
import LicenseCard from '../components/Licenses/LicenseCard';
import { licenseData } from '../data/initialProducts';

export default function Licenses() {
    const windowsLicenses = licenseData.filter(lic => lic.type === 'Sistema Operativo');
    const antivirusLicenses = licenseData.filter(lic => lic.type === 'Antivirus');

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

            {/* Windows Section */}
            <section className="licenses-section section">
                <div className="container">
                    <div className="section-title-group">
                        {/* CORRECCIÓN: Usamos el nuevo icono aquí */}
                        <AppWindow size={32} className="section-icon" />
                        <div>
                            <h2>Microsoft Windows</h2>
                            <p>Sistemas operativos originales con licencia permanente</p>
                        </div>
                    </div>
                    <div className="licenses-grid">
                        {windowsLicenses.map((license) => (
                            <LicenseCard key={license.id} license={license} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Antivirus Section */}
            <section className="licenses-section section">
                <div className="container">
                    <div className="section-title-group">
                        <Shield size={32} className="section-icon" />
                        <div>
                            <h2>Antivirus y Seguridad</h2>
                            <p>Protege tus dispositivos con las mejores soluciones de seguridad</p>
                        </div>
                    </div>
                    <div className="licenses-grid">
                        {antivirusLicenses.map((license) => (
                            <LicenseCard key={license.id} license={license} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="info-section section">
                <div className="container">
                    <div className="info-card">
                        <h3>¿Por qué comprar licencias originales?</h3>
                        <ul className="info-list">
                            <li>Actualizaciones de seguridad automáticas</li>
                            <li>Soporte técnico oficial</li>
                            <li>Cumplimiento legal y protección de datos</li>
                            <li>Máximo rendimiento y compatibilidad</li>
                            <li>Sin riesgos de malware o software modificado</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}