import React, { useState, useMemo } from "react";
import RecipeBigDetail from "./RecipeBigDetail";
import RecipeSmallDetail from "./RecipeSmallDetail";

import './css/RecipeList.css'

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import {mdiMagnifyMinusOutline, mdiMagnifyPlusOutline, mdiMagnify, mdiPlus} from "@mdi/js";

const RecipeList = (props) => {
    const [viewType, setViewType] = useState("smallDetail");
    const isBigDetail = viewType === "bigDetail";
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipeList = useMemo(() => {
        return props.recipeList.filter((item) => {
            return (
                item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    },[searchBy, props.recipeList]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    function getRecipeList(recipeList, detailView) {
        return recipeList.map((recipe) => (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4" key={recipe.id}>
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
            <Navbar collapseOnSelect expand="sm" style={{ backgroundColor: '#282c34', marginBottom: '25px' }}>
                <div className="container-fluid">
                    <Navbar.Brand style={{ color: 'white' }}>Recipes</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse style={{ justifyContent: "right" }}>
                        <div>
                            <Form className="d-flex" onSubmit={handleSearch}>
                                <Form.Control
                                    id={"searchInput"}
                                    style={{ maxWidth: "200px" }}
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={handleSearchDelete}
                                />
                                <Button
                                    style={{ marginRight: "15px" }}
                                    variant="outline-success"
                                    type="submit"
                                >
                                    <Icon size={1} path={mdiMagnify} />
                                </Button>
                                <Button
                                    className={"d-none d-md-block"}
                                    style={{ marginRight: "15px" }}
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
                                <Button
                                    style={{marginRight: "15px"}}
                                    variant={"light"}
                                    type="submit"
                                >
                                    <Icon size={1} path={mdiPlus}/>{" "}
                                    <span className="hide-text-on-small"> Vytvořit recept</span>
                                </Button>
                            </Form>
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {isBigDetail ? (
                        getRecipeList(filteredRecipeList, "big")
                    ) : (
                        getRecipeList(filteredRecipeList, "small")
                    )}
                </div>
            </div>
        </div>
    );
}


export default RecipeList;