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

app.put('/pings/:id', (req, res) => {
    const pingId = req.params.id;
    const { status } = req.body;

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

        connection.query('UPDATE pings SET status = ? WHERE id = ?', [status, pingId], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête' });
                return;
            }

            res.json({ message: 'Ping updated successfully' });

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

app.post('/pings/create', (req, res) => {
    const { alias, position, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole } = req.body;

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

        connection.query('INSERT INTO pings (alias, position, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  WHERE id = ?', [alias, position, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole, req.params.id], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête' });
                return;
            }

            res.json({ message: 'Ping created successfully' });

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
