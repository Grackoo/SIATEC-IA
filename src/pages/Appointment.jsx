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
            <section className="page-header py-12">
                <div className="container">
                    <div className="header-content text-center">
                        <div className="header-icon mx-auto mb-4 bg-cyan-500/20 p-4 rounded-full w-20 h-20 flex items-center justify-center">
                            <Wrench size={40} className="text-cyan-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Agendar Reparación</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Selecciona tu equipo y dinos en qué podemos ayudarte. Te contactaremos enseguida para coordinar.</p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="form-section section pt-0">
                <div className="container max-w-3xl">
                    <form onSubmit={handleSubmit} className="appointment-form bg-[#121212] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">

                        {/* Dynamic Background Blur */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10 absolute pointer-events-none"></div>

                        {/* Step 1: Selection Cards */}
                        <div className={`step-container transition-all duration-500 ${step === 1 ? 'block opacity-100' : 'hidden opacity-0'}`}>

                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                <span className="bg-cyan-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                ¿Qué equipo necesitas reparar?
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                                {deviceTypes.map((device) => {
                                    const Icon = device.icon;
                                    const isSelected = formData.deviceType === device.id;
                                    return (
                                        <div
                                            key={device.id}
                                            onClick={() => handleCardSelect('deviceType', device.id)}
                                            className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${isSelected ? 'bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 transform scale-105' : 'bg-black/40 border border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20'}`}
                                        >
                                            <Icon size={32} className="mb-3" />
                                            <span className="font-medium text-sm">{device.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                <span className="bg-cyan-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                ¿Qué tipo de servicio buscas?
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {serviceTypes.map((service) => {
                                    const Icon = service.icon;
                                    const isSelected = formData.serviceType === service.id;
                                    return (
                                        <div
                                            key={service.id}
                                            onClick={() => handleCardSelect('serviceType', service.id)}
                                            className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all ${isSelected ? 'bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 transform scale-105' : 'bg-black/40 border border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20'}`}
                                        >
                                            <Icon size={28} className="mb-3" />
                                            <span className="font-medium text-sm">{service.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="flex justify-end mt-8">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.deviceType || !formData.serviceType}
                                    className="btn btn-primary btn-lg w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Siguiente Paso
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Details */}
                        <div className={`step-container transition-all duration-500 ${step === 2 ? 'block opacity-100' : 'hidden opacity-0'}`}>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-sm text-cyan-400 hover:text-cyan-300 mb-6 flex items-center gap-1"
                            >
                                &larr; Volver
                            </button>

                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                <span className="bg-cyan-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                                Detalles del Contacto
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm text-gray-400 font-medium">Nombre Completo *</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:bg-black/60 transition-all placeholder:text-gray-600"
                                            placeholder="Ej. Juan Pérez"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm text-gray-400 font-medium">Teléfono *</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:bg-black/60 transition-all placeholder:text-gray-600"
                                            placeholder="771 123 4567"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <label htmlFor="problem" className="text-sm text-gray-400 font-medium flex justify-between">
                                    <span>Describe el Problema *</span>
                                    <span className="text-xs text-cyan-600">Sé tan específico como puedas</span>
                                </label>
                                <textarea
                                    id="problem"
                                    name="problem"
                                    value={formData.problem}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-cyan-500/50 focus:outline-none focus:bg-black/60 transition-all placeholder:text-gray-600 min-h-[120px]"
                                    placeholder="Ej. Mi computadora no enciende desde ayer, hace un ruido extraño..."
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20">
                                Enviar Solicitud de Cita
                            </button>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                Al enviar, se abrirá WhatsApp con tu información para coordinar la hora exacta de la cita directamente con nuestros técnicos.
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

