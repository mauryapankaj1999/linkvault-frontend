# Link Vault

A bookmark manager built with the MERN stack. Users can save URLs with
titles, tags, and notes, then search, filter, sort, edit, and delete
saved bookmarks.

## Live application

-   **Frontend:** https://linkvault-frontend-sable.vercel.app
-   **Backend API:** https://linkvault-backend-xshf.onrender.com
-   **API base URL:** https://linkvault-backend-xshf.onrender.com/api

## Tech stack

### Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Axios
-   TanStack Query
-   React Router

### Backend

-   Node.js
-   Express
-   MongoDB with Mongoose
-   Axios and Cheerio for best-effort webpage metadata extraction
-   `ipaddr.js` and DNS lookup for URL/IP validation

## Features

-   Create, view, update, and delete bookmarks
-   Save a URL with a title, tags, and notes
-   Best-effort extraction of the webpage title and meta description
-   Search bookmarks by title/tag
-   Filter bookmarks by tag
-   Pagination and created-date sorting
-   URL protocol validation (HTTP/HTTPS only)
-   Duplicate URL detection
-   Basic protection against localhost/private IP targets

## Project structure

The project is split into two applications:

``` text
linkvault/
├── linkvault-frontend/
│   ├── src/
│   ├── .env.example
│   └── package.json
└── linkvault-backend/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── utils/
    ├── server.js
    ├── .env.example
    └── package.json
```

> The exact folder names may differ depending on how the repositories
> are arranged.

## Prerequisites

-   Node.js (use a currently supported LTS version)
-   npm
-   MongoDB running locally, or a MongoDB Atlas connection string

## Run the backend locally

1.  Clone the backend repository:

   
    git clone <BACKEND_GITHUB_REPOSITORY_URL>
    cd <BACKEND_PROJECT_DIRECTORY>
   

2.  Install dependencies:

    npm install

3.  Create a `.env` file in the backend root:

    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/linkvault

    For MongoDB Atlas, replace the local MongoDB URI with your Atlas
    connection string. Do not commit `.env` or expose database
    credentials.

4.  Start the backend:

  

    The backend should run at `http://localhost:5000`.

## Run the frontend locally

1.  Clone the frontend repository:

    
    git clone <FRONTEND_GITHUB_REPOSITORY_URL>
    cd <FRONTEND_PROJECT_DIRECTORY>
   

2.  Install dependencies:

    
    npm install
    

3.  Create a `.env` file in the frontend root:

    
    VITE_API_URL=http://localhost:5000/api
4.  Start the Vite development server:
  
    npm run dev
    

    Open the local URL printed by Vite in your browser.

## Environment variables

  ---------------------------------------------------------------------------------------------
  Application       Variable          Description       Example
  ----------------- ----------------- ----------------- ---------------------------------------
  Backend           `PORT`            Express server    `5000`
                                      port              

  Backend           `MONGO_URI`       MongoDB           `mongodb://127.0.0.1:27017/linkvault`
                                      connection string 

  Frontend          `VITE_API_URL`    Backend API base  `http://localhost:5000/api`
                                      URL               
  ---------------------------------------------------------------------------------------------

For the deployed Vercel frontend, set:


VITE_API_URL=https://linkvault-backend-xshf.onrender.com/api


After changing a Vercel environment variable, redeploy the frontend so
the new value is included in the Vite build.

## API endpoints

Base URL: `/api/bookmarks`

  -------------------------------------------------------------------------------
  Method                  Endpoint                Purpose
  ----------------------- ----------------------- -------------------------------
  `POST`                  `/api/bookmarks`        Create a bookmark

  `GET`                   `/api/bookmarks`        List bookmarks with
                                                  pagination/search/filter/sort

  `GET`                   `/api/bookmarks/:id`    Get one bookmark

  `PATCH`                 `/api/bookmarks/:id`    Update a bookmark

  `DELETE`                `/api/bookmarks/:id`    Delete a bookmark
  -------------------------------------------------------------------------------

### Create bookmark example


{
  "url": "https://example.com",
  "title": "Example",
  "tags": ["reading", "tools"],
  "notes": "A useful website"
}

The API may fetch the page title and description when these are not
supplied. Metadata extraction is best-effort: a remote site may block
requests, time out, or provide no metadata.

## Deployment

-   Frontend is deployed on Vercel.
-   Backend is deployed on Render.
-   MongoDB is hosted on MongoDB Atlas.
-   Configure `VITE_API_URL` in the Vercel project environment
    variables.
-   Configure `MONGO_URI` and `PORT` in the Render service environment
    variables.
-   Never commit `.env` files, database passwords, or API secrets.

## Notes and limitations

-   Metadata fetching depends on the target website and may fail without
    preventing bookmark creation.
-   URL/IP checks provide basic SSRF mitigation, not a complete
    production-grade guarantee against every DNS rebinding or
    network-level attack.
-   The free hosting tier may take time to wake up after inactivity.
