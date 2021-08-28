const doSearch = async () => {
    document.getElementById("spinner").classList.remove("d-none");
    document.getElementById('search-result').textContent = '';
    document.getElementById('meal-details').textContent = '';
    const searchText = document.getElementById('search-input').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    document.getElementById('search-input').value = '';
    const res = await fetch(url);
    const data = await res.json();

    displayResult(data.meals);

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayResult(data.meals))
}

const displayResult = meals => {
    document.getElementById("spinner").classList.add("d-none");
    const searchResult = document.getElementById('search-result');
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
            <div class="card" onclick="resultDetails('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}...[Read More]</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}

const resultDetails = async meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
    const res = await fetch(url);
    const data = await res.json();
    displayResultDetails(data.meals[0])
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayResultDetails(data.meals[0]))
}

const displayResultDetails = meal => {
    document.getElementById('meal-details').innerHTML = `
        <div class="col-md-6">
            <img src="${meal.strMealThumb}" class="img-fluid">
        </div>
        <div class="col-md-6">
            <h1> ${meal.strMeal} </h1>
            <h3> Instruction: </h3>
            <p> ${meal.strInstructions} </p>
        </div>
    `
}















