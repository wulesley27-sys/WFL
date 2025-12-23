
import React, { useState } from 'react';
import { speakText } from '../services/geminiService';

const PHONICS_MAP = [
  { char: 'A', sound: '/æ/', word: 'Apple' },
  { char: 'B', sound: '/b/', word: 'Bat' },
  { char: 'C', sound: '/k/', word: 'Cat' },
  { char: 'D', sound: '/d/', word: 'Dog' },
  { char: 'E', sound: '/e/', word: 'Egg' },
  { char: 'F', sound: '/f/', word: 'Fish' },
  { char: 'G', sound: '/g/', word: 'Go' },
  { char: 'H', sound: '/h/', word: 'Hat' },
  { char: 'I', sound: '/ɪ/', word: 'Igloo' },
  { char: 'J', sound: '/dʒ/', word: 'Jam' },
  { char: 'K', sound: '/k/', word: 'Kite' },
  { char: 'L', sound: '/l/', word: 'Leaf' },
];

const SoundDecoding: React.FC = () => {
  const [activePhonic, setActivePhonic] = useState<string | null>(null);

  const handlePlaySound = async (text: string) => {
    setActivePhonic(text);
    await speakText(text);
    setActivePhonic(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Stage 1: Sound Decoding</h2>
        <p className="text-slate-600 max-w-2xl">
          Focus on building a strong connection between sounds and letters. 
          The goal is to be able to pronounce any letter combination you see.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {PHONICS_MAP.map((item) => (
          <button
            key={item.char}
            onClick={() => handlePlaySound(item.word)}
            disabled={activePhonic === item.word}
            className={`p-6 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-2 group
              ${activePhonic === item.word 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'}`}
          >
            <span className="text-4xl font-black">{item.char}</span>
            <span className={`text-sm ${activePhonic === item.word ? 'text-indigo-100' : 'text-slate-400'}`}>
              {item.sound}
            </span>
            <span className={`text-lg font-medium ${activePhonic === item.word ? 'text-white' : 'text-slate-700'}`}>
              {item.word}
            </span>
            <div className={`mt-2 p-2 rounded-full ${activePhonic === item.word ? 'bg-indigo-500' : 'bg-slate-50 group-hover:bg-indigo-50'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 14.657a1 1 0 01-1.414-1.414A5 5 0 0011 10a5 5 0 002.243-3.243 1 1 0 111.414 1.414A7 7 0 0111 10a7 7 0 013.657 4.657z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4">
        <div className="text-3xl">💡</div>
        <div>
          <h4 className="font-semibold text-amber-900">Practice Tip</h4>
          <p className="text-amber-800 text-sm">
            Don't just listen! Repeat each sound loudly. Your brain needs to coordinate 
            your mouth movements with the visual letters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SoundDecoding;
