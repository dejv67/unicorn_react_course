import {mdiTrashCanOutline} from "@mdi/js";
import Icon from "@mdi/react";
import {useState} from "react";

export default function RecipeDelete({ recipeId, onDelete, onError }) {
    const [deleteRecipeCall, setDeleteRecipeCall] = useState({
        state: 'inactive'
    });

    const handleDelete = async () => {
        if (deleteRecipeCall.state === 'pending')
            return

        setDeleteRecipeCall({ state: 'pending' });

        const res = await fetch(`http://localhost:3000/recipe/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: recipeId })
        });

        const data = await res.json();

        if (res.status >= 400) {
            setDeleteRecipeCall({ state: 'error', error: data });

            if (typeof onError === 'function')
                onError(data.errorMessage);

        } else {
            setDeleteRecipeCall({ state: 'success', data });

            if (typeof onDelete === 'function') {
                onDelete(recipeId);
            }
        }
    }

    return (
        <Icon
            onClick={handleDelete}
            path={mdiTrashCanOutline}
            style={{ cursor: 'pointer', color: 'red' }}
            size={0.8}
        ></Icon>
    )
}