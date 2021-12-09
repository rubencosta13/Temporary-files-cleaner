# Temp file cleaner

This script, is being developed, so companies, don't have to worry about going to a computer, and check the following things:

- Task manager:
    - Cpu utilization
    - Memory utilization
- General computer specs

# To-do: 
    [ ] Auto updating;
    [ ] Getting information about the disks


# Configurations

## Pre-requisites:

- Recommended to have a discord server, to receive the data;
    - Create a webhook
    - Go into index.js find the line where it has "axios.post("[add your URL]")"
    - Optional, but should be fixed in the next updates:
        - Go in to task scheduler: 
        - Click on: "Create Task"
        - Name the task something knowledgeable: e.g. "Monitor computer task"
        - Click on the "Triggers" tab
        - Use the default: "On schedule"
        - Change the start hour, so you are sure that on that time someone is using the computer, (if you want, use: "Repeat task every:", so the task will run itself). Click OK
        - Then go to "Actions" tab, click on "New", leave everything as default, just change on: "Program / script" to the .exe file directory
        - Then click "OK"
        - Then click "OK" again and close task manager (The program should run on the defined schedule)
    - Then you are going to receive the data to the discord!


# Help!

If you need any help send me an [email](mailto:rubenlavoscosta@gmail.com). Use the subject as: "Temporary file cleaner"



Made with <3 by Ruben Costa
