import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.scss';
import Header from './header'


const App = () => {
	const APP_ID = '3c6696ef';
	const APP_KEY = 'edc3892a05b4c235648d3f34cd64f41a';

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(0);
	const [filter, setFilter] = useState("");

	useEffect(()=>{
		getRecipe();
		// console.log('useEffect run')
	}, [query, page, filter])

	const getRecipe = async () => {
		// API using promises
		/* fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`)
		.then(response => {
			response.json()
		}) */

		// API using async-await
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${page}${filter}`);
		const data = await response.json();
		setRecipes(data.hits);
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

	// get previous page data
	const previousPage =() => {
		setPage(page - 10);
		console.log('page ====> ', page);
	}

	// get next page data
	const nextPage =() => {
		setPage(page + 10);
		console.log('page ====> ', page);
	}

	// clear search field
	const clearSearchFiled = () => {
		setSearch('');
	}

	const Indian = () => {
		setFilter(filter + '&cuisineType=indian');
	}

	const Chinese = () => {
		setFilter(filter + '&cuisineType=chinese');
	}

	const French = () => {
		setFilter(filter + '&cuisineType=french');
	}

	const Breakfast = () => {
		setFilter(filter + '&mealType=breakfast');
	}

	const Lunch = () => {
		setFilter(filter + '&mealType=lunch');
	}

	const Dinner = () => {
		setFilter(filter + '&mealType=dinner');
	}

	const Snack = () => {
		setFilter(filter + '&mealType=snack');
	}

	const AlcoholFree = () => {
		setFilter(filter + '&health=alcohol-free');
	}	

	const ClearFilter = () => {
		setFilter('');
	}


	return(
		<div className="app">
			<Header />
			{
				query && 
				<div className="filter">
					<p className="filter-title">Cuisine Type</p>
					<div className="checkbox-wrapper">
						<span onClick={Indian} className="checkbox">Indian</span>
						<span onClick={Chinese} className="checkbox">Chinese</span>
						<span onClick={French} className="checkbox">French</span>
					</div>
					<p className="filter-title">Meal Type</p>
					<div className="checkbox-wrapper">
						<span onClick={Breakfast} className="checkbox">Breakfast</span>
						<span onClick={Lunch} className="checkbox">Lunch</span>
						<span onClick={Dinner} className="checkbox">Dinner</span>
						<span onClick={Snack} className="checkbox">Snack</span>
					</div>

					<p className="filter-title">Other</p>
					<div className="checkbox-wrapper">
						<span onClick={AlcoholFree} className="checkbox">Alcohol free</span>
						<span onClick={ClearFilter} className="checkbox">Clear</span>
					</div>
				</div>
			}
			<form onSubmit={getSearch} className="search-form">
				<input
					className="search-bar"
					type="text"
					value={search}
					onChange={updateSearch}
				/>
				{search.length > 0 && <span onClick={clearSearchFiled} className="clear">X</span>}
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			{
				// when query hits and recipes show up
				query && recipes ? 
				<>
					<div className="recipes">
						{recipes.map((recipe, index)=>(
							<Recipe
								key={index}
								title={recipe.recipe.label}
								calories={recipe.recipe.calories}
								image={recipe.recipe.image}
								ingredients={recipe.recipe.ingredients}
								healthLabels={recipe.recipe.healthLabels}
							/>
						))}
					</div>
					<div className="page">
						{page > 0 && <button onClick={previousPage}>Prev</button>}
						<button onClick={nextPage}>Next</button>
					</div>
				</> 
				:
				// when query hits and recipes don't show up / mapping error
				query && !recipes ? 
				<h3 className="placeholder">Nothing in the selected category</h3>
				: 
				<h3 className="placeholder">Search recipes</h3>
			 }
		</div>
	)
}

export default App;
