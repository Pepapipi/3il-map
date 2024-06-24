const express = require('express');
const cors = require('cors');

const mysql = require('mysql');
const e = require('express');

const app = express();
const port = 3001;


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers'],
};

app.options('*', cors(corsOptions)); 

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/pings', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
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

            res.json(rows);

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

app.get('/pings/:id', (req, res) => {
    const pingId = req.params.id;

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
            connection.query('SELECT * FROM pings WHERE id = ?', [pingId], (err, rows) => {
                if (err) {
                    console.error('Erreur lors de l\'exécution de la requête :', err);
                    res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête' });
                    return;
                }
    
                res.json(rows);
    
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
    const { alisasapp, position_x, position_y, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole } = req.body; 
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '3il_map_db'
    });


    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            res.status(500).json({ error: 'Erreur de connexion à la base de données' });
            return;
        }

        const position = `POINT(${position_x} ${position_y})`;

        const query = `
            INSERT INTO pings (
                alias, position, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole
            ) VALUES (?, ST_GeomFromText(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            alisasapp, position, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole
        ];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                res.status(504).json({ error: 'Erreur lors de l\'exécution de la requête' });
                return;
            }

            res.json({ message: 'Ping created successfully' });

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

app.post('/pings/update/:id', (req, res) => {
    const pingId = req.params.id;
    const { alias, position_x, position_y, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole } = req.body; 
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '3il_map_db'
    });


    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            res.status(500).json({ error: 'Erreur de connexion à la base de données' });
            return;
        }

        const position = `POINT(${position_x} ${position_y})`;

        const query = `
            UPDATE pings SET
            alias = ?,
            position = ST_GeomFromText(?),
            nom = ?,
            description = ?,
            is_accessible = ?,
            indice_cout_vie = ?,
            comparaison = ?,
            distance = ?,
            passeport = ?,
            langue = ?,
            timezone = ?,
            automne_semestre = ?,
            lien_ecole = ?
            WHERE id = ?
        `;

        const values = [
            alias, position, nom, description, is_accessible, indice_cout_vie, comparaison, distance, passeport, langue, timezone, automne_semestre, lien_ecole, pingId
        ];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                res.status(504).json({ error: err});
                return;
            }

            res.json({ message: 'Ping created successfully' });

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


// Add CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.delete('/pings/:id', (req, res) => {
    const pingId = req.params.id;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '3il_map_db'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            res.status(500).json({ error: 'Erreur de connexion à la base de données' });
            return;
        }

        connection.query('DELETE FROM pings WHERE id = ?', [pingId], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête :', err);
                res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête' });
                return;
            }

            res.json({ message: 'Ping deleted successfully' });

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