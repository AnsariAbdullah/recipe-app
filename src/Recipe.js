import React from 'react';
import style from './recipe.module.css'

const Recipe = (props) => {
	const { title, calories, image, ingredients } = props;
	return (
		<div className={style.recipe}>
			<h1>{title}</h1>
			<p>{calories}</p>
			<ol>
				{ingredients.map((ingredient, index) => (
					<li key={index}>{ingredient.text}</li>
				))}
			</ol>
			<img src={image} alt={title} />
		</div>
	);
}
 
export default Recipe;