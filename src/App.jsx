import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ModuleView from './pages/ModuleView';
import LessonView from './pages/LessonView';
import QuizView from './pages/QuizView';

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