
import React, { useEffect } from 'react';
import { Question, QuestionType } from '../types';
import Character from './Character';
import { playTTS } from '../services/geminiService';

interface QuizCardProps {
  question: Question;
  onAnswer: (index: number) => void;
  selectedAnswer: number | null;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, selectedAnswer }) => {
  
  useEffect(() => {
    // Automatically play the instruction when the question changes
    const textToSpeak = `${question.character} says: ${question.instruction}. ${question.questionText}`;
    playTTS(textToSpeak, question.character === 'Tom' || question.character === 'Alex' ? 'Kore' : 'Puck');
  }, [question.id]);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-blue-200 max-w-2xl w-full bounce-in">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <Character name={question.character} color={question.characterAvatar || '#fcd34d'} />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg text-gray-500 font-bold mb-1 uppercase tracking-wider">
            {question.type === QuestionType.LISTENING ? '🔊 Listening' : '📝 Question'}
          </h2>
          <p className="text-2xl md:text-3xl text-blue-900 font-bold leading-tight">
            {question.questionText}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`
              p-6 rounded-2xl text-xl font-bold transition-all transform active:scale-95 border-b-4
              ${selectedAnswer === index 
                ? 'bg-blue-500 text-white border-blue-700' 
                : 'bg-white text-blue-900 border-gray-200 hover:bg-blue-50 hover:border-blue-300'}
            `}
          >
            <span className="mr-3 text-blue-300">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={() => playTTS(question.questionText)}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-6 py-2 rounded-full font-bold transition-colors"
        >
          <span>🔊</span> Repeat Audio
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
