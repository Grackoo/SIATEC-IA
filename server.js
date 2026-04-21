import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Cargar variables de entorno (ignora esto si tu hosting inyecta las variables)
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("Error: La variable GEMINI_API_KEY no está configurada en el servidor.");
    process.exit(1);
}

// Inicializar el SDK de Google con tu API Key de forma segura
const genAI = new GoogleGenerativeAI(apiKey);

// Configuración del modelo y las instrucciones de sistema
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: "Eres un experto asesor de ventas de equipos de cómputo para la tienda SIATEC."
});

app.post('/api/recommend-laptop', async (req, res) => {
    try {
        const { occupation, software, budget } = req.body;

        if (!occupation || !software || !budget) {
            return res.status(400).json({ error: 'Faltan datos requeridos (ocupación, software o presupuesto).' });
        }

        const prompt = `
Un cliente te pide una recomendación basada en lo siguiente:
- Ocupación: ${occupation}
- Programas que usa: ${software}
- Presupuesto: $${budget} MXN

Proporciona una recomendación detallada. Sugiere características técnicas (RAM, Procesador, Almacenamiento, Gráficos) que necesita. 
Además, haz un "upselling": sugiere una opción un poco más costosa que le daría mayores beneficios a largo plazo.
Responde de manera amigable, profesional, con emojis, y usando formato Markdown para resaltar lo importante. No saludes al inicio si no es necesario, ve directo al grano.
        `;

        // Llamar a Gemini desde el servidor proxy
        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        // Enviar la recomendación de vuelta al cliente
        res.json({ recommendation: textResponse });
        
    } catch (error) {
        console.error("Error al comunicarse con Gemini:", error);
        res.status(500).json({ error: 'Ocurrió un error en el servidor al generar la recomendación.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy de IA en ejecución en http://localhost:${PORT}`);
});
