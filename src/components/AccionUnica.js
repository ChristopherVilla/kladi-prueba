import React from "react";
import { Link } from "react-router-dom";

export function AccionUnica({objetivo,texto}) {
	return (
        <Link 
        className="accion accion-unica enlace" to={"/"+objetivo}>{texto}</Link>
    );
}
