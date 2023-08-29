import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
// import { useDataContext } from '../context/Contexts';

export const PlayQuiz = () => {
  const params = useParams();

  const navigate = useNavigate();
  const [questionList, setQuestionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [playername, setPlayerName] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: selectedOptions,
    onSubmit: async (values) => {
      let keys = Object.keys(values);
      // console.log(keys);
      // console.log(values);
      // for (let i = 0; i < keys.length; i++) {
      //   console.log(values[keys[i]]);
      // }

      // if any question is not selected then alert will be shown with question number
      for (let i = 0; i < keys.length; i++) {
        if (values[keys[i]] == '') {
          alert(`please select question number ${i + 1}`);
          return;
        }
      }

      // when data is sent then counting is done?
      let scoreCount = 0;
      for (let i = 0; i < questionList.length; i++) {
        let question = questionList[i];

        if (question.answer == values[`q${i + 1}`]) {
          // console.log(question.ans);
          // alert(values[`q${i + 1}`]);
          scoreCount++;
        }
      }

      if (scoreCount === 0) {
        alert('Sorry you lost the game try again');
      } else {
        let payload = {
          score: scoreCount,
          qid: params.quizId,
          player: playername,
        };
        let { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/save-score`,
          payload
        );
        navigate(`/scorepage/${params.quizId}/${params.quizName}`);
      }
    },
  });

  const getQuestionList = async () => {
    let { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/get-question-list?qid=${params.quizId}`
    );

    for (let i = 0; i < data.length; i++) {
      selectedOptions[`q${i + 1}`] = '';
    }

    setSelectedOptions(selectedOptions);

    setQuestionList(data);
  };

  const getPlayerName = () => {
    let askForname = true;

    while (askForname) {
      let input = prompt('Enter you name');
      if (input) {
        setPlayerName(input);
        askForname = false;
      }
    }
  };
  useEffect(() => {
    getQuestionList();
    getPlayerName();
  }, []);

  function backToQuizlist() {
    navigate(`/quizlist`);
  }

  return (
    <Wrapper>
      <div className="main-container">
        <div className="topic-heading">
          <h2>{params.quizName}</h2>
        </div>
        <div className="quiz-container">
          <form onSubmit={formik.handleSubmit}>
            {questionList.map((question, i) => {
              return (
                <div className="question-list" key={i}>
                  <p className="question">{question.question}</p>

                  <div className="option">
                    <input
                      name={`q${i + 1}`}
                      type="radio"
                      onChange={formik.handleChange}
                      value={question.option1}
                    />

                    <label htmlFor={`q${i + 1}`}> {question.option1}</label>
                  </div>

                  <div className="option">
                    <input
                      name={`q${i + 1}`}
                      type="radio"
                      onChange={formik.handleChange}
                      value={question.option2}
                    />

                    <label htmlFor={`q${i + 1}`}> {question.option2}</label>
                  </div>

                  <div className="option">
                    <input
                      name={`q${i + 1}`}
                      type="radio"
                      onChange={formik.handleChange}
                      value={question.option3}
                    />

                    <label htmlFor={`q${i + 1}`}> {question.option3}</label>
                  </div>

                  <div className="option">
                    <input
                      name={`q${i + 1}`}
                      type="radio"
                      onChange={formik.handleChange}
                      value={question.option4}
                    />

                    <label htmlFor={`q${i + 1}`}> {question.option4}</label>
                  </div>
                </div>
              );
            })}

            <div className="btn-div">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
        <button className="back-btn" onClick={backToQuizlist}>
          Go Back
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main-container {
    background-color: #868e96;
    border-top: 10px solid #212529;
    display: flex;
    align-item: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .quiz-container {
    width: 60%;
    // background-color: #fff;
    height: auto;
    margin: 5rem auto;
    padding: 3rem;
    // border: 2px solid #e9ecef;
    border-radius: 11px;
  }

  h2 {
    text-align: center;
    font-size: 6rem;
    font-family: cursive;
    margin-top: 2rem;
  }

  .question-list {
    overflow-wrap: break-word;
    background-color: #fff;
    border-radius: 9px;
    margin: 3rem;
    padding: 2rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
  .question {
    font-size: 2rem;
  }

  input[type='radio'] {
    width: 6%;
    height: 2rem;
    margin-left: 1rem;
  }

  .option {
    font-size: 2rem;
    margin: 1rem;
    border: 1px solid #000;
    border-radius: 9px;
    padding: 0.2rem;
  }

  .back-btn {
    position: absolute;
    top: 2rem;
    right: 3rem;
    border-radius: 9px;
    border: none;
    font-size: 2rem;
    padding: 1rem 2rem;
    transition: all 0.3s;
    background-color: #74b816;
  }

  .back-btn:hover {
    background-color: #fff;
    border-radius: 1px;
  }

  .btn-div {
    text-align: center;
  }

  .submit-btn {
    background-color: #74b816;
    width: 200px;
    height: 50px;
    font-size: 30px;
    border: none;
    transition: all 0.3s;
  }

  .submit-btn:hover {
    background-color: #888;
    border-radius: 9px;
  }
`;
