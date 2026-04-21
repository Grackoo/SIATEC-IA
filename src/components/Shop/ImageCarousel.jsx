import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel({ images, alt }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div className="carousel-placeholder">
                <span>Sin imagen</span>
            </div>
        );
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    React.useEffect(() => {
        if (images.length <= 1 || isHovered) return;

        const interval = setInterval(goToNext, 3000);
        return () => clearInterval(interval);
    }, [images.length, isHovered]);

    return (
        <div
            className="carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={images[currentIndex]} alt={`${alt} - ${currentIndex + 1}`} className="carousel-image" />

            {images.length > 1 && (
                <>
                    <button onClick={goToPrevious} className="carousel-btn carousel-btn-left">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={goToNext} className="carousel-btn carousel-btn-right">
                        <ChevronRight size={24} />
                    </button>

                    <div className="carousel-dots">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

