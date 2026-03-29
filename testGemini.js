import fetch from 'node-fetch';

(async () => {
  const url = 'https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-mini:generate?key=AIzaSyCf9fn_HQqDzAdLGaxMc9XKSEVIkXy5Viw';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: { text: 'hi' }, maxOutputTokens: 10 }),
    });
    console.log('status', res.status);
    console.log(await res.text());
  } catch (err) {
    console.error(err);
  }
})();