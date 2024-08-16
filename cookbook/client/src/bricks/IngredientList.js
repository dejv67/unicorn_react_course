import React, { useState, useEffect } from "react";
import { mdiLoading } from '@mdi/js';
import styles from "../App.css";
import {Icon} from "@mdi/react";

const IngredientList = (props) => {
    const [ingredientListCall, setIngredientListCall] = useState({
        state: "pending",
    });

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

    const getIngredientNameById = (id, ingredients) => {
        const ingredientItem = ingredients.find(item => item.id === id);
        return ingredientItem ? ingredientItem.name : 'Unknown Ingredient';
    };

    function getIngredients() {
        switch (ingredientListCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <div>
                        <ul>
                            {props.ingredients.map(ingredient => (
                                <li key={ingredient.id}>
                                    <p>{getIngredientNameById(ingredient.id, ingredientListCall.data)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br />
                        <pre>{JSON.stringify(ingredientListCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }
    return(
        <div>
            {getIngredients()}
        </div>
    );
}

export default IngredientList;
