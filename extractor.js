const { GetResponse } = require("./gemeni.js");
const { MakeTask } = require("./parse.js")
async function get_tasks(syllabus) {
    const textResponse = await GetResponse(syllabus);
    try {
        const decoded_response = textResponse ? JSON.parse(textResponse.slice(7,-4)) : [];
        const tasks = decoded_response.map(MakeTask)
        const parsed_tasks = tasks.map(task => `${task.due}: ${task.title}`);


        return [tasks, parsed_tasks];


    } catch (error) {
        console.error("Error parsing Gemini response:", error);
        console.error("Raw response:", textResponse.slice(7,-4)); // Log the raw response for debugging
        return [[], []]; // Return empty arrays in case of error
    }
}
module.exports = { get_tasks };
