import { GoogleGenAI, Type } from "@google/genai";
import { MovieInput, PredictionResult } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const predictMovieSuccess = async (data: MovieInput): Promise<PredictionResult> => {
  const modelId = "gemini-2.5-flash"; // Using Flash for speed and good reasoning on structured tasks

  const prompt = `
    Analyze the potential success of the following movie project based on historical trends, star power, genre popularity, and premise.
    
    Movie Title: ${data.title}
    Director: ${data.director}
    Main Cast: ${data.actors}
    Genre: ${data.genre}
    Estimated Budget: ${data.budget}
    Synopsis/Premise: ${data.synopsis}

    Predict the success level, provide a score from 0-100 (where 100 is a guaranteed global phenomenon), list strengths and weaknesses, estimate box office potential (imaginative but grounded), and identify the target audience.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "You are a veteran Hollywood box office analyst and AI script consultant. You provide critical, data-driven, and slightly cynical predictions about movie success.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            successScore: { type: Type.INTEGER, description: "A score from 0 to 100 representing probability of commercial success." },
            successLevel: { type: Type.STRING, enum: ["Super Hit", "Hit", "Flop"] },
            reasoning: { type: Type.STRING, description: "A detailed paragraph explaining why this prediction was made." },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3-5 key selling points." },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3-5 potential pitfalls." },
            estimatedBoxOffice: { type: Type.STRING, description: "A predicted range for global box office gross (e.g. '$50M - $80M')." },
            targetAudience: { type: Type.STRING, description: "Description of the primary demographic." },
            comparableMovies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3 similar movies for comparison." }
          },
          required: ["successScore", "successLevel", "reasoning", "strengths", "weaknesses", "estimatedBoxOffice", "targetAudience", "comparableMovies"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response text from Gemini.");
    }

    const result = JSON.parse(response.text) as PredictionResult;
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze movie data. Please try again.");
  }
};
