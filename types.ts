
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  LISTENING = 'LISTENING',
  PICTURE_MATCH = 'PICTURE_MATCH'
}

export interface Question {
  id: string;
  type: QuestionType;
  character: string;
  characterAvatar: string;
  instruction: string;
  questionText: string;
  audioPrompt?: string;
  options: string[];
  correctIndex: number;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  isFinished: boolean;
  userAnswers: number[];
}
