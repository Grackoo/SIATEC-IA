import React, { useState } from 'react';
import { Calendar, Clock, Wrench, User, Phone, Mail, FileText } from 'lucide-react';
import { sendAppointmentToWhatsApp } from '../utils/whatsapp';

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        deviceType: '',
        serviceType: '',
        problem: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.phone || !formData.problem || !formData.date || !formData.time) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        // Send to WhatsApp
        sendAppointmentToWhatsApp(formData);

        // Reset form
        setFormData({
            name: '',
            phone: '',
            email: '',
            deviceType: '',
            serviceType: '',
            problem: '',
            date: '',
            time: '',
        });
    };

    const serviceTypes = [
        'Reparación de Hardware',
        'Mantenimiento de Software',
        'Limpieza y Optimización',
        'Instalación de Sistema Operativo',
        'Diagnóstico',
        'Otro'
    ];

    const deviceTypes = [
        'Laptop',
        'Computadora de Escritorio',
        'All-in-One',
        'Otro'
    ];

    return (
        <div className="appointment-page">
            {/* Header */}
            <section className="page-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-icon">
                            <Wrench size={48} />
                        </div>
                        <h1>Agendar Reparación</h1>
                        <p>Servicio técnico profesional para tu equipo de cómputo</p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="form-section section">
                <div className="container">
                    <div className="form-container">
                        <form onSubmit={handleSubmit} className="appointment-form">
                            {/* Personal Info */}
                            <div className="form-group-title">
                                <User size={24} />
                                <h3>Información Personal</h3>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="name" className="label">Nombre Completo *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Tu nombre completo"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="phone" className="label">Teléfono *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="771 123 4567"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="email" className="label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            {/* Device Info */}
                            <div className="form-group-title">
                                <Wrench size={24} />
                                <h3>Información del Equipo</h3>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="deviceType" className="label">Tipo de Equipo</label>
                                    <select
                                        id="deviceType"
                                        name="deviceType"
                                        value={formData.deviceType}
                                        onChange={handleChange}
                                        className="select"
                                    >
                                        <option value="">Selecciona...</option>
                                        {deviceTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="serviceType" className="label">Tipo de Servicio</label>
                                    <select
                                        id="serviceType"
                                        name="serviceType"
                                        value={formData.serviceType}
                                        onChange={handleChange}
                                        className="select"
                                    >
                                        <option value="">Selecciona...</option>
                                        {serviceTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="problem" className="label">Descripción del Problema *</label>
                                <textarea
                                    id="problem"
                                    name="problem"
                                    value={formData.problem}
                                    onChange={handleChange}
                                    className="textarea"
                                    placeholder="Describe el problema o servicio que necesitas..."
                                    required
                                />
                            </div>

                            {/* Appointment Date/Time */}
                            <div className="form-group-title">
                                <Calendar size={24} />
                                <h3>Fecha y Hora Preferida</h3>
                            </div>

                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="date" className="label">Fecha *</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="input"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="time" className="label">Hora *</label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary btn-lg submit-btn">
                                Agendar por WhatsApp
                            </button>

                            <p className="form-note">
                                * Campos requeridos. Tu cita será confirmada vía WhatsApp.
                            </p>
                        </form>

                        {/* Info Sidebar */}
                        <div className="info-sidebar">
                            <div className="info-card">
                                <h3>Nuestros Servicios</h3>
                                <ul className="services-list">
                                    <li>
                                        <strong>Reparación de Hardware</strong>
                                        <p>Cambio de pantallas, teclados, baterías y componentes</p>
                                    </li>
                                    <li>
                                        <strong>Mantenimiento de Software</strong>
                                        <p>Eliminación de virus, optimización del sistema</p>
                                    </li>
                                    <li>
                                        <strong>Diagnóstico Gratuito</strong>
                                        <p>Evaluación completa de tu equipo sin costo</p>
                                    </li>
                                    <li>
                                        <strong>Limpieza Interna</strong>
                                        <p>Cambio de pasta térmica y optimización</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="info-card">
                                <h3>Contacto Directo</h3>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <Phone size={20} />
                                        <span>+52 771 395 1347</span>
                                    </div>
                                    <div className="contact-item">
                                        <Clock size={20} />
                                        <span>Lun - Sáb: 9:00 - 19:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

