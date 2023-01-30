import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
export function Cabecera({ Titulo }) {
	return (
		<Navbar className="cabecera">
			<Container className="justify-content-center flex-column">
				<Navbar.Brand className="nombre-Empresa">
					Ferremercado SA de CV
				</Navbar.Brand>
				<Navbar.Brand className="titulo-Pantalla">
					{Titulo}
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
