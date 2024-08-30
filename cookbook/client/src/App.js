import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@mdi/react';  // Ensure you use a named import
import { mdiBookOpenVariant } from '@mdi/js';
import {Outlet, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function App() {
    let navigate = useNavigate();
    return (
        <div className="App">
            <Navbar
                fixed="top"
                expand={"sm"}
                className="mb-3"
                bg="dark"
                variant="dark"
            >
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <Icon className="mdi" path={mdiBookOpenVariant} size={1} color="white"/>
                        David’s Cookbook
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`}/>
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link onClick={() => navigate("/recipes")}>
                                    Recepty
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate("/ingredients")}>
                                    Ingredience
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <main className="custom-padding-top">
                <Outlet/>
            </main>
        </div>
    );
}

export default App;
