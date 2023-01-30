import React from "react";
import ListaArticulos from "./components/ListaArticulos";
import CrearArticulo from "./components/CrearArticulo";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Pie } from "./components/Pie";
import VerArticulo from "./components/VerArticulo";
import EditarArticulo from "./components/EditaArticulo";

function App() {

	return (
		<Router>
			<div className="contenido">
				<Route exact path="/" component={ListaArticulos} />
				<Route
					exact
					path="/crear/"
					component={CrearArticulo}
				/>
				<Route
					exact
					path="/editar/:id"
					component={EditarArticulo}
				/>
				<Route exact path="/ver/:id" component={VerArticulo} />
			</div>
			<Pie />
		</Router>
	);
}

export default App;
