import os
from flask import Flask, jsonify
import extractor
import googleapi

# Placeholder for the syllabus input
input_txt = """Week 1
W 09/04 Introducing the Course
Discuss syllabus
DG: “What to Expect in Your First-Year Writing Classes” (Ch.2)
Week 2
M 09/09 The Joy of Reading and Writing
D2l: “The Joy of Reading and Writing: Superman and Me” –Alexie
“Learning to Read” – Malcolm X"""

tasks = []

def addTasks():
    try:
        googleapi.CreateTasks(tasks)
    except Exception as e:
        raise RuntimeError(f"Failed to add tasks to Google API: {e}")

def generate():
    global tasks
    try:
        response = extractor.get_tasks(input_txt)
        if type(response) == str:
            raise ValueError(f"Unexpected response from extractor.get_tasks: {response}")
        
        tasks, parsed_tasks = response
        return parsed_tasks
    except Exception as e:
        raise RuntimeError(f"Failed to generate tasks from input: {e}")

app = Flask(__name__)

@app.route("/")
def hello_world():
    try:
        parsed_tasks = generate()
        addTasks()
        return jsonify({"message": "Success!", "parsed_tasks": parsed_tasks})
    except Exception as e:
        # Return the error message as part of the HTTP response
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
