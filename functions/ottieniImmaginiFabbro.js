const fs = require('fs');
const path = require('path');

const ottieniImmaginiFabbro = (req, res, next) => {
    try {
        const dirPath = path.join(__dirname, 'immagini', 'fabbro'); // Percorso della cartella delle immagini
        const fileName = req.params.fileName; // Prendi il nome del file dal parametro della rotta

        const filePath = path.join(dirPath, fileName);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ result: false, message: "Immagine non trovata" });
        }

        // Ottieni l'estensione del file
        const ext = path.extname(fileName).toLowerCase();
        let contentType;

        // Determina il tipo di contenuto in base all'estensione del file
        switch (ext) {
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            default:
                return res.status(415).json({ result: false, message: "Formato immagine non supportato" });
        }

        // Imposta il tipo di contenuto
        res.setHeader('Content-Type', contentType);

        // Leggi e invia l'immagine come risposta
        const imageStream = fs.createReadStream(filePath);
        imageStream.pipe(res); // Invia l'immagine come flusso

    } catch (error) {
        console.error("Errore durante il recupero dell'immagine:", error);
        res.status(500).json({ result: false, message: "Errore nel recupero dell'immagine" });
    }
};

module.exports = ottieniImmaginiFabbro;
