import React from 'react';
import style from './recipe.module.css'

const Recipe = (props) => {
	const { title, calories, image, ingredients, healthLabels } = props;
	return (
		<div className={style.recipe}>
			<h2>{title}</h2>
			<p>{calories}</p>
			<ol>
				{ingredients.map((ingredient, index) => (
					<li key={index}>{ingredient.text}</li>
				))}
			</ol>
			<div>
				{healthLabels.map((healthLabel, index) => (
					<span key={index} className={style.pills}>{healthLabel}</span>
				))}
			</div>
			<img src={image} alt={title} />
		</div>
	);
}
 
export default Recipe;