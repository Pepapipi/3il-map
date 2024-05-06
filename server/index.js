const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

  app.get('/pings', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '3il_map_db'
    });

    console.log('Connexion à la base de données...');
    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            res.status(500).json({ error: 'Erreur de connexion à la base de données' });
            return;
        }
        connection.query('SELECT * FROM pings', (err, rows) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête' });
                return;
            }

            res.json( rows );

            // Maintenant que toutes les requêtes ont été exécutées, nous pouvons fermer la connexion.
            connection.end((err) => {
                if (err) {
                    console.error('Erreur lors de la fermeture de la connexion à la base de données :', err);
                    return;
                }
                console.log('Connexion à la base de données fermée');
            });
        });
    });
});



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
