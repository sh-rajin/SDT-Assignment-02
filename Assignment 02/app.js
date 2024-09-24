
const loadAllMeal = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayProduct(data.meals);
        });
};

const displayProduct = (meals) => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = ''; 

    if (meals && meals.length > 0) {
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.className = 'card bg-secondary-subtle';
    
            div.innerHTML = `
                <img class="card-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h5 class="text-primary-emphasis">Meal Name: ${meal.strMeal}</h5>
                <h6>Meal Id: ${meal.idMeal}</h6>
                <a href="${meal.strYoutube}" target="_blank"><i class="fa-brands fa-youtube fs-2" style="color: #f00000;"></i></a>
                <button class="btn btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="Details(${meal.idMeal})">Details</button>
                <button class="btn btn-primary mb-2" onclick="addToCart(${meal.idMeal})">Add to Cart</button>
            `;
    
            mealContainer.appendChild(div);
        });
    } 
    else {
        mealContainer.innerHTML = '<h2 class="no-found">No Meals Found!</h2>';
    }
};

const Details = (mealId) => {
    let modal = document.getElementById('modal-body');

    modal.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
       .then(res => res.json())
       .then(data => {
            const meal = data.meals[0];

            const div = document.createElement('div');
            div.className = 'modal-notify text-center';
            div.innerHTML = `
                <img class="cart-img cart-item-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h5 class="text-danger">Meal Name: ${meal.strMeal}</h5>
                <h5>Meal Id: ${mealId}</h5>
                <h5>Category: ${meal.strCategory}</h5>
                <p>Description: ${meal.strInstructions.slice(0,100)}</p>
            `;

            modal.appendChild(div);
       });
}
const handleSearch = () => {
    let inputvalue = document.getElementById('search-input').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`)
        .then(res => res.json())
        .then(data => {
            displayProduct(data.meals)
        });
        document.getElementById('search-input').value = '';
};



const addToCart = (mealId) => {
    const cart = document.getElementById('cart');
    let cartCount = parseInt(document.getElementById('count').innerText);
    if (cartCount >= 11){
        alert("Cart is full!");

    }
    else{
        cartCount+=1;
    document.getElementById('count').innerText = cartCount;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const meal = data.meals[0];

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <hr class="border border-white border-2 opacity-75 ">
                <img class="cart-img cart-item-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h5>Meal Name: ${meal.strMeal}</h5>
                <h6>Meal Id: ${mealId}</h6>
                
            `;

            cart.appendChild(div);
        });
    }
    
};


loadAllMeal();
