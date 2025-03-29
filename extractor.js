const { GetResponse } = require("./gemeni.js");
const { MakeTask } = require("./parse.js");

async function get_tasks(key, syllabus) {
    const textResponse = await GetResponse(key, syllabus);
    try {
        let decoded_response = textResponse ? JSON.parse(textResponse.slice(7, -4)) : [];
        
        // If the response is not an array, wrap it in one.
        if (!Array.isArray(decoded_response)) {
            decoded_response = [decoded_response];
        }
        
        const tasks = decoded_response.map(MakeTask);
        const parsed_tasks = tasks.map(task => `${task.due}: ${task.title}`);
    
        return [tasks, parsed_tasks];
    } catch (error) {
        console.error("Error parsing Gemini response:", error);
        console.error("Raw response:", textResponse.slice(7, -4)); // Log the raw response for debugging
        return [[], []]; // Return empty arrays in case of error
    }
}

module.exports = { get_tasks };
