import { Col, Modal, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

function RecipeAddForm({ show, setShow }) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{ ingredient: "", count: 1, unit: "" }],  // Pole pro více ingrediencí, prázdné stringy místo null
    });
    const [ingredientListCall, setIngredientListCall] = useState({
        state: "pending",
    });

    // Funkce pro resetování formuláře
    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            ingredients: [{ ingredient: "", count: 1, unit: "" }],  // Výchozí stav
        });
        setValidated(false);
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
            ingredients: [...formData.ingredients, { ingredient: "", count: 1, unit: "" }],
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
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        const payload = { ...formData };

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }
        console.log("Submitted form data:", payload);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nový recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Název</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadejte název receptu
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Postup</Form.Label>
                        <Form.Control
                            as="textarea" rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            maxLength={2500}
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
                                    required
                                >
                                    <option value="">Vyber ingredienci</option>
                                    {ingredientListCall.state === "success" &&
                                        ingredientListCall.data.map((ing) => (
                                            <option key={ing.id} value={ing.id}>
                                                {ing.name}
                                            </option>
                                        ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Vyberte ingredienci
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={3}>
                                <Form.Control
                                    type="number"
                                    value={ingredient.count}
                                    onChange={(e) => setField(index, "count", parseInt(e.target.value))}
                                    min={1}
                                    max={1000}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Povolený rozsah 1-1000
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md={3}>
                                <Form.Control
                                    type="text"
                                    value={ingredient.unit}
                                    onChange={(e) => setField(index, "unit", e.target.value)}
                                    maxLength={15}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadejte jednotku
                                </Form.Control.Feedback>
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
