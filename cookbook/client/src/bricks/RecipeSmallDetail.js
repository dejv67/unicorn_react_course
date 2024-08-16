import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/RecipeSmallDetail.css'


const RecipeSmallDetail = (props) => {
    return (
        <div className="smallDetail">
            <div className="card">
                <img src={props.imgUri} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text truncated-text" title={props.description}>
                        {props.description}
                    </p>
                    {/*<ul>*/}
                    {/*    {props.ingredients.map((item, index) => (*/}
                    {/*        <li key={index}>{item.id}</li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </div>
            </div>
        </div>
    );
}

export default RecipeSmallDetail;