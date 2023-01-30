import React from "react";
import { Link } from "react-router-dom";

export function Navegacion({ objetivo, }) {
	return (
		<Link className="navegacion" to={"/" + objetivo}>
			<img src="/img/navegacion.png" alt="regresar" />
		</Link>
	);
}
