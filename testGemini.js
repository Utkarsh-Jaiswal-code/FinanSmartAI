import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDESMRtHxJgxFfHZ_l8i7a7C_qfrl-KJs0');

async function testFinancialAdvice() {
  try {
    console.log('Testing financial advice generation...');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const userPrompt = `
You are a financial advisor.

User Financial Data:
- Budget: 5000
- Income: 100000
- Expenses: 2000
- Savings: 98000

Condition:
User is saving money.

Instructions:
- Use the numbers
- Be specific and practical
- Give exactly 2 short sentences
`;

    console.log('Sending prompt to Gemini...');
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const advice = response.text().trim();

    console.log('Gemini Advice Response:');
    console.log(advice);
    console.log('Response length:', advice.length);

  } catch (error) {
    console.error('Error generating advice:', error);
  }
}

testFinancialAdvice();