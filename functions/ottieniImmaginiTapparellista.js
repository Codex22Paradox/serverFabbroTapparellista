const fs = require('fs');
const path = require('path');

const ottieniImmaginiTapparellista = (req, res, next) => {
    try {
        // Percorso della cartella delle immagini
        const dirPath = path.join(__dirname, 'immagini', 'tapparellista');
        // Verifica se la cartella esiste
        if (!fs.existsSync(dirPath)) {
            return res.status(404).json({ result: false, message: "Cartella non trovata" });
        }
        // Legge i file dalla cartella e filtra solo le immagini con estensioni valide
        const immagini = fs.readdirSync(dirPath).filter(file => {
            // Verifica se l'estensione del file è una di quelle supportate
            return ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase());
        });
        // Se non ci sono immagini, restituisce un errore
        if (immagini.length === 0) {
            return res.status(404).json({ result: false, message: "Nessuna immagine trovata" });
        }
        // Restituisce i nomi delle immagini come percorso relativo
        const immaginiPercorsi = immagini.map(imma => `/immagini/tapparellista/${imma}`);
        res.status(200).json({
            result: true,
            immagini: immaginiPercorsi
        });
    } catch (error) {
        console.error("Errore durante il recupero delle immagini:", error);
        res.status(500).json({ result: false, message: "Errore nel recupero delle immagini" });
    }
};

module.exports = ottieniImmaginiTapparellista;
