
export enum LearningStage {
  SOUND_DECODING = 'SOUND_DECODING',
  CORE_VOCABULARY = 'CORE_VOCABULARY',
  READING_BREAKTHROUGH = 'READING_BREAKTHROUGH'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  platform: string;
}

export interface Flashcard {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  imagePrompt: string;
}

export interface GradedStory {
  title: string;
  content: string;
  vocabulary: { word: string; meaning: string }[];
}
