import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.scss';
import Header from './header'

// "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free";


const App = () => {
	const APP_ID = '3c6696ef';
	const APP_KEY = 'edc3892a05b4c235648d3f34cd64f41a';

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(0)

	useEffect(()=>{
		getRecipe();
		// console.log('useEffect run')
	}, [query, page])

	const getRecipe = async () => {
		// API using promises
		/* fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`)
		.then(response => {
			response.json()
		}) */

		// API using async-await
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${page}`)
		const data = await response.json();
		setRecipes(data.hits);
		console.log(data.hits);
	}

	// update search field
	const updateSearch = e => {
		setSearch(e.target.value)
	}

	// submit input data into search field
	const getSearch = e => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	}

	const previousPage =() => {
		setPage(page - 10);
		console.log('page ====> ', page);
	}


	const nextPage =() => {
		setPage(page + 10);
		console.log('page ====> ', page);
	}

	return(
		<div className="app">
			<Header />
			<form onSubmit={getSearch} className="search-form">
				<input
					className="search-bar"
					type="text"
					value={search}
					onChange={updateSearch}
				/>
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			<div className="recipes">
				{recipes.map((recipe, index)=>(
					<Recipe
						key={index}
						title={recipe.recipe.label}
						calories={recipe.recipe.calories}
						image={recipe.recipe.image}
						ingredients={recipe.recipe.ingredients}
					/>
				))}
			</div>
			{
				query ? 
				<div className="page">
					{page > 0 && <button onClick={previousPage}>Prev</button>}
					<button onClick={nextPage}>Next</button>
				</div>
				: <h3 className="placeholder">Search recipes</h3>
			}
		</div>
	)
}

export default App;
