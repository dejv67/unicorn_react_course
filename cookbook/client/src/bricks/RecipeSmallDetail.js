import React, {useContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/RecipeSmallDetail.css'
import IngredientList from "./IngredientList";
import {Alert, Col, Row} from "react-bootstrap";
import {mdiPencilOutline} from "@mdi/js";
import Icon from "@mdi/react";
import RecipeDelete from "./RecipeDelete";
import UserContext from "../UserProvider";


const RecipeSmallDetail = (props) => {
    const { isAuthorized } = useContext(UserContext);
    const [deleteGradeError, setDeleteGradeError] = useState('');

    return (
        <div className="smallDetail">
            <div className="card">
                {deleteGradeError &&
                    <Alert variant="danger">
                        Error: { deleteGradeError }
                    </Alert>
                }
                <img src={props.imgUri} className="card-img-top" alt="recipeImage"/>
                <div className="card-body">
                    <Row className="d-flex justify-content-between align-items-center">
                        <Col>
                            <h5 className="card-title">{props.name}</h5>
                        </Col>
                        {isAuthorized && (
                            <Col xs="auto" className="d-flex justify-content-end">
                                <Icon
                                    size={0.8}
                                    path={mdiPencilOutline}
                                    style={{ color: 'orange', cursor: 'pointer' }}
                                    onClick={() => props.onEditRecipe(props)}
                                />
                                <RecipeDelete
                                    recipeId={props.recipeId}
                                    onDelete={(id) => props.onDeleteRecipe(id)}
                                    onError={(error) => setDeleteGradeError(error)}
                                />
                            </Col>
                        )}
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