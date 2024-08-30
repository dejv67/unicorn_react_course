import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import styles from "../App.css";
import RecipeList from "../bricks/RecipeList";

function Recipes() {
    const [recipeListCall, setRecipeListCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRecipeListCall({ state: "error", error: responseJson });
            } else {
                setRecipeListCall({ state: "success", data: responseJson });
            }
        }).catch(error => {setRecipeListCall({ state: "error", error: error })});
    }, []);

    function getRecipes() {
        switch (recipeListCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <>
                        <RecipeList recipeList={recipeListCall.data} />
                    </>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br />
                        <pre>{JSON.stringify(recipeListCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return(
        <div>
            {getRecipes()}
        </div>
    )
}

export default Recipes;