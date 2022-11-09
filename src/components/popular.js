import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

//Fetch Api and get data from the api
function Popular() {
  const [popular, setPopular] = useState([]);

  // call back function for data
  useEffect(() => {
    getPopular();
  }, []);

  //Call the API wait for the response
  const getPopular = async () => {
    // Do not fecth the api if it is in the local storage to avoid hitting daily api call limit

    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const API_KEY = process.env.REACT_APP_MY_API;
      const url = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`
      );
      const data = await url.json();

      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  };

  //display each recipes in the array

  return (
    <div>
      <Wrapper>
        <h3>Popular Recipes</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '3rem',
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  position: relative;

  img {
    margin: 2rem;
    border-radius: 2rem;
    opacity: 0.8;
    left: 3rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 1.2rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Popular;
