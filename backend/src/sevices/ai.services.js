
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
   model: 'gemini-2.5-flash',
    systemInstruction:
  `You are an expert code reviewer. Review the provided code and return:
  first on frontend you will show 
  1.procided code snippet: on the next line
  2. Errors or bugs (syntax or logic)
  3. Suggestions to debug issues
  4.imorved version at one time only give one suggestion
  6.resone for the improved version make sure 1 to 2 line only 
  5. If the code is working fine then say "No issues found" and give improved version
  
  if you get or see only few instruction like write and paste code here then only write provide a code 
  
  also dont give explanation or any other text, just return the code snippet and the issues aslo add few emojis to make it more engaging`,

});

export default async function generateContent(prompt) {
  const result = await model.generateContent({
  contents: [
    {
      parts: 
        [{ text: prompt }]
      
    }
  ]
});

 
  const response = await result.response;
  return response.text();
}
