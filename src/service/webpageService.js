const puppeteer = require('puppeteer');
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

exports.checkWebpageCompliance = async function (webpageUrl) {
  // Use Puppeteer to scrape the webpage content
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(webpageUrl);
  const webpageContent = await page.evaluate(() => document.body.innerText);
  await browser.close();

  const {status, code, data, message} = await getAIResponse(webpageContent)
  if(!status){
    return { status, code, message }
  }
  return { status: true, code: 200, data }
}

async function getAIResponse(webpageContent) {
  try {
    // Use GPT-3 to check compliance
    const config = {
      model: 'text-davinci-003', // Specify the GPT-3 model you want to use
      prompt: `check the content in the webpage against a compliance policy and please find the particular words or sentences \nWebpage content: ${webpageContent}\n`
    }
    const response = await openai.completions.create(config);

    return {status: true, code: 200, data: response?.choices[0]?.text};
  } catch (error) {
    return {status: false, code: error?.status, message: error?.error?.message};
  }
}