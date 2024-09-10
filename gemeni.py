import google.generativeai as genai

genai.configure(api_key=open("apikey.txt", "r").read())
model = genai.GenerativeModel("gemini-1.5-flash")

def GetResponse(syllabus):
    response = model.generate_content(open("prompt.txt", "r").read() + syllabus)
    return response.text[7:-3]