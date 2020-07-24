import React from 'react';
import style from './recipe.module.css'

const Recipe = (props) => {
	const { title, calories, image, ingredients, healthLabels } = props;
	return (
		<div className={style.recipe}>
			<p className={style.title}>{title}</p>
			<p className={style.calorieCount}>Calories: {Math.floor(calories)}</p>
			<ul className={style.list}>
				{ingredients.map((ingredient, index) => (
					<li key={index} className={style.listItems}>{ingredient.text}</li>
				))}
			</ul>
			<div className={style.pillsWrapper}>
				{healthLabels.map((healthLabel, index) => (
					<span key={index} className={style.pills}>{healthLabel}</span>
				))}
			</div>
			<img src={image} alt={title} />
		</div>
	);
}
 
export default Recipe;