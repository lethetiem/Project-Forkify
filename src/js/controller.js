import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot){
  module.hot.accept()
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //1.Loading recipe
    await model.loadRecipe(id);

    //2.Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage())
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)
