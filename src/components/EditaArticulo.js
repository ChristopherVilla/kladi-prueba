import React from "react";
import { Cabecera } from "./Cabecera";
import { Navegacion } from "./navegacion";
import api from "../services/api";
import "./estilo-formulario.css";

class EditarArticulo extends React.Component {
	state = {
		nombre: "",
		costo: "",
		iva: 0.0,
		precio: 0.0,
	};
	cambiaValores = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({ state });
	};

	calculaCampos = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({ state });
		this.formatoCampos();
	};
	cargaDatos() {
		fetch(api + "?consultar=" + this.props.match.params.id)
			.then((respuesta) => respuesta.json())
			.then((datosRespuesta) => {
				this.setState({
					datosCargados: true,
					nombre: datosRespuesta[0].ArticuloNombre,
					iva: this.formatoMoneda(
						datosRespuesta[0].ArticuloCosto * 0.16
					),
					precio: this.formatoMoneda(
						datosRespuesta[0].ArticuloCosto * 1.16
					),
					costo: this.formatoMoneda(datosRespuesta[0].ArticuloCosto),
				});
			})
			.finally(() => {
				this.formatoCampos();
			})
			.catch(console.error);
	}
	componentDidMount() {
		this.cargaDatos();
	}

	formatoCampos() {
		const { costo, datosCargados } = this.state;
		if (!datosCargados) {
			return;
		}
		let costovalor =
			Math.round(Number(costo.replace(/[^0-9.]+/, "")) * 100) / 100;

		let costoFormato = "";
		let ivaFormato = "";
		let precioFormato = "";
		if (costovalor > 99999 || costovalor < 0.01) {
			costovalor = 0;
		} else {
			let ivaValor = Math.round(costovalor * 0.16 * 100) / 100;
			let precioValor = Math.round(costovalor * 1.16 * 100) / 100;

			costoFormato = this.formatoMoneda(costovalor);
			ivaFormato = this.formatoMoneda(ivaValor);
			precioFormato = this.formatoMoneda(precioValor);
		}

		this.setState({
			costo: costoFormato,
			iva: ivaFormato,
			precio: precioFormato,
		});
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

	validaDuplicado(nombre) {
		fetch(
			api +
				"?consultarNombre=" +
				encodeURIComponent(nombre) +
				"&id=" +
				this.props.match.params.id
		)
			.then((respuesta) => respuesta.json())
			.then((datosRespuesta) => {
				this.gurdaArticulo(datosRespuesta);
			})
			.catch(console.log);
	}

	validarGuardar = (e) => {
		e.preventDefault();
		const { nombre } = this.state;
		this.validaDuplicado(nombre);
	};

	gurdaArticulo(valida) {
		const { nombre, costo } = this.state;
		if (!valida) {
			alert(
				"Ya existe un artículo llamado '" +
					nombre +
					"', intenta con otro nombre."
			);
			return;
		}
		let datosArticulo = {
			Articuloid: this.props.match.params.id,
			ArticuloNombre: nombre,
			ArticuloCosto: Number(costo.replace(/[^0-9.]+/, "")),
		};
		fetch(api + "?actualizar=1", {
			method: "POST",
			body: JSON.stringify(datosArticulo),
		})
			.then((respuesta) => respuesta.json())
			.then((datosRespuesta) => {
				this.props.history.push("/");
			})
			.catch(console.error);
	}
	render() {
		const { nombre, costo, iva, precio } = this.state;

		return (
			<>
				<Cabecera Titulo={"Editar artículo"} />
				<Navegacion objetivo={"ver/" + this.props.match.params.id} />
				<form onSubmit={this.validarGuardar}>
					<div className="form-group">
						<label>Nombre*</label>
						<input
							id="nombre"
							name="nombre"
							type="text"
							required="required"
							className="form-control"
							maxLength="200"
							onChange={this.cambiaValores}
							value={nombre}
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
								onChange={this.cambiaValores}
								onBlur={this.calculaCampos}
								value={costo}
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
								value={iva}
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
								value={precio}
								disabled
							/>
						</div>
					</div>
					<div className="form-group">
						<button
							name="submit"
							type="submit"
							className="btn accion accion-unica"
						>
							Guardar artículo
						</button>
					</div>
				</form>
			</>
		);
	}
}

export default EditarArticulo;
