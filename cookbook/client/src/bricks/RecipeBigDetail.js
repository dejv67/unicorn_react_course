import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/RecipeBigDetail.css'


const RecipeBigDetail = (props) => {
    return (
        <div className="bigDetail">
            <div className="card">
                <img src={props.imgUri} className="card-img-top" alt="recipeImage"/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeBigDetail;