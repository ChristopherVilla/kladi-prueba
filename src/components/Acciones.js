import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import api from "../services/api";
import './estilo-modal.css';


export function Acciones({ id }) {
	 const [show, setMostrar] = useState(false);

	 const manejaCerrar = () => setMostrar(false);
	 const manejaMostrar = () => setMostrar(true);

	function eliminar() {
		fetch(api + "?borrar=" + id)
			.then((respuesta) => respuesta.json())
			.then((datosRespuesta) => {
				window.location.assign("/");
			})
			.catch(console.error);
	}

	return (
		<>
			<Modal className={`${show ? "modal-eliminar" : ""}`} show={show} onHide={manejaCerrar}>
				<Modal.Header>
					<Modal.Title>Eliminar artículo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					¿Estás seguro que deseas eliminar este artículo?
				</Modal.Body>
				<Modal.Footer>
					<Button className="accion-modal accion-primaria" onClick={eliminar}>
						Si
					</Button>
					<Button className="accion-modal accion-secundaria" onClick={manejaCerrar}>
						No
					</Button>
				</Modal.Footer>
			</Modal>
			<Link
				className="accion acciones accion-primaria enlace"
				to={"/editar/" + id}
			>
				Editar
			</Link>
			<button
				className="accion acciones accion-secundaria enlace"
				 onClick={manejaMostrar}
			>
				Eliminar
			</button>
		</>
	);
}
