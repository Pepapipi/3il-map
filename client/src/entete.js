import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Entete = () => {
    return (
        <nav className="navbar navbar-expand-lg couleur-bleu fixed-top">
            <div className="container-fluid">
                <img src="img/logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                <a className="navbar-brand couleur-orange" href="#">3iL Mobilité</a>
                <button className="btn btn-success">Se connecter</button>
            </div>
        </nav>
    );
};

export default Entete;
