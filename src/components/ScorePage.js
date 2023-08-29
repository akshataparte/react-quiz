import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../styles/Button';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export const ScorePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  let [scoreData, setScoreData] = useState({});
  let [quizName, setQuizName] = useState('');
  let [total, setTotal] = useState();

  const getQuizScore = async () => {
    // alert(JSON.stringify(params));
    let { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/get-score?qid=${params.quizId}`
    );

    setQuizName(params.quizName);
    setScoreData(data.scoreList);
    setTotal(data.total);
  };

  useEffect(() => {
    getQuizScore();
  }, []);

  function backToQuizlist() {
    navigate(`/quizlist`);
  }

  return (
    // <Wrapper>

    <Wrapper>
      <div className="hi">
        <p className="heading">ScorePage</p>

        <div className="k">
          {scoreData.length &&
            scoreData.map((score, i) => {
              return (
                <div className="score-box" key={i}>
                  <p>{score.player}</p>
                  <p>{`${score.score}/10`}</p>
                </div>
              );
            })}
        </div>

        <div>
          <button className="back-button" onClick={backToQuizlist}>
            Back To Quizlist
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hi {
    border-top: 1rem solid grey;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    gap: 2rem;
    font-size: 3rem;
    flex-direction: column;
    position: relative;
    background-color: #f8f9fa;
  }
  .heading {
    position: absolute;
    top: 2rem;
    margin-bottom: 2rem;
    font-family: 'Foldit', cursive;
    font-size: 6rem;
  }

  .score-box {
    display: flex;
    width: 90%;
    background-color: pink;
    margin: 0 auto;
    justify-content: space-between;
    padding: 0 1rem;
    transition: all 0.2s ease-in-out;
    border-radius: 9px;
  }

  .score-box:hover {
    border-radius: 1px !important;
    padding: 1rem 2rem;
    opacity: 0.9;
  }

  .k {
    border: 2px solid #000;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 80vh;
    width: 50vw;
    padding: 1rem;
    overflow-y: scroll;
    margin-top: 8rem;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }

  .score-box:nth-of-type(odd) {
    background-color: #adb5bd;
  }

  .score-box:nth-of-type(even) {
    background-color: #e9ecef;
  }

  .back-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 1rem 3rem;
    font-size: 2rem;
    background-color: #94d82d;
    border: none;
    border-radius: 9px;
    transition: all 0.3s;
  }

  .back-button:hover {
    background-color: #a9e34b;
    border-radius: 1px !important;
  }
`;
