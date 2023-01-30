import React from "react";
import Card from "react-bootstrap/Card";
import { Cabecera } from "./Cabecera";
import { Link } from "react-router-dom";
import "./estilo-producto.css";
import { AccionUnica } from "./AccionUnica";
import api from "../services/api";

class ListaArticulos extends React.Component {
	cargarDatos() {
		fetch(api)
			.then((respuesta) => respuesta.json())
			.then((datosRespuesta) => {
				this.setState({
					datosCargados: true,
					articulos: datosRespuesta,
				});
			})
			.catch(console.error);
	}
	formatoMoneda(valor) {
		return Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
			maximumFractionDigits: 2,
		})
			.format(valor)
			.replace("$", "");
	}

	componentDidMount() {
		this.cargarDatos();
	}

	state = { datosCargados: false };
	render() {
		const { datosCargados, articulos } = this.state;
		if (!datosCargados) {
			return (
				<Card className="elemento">
					<Card.Body>
						<p>Cargando</p>
					</Card.Body>
				</Card>
			);
		} else {
			return (
				<>
					<Cabecera Titulo={"Artículos"} />
					{articulos.map((articulo) => (
						<Card key={articulo.Articuloid} className="elemento">
							<Card.Body>
								<Link
									className="enlace"
									to={"/Ver/" + articulo.Articuloid}
								>
									<p>{articulo.ArticuloNombre}</p>
									<p>Precio: ${this.formatoMoneda(articulo.ArticuloCosto*1.16)}</p>
								</Link>
							</Card.Body>
						</Card>
					))}

					<AccionUnica objetivo={"crear"} texto={"Nuevo artículo"} />
				</>
			);
		}
	}
}

export default ListaArticulos;
