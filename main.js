const { get_tasks } = require("./extractor.js");
const { CreateTasks, authorize } = require("./tasks.js"); 
var http = require('http');
const fs = require('fs');
const path = require('path')
let id = "";
let input_text = ``;
http.createServer(function (req, res) {
  if (req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      body = JSON.parse(body);
      res.writeHead(200, { 'content-type': 'text/html' });
      generate(body["key"], body["input_text"]);
      res.end('Tasks added!');
    });
  } else {
    res.writeHead(405, { 'content-type': 'text/html' });
    res.end('Use GET or POST requests only.');
  }
}).listen(8080);
console.log("Welcome!!!!! Put the following link in your browser to begin:")
console.log("http://localhost:8080/")
async function addTasks(tasks) {
    // Get authentication (ensure authorize() is called and returns a valid auth object)
    authorize().then((auth) => CreateTasks(auth, tasks)); // Pass tasks as an argument
  }
  
async function generate(key, input_txt) {
  try {
    const response = await get_tasks(key, input_txt);

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


