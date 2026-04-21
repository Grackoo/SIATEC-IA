import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bot, X, Sparkles, AlertCircle, Cpu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useProducts } from '../../context/ProductsContext';
import './AIAssistant.css';

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        occupation: '',
        software: '',
        budget: ''
    });
    const [loading, setLoading] = useState(false);
    const [recommendation, setRecommendation] = useState('');
    const [error, setError] = useState('');
    
    const { products } = useProducts();

    useEffect(() => {
        const handleOpenAssist = () => setIsOpen(true);
        window.addEventListener('open-ai-assistant', handleOpenAssist);
        return () => window.removeEventListener('open-ai-assistant', handleOpenAssist);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.occupation || !formData.software || !formData.budget) {
            setError('Por favor, completa todos los campos para una mejor recomendación.');
            return;
        }

        setLoading(true);
        setError('');
        setStep(2); 

        try {
            const catalog = products
                .filter(p => p.category === 'laptop' && p.inStock)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    specs: p.specs
                }));

            const response = await fetch('/api/recommend-laptop', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    occupation: formData.occupation,
                    software: formData.software,
                    budget: formData.budget,
                    catalog: catalog
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                console.error("API Error Response:", errData);
                throw new Error(errData?.error || "Error al conectar con el servidor proxy.");
            }

            const data = await response.json();
            
            if (data.recommendation) {
                setRecommendation(data.recommendation);
            } else {
                throw new Error("No se recibió una respuesta válida de la IA.");
            }

        } catch (err) {
            console.error("Bot Error:", err);
            setError(err.message || 'Ocurrió un error inesperado al generar la recomendación.');
            setStep(1); 
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ occupation: '', software: '', budget: '' });
        setRecommendation('');
        setError('');
        setStep(1);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setTimeout(resetForm, 300);
        }
    };

    const renderModal = () => {
        if (!isOpen) return null;
        
        return createPortal(
            <div className="assistant-modal-overlay">
                <div className="assistant-modal text-left">
                    <div className="assistant-header">
                        <h3>
                            <Bot size={24} className="text-cyan-400" /> 
                            <span>Asesor de Equipos AI</span>
                        </h3>
                        <button onClick={toggleModal} className="close-btn">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="assistant-body">
                        {step === 1 && (
                            <form onSubmit={handleSubmit}>
                                <p className="assistant-description">
                                    Te ayudamos a encontrar el equipo de computo Ideal para ti! Responde a las siguientes preguntas:
                                </p>

                                {error && (
                                    <div className="assistant-error flex items-start text-sm">
                                        <AlertCircle size={18} style={{ marginRight: '8px', flexShrink: 0 }} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>¿A qué te dedicas?</label>
                                    <input 
                                        type="text" 
                                        name="occupation" 
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Estudiante de ingeniería..." 
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>¿Qué programas o software utilizas?</label>
                                    <input 
                                        type="text" 
                                        name="software" 
                                        value={formData.software}
                                        onChange={handleInputChange}
                                        placeholder="Ej: AutoCAD, Photoshop, Excel..." 
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>¿Cuál es tu presupuesto aproximado?</label>
                                    <input 
                                        type="number" 
                                        name="budget" 
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 15000" 
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-cyan">
                                    <Cpu size={20} />
                                    Obtener Recomendación AI
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <div>
                                {loading ? (
                                    <div className="loading-container">
                                        <div className="loading-spinner"></div>
                                        <p style={{ color: '#00E5FF' }}>Escaneando catálogo SIATEC...</p>
                                    </div>
                                ) : (
                                    <div className="recommendation-result">
                                        <div className="recommendation-content custom-scrollbar">
                                            <div className="ai-markdown">
                                                <ReactMarkdown>{recommendation}</ReactMarkdown>
                                            </div>
                                        </div>
                                        <button onClick={resetForm} className="btn-reset">
                                            Nueva Consulta
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    return (
        <>
            <button 
                onClick={toggleModal} 
                className="btn btn-glass assistant-trigger-btn"
                style={{ 
                    textShadow: 'none', 
                    border: '1px solid white', 
                    color: 'white',
                    padding: '0.6rem 1.2rem',
                    minHeight: '42px',
                    fontSize: '0.95rem'
                }}
            >
                <Sparkles size={18} style={{ marginRight: '8px' }} />
                Descubre la computadora ideal para ti ✨
            </button>
            {renderModal()}
        </>
    );
}
