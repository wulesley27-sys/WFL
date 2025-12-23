
import React, { useState, useEffect } from 'react';
import { generateDailyFlashcards, speakText } from '../services/geminiService';
import { Flashcard } from '../types';

const CoreVocabulary: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    setLoading(true);
    const newCards = await generateDailyFlashcards(5);
    setCards(newCards);
    setCurrentIndex(0);
    setShowFront(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFront(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowFront(true);
    }
  };

  const currentCard = cards[currentIndex];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="text-slate-500 font-medium">Preparing your daily flashcards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Stage 2: Core Vocabulary</h2>
          <p className="text-slate-600">Master the 1,000 most common words using flashcards.</p>
        </div>
        <button 
          onClick={fetchCards}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Generate New Set
        </button>
      </header>

      {currentCard && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex justify-between items-center text-sm font-medium text-slate-400">
            <span>Card {currentIndex + 1} of {cards.length}</span>
            <div className="flex gap-1">
              {cards.map((_, i) => (
                <div key={i} className={`h-1 w-6 rounded-full ${i <= currentIndex ? 'bg-indigo-500' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>

          <div 
            onClick={() => setShowFront(!showFront)}
            className={`relative w-full h-80 cursor-pointer transition-all duration-500 preserve-3d group ${!showFront ? 'rotate-y-180' : ''}`}
            style={{ perspective: '1000px' }}
          >
            {/* Front */}
            <div className={`absolute inset-0 backface-hidden bg-white rounded-3xl border-2 border-indigo-100 shadow-xl flex flex-col items-center justify-center p-8 text-center transition-all ${!showFront ? 'opacity-0' : 'opacity-100'}`}>
              <h3 className="text-6xl font-black text-indigo-600 mb-2">{currentCard.word}</h3>
              <p className="text-xl text-slate-400 font-mono">{currentCard.pronunciation}</p>
              <button 
                onClick={(e) => { e.stopPropagation(); speakText(currentCard.word); }}
                className="mt-6 p-3 bg-indigo-50 rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
              <p className="mt-4 text-xs text-slate-300 font-medium tracking-widest uppercase">Tap to reveal meaning</p>
            </div>

            {/* Back */}
            <div className={`absolute inset-0 backface-hidden bg-indigo-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white rotate-y-180 transition-all ${showFront ? 'opacity-0' : 'opacity-100'}`}>
              <h3 className="text-4xl font-bold mb-4">{currentCard.definition}</h3>
              <div className="w-full h-px bg-indigo-400 my-4" />
              <p className="text-lg italic opacity-90 leading-relaxed">
                "{currentCard.example}"
              </p>
              <p className="mt-8 text-xs text-indigo-200 font-medium tracking-widest uppercase">Tap to see word</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className="flex-1 py-4 bg-indigo-600 rounded-2xl font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
            >
              Next Word
            </button>
          </div>
        </div>
      )}

      <style>{`
        .backface-hidden { backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default CoreVocabulary;
