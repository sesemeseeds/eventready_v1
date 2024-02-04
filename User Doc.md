# Project Setup Prerequisites

1. Install Python3 ([https://www.python.org/downloads/](https://www.python.org/downloads/)) and latest version of Node.js ([https://nodejs.org/en](https://nodejs.org/en))
2. Open a terminal within VS Code and use this line to clone repository.
   ```bash
   git clone https://github.com/kbnguyen1423/Capstone-Project.git
   ```
3. In the terminal run the following commands to set up necessary plug-ins:
   ```bash
   py -m install Django
   pip install djangorestframework django-cors-headers
   ```
4. Open the root project folder **Capstone-Project**

## Starting the project backend

1. In a new terminal run the following:
   ```bash
   cd .\eventReadyBackend\  # to move to the backend folder
   py manage.py runserver   # to start the backend server
   ```
2. Leave the terminal open while running the project

## Starting the project frontend

1. In a new terminal run the following
   ```bash
   cd .\eventready\  # to move to the frontend folder
   npm install        # to install all required packages
   npm start          # to start the frontend server
   ```
2. Web app will be opened on [http://localhost:3000/](http://localhost:3000/) and ready to be used.

# Using the project

## User Authentication (WIP)

Will be added in the future

## Landing Page (WIP)

1. Main page where events are displayed and created. (WIP) ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/9bb3cb23-a201-4c79-984c-28dd9d5d7527)

2. Click Add Event Button to create event (WIP)
      1. Fill out information listed. After submission you will be redirected to the event page. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/e43a124a-2d81-4a70-8309-db0cbeeb100a)

## Event Page – Navigation Bar

1. Use this sidebar to navigate between all the pages listed
   1. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/7aaef085-ed32-408f-99bf-2a9eb7565c5f)

## Event Page – General Info

1. Event Basic Info is displayed on this page. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/ac15d45c-7fd7-4f3d-a582-80bc2e0e05b8)

2. Click on edit button to make changes to information on the page
    1. On submission the information on the page will be updated ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/4e35516a-2ddc-4035-9317-64a258a176be)


## Event Page – Goals

Will be added in the future

## Event Page – Tasks

Will be added in the future

## Event Page – Budget

Will be added in the future

## Event Page – Marketing (WIP)

1. A repository where you can add reminders and save photos for your event ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/eee6aa62-54ac-4ff5-8383-541293534970)


## Event Page – Attendance (WIP)

1. A QR Code that can be scanned to fill out attendance list. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/60f6852c-937c-4851-9380-3e95901a293f)

