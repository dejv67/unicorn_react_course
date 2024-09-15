import { Col, Modal, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

function RecipeAddForm({ show, setShow }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{ ingredient: "", count: 0, unit: "" }],  // Pole pro více ingrediencí, prázdné stringy místo null
    });
    const [ingredientListCall, setIngredientListCall] = useState({
        state: "pending",
    });

    // Funkce pro resetování formuláře
    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            ingredients: [{ ingredient: "", count: 0, unit: "" }],  // Výchozí stav
        });
    };

    const handleClose = () => {
        resetForm();  // Reset formuláře při zavření
        setShow(false);
    };

    const setField = (index, field, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index][field] = value;
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const handleAddIngredient = () => {
        setFormData((formData) => ({
            ...formData,
            ingredients: [...formData.ingredients, { ingredient: "", count: 0, unit: "" }],
        }));
    };

    const handleRemoveIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            const newIngredients = formData.ingredients.filter((_, i) => i !== index);
            setFormData({ ...formData, ingredients: newIngredients });
        }
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
        console.log("Submitted form data:", payload);
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
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Postup</Form.Label>
                        <Form.Control
                            as="textarea" rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Form.Group>

                    <Row className="mb-2">
                        <Col md={6} lg={4}><Form.Label>Ingredience</Form.Label></Col>
                        <Col md={3}><Form.Label>Počet</Form.Label></Col>
                        <Col md={3}><Form.Label>Jednotka</Form.Label></Col>
                    </Row>

                    {formData.ingredients.map((ingredient, index) => (
                        <Row key={index} className="mb-3">
                            <Form.Group as={Col} md={6} lg={4}>
                                <Form.Select
                                    value={ingredient.ingredient || ""}
                                    onChange={(e) => setField(index, "ingredient", e.target.value)}
                                >
                                    <option value="">Vyber ingredienci</option>
                                    {ingredientListCall.state === "success" &&
                                        ingredientListCall.data.map((ing) => (
                                            <option key={ing.id} value={ing.id}>
                                                {ing.name}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md={3}>
                                <Form.Control
                                    type="number"
                                    value={ingredient.count}
                                    onChange={(e) => setField(index, "count", parseInt(e.target.value))}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={3}>
                                <Form.Control
                                    type="text"
                                    value={ingredient.unit}
                                    onChange={(e) => setField(index, "unit", e.target.value)}
                                />
                            </Form.Group>

                            <Col md={12} lg={2} className="d-flex align-items-center">
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveIngredient(index)}
                                    className="ms-2"
                                    disabled={formData.ingredients.length === 1}
                                >
                                    <Icon size={1} path={mdiMinus} />
                                </Button>
                            </Col>
                        </Row>
                    ))}

                    <Button variant="primary" onClick={handleAddIngredient}>
                        <Icon size={1} path={mdiPlus} /> Přidat ingredienci
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit">
                        <Icon size={1} path={mdiPlus} />{" "}
                        Vytvořit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default RecipeAddForm;
