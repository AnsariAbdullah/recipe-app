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
		document.getElementById('indian').classList.toggle('selected');
	}

	const Chinese = () => {
		setFilter(filter + '&cuisineType=chinese');
		document.getElementById('chinese').classList.toggle('selected');
	}

	const French = () => {
		setFilter(filter + '&cuisineType=french');
		document.getElementById('french').classList.toggle('selected');
	}

	const Breakfast = () => {
		setFilter(filter + '&mealType=breakfast');
		document.getElementById('breakfast').classList.toggle('selected');
	}

	const Lunch = () => {
		setFilter(filter + '&mealType=lunch');
		document.getElementById('lunch').classList.toggle('selected');
	}

	const Dinner = () => {
		setFilter(filter + '&mealType=dinner');
		document.getElementById('dinner').classList.toggle('selected');
	}

	const Snack = () => {
		setFilter(filter + '&mealType=snack');
		document.getElementById('snack').classList.toggle('selected');
	}

	const AlcoholFree = () => {
		setFilter(filter + '&health=alcohol-free');
		document.getElementById('alcohol-free').classList.toggle('selected');
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
						<span onClick={Indian} id="indian" className="checkbox">Indian</span>
						<span onClick={Chinese} id="chinese" className="checkbox">Chinese</span>
						<span onClick={French} id="french" className="checkbox">French</span>
					</div>
					<p className="filter-title">Meal Type</p>
					<div className="checkbox-wrapper">
						<span onClick={Breakfast} id="breakfast" className="checkbox">Breakfast</span>
						<span onClick={Lunch} id="lunch" className="checkbox">Lunch</span>
						<span onClick={Dinner} id="dinner" className="checkbox">Dinner</span>
						<span onClick={Snack} id="snack" className="checkbox">Snack</span>
					</div>

					<p className="filter-title">Other</p>
					<div className="checkbox-wrapper">
						<span onClick={AlcoholFree} id="alcohol-free" className="checkbox">Alcohol free</span>
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
