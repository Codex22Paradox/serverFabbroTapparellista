const fs = require('fs');
const path = require('path');

const ottieniTutteImmagini = (req, res, next) => {
    try {
        // Percorso della directory principale contenente le cartelle delle immagini
        const baseDir = path.join(__dirname, 'immagini');
        // Verifica se la directory principale esiste
        if (!fs.existsSync(baseDir)) {
            return res.status(404).json({ result: false, message: "Directory non trovata" });
        }
        // Legge tutte le cartelle nella directory principale
        const cartelle = fs.readdirSync(baseDir).filter(file => fs.statSync(path.join(baseDir, file)).isDirectory());
        // Array per raccogliere tutti i percorsi delle immagini
        let immaginiTotali = [];
        // Per ogni cartella, leggi i file e filtra le immagini
        cartelle.forEach(cartella => {
            const dirPath = path.join(baseDir, cartella);
            const immagini = fs.readdirSync(dirPath).filter(file => {
                return ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase());
            });
            // Aggiungi il percorso relativo di ogni immagine alla lista
            immaginiTotali = immaginiTotali.concat(immagini.map(imma => `/immagini/${cartella}/${imma}`));
        });
        // Se non ci sono immagini, restituisci un messaggio
        if (immaginiTotali.length === 0) {
            return res.status(404).json({ result: false, message: "Nessuna immagine trovata" });
        }
        // Restituisce tutti i percorsi delle immagini
        res.status(200).json({
            result: true,
            immagini: immaginiTotali
        });
    } catch (error) {
        console.error("Errore durante il recupero delle immagini:", error);
        res.status(500).json({ result: false, message: "Errore nel recupero delle immagini" });
    }
};

module.exports = ottieniTutteImmagini;
