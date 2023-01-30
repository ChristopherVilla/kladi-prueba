import React from "react";
import { Acciones } from "./Acciones";
import { Cabecera } from "./Cabecera";
import { Navegacion } from "./navegacion";
import api from "../services/api";
import './estilo-formulario.css';

class VerArticulo extends React.Component {

	cargaDatos() {
		fetch(api + "?consultar=" + this.props.match.params.id)
			.then((respuesta) => respuesta.json())
			.then((datosRespuesta) => {
				datosRespuesta[0].ArticuloIva = this.formatoMoneda(datosRespuesta[0].ArticuloCosto*0.16);
				datosRespuesta[0].ArticuloPrecio = this.formatoMoneda(datosRespuesta[0].ArticuloCosto*1.16);
				datosRespuesta[0].ArticuloCosto = this.formatoMoneda(datosRespuesta[0].ArticuloCosto);
				this.setState({
					datosCargados: true,
					articulo: datosRespuesta[0],
				});
			})
			.catch(console.error);
	}
	componentDidMount() {
		this.cargaDatos();
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
	state = {
		datosCargados: false,
		articulo: [],
		costo: 0.0,
		iva: 0.0,
		precio: 0.0,
	};
	render() {
		const { datosCargados, articulo } = this.state;
		if (!datosCargados) {
			return (
				<>
					<Navegacion objetivo={""} />
					<p>Cargando</p>
				</>
			);
		} else {
			return (
				<>
				<Cabecera Titulo={"Consultar artículo"} />
					<Navegacion objetivo={""} />
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<div className="form-group">
							<label>Nombre*</label>
							<input
								id="nombre"
								name="nombre"
								type="text"
								required="required"
								className="form-control"
								disabled
								value={articulo.ArticuloNombre}
							/>
						</div>
						<div className="form-group">
							<label>Costo*</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<div className="input-group-text">$</div>
								</div>
								<input
									id="costo"
									name="costo"
									type="text"
									required="required"
									className="form-control"
									value={articulo.ArticuloCosto}
									disabled
								/>
							</div>
						</div>
						<div className="form-group">
							<label>IVA 16%</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<div className="input-group-text">$</div>
								</div>
								<input
									id="ivaMonto"
									name="ivaMonto"
									type="text"
									className="form-control"
									value={articulo.ArticuloIva}
									disabled
								/>
							</div>
						</div>
						<div className="form-group">
							<label>Precio</label>
							<div className="input-group">
								<div className="input-group-prepend">
									<div className="input-group-text">$</div>
								</div>
								<input
									id="precio"
									name="precio"
									type="text"
									className="form-control"
									value={articulo.ArticuloPrecio}
									disabled
								/>
							</div>
						</div>
					</form>
					<Acciones id={+this.props.match.params.id} texto="hola" />
				</>
			);
		}
	}
}

export default VerArticulo;
