import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Entete = () => {
    return (
        <nav className="navbar navbar-expand-lg couleur-bleu fixed-top">
            <div className="container-fluid">
                <img src="img/logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                <div className="navbar-brand couleur-orange">3iL Mobilité</div> 
                <a  href={'/form/'}><button className="btn btn-success">Ajouter une école</button></a>
            </div>
        </nav>
    );
};

export default Entete;
