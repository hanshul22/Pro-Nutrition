// App.js
import React, { useState } from 'react';
import FoodBox from './components/FoodBox';
import Search from './components/Search';
import './App.css'
import data from './components/FoodData';

const App = () => {
  const [foods, setFoods] = useState(data);
  const [selectedFoods, setSelectedFoods] = useState([]);
  
  const handleAddFood = (food, quantity) => {
    const existingFoodIndex = selectedFoods.findIndex((item) => item.id === food.id);
    
    if (existingFoodIndex !== -1) {
      const updatedSelectedFoods = [...selectedFoods];
      updatedSelectedFoods[existingFoodIndex].quantity += quantity;
      updatedSelectedFoods[existingFoodIndex].totalCalories += food.cal * quantity;
      setSelectedFoods(updatedSelectedFoods);
    } else {
      const newSelectedFood = {
        id: food.id,
        name: food.name,
        quantity,
        totalCalories: food.cal * quantity,
      };
      setSelectedFoods([...selectedFoods, newSelectedFood]);
    }
  };

  const handleResetFood = (foodId) => {
    const updatedSelectedFoods = selectedFoods.map((food) => {
      if (food.id === foodId) {
        return {
          ...food,
          quantity: 0,
          totalCalories: 0,
        };
      }
      return food;
    });
    setSelectedFoods(updatedSelectedFoods);
  };

  const filterFoods = (searchText) => {
    const filteredFoods = data.filter((food) => food.name.toLowerCase().includes(searchText.toLowerCase()));
    setFoods(filteredFoods);
  };

  return (
    <>
    <div className="search">
      <Search onSearch={filterFoods} />
    </div>
    <div className="App">
      <div className="food-container">
        {foods.map((food) => (
          <FoodBox
            key={food.id}
            food={food}
            onAddFood={handleAddFood}
          />
        ))}
      </div>
      <div className="selected-foods">
        <h2>Selected Foods</h2>
        <ul>
          {selectedFoods.map((selectedFood) => (
            <li key={selectedFood.id}>
              {`${selectedFood.quantity} ${selectedFood.name} = ${selectedFood.totalCalories} cal `}
              <button onClick={() => handleResetFood(selectedFood.id)}>Reset Quantity</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default App;
