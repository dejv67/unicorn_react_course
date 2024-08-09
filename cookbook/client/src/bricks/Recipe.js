import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Recipe.css'


const Recipe = (props) => {
    return (
        <div className="card">
            <img src={props.imgUri} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
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