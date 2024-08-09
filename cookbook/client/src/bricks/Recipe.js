import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Recipe.css'


const Recipe = (props) => {
    return (
        <div class="card">
            <img src={props.imgUri} class="card-img-top"/>
                <div class="card-body">
                    <h5 class="card-title">{props.name}</h5>
                    <p class="card-text">{props.description}</p>
                    {/*<ul>*/}
                    {/*    {props.ingredients.map((item, index) => (*/}
                    {/*        <li key={index}>{item.id}</li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </div>
        </div>
    );
}

export default Recipe;