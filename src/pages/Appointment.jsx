import React, { useState } from 'react';
import { Wrench, User, Phone, Mail, Laptop, Monitor, PcCase, Smartphone, Code, Shield, HardDrive, Cpu, Settings } from 'lucide-react';
import { sendAppointmentToWhatsApp } from '../utils/whatsapp';

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        deviceType: '',
        serviceType: '',
        problem: '',
    });

    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCardSelect = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Auto-advance if device and service are selected
        if (name === 'deviceType' && formData.serviceType) {
            setStep(2);
        } else if (name === 'serviceType' && formData.deviceType) {
            setStep(2);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.problem || !formData.deviceType || !formData.serviceType) {
            alert('Por favor completa todos los campos requeridos para brindarte un mejor servicio.');
            return;
        }

        sendAppointmentToWhatsApp(formData);

        setFormData({
            name: '',
            phone: '',
            deviceType: '',
            serviceType: '',
            problem: '',
        });
        setStep(1);
    };

    const deviceTypes = [
        { id: 'Laptop', label: 'Laptop', icon: Laptop },
        { id: 'Desktop', label: 'PC Escritorio', icon: PcCase },
        { id: 'All-in-One', label: 'All-in-One', icon: Monitor },
        { id: 'Otro', label: 'Otro Equipo', icon: Smartphone },
    ];

    const serviceTypes = [
        { id: 'Mantenimiento', label: 'Mantenimiento Preventivo', icon: Settings },
        { id: 'Hardware', label: 'Reparación Física (Hardware)', icon: Cpu },
        { id: 'Software', label: 'Instalación/Software', icon: Code },
        { id: 'Diagnostico', label: 'Diagnóstico', icon: HardDrive },
        { id: 'Virus', label: 'Limpieza de Virus', icon: Shield },
        { id: 'Otro', label: 'Otro Problema', icon: Wrench },
    ];

    return (
        <div className="appointment-page">
            {/* Header */}
            <section className="page-header appointment-header">
                <div className="container">
                    <div className="header-content style-center" data-aos="fade-up">
                        <div className="header-icon-container">
                            <Wrench size={40} className="header-icon-svg" />
                        </div>
                        <h1 className="header-title-main">Agendar Reparación</h1>
                        <p className="header-subtitle-main">Selecciona tu equipo y dinos en qué podemos ayudarte. Te contactaremos enseguida para coordinar.</p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="form-section section pt-0">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <form onSubmit={handleSubmit} className="appointment-form card-style" data-aos="zoom-in" data-aos-delay="200">

                        {/* Dynamic Background Blur */}
                        <div className="glow-bg"></div>

                        {/* Step 1: Selection Cards */}
                        <div className={`step-container ${step === 1 ? 'step-active' : 'step-hidden'}`}>

                            <h3 className="step-title">
                                <span className="step-number">1</span>
                                ¿Qué equipo necesitas reparar?
                            </h3>

                            <div className="appointment-cards grid-4">
                                {deviceTypes.map((device) => {
                                    const Icon = device.icon;
                                    const isSelected = formData.deviceType === device.id;
                                    return (
                                        <div
                                            key={device.id}
                                            onClick={() => handleCardSelect('deviceType', device.id)}
                                            className={`appointment-card ${isSelected ? 'selected' : ''}`}
                                        >
                                            <Icon size={32} className="card-icon" />
                                            <span className="card-label">{device.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <h3 className="step-title">
                                <span className="step-number">2</span>
                                ¿Qué tipo de servicio buscas?
                            </h3>

                            <div className="appointment-cards grid-3">
                                {serviceTypes.map((service) => {
                                    const Icon = service.icon;
                                    const isSelected = formData.serviceType === service.id;
                                    return (
                                        <div
                                            key={service.id}
                                            onClick={() => handleCardSelect('serviceType', service.id)}
                                            className={`appointment-card ${isSelected ? 'selected' : ''}`}
                                        >
                                            <Icon size={28} className="card-icon" />
                                            <span className="card-label">{service.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="step-footer">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.deviceType || !formData.serviceType}
                                    className="btn btn-primary btn-lg"
                                >
                                    Siguiente Paso
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Details */}
                        <div className={`step-container ${step === 2 ? 'step-active' : 'step-hidden'}`}>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="back-button"
                            >
                                &larr; Volver
                            </button>

                            <h3 className="step-title">
                                <span className="step-number">3</span>
                                Detalles del Contacto
                            </h3>

                            <div className="form-grid">
                                <div className="input-group-custom">
                                    <label htmlFor="name" className="custom-label">Nombre Completo *</label>
                                    <div className="input-with-icon">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="custom-input"
                                            placeholder="Ej. Juan Pérez"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="input-group-custom">
                                    <label htmlFor="phone" className="custom-label">Teléfono *</label>
                                    <div className="input-with-icon">
                                        <Phone size={18} className="input-icon" />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="custom-input"
                                            placeholder="771 123 4567"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group-custom full-width">
                                <label htmlFor="problem" className="custom-label split-label">
                                    <span>Describe el Problema *</span>
                                    <span className="label-hint">Sé tan específico como puedas</span>
                                </label>
                                <textarea
                                    id="problem"
                                    name="problem"
                                    value={formData.problem}
                                    onChange={handleChange}
                                    className="custom-input custom-textarea"
                                    placeholder="Ej. Mi computadora no enciende desde ayer, hace un ruido extraño..."
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg submit-appointment">
                                Enviar Solicitud de Cita
                            </button>

                            <p className="appointment-note">
                                Al enviar, se abrirá WhatsApp con tu información para coordinar la hora exacta de la cita directamente con nuestros técnicos.
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

