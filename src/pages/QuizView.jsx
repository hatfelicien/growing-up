
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizView() {
    const { moduleId } = useParams();
    const [module, setModule] = useState(null);

    // State to hold shuffled content
    const [quizData, setQuizData] = useState(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Initialize quiz with shuffling
    useEffect(() => {
        const loadModule = async () => {
            const modules = await api.getModules();
            const found = modules.find(m => m.id === moduleId);
            setModule(found);
        };
        loadModule();
    }, [moduleId]);

    useEffect(() => {
        if (module?.quiz) {
            // 1. Shuffle Questions
            const shuffledQuestions = [...module.quiz.questions]
                .sort(() => Math.random() - 0.5)
                .map(q => {
                    // 2. Shuffle Options for each question
                    // We need to track where the correct answer goes
                    const originalCorrectText = q.options[q.correct];
                    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
                    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);

                    return {
                        ...q,
                        options: shuffledOptions,
                        correct: newCorrectIndex
                    };
                });

            setQuizData(shuffledQuestions);
        }
    }, [moduleId]); // Re-run if module changes

    if (!module?.quiz) return <Layout><div className="text-center">No quiz available for this module.</div></Layout>;
    if (!quizData) return <Layout><div className="text-center">Loading quiz...</div></Layout>;

    const question = quizData[currentQ];

    const handleAnswer = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === question.correct) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentQ < quizData.length - 1) {
                setCurrentQ(c => c + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    if (showResult) {
        return (
            <Layout>
                <div className="text-center" style={{ padding: '2rem 0' }}>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ fontSize: '4rem', marginBottom: '1rem' }}
                    >
                        🎉
                    </motion.div>
                    <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Great Job!</h2>
                    <p className="mb-4">You scored {score} out of {quizData.length}</p>

                    <Link to={`/module/${moduleId}`} className="btn btn-primary">
                        Back to Module
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-4">
                <Link to={`/module/${moduleId}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    &times; Cancel Quiz
                </Link>
            </div>

            <div className="card">
                <div className="mb-2" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                    Question {currentQ + 1} of {quizData.length}
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                    {question.question}
                </h3>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {question.options.map((opt, idx) => {
                        let bg = 'var(--surface-muted)';
                        let icon = null;

                        if (isAnswered) {
                            if (idx === question.correct) {
                                bg = 'var(--success)';
                                icon = <CheckCircle size={20} color="white" />;
                            } else if (idx === selectedOption) {
                                bg = 'var(--error)';
                                icon = <XCircle size={20} color="white" />;
                            } else {
                                bg = 'var(--surface-muted)'; // Fade others?
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={isAnswered}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: bg,
                                    color: isAnswered && (idx === question.correct || idx === selectedOption) ? 'white' : 'var(--text-main)',
                                    textAlign: 'left',
                                    fontSize: '1rem',
                                    cursor: isAnswered ? 'default' : 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'background 0.2s'
                                }}
                            >
                                {opt}
                                {icon}
                            </button>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
