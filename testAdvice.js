async function testAdviceAPI() {
  try {
    console.log('Testing advice API...');
    const response = await fetch('http://localhost:3001/api/advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalBudget: 5000,
        totalIncome: 100000,
        totalSpend: 2000
      })
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAdviceAPI();