
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ModuleView from './pages/ModuleView';
// Placeholders for now, will implement next
import LessonView from './pages/LessonView';
import QuizView from './pages/QuizView';

// Temporary placeholders if files don't exist yet to avoid crash during build steps
const LessonPlaceholder = () => <div>Lesson View</div>;
const QuizPlaceholder = () => <div>Quiz View</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/:moduleId" element={<ModuleView />} />
        <Route path="/module/:moduleId/lesson/:lessonId" element={<LessonView />} />
        <Route path="/module/:moduleId/quiz" element={<QuizView />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
