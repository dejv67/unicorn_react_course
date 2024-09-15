import {Col, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import {mdiPlus} from "@mdi/js";


function RecipeAddForm({ show, setShow}){
    const [formData, setFormData] = useState({
        name:"",
        description: "",
        ingredient: null,
        count: 0,
        unit: "",
    });
    const [ingredientListCall, setIngredientListCall] = useState({
        state: "pending",
    });

    const handleClose = () => setShow(false);

    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientListCall({ state: "error", error: responseJson });
            } else {
                setIngredientListCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const payload = { ...formData };
        console.log("Submitted form data:", payload); // Log the form data
        //if (onFormSubmit) onFormSubmit(payload); // Call the callback
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Vytvoř recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Název</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name}
                            onChange={(e) => setField("name", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Postup</Form.Label>
                        <Form.Control
                            as="textarea" rows={4}
                            value={formData.description}
                            onChange={(e) => setField("description", e.target.value)}
                        />
                    </Form.Group>

                    <Row>
                        <Form.Group as={Col} md={8} lg={6} >
                            <Form.Label>Ingredience</Form.Label>
                            <Form.Select
                                value={formData.ingredient}
                                onChange={(e) => setField("ingredient", e.target.value)}
                            >
                                {ingredientListCall.state === "success" &&
                                    ingredientListCall.data.map((ingredient) => (
                                        <option key={ingredient.id} value={ingredient.id}>
                                            {ingredient.name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Počet</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.count}
                                onChange={(e) => setField("count", parseInt(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.unit}
                                onChange={(e) => setField("unit", e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        <Icon size={1} path={mdiPlus} />{" "}
                        Vytvořit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default RecipeAddForm