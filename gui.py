import dearpygui.dearpygui as dpg
import extractor
dpg.create_context()
with dpg.font_registry():
    # first argument ids the path to the .ttf or .otf file
    default_font = dpg.add_font("Roboto-Regular.ttf", 20)
def addTasks(user_data):
    print("hi")
    #to be added
def generate():
    dpg.set_value(loading, "Loading...")
    response = extractor.get_tasks(dpg.get_value(input_txt))
    #error handling
    if type(response) == str:
        dpg.set_value(loading, response)
        return
    
    tasks, parsed_tasks = response
    dpg.set_value(loading, "")
    for task in parsed_tasks:
        dpg.add_text(default_value=task, bullet=True, parent = window)
    new_button = dpg.add_button(label="Add to Google Tasks?", parent = window)
    dpg.set_item_callback(new_button, addTasks, user_data = tasks)

with dpg.window(width=500, height = 600) as window:
    dpg.bind_font(default_font)
    dpg.add_text(default_value = "Syllabus Task Extractor")
    input_txt = dpg.add_input_text(
        default_value="Copy Paste Your Syllabus Here...",
        height=200,
        multiline = True,
    )
    btn = dpg.add_button(label="Generate Tasks")
    dpg.set_item_callback(btn, generate)
    loading = dpg.add_text(default_value = "")

dpg.create_viewport(width=800, height=600)
dpg.setup_dearpygui()
dpg.show_viewport()
dpg.start_dearpygui()
dpg.destroy_context()