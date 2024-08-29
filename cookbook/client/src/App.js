import { useState, useEffect } from "react";
import styles from './App.css';
import RecipeList from './bricks/RecipeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@mdi/react';  // Ensure you use a named import
import { mdiBookOpenVariant, mdiLoading } from '@mdi/js';

function App() {
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

    return (
        <div className="App">
            {/* Add className to Icon for styling */}
            <h1 className="App-h1">
                <Icon className="mdi" path={mdiBookOpenVariant} size={2} color="white" />
                David’s Cookbook
            </h1>
            {getRecipes()}
        </div>
    );
}

export default App;
