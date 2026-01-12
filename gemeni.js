const { GoogleGenerativeAI } = require("@google/generative-ai");

const prompt = `
Sort the following syllabus into JSON of Date and Content, with the date being the due date of a given assignment and the content being the given content of the assignment. Ignore text that is not directly related to an assigment. If the assignment name contains quotation marks, precede them with a \\

Example Input:
"
Week 1
September Fourth, Introducing the Course
Discuss syllabus
DG: “What to Expect in Your First-Year Writing Classes” (Ch.2)
Week 2
M  September 9 The Joy of Reading and Writing
D2l: “The Joy of Reading and Writing: Superman and Me” –Alexie
“Learning to Read” – Malcolm X
"

Example output:
[
  {"date": "09/04", "content": "DG: \\"What to Expect in Your First-Year Writing Classes\\" (Ch.2)"},
  {"date": "09/09", "content": "D2l: \\"The Joy of Reading and Writing: Superman and Me\\" –Alexie"},
  {"date": "09/09", "content": "D2l: \\"Learning to Read – Malcolm X\\""}
]

Input:
`;

async function GetResponse(key, syllabus) {
  const genAI = new GoogleGenerativeAI(key);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  // MUST be a string or array — not an object
  const result = await model.generateContent(prompt + syllabus);

  // Gemini guarantees valid JSON here
  return JSON.parse(result.response.text());
}

module.exports = { GetResponse };
