import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/RecipeSmallDetail.css'
import IngredientList from "./IngredientList";
import {Col, Row} from "react-bootstrap";
import {mdiPencilOutline} from "@mdi/js";
import Icon from "@mdi/react";


const RecipeSmallDetail = (props) => {
    return (
        <div className="smallDetail">
            <div className="card">
                <img src={props.imgUri} className="card-img-top" alt="recipeImage"/>
                <div className="card-body">
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col>
                            <h5 className="card-title">{props.name}</h5>
                        </Col>
                        <Col xs="auto">
                            <Icon
                                size={0.8}
                                path={mdiPencilOutline}
                                style={{ color: 'orange', cursor: 'pointer' }}
                                onClick={() => props.onEditRecipe(props)}
                            />
                        </Col>
                    </Row>
                    <p className="card-text truncated-text">
                        {props.description}
                    </p>
                    <IngredientList ingredients = {props.ingredients} recipeId = {props.recipeId}/>
                </div>
            </div>
        </div>
    );
}

export default RecipeSmallDetail;