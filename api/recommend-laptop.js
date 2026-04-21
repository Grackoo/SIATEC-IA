import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    // Vercel Serverless Function solo debería aceptar POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        // En Vercel, el .env no se lee con dotenv, Vercel inyecta las variables de entorno automáticamente
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'La variable GEMINI_API_KEY no está configurada en Vercel.' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: "Actúa como un asesor experto de laptops para SIA TEC. Tu objetivo es recomendar la laptop más adecuada de nuestro catálogo, basándote en la profesión, los programas que utiliza y el presupuesto del cliente."
        });

        const { occupation, software, budget, catalog } = req.body;

        if (!occupation || !software || !budget) {
            return res.status(400).json({ error: 'Faltan datos requeridos (ocupación, software o presupuesto).' });
        }

        const prompt = `Actúa como un asesor experto de laptops para SIA TEC. Tu objetivo es recomendar la laptop más adecuada de nuestro catálogo, basándote en la profesión, los programas que utiliza y el presupuesto del cliente.

**Información del Cliente:**
- Profesión: ${occupation}
- Programas/Software: ${software}
- Presupuesto: ${budget} MXN

**Catálogo de Laptops de SIA TEC (en formato JSON):**
${JSON.stringify(catalog || [], null, 2)}

Por favor, analiza el catálogo y recomienda el modelo de laptop que mejor se adapte. Sé muy conciso, directo al grano y no escribas demasiado texto (máximo 3 párrafos cortos). Justifica brevemente la elección (procesador, RAM, GPU) y precio. Si el presupuesto no alcanza para ninguna, sugiere la opción más cercana y explícanos por qué muy brevemente.

Al final de tu recomendación, si el cliente aún no está seguro, añade la siguiente frase exacta: "Si aún no estás seguro o necesitas asesoría personalizada, no dudes en comunicarte por WhatsApp o llamando al +52 77 1395 1347."`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        return res.status(200).json({ recommendation: textResponse });
        
    } catch (error) {
        console.error("Error al comunicarse con Gemini:", error);
        return res.status(500).json({ error: 'No pudimos generar una recomendación en este momento. Si aún no estás seguro o necesitas una asesoría más personalizada, no dudes en comunicarte con un técnico de SIA TEC. Puedes contactarnos por WhatsApp o llamarnos al +52 77 1395 1347.' });
    }
}
