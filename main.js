const { get_tasks } = require("./extractor.js");
const { CreateTasks, authorize } = require("./tasks.js"); 

async function addTasks(tasks) {
    // Get authentication (ensure authorize() is called and returns a valid auth object)
    authorize().then((auth) => CreateTasks(auth, tasks)); // Pass tasks as an argument
  }
  
async function generate(input_txt) {
  try {
    const response = await get_tasks(input_txt);

    if (typeof response === 'string' || !response) {
      console.error("Invalid response from get_tasks:", response);
      return;
    }


    const [tasks, parsed_tasks] = response;

    if (!tasks || tasks.length === 0) {
        console.log("No tasks generated from syllabus.")
        return; // Exit early if no tasks are generated
    }


    await addTasks(tasks);


  } catch (error) {
    console.error("Error in generate function:", error);
  }
}



// Example usage (replace with your actual syllabus input):
const syllabusText = `Week 1
W 09/04 Introducing the Course
Discuss syllabus
DG: “What to Expect in Your First-Year Writing Classes” (Ch.2)
Week 2
M 09/09 The Joy of Reading and Writing
D2l: “The Joy of Reading and Writing: Superman and Me” –Alexie
“Learning to Read” – Malcolm X`;

generate(syllabusText);


