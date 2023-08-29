import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { PlayQuiz } from './components/Playquiz';
import { ScorePage } from './components/ScorePage';
import { QuizList } from './components/QuizList';
import { FrontPage } from './components/FrontPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/quizlist" element={<QuizList />} />
          <Route path="/playQuiz/:quizId/:quizName" element={<PlayQuiz />} />
          <Route path="/scorepage/:quizId/:quizName" element={<ScorePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
