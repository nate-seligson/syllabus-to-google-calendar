const { GetResponse } = require("./gemeni.js");
const { MakeTask } = require("./parse.js");

async function get_tasks(key, syllabus) {
    try {
        const decoded_response = await GetResponse(key, syllabus);

        if (!Array.isArray(decoded_response)) {
            return [[], []];
        }

        const tasks = decoded_response.map(MakeTask);
        const parsed_tasks = tasks.map(task => `${task.due}: ${task.title}`);

        return [tasks, parsed_tasks];
    } catch (error) {
        console.error("Error handling Gemini response:", error);
        return [[], []];
    }
}

module.exports = { get_tasks };
