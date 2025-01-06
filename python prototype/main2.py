import extractor
import googleapi

# Placeholder for the syllabus input
input_txt = ""

tasks = []

def addTasks():
    googleapi.CreateTasks(tasks)

def generate():
    global tasks
    response = extractor.get_tasks(input_txt)
    if type(response) == str:
        return
    
    tasks, parsed_tasks = response
    for task in parsed_tasks:
        pass  # Do nothing, tasks are ready to be used or passed elsewhere

generate()
addTasks()