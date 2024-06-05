'use strict'

const cocktailDetailsContainer = document.querySelector(".cocktail-details");
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
    let ingredientsHtml = '<div class="ingredients-section"><h3>Ingredients</h3><ul>';

    // Loop through the possible ingredient fields
    for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`];
        if (ingredient) {
            ingredientsHtml += `<li>${ingredient}</li>`;
        } else {
            break;
        }
    }

    ingredientsHtml += '</ul></div>';
    //TODO: Fix the structure in order to look as design
    const html = `
    <div class="cocktail-detail">
        <img src="${data.strDrinkThumb}" alt="${data.strDrink}">
        <div>
            <h2>${data.strDrink}</h2>
            ${ingredientsHtml} <!-- Insert the ingredients HTML -->
            <div class="categories-section">
                <h3>Categories</h3>
                <p>${data.strCategory}</p>
            </div>
            <div class="glass-section">
                <h3>Glass</h3>
                <p>${data.strGlass}</p>
            </div>
            <div class="instructions-section">
                <h3>Instructions</h3>
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
    console.log('No cocktail ID found in localStorage');
}