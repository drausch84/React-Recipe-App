import React, { useContext } from 'react'
import IngredientList from './IngredientList'
import { RecipeContext } from '../App'

export default function Recipe(props) {
    const { handleRecipeDelete, handleRecipeSelect} = useContext(RecipeContext)
    const {
        id,
        name,
        cookTime,
        servings,
        instructions,
        ingredients,
    } = props
    return (
    <div className="recipe">
        <div className="recipe__header">
            <h3 className="recipe-name">{name}</h3>
            <div>
                <button 
                className="btn btn--primary mr-1"
                onClick={() => handleRecipeSelect(id)}
                >
                    Edit
                </button>
                <button 
                className="btn btn--danger"
                onClick={() => handleRecipeDelete(id)}
                >
                    Delete
                </button>
            </div>
        </div>
        <div className="recipe__row first-row">
            <span className="recipe-label">Cook Time:</span>
            <span className="recipe-value">{cookTime}</span>
        </div>
        <div className="recipe__row">
            <span className="recipe-label">Servings:</span>
            <span className="recipe-value">{servings}</span>
        </div>
        <div className="recipe__row">
            <span className="recipe-label">Instructions:</span>
            <div className="recipe-value recipe__instructions recipe-value--indented">{instructions}</div>
        </div>
        <div className="recipe__row"> 
            <span className="recipe-label">Ingredients:</span>
            <div className="recipe-value recipe-value--indented"> 
                <IngredientList ingredients={ingredients} />
            </div>
        </div>
    </div>
  )
}
