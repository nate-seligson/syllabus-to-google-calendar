import gemeni
import parse
import json
import datetime
def get_tasks(syllabus):
    response = gemeni.GetResponse(syllabus)
    decoded_response = json.loads(response)
    tasks = [parse.MakeTask(unparsed_task) for unparsed_task in decoded_response]
    parsed_tasks = []
    for task in tasks:
        title = task["title"]
        try:
            date = datetime.datetime.strptime(task["due"][:-1],"%Y-%m-%dT%H:%M:%S").strftime("%m-%d")
            parsed_tasks.append(f"{date}: {title}")
        except:
            parsed_tasks.append(f"NO DATE: {title}")
    return tasks,parsed_tasks