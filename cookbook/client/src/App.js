import './App.css';
import data from './bricks/mockup';
import RecipeList from './bricks/RecipeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@mdi/react';  // Ensure you use a named import
import { mdiBookOpenVariant } from '@mdi/js';

function App() {
    return (
        <div className="App">
            {/* Add className to Icon for styling */}
            <h1 className="App-h1">
                <Icon className="mdi" path={mdiBookOpenVariant} size={2} color="white" />
                David’s Cookbook
            </h1>
            <RecipeList recipeList={data} />
        </div>
    );
}

export default App;
