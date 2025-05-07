// AIzaSyDl0NkIWnyHtp_Cu3dxxg19_q5Bm0u48ok
const apiKey="AIzaSyDl0NkIWnyHtp_Cu3dxxg19_q5Bm0u48ok"
// AIzaSyBrXxjlvltn4CjJJMn2i4gJhEGY5kS1MrM
// import { GoogleGenAI } from "@google/genai";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDl0NkIWnyHtp_Cu3dxxg19_q5Bm0u48ok" });
console.log(ai);
async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

 
  console.log(response.text);
  return response.text;
}

 


export default main;