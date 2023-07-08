import { React } from "react";
import { useState } from "react";

const IngredientForm = ({ ingredients, setIngredients }) => {
  console.log('render', ingredients, setIngredients)
  const [name, setName] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const addIngredient = (e) => {
      e.preventDefault()
      console.log('pressed button', name, expiration)
      console.log('ingredients', ingredients)
      setIngredients([
          ...ingredients,
          {
              name,
              expiration
          }
      ])
  }
    
  return (
    <div>
      <form onSubmit={addIngredient}>
        <h2>Add Ingredient</h2>
        <div>
          <label htmlFor="name">Ingredient Name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="name of ingredient"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="expiration">Expiration Date</label>
          <input
            name="expiration"
            id="expiration"
            type="date"
            placeholder="password"
            required
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          />
        </div>
        <button>Add Ingredient</button>
      </form>
    </div>
  );
}

export default IngredientForm
