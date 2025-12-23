
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import SoundDecoding from './components/SoundDecoding';
import CoreVocabulary from './components/CoreVocabulary';
import ReadingBreakthrough from './components/ReadingBreakthrough';
import { LearningStage } from './types';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<LearningStage>(LearningStage.SOUND_DECODING);

  const renderStage = () => {
    switch (currentStage) {
      case LearningStage.SOUND_DECODING:
        return <SoundDecoding />;
      case LearningStage.CORE_VOCABULARY:
        return <CoreVocabulary />;
      case LearningStage.READING_BREAKTHROUGH:
        return <ReadingBreakthrough />;
      default:
        return <SoundDecoding />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900">
      <Navigation currentStage={currentStage} setStage={setCurrentStage} />
      
      <main className="flex-1 p-6 md:p-12 pb-32 md:pb-12 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Progress Tracker Banner */}
        <div className="mb-12 bg-indigo-600 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-black">Daily Learning Progress</h2>
            <p className="text-indigo-100">Establish strong connections between sounds, text, and meaning.</p>
          </div>
          <div className="relative z-10 flex items-center gap-6">
             <div className="text-center">
                <p className="text-3xl font-black">12</p>
                <p className="text-xs text-indigo-200 font-bold uppercase tracking-wider">Day Streak</p>
             </div>
             <div className="h-10 w-px bg-indigo-500" />
             <div className="text-center">
                <p className="text-3xl font-black">85%</p>
                <p className="text-xs text-indigo-200 font-bold uppercase tracking-wider">Stage Done</p>
             </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30" />
        </div>

        {renderStage()}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
