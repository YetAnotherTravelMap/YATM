# 🌍 Yet Another Travel Map (YATM)

Yet Another Travel Map (YATM) is a web application designed to help users manage and organize their travel information. It allows users to create, view, and edit personalized travel maps with pins for locations they’ve visited or wish to visit. The application also offers features like categorizing pins, viewing travel statistics, and importing/exporting data in multiple formats, providing a flexible and customizable tool for travel tracking and planning.

![image](https://github.com/user-attachments/assets/fce3802a-dd37-4ab0-aaae-d0ddfe5c9912)

$~$
## ✨ Features

- 🧑‍💻 **User Accounts**  
  Register, login, and manage your account securely.

- 🗺️ **Interactive Travel Map**  
  View and manage your travel locations on an interactive map.

- 📍 **Pin Management**  
  Add, edit, and categorize pins to track places you've been or want to visit.

- 📊 **Travel Statistics**  
  See insights into your travel history, including countries visited and total pins.

- 📂 **Data Import/Export**  
  Import and export travel data in KML, JSON, and XML formats.

$~$
## 🚀 Getting Started

### Prerequisites

- [Java (JDK 21 )](https://adoptium.net/temurin/releases/?os=windows&arch=x64&package=jdk&version=21)
- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/download-thanks.html?platform=windows&code=IIC) (Any IDE would work but we prefer IntelliJ IDEA as it works great with Spring Boot and comes bundled with Maven)
- [Maven](https://maven.apache.org/download.cgi) (If you are using IntelliJ IDEA, you don't need to manually install Maven as it is already included in your IntelliJ installation)
- A modern browser

## Setup
Ensure the prerequisites software listed above are installed.

### Setting up the database
- Create a new PostgreSQL database named YATM.
- Open pgAdmin4 application that was installed as part of the PostgreSQL installation.
- Expand the "Servers" on the left panel until you see the "Databases". You might be prompted to enter your server password that was selected during installation.
- Right click on Databases and select Create > Database. </br> [<img src="https://github.com/user-attachments/assets/f40b3ef3-954d-419b-a020-2f6c591d5d8c" width="250"/>](https://github.com/user-attachments/assets/f40b3ef3-954d-419b-a020-2f6c591d5d8c)
- Set the database name to `yatm` and click save.

### Setting up the backend
- clone the project from Github
- Open the backend/YATM folder as a project in IntelliJ IDEA
- Wait a few minutes after opening the project for the first time as IntelliJ installs maven dependencies and indexes the project. You can follow the progress at the lower right corner.
- Navigate to `src/main/java/com/yetanothertravelmap/yatm/YatmApplication.java` and run the main method to start the backend server.

### Setting up the frontend
- Navigate to the `frontend` folder.
  ```
  cd frontend
  ```
- Install the dependencies by running:
  ```
  npm install
  ```
- Run the project:
  ```
  npm run dev
  ```
- You can now open your browser and visit `http://localhost:5173/` to view the project.

$~$
## 📁 Project Structure

```
yatm/
├── frontend/        # React frontend
└── backend/         # Spring Boot backend
```
$~$
## 📄 License

MIT License. See `LICENSE` file for details.
