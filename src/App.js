import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
import Popular from './components/popular';
import Navbar from './components/Navbar';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  async function getRecipes() {
    var result = await Axios.get(url);
    console.log(result.data);
  }
  getRecipes({ query });

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert('No food with such name');
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery('');
      setAlert('');
    } else {
      setAlert('Please fill the form');
    }
  };

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App myStyle">
      <Navbar />

      <h1>Recipe Finder</h1>

      <form onSubmit={onSubmit} className="search-form">
        {alert !== '' && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Search Food"
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>

      <div className="popular-recipes">
        <Popular />
      </div>
    </div>
  );
}

export default App;
