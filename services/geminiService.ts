import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSpending = async (transactions: Transaction[]) => {
  try {
    const txData = transactions.map(t => ({
      date: t.date,
      amount: t.amount,
      type: t.type,
      category: t.category,
      payee: t.payeeName,
      note: t.note
    }));

    const prompt = `
      You are a personal financial advisor. Analyze the following transaction history for the user.
      Provide a brief summary of spending habits, identify the top spending category, and give one actionable tip to save money.
      
      Transactions:
      ${JSON.stringify(txData)}
      
      Return the response in this JSON schema:
      {
        "spendingSummary": "string",
        "topCategory": "string",
        "actionableTip": "string",
        "spendingTrend": "increasing" | "decreasing" | "stable"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spendingSummary: { type: Type.STRING },
            topCategory: { type: Type.STRING },
            actionableTip: { type: Type.STRING },
            spendingTrend: { type: Type.STRING, enum: ["increasing", "decreasing", "stable"] }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error analyzing spending:", error);
    throw error;
  }
};
