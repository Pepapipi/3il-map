import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function MapPage() {
	const [pings, setPings] = React.useState([]);

	React.useEffect(() => {
		Axios.get("/pings").then((res) => setPings(res.data)).catch((err) => console.error(err));
	}, []);

	const createIcon = (color) => {
        const svgString = `
            <svg height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="${color}"/>
                <circle cx="12" cy="12" r="6" fill="white"/>
                <circle cx="12" cy="12" r="4" fill="${color}"/>
            </svg>
        `;
        return L.divIcon({
            html: svgString,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

	return (
		<MapContainer center={[50, 0]} zoom={4} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{pings.map((ping, index) => {
				const position = [ping.position['x'], ping.position['y']];

				return (
					
					<Marker key={index} position={position} icon={ping.erasmus == '1' ?  createIcon("blue") : createIcon("black")}>
						<Popup>
							{/* <div class="card"> */}
								<img src="..." class="card-img-top" alt="..." />
								<div class="card-body">
									<h5 class="card-title">{ping.nom}</h5>
									<p class="card-text">{ping.description}</p>
								</div>
								<ul class="list-group list-group-flush mb-3">
									<li class="list-group-item ">
										<p>Accès avec un contrat d'alternance en veille : &nbsp;
											{ping.accessible !== false ? (
												<span style={{ color: "green", fontWeight: "bold" }}>Oui</span>
											) : (
												<span style={{ color: "red" }}>Non</span>
											)}
										</p>
									</li>
									<li class="list-group-item ">Cout de la vie : {ping.indice_cout_vie}</li>
									<li class="list-group-item ">
										{ping.comparaison < 0 ? (
											<p style={{ color: "green" }}>
												Cout de la vie comparé à la France: {ping.comparaison} %
											</p>
										) : (
											<p style={{ color: "red" }}>
												Cout de la vie comparé à la France: {ping.comparaison} %
											</p>
										)}
									</li>
									<li class="list-group-item ">
										{ping.passeport === true ? (
											<p style={{ color: "red" }}>Passeport obligatoire</p>
										) : (
											<p style={{ color: "green" }}>Passeport pas obligatoire</p>
										)}
									</li>
									<li class="list-group-item ">Langue : {ping.langue}</li>
									<li class="list-group-item ">Heure actuelle :{" "}{new Date().toLocaleTimeString([], { timeZone: ping.timezone })}</li>
									<li class="list-group-item ">Distance depuis Limoges : {ping.distance} kms </li>
								</ul>
								<div class="card-body mb-3">
									<a className="link-success" href={ping.automne_semestre[0]}>Semestre Automne 2024 : {ping.automne_semestre[1]}{" "}</a> &nbsp;&nbsp;&nbsp;
									<a className="link-info" href={ping.lien_ecole}>Site de l'école</a>
								</div>
								<div class="card-body">
									<div className="row">
										<div className="col-6">
											<a href={'/form/' + ping.id}><button className="btn btn-warning">Modifier</button></a>
										</div>
										<div className="col-6 text-end">
											<button className="btn btn-danger" onClick={() => Axios.delete("/pings/" + ping.id)}>Supprimer</button>
										</div>
									</div>
								</div>
							{/* </div> */}

							{/* <h2>{ping.nom}</h2> */}
							{/* <p>
								Accès avec un contrat d'alternance en veille : &nbsp;
								{ping.accessible !== false ? (
								<span style={{ color: "green", fontWeight: "bold" }}>Oui</span>
								) : (
								<span style={{ color: "red" }}>Non</span>
								)}
							</p> */}
							{/* <p>{ping.description}</p> */}
							{/* <p>Cout de la vie : {ping.indice_cout_vie}</p> */}
							{/* {ping.comparaison < 0 ? (
								<p style={{ color: "green" }}>
								Cout de la vie comparé à la France: {ping.comparaison} %
								</p>
							) : (
								<p style={{ color: "red" }}>
								Cout de la vie comparé à la France: {ping.comparaison} %
								</p>
							)} */}

							{/* {ping.passeport === true ? (
								<p style={{ color: "red" }}>Passeport obligatoire</p>
							) : (
								<p style={{ color: "green" }}>Passeport pas obligatoire</p>
							)} */}
							{/* <p>Langue : {ping.langue}</p> */}
							{/* <p>
								Heure actuelle :{" "}
								{new Date().toLocaleTimeString([], { timeZone: ping.timezone })}
							</p> */}

							{/* <br></br> */}
							{/* <p>Distance depuis Limoges : {ping.distance} kms </p> */}
							{/* <a href={ping.automne_semestre[0]}>
								Semestre Automne 2024 : {ping.automne_semestre[1]}{" "}
							</a> */}
							{/* <br></br> */}
							{/* <a href={ping.lien_ecole}>Site de l'école</a> */}
							{/* <br></br> */}
							{/* <p>
								<a href={'/form/' + ping.id}>
									<button>Modifier</button>
								</a>
							</p>
							<br></br>

							<button onClick={() => Axios.delete("/pings/" + ping.id)}>Supprimer</button> */}
						</Popup>
					</Marker>
				);
			})}
		</MapContainer >
	);
}

export default MapPage;