const today = new Date();
const year = today.getFullYear();

function parseDate(date) {
  const [month, day] = date.split("/").map(Number); // Directly convert to numbers
  const newDate = new Date(year, month - 1, day); // Month is 0-indexed
    // Handle invalid dates
    if (isNaN(newDate.getTime())) {
        throw new Error("Invalid date format");  // Or handle it differently, e.g., return null
    }
  return newDate.toISOString();
}


function MakeTask(proposed_task) {
    const unslashed_content = proposed_task.content.replace(/\\/g, "");

    if (proposed_task.date) {
        try {
            console.log({ title: unslashed_content, due: parseDate(proposed_task.date) })
            return { title: unslashed_content, due: parseDate(proposed_task.date) };
        } catch (error) {
            console.error("Invalid date format:", proposed_task.date);
            // Fallback to returning the task without a due date
            return { title: unslashed_content }; 
        }
    } else {
        return { title: unslashed_content };
    }
}

module.exports = { MakeTask };
