import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ meal }) => {
  const [mealDetails, setMealDetails] = useState({});

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`).then((res) => {
      setMealDetails(res.data.meals[0]);
    });
  }, []);

  return (
    <div className="card-container">
      <div className="info-container">
        <h2>{meal.strMeal}</h2>
        <h3>ingredients</h3>
        <ul>
          {Object.entries(mealDetails)
            .map((key, index) => {
              if (mealDetails[`strIngredient${index}`]) {
                return (
                  <li key={index}>
                    {mealDetails[`strIngredient${index}`]} : {mealDetails[`strMeasure${index}`]}
                  </li>
                );
              }

              return null;
            })
            .slice(0, 8)}
        </ul>
        <a href={mealDetails.strSource} target="_blank" rel="noopener noreferrer">
          Discover the recipe
        </a>
      </div>
      <div className="img-container">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </div>
    </div>
  );
};

export default Card;
