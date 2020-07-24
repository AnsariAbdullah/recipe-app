import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

// "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free";


const App = () => {
	const APP_ID = '3c6696ef';
	const APP_KEY = 'edc3892a05b4c235648d3f34cd64f41a';

	const [recipes, setRecipes] = useState([]);

	useEffect(()=>{
		// getRecipe();
	}, [])

	const getRecipe = async () => {
		// API using promises
		/* fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`)
		.then(response => {
			response.json()
		}) */

		// API using async-await
		const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`)
		const data = await response.json();
		setRecipes(data.hits)

	}

	return(
		<div>
			<form className="search-form">
				<input className="search-bar" type="text"/>
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			{recipes.map((recipe, index)=>(
				<Recipe
					key={index}
					title={recipe.recipe.label}
					calories={recipe.recipe.calories}
					image={recipe.recipe.image}
				/>
			))}
		</div>
	)
}

export default App;
