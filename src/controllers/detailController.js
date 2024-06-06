'use strict'

const cocktailDetailsContainer = document.querySelector(".cocktail-container");
const loader = document.querySelector(".loader");

const fetchCocktailDetails = async function(id) {
    try {
        loader.style.display = 'block'; // Show the loader

        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();

        if (!res.ok || !data.drinks) {
            throw new Error('Failed to fetch cocktails details. Please try again later.');
        }

        renderCocktailDetails(data.drinks[0]);
    } catch (err) {
        alert(`Error: ${err.message}`);
    } finally {
        loader.style.display = 'none'; // Hide the loader
    }
}

//Function to dynamically create the HTML for rendering the Details page
const renderCocktailDetails = function (data) {
    let ingredientsHtml = '<div><h2 class="ingredients-heading">Ingredients</h2><ul class="ingredients-section">';

    // Loop through the possible ingredient fields and measures
    for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];

        if (ingredient && measure) {
            ingredientsHtml += `<p class="ingredient-item">${measure} ${ingredient}</p>`;
        } else {
            break;
        }
    }

    ingredientsHtml += '</ul></div>';

    const html = `
    <h1 class="cocktail-name">${data.strDrink}</h1>
    <div class="cocktail-detail">
        <div class="left-section">
            <img class="cocktail-img" src="${data.strDrinkThumb}" alt="${data.strDrink}">
            <div>
                <h2>Categories</h2>
                <p class="categories">${data.strCategory}</p>
            </div>
            <div>
                <h2>Glass</h2>
                <p class="glass">${data.strGlass}</p>
            </div>
        </div>
        <div class="right-section">
            ${ingredientsHtml} <!-- Insert the ingredients HTML -->
            <div class="instructions-section">
                <h2>Instructions</h2>
                <p>${data.strInstructions}</p>
            </div>
        </div>
    </div>
    `;

    cocktailDetailsContainer.insertAdjacentHTML('beforeend', html);
}

// Get the cocktail ID from localStorage
const cocktailId = localStorage.getItem('cocktailId');
if (cocktailId) {
    fetchCocktailDetails(cocktailId);
} else {
    alert('No cocktail ID found in localStorage');
    window.location.href = 'http://localhost:1234/';
}