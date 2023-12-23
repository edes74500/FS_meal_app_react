import axios from "axios";
import React, { useEffect, useState } from "react";

const Error = ({ setSearchResults, setInputValue }) => {
  const [ingredients, setIngredients] = React.useState([]);
  const [shouldShuffle, setShouldShuffle] = useState(true);

  // Changed the argument to accept ingredient instead of ingredient.strIngredient
  const onClickHandler = (ingredient) => {
    setSearchResults(ingredient.strIngredient);
    setInputValue(ingredient.strIngredient);
  };

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return newArray;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        setIngredients(response.data.meals);
        console.log(ingredients); // Log the updated value directly from the response
        setShouldShuffle(true);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (shouldShuffle) {
      setIngredients((prevIngredients) => shuffleArray(prevIngredients));
      setShouldShuffle(false); // Reset the flag after shuffling
    }
  }, [shouldShuffle]);

  return (
    <div className="error-container">
      <h3>No meals found. Try another ingredient</h3>
      <ul>
        {ingredients.slice(0, 25).map((ingredient) => {
          return (
            <li>
              <button key={ingredient.strIngredient} onClick={() => onClickHandler(ingredient)}>
                {ingredient.strIngredient}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Error;
