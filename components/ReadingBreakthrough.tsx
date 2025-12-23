
import React, { useState } from 'react';
import { generateStory, speakText } from '../services/geminiService';
import { GradedStory } from '../types';

const ReadingBreakthrough: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [story, setStory] = useState<GradedStory | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const newStory = await generateStory(topic);
    setStory(newStory);
    setLoading(false);
  };

  const handleReadAloud = async () => {
    if (!story) return;
    setIsPlaying(true);
    await speakText(story.content);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Stage 3: Reading Breakthrough</h2>
        <p className="text-slate-600">Apply your skills to connected text. Start reading stories you care about.</p>
      </header>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <label className="block text-sm font-semibold text-slate-700">What do you want to read about?</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., A robot on a farm, A trip to space..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Creating...' : 'Generate Story'}
          </button>
        </div>
      </div>

      {story && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <article className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-8 leading-relaxed">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                <h3 className="text-3xl font-black text-slate-900">{story.title}</h3>
                <button
                  onClick={handleReadAloud}
                  disabled={isPlaying}
                  className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 disabled:opacity-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isPlaying ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              </div>
              <p className="text-xl text-slate-700 leading-relaxed font-light whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left">
                {story.content}
              </p>
            </article>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-6">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <span className="p-1 bg-indigo-500 rounded-lg text-xs">A1</span>
                Key Vocabulary
              </h4>
              <ul className="space-y-4">
                {story.vocabulary.map((vocab, i) => (
                  <li key={i} className="group">
                    <div className="flex flex-col">
                      <span className="text-indigo-400 font-bold group-hover:text-white transition-colors cursor-pointer" onClick={() => speakText(vocab.word)}>
                        {vocab.word}
                      </span>
                      <span className="text-sm text-slate-400">{vocab.meaning}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 space-y-4">
              <h4 className="font-bold text-indigo-900">Study Goal</h4>
              <p className="text-sm text-indigo-800">
                Read the story while listening to the audio. Follow the words with your finger. Try to summarize the main point in 1 sentence.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingBreakthrough;
