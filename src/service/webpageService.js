const puppeteer = require('puppeteer');
const { OpenAI } = require('openai');
const { MAX_LENGTH_FOR_WEBPAGE_CONTENT } = require('../util/const');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

exports.checkWebpageCompliance = async function (webpageUrl) {
  // Use Puppeteer to scrape the webpage content
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(webpageUrl);
  const webpageContent = await page.evaluate(() => document.body.innerText);
  await browser.close();

  const substrings = splitTextWithNewline(webpageContent, MAX_LENGTH_FOR_WEBPAGE_CONTENT)
  const promises = substrings.map(str => {
    const config = {
      model: 'text-davinci-003', // Specify the GPT-3 model you want to use
      prompt: `check the content in the webpage against a compliance policy and identify any words or sentences that do not adhere to the compliance policy \nWebpage content: ${str}\n`,
      max_tokens: 100
    }
    return openai.completions.create(config);
  })
  const resolvedPromises = await Promise.all(promises)
  const findings = resolvedPromises.map(res => res?.choices[0]?.text)
  return { status: true, code: 200, data: findings }
}

function splitTextWithNewline(text, maxLength) {
  const substrings = [];
  let start = 0;

  while (start < text.length) {
    let end = start + maxLength;
    if (end >= text.length) {
      end = text.length;
    } else {
      // Find the last newline character within the range
      const lastNewline = text.lastIndexOf('\n', end);
      if (lastNewline !== -1) {
        end = lastNewline + 1
      }
    }

    const substring = text.substring(start, end);
    substrings.push(substring);
    start = end;
  }

  return substrings;
}
