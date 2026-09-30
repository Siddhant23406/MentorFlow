async function withRetry(fn, retries = 2, delayMs = 800) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isLastAttempt = attempt === retries;
      if (isLastAttempt) throw err;
      console.log(`Gemini call failed (attempt ${attempt + 1}), retrying...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

module.exports = { withRetry };