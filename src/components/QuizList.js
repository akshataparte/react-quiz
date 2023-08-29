import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GrScorecard } from 'react-icons/gr';

export const QuizList = () => {
  let [quizList, setQuizList] = useState([]);
  let navigate = useNavigate();

  const getQuizList = async () => {
    let { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/get-quizlist`
    );
    setQuizList(data);
  };
  useEffect(() => {
    getQuizList();
  }, []);

  const goTOquiz = (id, name) => {
    navigate(`/playQuiz/${id}/${name}`);
  };

  const goToScorePage = (quizId, name) => {
    navigate(`/scorepage/${quizId}/${name}`);
  };

  function goBackHome() {
    navigate('/');
  }
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>Quiz List</h2>
        </div>

        <div className="types-list">
          <ul className="subject-list">
            {quizList.map((quizObj) => {
              console.log(quizObj.id);
              return (
                <div key={quizObj.id}>
                  <div className="box">
                    <li
                      className="list"
                      // key={quizObj.id}
                      onClick={() => goTOquiz(quizObj.id, quizObj.name)}
                    >
                      {quizObj.name}
                    </li>
                    <li>
                      <p>
                        <GrScorecard
                          className="score-btn"
                          onClick={() => {
                            goToScorePage(quizObj.id, quizObj.name);
                          }}
                        />
                      </p>
                    </li>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>

        <div>
          <button className="btn" onClick={goBackHome}>
            Go Back
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
    position: relative;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e6e6fa;
    font-family: 'Mukta', sans-serif;
    flex-direction: column;
    border-top: 10px solid #662d91;
  }

  h2 {
    font-size: 7rem;
    margin-bottom: 3rem;
    color: #662d91;
  }

  .types-list {
    height: 70vh;
    background-color: #fff;
    border-radius: 9px;
    width: 45vw;
    overflow-y: scroll;
    padding: 3rem;
    opacity: 0.5;
  }

  .list {
    list-style: none;
    font-size: 2.5rem;
    border-bottom: 1px solid #000;
    padding: 0.8rem;
    text-align: center;
    width: 90%;
    margin: auto;

    font-weight: 600;
  }

  .list:hover {
    color: #800080;
  }

  .subject-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    list-style-type: none;
  }

  .box {
    display: flex;
    flex-direction: row;
    align-item: center;
    justify-content: center;
  }

  .score-btn {
    font-size: 3rem;
    color: #000;
  }
  .btn {
    position: absolute;
    top: 20px;
    right: 30px;
    padding: 12px 28px;
    font-size: 20px;
    background-color: #662d91;
    color: #fff;
    border: none;
    border-radius: 9px;
    transition: all 0.3s;
  }

  .btn:hover {
    border-radius: 1px !important;
  }

  @media (max-width: 760px) {
    .types-list {
      width: 65vw;
    }

    h2 {
      font-size: 5rem;
    }
  }

  @media (max-width: 550px) {
    .btn {
      position: static;
      margin-top:5px;
    }

    .container {
    
      display: flex;
      align-items: center;
      justify-content: center;
  }

  @media (max-width: 478px){
    subject-list{
  width:95vw;
}
  }
`;
