Full-Stack Data Fetching with Pagination and Filtering in React and Node.js

A simple full-stack application with a React frontend and Node.js (Express) backend that fetches and displays paginated data from MongoDB Atlas with search functionality.

Features
	•	Fetch data from the backend API
	•	Search functionality to filter results
	•	Pagination with automatic reset after page 3
	•	Styled UI using Bootstrap with hover effects
	•	Backend API using Express.js and MongoDB

Tech Stack

Frontend:
	•	React.js (JavaScript Framework)
	•	Bootstrap (For UI Styling)
	•	Fetch API (To communicate with the backend)

Backend:
	•	Node.js + Express.js (For REST API)
	•	MongoDB Atlas (Cloud Database)
	•	Mongoose (MongoDB ODM for Node.js)
	•	CORS & dotenv (For API security & environment variables)

Getting Started

Backend Setup
	1.	Navigate to the backend folder

cd backend

	2.	Install Dependencies

npm install
    3.Folder structure
    backend/
            │── node_modules/      # Installed dependencies
            │── .env               # Environment variables (MongoDB URI)
            │── index.js           # Main entry point (Express server)
            │── package.json       # Project dependencies
            │── models/
            │   ├── Item.js        # Mongoose schema/model


	4.	Start the Backend Server
    node index.js

API Endpoint:
	•	Base URL: http://localhost:5000
	•	Fetch Items API: http://localhost:5000/api/items?page=${page}&search=${search}

Frontend Setup
	1.	Navigate to the frontend folder

cd Youngdiv

	2.	Install Dependencies

npm install
    3. set folder structure

                    react-app/
                │── public/                  # Static assets
                │   ├── index.html           # Main HTML file
                │── src/                     # Source code
                │   ├── components/          # Reusable UI components
                │   │   ├── ItemList.js      # Displays items
                │   │   ├── SearchBar.js     # Search input field
                │   ├── App.js               # Main app component
                │   ├── index.js             # Entry point
                │   ├── styles.css           # Global styles
                │── package.json             # Project dependencies
                │── README.md                # Documentation
             

	3.	Start the React App

npm run start

The app will open at http://localhost:3000

Fetching Data from API

	•	Fetch Items API: http://localhost:5000/api/items?page=${page}&search=${search}

The React frontend fetches paginated and searchable data from the backend API. The data is displayed in a clean and responsive UI with Bootstrap styling. If the user reaches page 3, the pagination resets to page 1 automatically.

Demo Video

Watch the Demo (Replace # with the actual link after recording)

