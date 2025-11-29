export interface MovieInput {
  title: string;
  director: string;
  actors: string;
  genre: string;
  budget: string;
  synopsis: string;
}

export enum SuccessLevel {
  BLOCKBUSTER = "Blockbuster",
  HIT = "Hit",
  MODERATE = "Moderate",
  FLOP = "Flop"
}

export interface PredictionResult {
  successScore: number; // 0-100
  successLevel: SuccessLevel;
  reasoning: string;
  strengths: string[];
  weaknesses: string[];
  estimatedBoxOffice: string;
  targetAudience: string;
  comparableMovies: string[];
}
