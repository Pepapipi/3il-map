import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Axios from "axios";

function MapPage() {
    const [pings, setPings] = React.useState([]);
  
    React.useEffect(() => {
      Axios.get("/pings").then((res) => setPings(res.data)); 
    }, []);
  
  
    return (
      <MapContainer center={[50, 0]} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pings.map((ping, index) => {
          const position = [ping.position['x'], ping.position['y']];
            return (
            <Marker key={index} position={position}>
              <Popup>
              <h2>{ping.nom}</h2>
              <p>
                Accès avec un contrat d'alternance en veille : &nbsp;
                {ping.accessible !== false ? (
                <span style={{ color: "green", fontWeight: "bold" }}>Oui</span>
                ) : (
                <span style={{ color: "red" }}>Non</span>
                )}
              </p>
              <p>{ping.description}</p>
              <p>Cout de la vie : {ping.indice_cout_vie}</p>
              {ping.comparaison < 0 ? (
                <p style={{ color: "green" }}>
                Cout de la vie comparé à la France: {ping.comparaison} %
                </p>
              ) : (
                <p style={{ color: "red" }}>
                Cout de la vie comparé à la France: {ping.comparaison} %
                </p>
              )}

              {ping.passeport === true ? (
                <p style={{ color: "red" }}>Passeport obligatoire</p>
              ) : (
                <p style={{ color: "green" }}>Passeport pas obligatoire</p>
              )}
              <p>Langue : {ping.langue}</p>
              <p>
                Heure actuelle :{" "}
                {new Date().toLocaleTimeString([], { timeZone: ping.timezone })}
              </p>

              <br></br>
              <p>Distance depuis Limoges : {ping.distance} kms </p>
              <a href={ping.automne_semestre[0]}>
                Semestre Automne 2024 : {ping.automne_semestre[1]}{" "}
              </a>
              <br></br>
              <a href={ping.lien_ecole}>Site de l'école</a>
              <br></br>
              <p>
                <a href={'/form/'+ping.id}>
                <button>Modifier</button>
                </a>
              </p>
              <br></br>

              <button onClick={() => Axios.delete("/pings/"+ping.id)}>Supprimer</button>
              </Popup>
            </Marker>
            );
        })}
      </MapContainer>
    );
  }
  
export default MapPage;