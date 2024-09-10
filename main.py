import gemeni
import googleapi
import parse
import json
import datetime
syllabus = open("syllabus.txt", "r").read()
print("parsing input...")
response = gemeni.GetResponse(syllabus)
decoded_response = json.loads(response)
tasks = [parse.MakeTask(unparsed_task) for unparsed_task in decoded_response]
for task in tasks:
    title = task["title"]
    date = datetime.datetime.strptime(task["due"][:-1],"%Y-%m-%dT%H:%M:%S").strftime("%m-%d")
    print(f"{date}: {title}\n\n")
if input("would you like to add to google calendar?") == "yes":
    googleapi.CreateTasks(tasks)