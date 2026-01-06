
import React, { useState, useEffect } from 'react';
import { Question, QuizState } from './types';
import { generateQuizQuestions, playTTS } from './services/geminiService';
import QuizCard from './components/QuizCard';
import Character from './components/Character';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    isFinished: false,
    userAnswers: []
  });

  const startNewQuiz = async () => {
    setLoading(true);
    const questions = await generateQuizQuestions();
    setQuiz({
      questions,
      currentIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: []
    });
    setLoading(false);
    playTTS("Welcome to the Cambridge English Fun Quest! Let's start!");
  };

  useEffect(() => {
    startNewQuiz();
  }, []);

  const handleAnswer = (index: number) => {
    const isCorrect = index === quiz.questions[quiz.currentIndex].correctIndex;
    
    // Play feedback sound (approximate)
    if (isCorrect) {
      playTTS("Well done! That is correct!");
    } else {
      playTTS("Try again next time!");
    }

    const nextIndex = quiz.currentIndex + 1;
    const isFinished = nextIndex >= quiz.questions.length;

    setTimeout(() => {
      setQuiz(prev => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentIndex: nextIndex,
        isFinished,
        userAnswers: [...prev.userAnswers, index]
      }));
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
        <div className="animate-bounce mb-4">
          <span className="text-6xl">🌟</span>
        </div>
        <h1 className="text-3xl font-bold text-blue-600">Loading your Adventure...</h1>
        <p className="text-gray-500 mt-2">Tom and Anna are getting ready!</p>
      </div>
    );
  }

  if (quiz.isFinished) {
    const percentage = (quiz.score / quiz.questions.length) * 100;
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-10 shadow-2xl border-4 border-green-200 max-w-lg w-full text-center bounce-in">
          <div className="text-6xl mb-6">🏆</div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Great Job!</h1>
          <p className="text-xl text-gray-600 mb-6">You finished the Fun Quest!</p>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-500 uppercase font-bold mb-1">Your Score</p>
            <p className="text-5xl font-black text-blue-600">
              {quiz.score} / {quiz.questions.length}
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <Character name="Tom" color="#fcd34d" size="sm" />
            <Character name="Anna" color="#f87171" size="sm" />
          </div>

          <button 
            onClick={startNewQuiz}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl text-2xl font-bold shadow-lg transition-all active:scale-95"
          >
            Play Again!
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[quiz.currentIndex];

  return (
    <div className="min-h-screen pb-12 pt-8 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border-2 border-blue-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <div>
            <h1 className="font-bold text-blue-900 text-lg md:text-xl">Cambridge English</h1>
            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Starters Quest</p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-gray-400 mb-1">PROGRESS</span>
          <div className="w-32 md:w-48 h-3 bg-gray-100 rounded-full overflow-hidden border">
            <div 
              className="h-full bg-green-400 transition-all duration-500"
              style={{ width: `${(quiz.currentIndex / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Area */}
      {currentQuestion && (
        <QuizCard 
          question={currentQuestion} 
          onAnswer={handleAnswer}
          selectedAnswer={null} 
        />
      )}

      {/* Decorative footer elements */}
      <div className="fixed bottom-0 left-0 p-4 hidden lg:block opacity-40">
        <Character name="Alex" color="#60a5fa" size="sm" />
      </div>
      <div className="fixed bottom-0 right-0 p-4 hidden lg:block opacity-40">
        <Character name="Sue" color="#34d399" size="sm" />
      </div>
    </div>
  );
};

export default App;
