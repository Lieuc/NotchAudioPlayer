const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configurer multer pour stocker les fichiers téléchargés dans un dossier temporaire
const upload = multer({ dest: 'tmp/' });

// Route pour gérer le téléchargement de fichiers
router.post('/', upload.single('music'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été envoyé.');
    }

    // Fichier téléchargé
    let uploadedFile = req.file;
    let uploadPath = path.join(__dirname, '/../public/music/', uploadedFile.originalname);

    // Lire le fichier temporaire et l'écrire à la destination
    fs.readFile(uploadedFile.path, (err, data) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du fichier.');
        }

        fs.writeFile(uploadPath, data, (err) => {
            if (err) {
                return res.status(500).send('Erreur lors de l\'écriture du fichier.');
            }

            // Supprimer le fichier temporaire
            fs.unlink(uploadedFile.path, (err) => {
                if (err) {
                    return res.status(500).send('Erreur lors de la suppression du fichier temporaire.');
                }

                res.status(200).redirect('/');
            });
        });
    });
});

module.exports = router;
