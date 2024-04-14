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

## Starting the Project Backend

1. In a new terminal run the following:
   ```bash
   cd .\eventReadyBackend\  # to move to the backend folder
   py manage.py runserver   # to start the backend server
   ```
2. Leave the terminal open while running the project

## Starting the Project Frontend

1. In a new terminal run the following
   ```bash
   cd .\eventready\  # to move to the frontend folder
   npm install        # to install all required packages
   npm start          # to start the frontend server
   ```
2. Web app will be opened on [http://localhost:3000/](http://localhost:3000/) and ready to be used.

# Using the Project


## User Authentication 

1. Sign in using email or google and go through the prompts. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/a3a2fd38-6084-44c8-9695-21b5f77dfd28)


## Landing Page 

1. Main page where events are displayed and created. Click on the cards to access the event or click on the Add Event button to create an event ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/21a4f2bf-828c-47bd-aee0-5920c3dde93c)



## Event Page – Navigation Bar

1. Use this sidebar to navigate between all the pages listed
   1. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/474121b3-f32c-45d7-b760-6b96cdd812e0)


## Event Page – General Info

1. Event Basic Info is displayed on this page along with summary cards of the other pages. Click edit info to fill out information of the event. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/0ba6f8e4-3f56-43d8-a7d8-d97d4473fb91)



## Event Page – Goals

1. Goals can be added on this page through the Add Goal Button
   ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/7d8a445b-e1b7-4db4-ac63-22b2d1a00c9b)


## Event Page – Tasks

1. Tasks can be added and dragged and dropped between columns on this page.
   ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/fcf2ea43-f91d-4e32-bcbd-2dec50ecbff1)


## Event Page – Budget

1. Budget categories and items and can be set on this page.
   ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/7c24d32f-4144-4d81-b05b-345bb7af28d2)


## Event Page – Marketing 

1. A repository where you can add reminders and save photos for your event ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/d25b634d-b7e3-48cb-89f0-3dcd843a8375)


## Event Page – Attendance 

1. A QR Code that can be scanned to fill out attendance list and an excel can uploaded to record attendance. ![image](https://github.com/kbnguyen1423/Capstone-Project/assets/98423738/5739b0a9-f3e6-4872-8e97-122de091dcd0)



## FAQ

1. **Q: How do I install Python and Node.js for the project?**
   - **A:** Follow the installation instructions provided on their official websites: [Python](https://www.python.org/downloads/) and [Node.js](https://nodejs.org/en).

2. **Q: What is the purpose of cloning the repository?**
   - **A:** Cloning the repository is essential to get the project's source code on your local machine. It provides you with the necessary files to run and modify the project.

