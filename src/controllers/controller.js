'use strict'

const cocktailsContainer = document.querySelector(".cocktails");
const loader = document.querySelector(".loader");

const showCocktails = async function() {
    try {
        loader.style.display = 'block'; // Show the loader

        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.message}`)
        
        data.drinks.forEach(element => {
            renderCocktail(element);
        });

    } catch (err) {
        alert(err);
    } finally {
        loader.style.display = 'none'; // Hide the loader
    }
}

showCocktails();

//Function to render all the cocktail from the API
const renderCocktail = function (data) {
    const html = `
    <div class="cocktail-item" data-id="${data.idDrink}">
        <img src="${data.strDrinkThumb}" alt="${data.strDrink}">
        <p>${data.strDrink}</p>
    </div>
    `;

    cocktailsContainer.insertAdjacentHTML('beforeend', html);
};

// Adding event listener to the parent element for event delegation
cocktailsContainer.addEventListener('click', function(e) {
    const clickedItem = e.target.closest('.cocktail-item');

    if (clickedItem) {
        const id = clickedItem.getAttribute('data-id');
        // Store the ID in localStorage
        localStorage.setItem('cocktailId', id);
        // Redirect to the detail page
        window.location.href = 'http://localhost:1234/details.html';
    }
});