const path = require('path');
const fs = require('fs');

const salvaImmagine = (request, response) =>{
    try {
        const { nome, immagine, tipo } = request.body;
        if (!nome || !immagine || !tipo) {
            return response.status(400).json({ result: false, message: "Dati mancanti" });
        }
        // Estrai il formato dell'immagine
        const match = immagine.match(/^data:image\/(png|jpeg|jpg);base64,/);
        if (!match) {
            return response.status(400).json({ result: false, message: "Formato immagine non supportato" });
        }
        const formato = match[1] === "jpeg" ? "jpg" : match[1]; // Normalizza "jpeg" in "jpg"
        // Rimuove l'intestazione base64
        const base64Data = immagine.replace(/^data:image\/\w+;base64,/, "");
        // Cartella dove salvare le immagini
        const dirPath = path.join(__dirname, 'immagini', tipo === "fabbro" ? "fabbro" : "tapparellista");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true }); // Crea la cartella se non esiste
        }
        // Trova il primo numero progressivo disponibile
        let count = 1;
        let filePath;
        do {
            filePath = path.join(dirPath, `${nome}_${count}.${formato}`);
            count++;
        } while (fs.existsSync(filePath)); // Continua finché trova un nome libero
        // Scrive il file
        fs.writeFileSync(filePath, base64Data, 'base64');
        response.json({
            result: true,
            message: "Immagine salvata con successo",
            fileName: path.basename(filePath)
        });
    } catch (error) {
        console.error("Errore nel salvataggio dell'immagine:", error);
        response.status(500).json({ result: false, message: "Errore nel salvataggio" });
    }
}

module.exports = salvaImmagine;