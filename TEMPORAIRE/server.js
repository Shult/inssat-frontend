const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const PORT = 5001;
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send('Hello World');
});
app.post('/create-article', (req, res) => {
    const article = req.body;

    // Lire le fichier articles.json
    fs.readFile(path.join(__dirname, '../src/_data/articles.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la lecture du fichier.' });
        }

        const articles = JSON.parse(data);
        articles.push(article);

        // Écrire le nouvel article dans articles.json
        fs.writeFile(path.join(__dirname, '../src/_data/articles.json'), JSON.stringify(articles, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de lécriture dans le fichier.' });
                }

                res.status(200).json({ message: 'Article créé avec succès!' });
            });
        });
    });

    app.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
