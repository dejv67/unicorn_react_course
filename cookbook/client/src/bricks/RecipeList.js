import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiMagnifyMinusOutline, mdiMagnifyPlusOutline } from "@mdi/js";
import RecipeBigDetail from "./RecipeBigDetail";
import RecipeSmallDetail from "./RecipeSmallDetail";
import './css/RecipeList.css'

const RecipeList = (props) => {
    const [viewType, setViewType] = useState("bigDetail");
    const isBigDetail = viewType === "bigDetail";

    function getRecipeList(recipeList, detailView) {
        return recipeList.map((recipe) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={recipe.id}>
                <div className="Recipe">
                    {detailView === "big" ? (
                        <RecipeBigDetail
                            classname={"Recipe"}
                            name={recipe.name}
                            description={recipe.description}
                            imgUri={recipe.imgUri}
                            ingredients={recipe.ingredients}
                        />
                    ) : (
                        <RecipeSmallDetail
                            classname={"Recipe"}
                            name={recipe.name}
                            description={recipe.description}
                            imgUri={recipe.imgUri}
                            ingredients={recipe.ingredients}
                        />
                    )}
                </div>
            </div>
        ));
    }

    return (
        <div>
            <Navbar style={{ backgroundColor: '#282c34' }}>
                <div className="container-fluid">
                    <Navbar.Brand style={{ color: 'white' }}>Recipes</Navbar.Brand>
                    <Button
                        style={{marginBottom: '30px'}}
                        onClick={() =>
                            setViewType((currentState) => {
                                if (currentState === "bigDetail") return "smallDetail";
                                else return "bigDetail";
                            })
                        }
                    >
                        <Icon size={1} path={isBigDetail ? mdiMagnifyMinusOutline : mdiMagnifyPlusOutline} />{" "}
                        {isBigDetail ? "Malý detail" : "Velký detail"}
                    </Button>
                </div>
            </Navbar>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {isBigDetail ? (
                        getRecipeList(props.recipeList, "big")
                    ) : (
                        getRecipeList(props.recipeList, "small")
                    )}
                </div>
            </div>
        </div>
    );
}


export default RecipeList;