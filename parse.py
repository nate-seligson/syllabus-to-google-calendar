import datetime
today = datetime.datetime.today()
year = today.strftime("%Y")
def parseDate(date):
    return datetime.datetime(int(year), *date).isoformat('T') + "Z"
def MakeTask(proposed_task):
    split_date = (int(x) for x in proposed_task["date"].split("/"))
    unslashed_content = proposed_task["content"].replace("\\", "")
    return {"title": unslashed_content, "due":parseDate(split_date)}







'''
DEPRECATED -- Using a basic algorithm to determine dates, obselete due to AI model


syllabus = open("syllabus.txt", "r").read().replace("\n"," newline ").split()
def parseDate(date):
    dates = date.split("/")
    if len(dates) > 1 and dates[0].isnumeric() and dates[1].isnumeric():
        return True
    return False
tasks = []
current_date = ""
current_label= ""
for i,word in enumerate(syllabus):
    if parseDate(word) or i == len(syllabus)-1:
        tasks.append({"date": current_date, "label":current_label})
        current_date = word
        current_label = ""
    elif word == "newline":
        current_label += "\n"
    else:
        current_label += word + " "
        
        '''