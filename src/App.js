import React from 'react';
import './App.css';

const App = () => {
  const APP_ID = '94b6a2c0';

  const APP_KEY = '1666c7966f07762d398abb0b095245a2';

  const url = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  return (
    <div>
      <h1>Recipe Finder</h1>
    </div>
  );
};

export default App;
