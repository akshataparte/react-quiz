import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import { NavLink, useNavigate } from 'react-router-dom';
export const FrontPage = () => {
  const navigate = useNavigate();
  const navigateToQuizlist = () => {
    navigate('/quizlist');
  };
  return (
    <Wrapper>
      <div className="main-container">
        <div className="center">
          <p className="person-one">
            Bobby:This lockdown is getting on my nerves; I'm tired of playing
            video games and want to do something exciting.
          </p>
          <p className="person-two">
            Jenny: Okay, calm down. I know what we can do for entertainment.
            Let's play QUIZBOX.
          </p>
          <button className="btn" onClick={navigateToQuizlist}>
            START QUIZ
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main-container {
    height: 100vh;
    width: 100vw;
    background-image: url('./images/home-image9.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background: opacity(1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 10px solid #008080;
  }
  .center {
    height: 60vh;
    width: 70vw;
    text-align: center;
    display: flex;
    gap: 3rem;
    flex-direction: column;
    padding: 3rem;
  }

  .person-one,
  .person-two {
    font-size: 3rem;
    font-weight: 600;
  }

  .btn {
    margin: 2rem auto;
    padding: 0.5rem 0.5rem;
    background-color: #11ffee00;
    border: none;
    transition: all 4s;
    border-radius: 9px;
    width: 28%;
    font-size: 2.5rem;
    font-weight: bold;
    // opacity: 50%;
    border: 3px solid #000;
    color: #000;
  }

  .btn:hover {
    background-color: #008080;
    border: none;
  }

  @media (max-width: 870px) {
    .center {
      padding: 1rem;
    }
  }

  @media (max-width: 762px) {
    .person-one,
    .person-two {
      font-size: 2.5rem;
    }

    .btn {
      padding: 0.5rem 0.5rem;
      width: 40%;
    }
  }

  @media (max-width: 550px) {
    .center {
      padding: 0.5rem;
      height: 60vh;
      width: 85vw;
    }
  }

  @media (max-width: 550px) {
    .center {
      padding: 0.5rem;
      height: 60vh;
      width: 90vw;
    }

    .btn {
      width: 60%;
    }
  }
`;
