import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from '../App'
import uuidv4 from 'uuid/v4'

export default function RecipeEdit({ recipe }) {
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)
    
    function handleChange(changes){
        handleRecipeChange(recipe.id, { ...recipe, ...changes })
    }

    function handleIngredientChange(id, ingredient){
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients })
    }

    function handleIngredientAdd(){
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        }
        handleChange({ ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleIngredientDelete(id){
        handleChange({ 
            ingredients: recipe.ingredients.filter(i => i.id !== id)
        })
    }
    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-btn-container">
                <button 
                    className="btn recipe-edit__remove-btn"
                    onClick={() => handleRecipeSelect(undefined)}>
                        &times;
                </button>
            </div>
            <div className="recipe-edit__details-grid">
                <label 
                    htmlFor="name" 
                    className="edit-label">   
                    Name
                </label>
                <input 
                    type="text" 
                    className="recipe-edit__input" 
                    name="name" 
                    id="name"
                    maxLength={21}
                    value={recipe.name}
                    onChange={e => handleChange({ name: e.target.value })}
                />
                <label 
                    htmlFor="cook-time" 
                    className="edit-label">
                    Cook Time
                </label>
                <input 
                    type="text" 
                    className="recipe-edit__input" 
                    name="cook-time" 
                    id="cook-time"
                    value={recipe.cookTime}
                    maxLength={7}
                    onChange={e => handleChange({ cookTime: e.target.value })}
                />
                <label 
                    htmlFor="Servings" 
                    className="edit-label">
                    Servings
                </label>
                <input 
                    type="number" 
                    className="recipe-edit__input" 
                    min="1" 
                    name="servings" 
                    id="servings"
                    max={100}
                    value={recipe.servings}
                    onChange={e => handleChange({ servings: parseInt(e.target.value) || "" })}
                />
                <label 
                    htmlFor="instructions" 
                    className="edit-label">
                    Instructions
                </label>
                <textarea 
                    className="recipe-edit__input" 
                    name="instructions" 
                    id="instructions"
                    onChange={e => handleChange({ instructions: e.target.value })}
                    value={recipe.instructions}
                />
            </div>
            <br />
            <label className="edit-label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div className="edit-col-h">Name</div>
                <div className="edit-col-h">Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit 
                        key={ingredient.id}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                        ingredient={ingredient}
                    />
                ))}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button 
                    className="btn btn--primary"
                    onClick={() => handleIngredientAdd()}>
                        Add Ingredient
                </button>
            </div>
        </div>
    )
}
