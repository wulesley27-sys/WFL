
import React from 'react';
import { LearningStage } from '../types';

interface NavigationProps {
  currentStage: LearningStage;
  setStage: (stage: LearningStage) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentStage, setStage }) => {
  const stages = [
    { id: LearningStage.SOUND_DECODING, label: 'Stage 1: Sound', icon: '🎧' },
    { id: LearningStage.CORE_VOCABULARY, label: 'Stage 2: Vocab', icon: '📖' },
    { id: LearningStage.READING_BREAKTHROUGH, label: 'Stage 3: Reading', icon: '🚀' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:relative md:border-t-0 md:border-r md:w-64 md:h-screen md:p-6 flex md:flex-col justify-around md:justify-start gap-4 z-50">
      <div className="hidden md:block mb-8">
        <h1 className="text-xl font-bold text-indigo-600">Breakthrough</h1>
        <p className="text-sm text-slate-500">Learning System</p>
      </div>
      {stages.map((stage) => (
        <button
          key={stage.id}
          onClick={() => setStage(stage.id)}
          className={`flex flex-col md:flex-row items-center gap-2 p-3 rounded-xl transition-all ${
            currentStage === stage.id
              ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <span className="text-2xl md:text-xl">{stage.icon}</span>
          <span className="text-xs md:text-base">{stage.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
