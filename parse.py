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
for task in tasks:
    date = task["date"]
    label = task["label"]
    print(f"\n\nNext task:\n\n {date} : {label} .")
    input("Does that sound good?")
    
