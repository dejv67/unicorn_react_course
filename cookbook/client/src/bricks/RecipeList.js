import Recipe from "./Recipe";
import './css/RecipeList.css'

const RecipeList = (props) => {

    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={recipe.id}>
                <div className="Recipe">
                    <Recipe
                        classname={"Recipe"}
                        name={recipe.name}
                        description={recipe.description}
                        imgUri={recipe.imgUri}
                        ingredients={recipe.ingredients}
                    />
                </div>
            </div>
        ));
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                {getRecipeList(props.recipeList)}
            </div>
        </div>
    );
}


export default RecipeList;