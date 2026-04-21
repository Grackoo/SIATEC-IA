// Initial product data for demonstration
export const initialProducts = [
    {
        id: 'laptop-1',
        name: 'Lenovo ThinkPad T14',
        condition: 'Reacondicionada',
        price: 8500,
        specs: 'Intel Core i5 10th Gen, 16GB RAM, 256GB SSD, 14" FHD',
        images: [
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
            'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'
        ],
        category: 'laptop',
        inStock: true
    },
    {
        id: 'laptop-2',
        name: 'Dell Latitude 5420',
        condition: 'Nueva',
        price: 15000,
        specs: 'Intel Core i7 11th Gen, 16GB RAM, 512GB NVMe SSD, 14" FHD',
        images: [
            'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800',
            'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800'
        ],
        category: 'laptop',
        inStock: true
    },
    {
        id: 'laptop-3',
        name: 'HP EliteBook 840',
        condition: 'Reacondicionada',
        price: 9500,
        specs: 'Intel Core i5 10th Gen, 8GB RAM, 256GB SSD, 14" FHD',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
        ],
        category: 'laptop',
        inStock: true
    },
    {
        id: 'laptop-4',
        name: 'MacBook Air M1',
        condition: 'Nueva',
        price: 22000,
        specs: 'Apple M1, 8GB RAM, 256GB SSD, 13.3" Retina',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'
        ],
        category: 'laptop',
        inStock: true
    }
];

export const licenseData = [
    {
        id: 'windows-11-pro',
        name: 'Windows 11 Pro',
        type: 'Sistema Operativo',
        price: 1500,
        description: 'Licencia original de Windows 11 Professional',
        features: [
            'Actualizaciones automáticas',
            'Soporte técnico oficial',
            'BitLocker encryption',
            'Remote Desktop',
            'Hyper-V'
        ],
        image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800'
    },
    {
        id: 'windows-11-home',
        name: 'Windows 11 Home',
        type: 'Sistema Operativo',
        price: 1200,
        description: 'Licencia original de Windows 11 Home',
        features: [
            'Actualizaciones automáticas',
            'Soporte técnico oficial',
            'Windows Defender',
            'Microsoft Edge',
            'Cortana'
        ],
        image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800'
    },
    {
        id: 'windows-10-pro',
        name: 'Windows 10 Pro',
        type: 'Sistema Operativo',
        price: 1200,
        description: 'Licencia original de Windows 10 Professional',
        features: [
            'Actualizaciones de seguridad',
            'BitLocker encryption',
            'Remote Desktop',
            'Hyper-V',
            'Compatibilidad empresarial'
        ],
        image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800'
    },
    {
        id: 'kaspersky',
        name: 'Kaspersky Total Security',
        type: 'Antivirus',
        price: 800,
        description: 'Protección completa para tus dispositivos',
        features: [
            'Protección en tiempo real',
            'Anti-phishing',
            'Firewall bidireccional',
            'Control parental',
            'VPN incluido'
        ],
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'
    },
    {
        id: 'norton',
        name: 'Norton 360 Deluxe',
        type: 'Antivirus',
        price: 900,
        description: 'Seguridad integral con VPN y backup en la nube',
        features: [
            'Protección multicapa',
            'VPN seguro',
            '50GB backup en la nube',
            'Administrador de contraseñas',
            'Protección contra ransomware'
        ],
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800'
    },
    {
        id: 'eset',
        name: 'ESET Internet Security',
        type: 'Antivirus',
        price: 750,
        description: 'Seguridad internet completa y ligera',
        features: [
            'Protección antivirus y antispyware',
            'Anti-phishing',
            'Firewall personal',
            'Control parental',
            'Protección de cámara web'
        ],
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
    }
];
