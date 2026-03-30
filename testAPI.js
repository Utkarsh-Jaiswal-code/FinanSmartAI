import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testAPI() {
  try {
    console.log('Testing API route logic...');

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length || 0);

    if (!apiKey) {
      console.error('No API key found');
      return;
    }

    // Simulate the API route logic
    const totalBudget = 5000;
    const totalIncome = 100000;
    const totalSpend = 2000;
    const savings = totalIncome - totalSpend;
    const isOverspending = totalSpend > totalIncome;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const userPrompt = `
You are a financial advisor.

User Financial Data:
- Budget: ${totalBudget}
- Income: ${totalIncome}
- Expenses: ${totalSpend}
- Savings: ${savings}

Condition:
User is ${isOverspending ? "overspending" : "saving money"}.

Instructions:
- Use the numbers
- Be specific and practical
- Give exactly 2 short sentences
`;

    console.log('Sending prompt to Gemini...');
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const advice = response.text().trim();

    console.log('Success! Gemini Response:', advice);

  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();