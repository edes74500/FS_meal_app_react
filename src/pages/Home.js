import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Home = () => {
  const [meals, setMeals] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState("beef");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // Used template literals to insert searchResults into the URL
        const res = await axios.get(
          `${searchResults ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchResults}` : "www.themealdb.com/api/json/v1/1/random.php"}`
        );
        setMeals(res.data.meals);
      } catch (error) {
        console.error("AxiosError:", error);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => setLoading(false), 1000);
    fetchData();
  }, [searchResults]);

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchResults(inputValue);
    setInputValue("");
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Find you next meal</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            type="text"
            placeholder="Type an ingredient and find you next meal !"
            value={inputValue}
            autofocus
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* <button type="submit">search</button> */}
        </form>
      </div>
      <div className="cards-container">
        {loading ? (
          <Loading />
        ) : meals ? (
          <>
            {meals.map((meal) => (
              <Card key={meal.idMeal} meal={meal} />
            ))}
          </>
        ) : (
          <Error setSearchResults={setSearchResults} setInputValue={setInputValue} />
        )}
      </div>
    </div>
  );
};

export default Home;
