import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/RecipeSmallDetail.css'
import IngredientList from "./IngredientList";


const RecipeSmallDetail = (props) => {
    return (
        <div className="smallDetail">
            <div className="card">
                <img src={props.imgUri} className="card-img-top" alt="recipeImage"/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
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