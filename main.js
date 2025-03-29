const { get_tasks } = require("./extractor.js");
const { CreateTasks, authorize } = require("./tasks.js"); 
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
  if (req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        return res.end("Error loading page.");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', async function () {
      try {
        body = JSON.parse(body);
        const responseData = await generate(body["key"], body["input_text"]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        console.error("Error handling POST request:", error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end("Internal Server Error");
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/html' });
    res.end('Use GET or POST requests only.');
  }
}).listen(8080, async () => {
  const url = "http://localhost:8080/";
  console.log("Server started at:", url);
  try {
    const openModule = await import('open');
    openModule.default(url);
  } catch (err) {
    console.error("Failed to open browser:", err);
  }
});

async function addTasks(tasks) {
  try {
    const auth = await authorize();
    await CreateTasks(auth, tasks);
  } catch (error) {
    console.error("Error adding tasks:", error);
  }
}

async function generate(key, input_txt) {
  try {
    const response = await get_tasks(key, input_txt);
    if (typeof response === 'string' || !response) {
      console.error("Invalid response from get_tasks:", response);
      return { error: "Invalid response from get_tasks" };
    }
    
    const [tasks, parsed_tasks] = response;
    if (!tasks || tasks.length === 0) {
      console.log("No tasks generated from syllabus.");
      return { message: "No tasks generated from syllabus." };
    }
    
    await addTasks(tasks);
    return { parsed_tasks };
    
  } catch (error) {
    console.error("Error in generate function:", error);
    return { error: error.message };
  }
}
