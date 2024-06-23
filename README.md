# Business Cards Manager

Business Cards Manager is a web application designed for professionals to manage and share digital business cards. Whether you're an individual user or a business, you can sign up, create, and manage your business cards effortlessly. Users can like and save their favorite business cards, and business accounts have additional capabilities to create, update, and delete their cards.

## Table of Contents

-   [Installation](
    ## Installation

1.  **Download the Files**

    Clone the repository from GitHub or download the ZIP file and extract it.

2.  **Open Your Text Editor (e.g., VS Code)**

    Navigate to the project directory (`my-app`) using your preferred text editor.

3.  **Install Dependencies**

        Open a terminal in the `my-app` folder and run the following command to install the necessary dependencies:

        ```bash
        npm install
        ```

    )

-   [Usage](

## Usage

**Signing Up**

        1.  Register as a User or Business

            Navigate to the application.
            Click on the "Sign Up" button.
            Fill out the registration form with your details.
            Choose whether to register as a user or a business.

**Creating Business Cards**

        2. Creating a Business Card

            Once logged in, navigate to the dashboard.
            Click on the "Create New Card" button.
            Fill in the details for your business card, such as name, contact information, and company details.
            Save the card to your profile.

**Managing Business Cards**

        3.  Managing Your Cards (Business Accounts Only)

            As a business user, you have additional options to manage your business cards.
            Edit existing cards to update information.
            Delete cards that are no longer needed.

**Viewing and Interacting with Cards**

        4.  Viewing and Interacting with Cards

                Browse through the list of available business cards.
                Click on a card to view its details.
                Like or save cards that interest you.

**Searching for Cards**

        5. Searching for Cards

            Use the search functionality to find specific business cards based on name, company, or other criteria.
            Enter keywords into the search bar and press "Enter" to see matching results.)

-   [Available Scripts](

## Available Scripts

1. `npm start`
   Runs the app in development mode.
   Open http://localhost:3000 to view it in the browser.
2. `npm test`
   Launches the test runner in the interactive watch mode.
   See the section about running tests for more information.
3. `npm run build`
   Builds the app for production to the build folder.
   It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.
    Your app is ready to be deployed!

4. `npm run eject`
   _Note: this is a one-way operation. Once you eject, you can’t go back!_

    If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

    Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

    You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Explanation:

1. npm start: Starts the development server and opens the application in your default web browser. It automatically reloads the page when you make changes to the code.

2. npm test: Launches the test runner in watch mode. It runs tests interactively and re-runs them when files are modified.

3. npm run build: Builds the production-ready application into the build folder. It optimizes the build for performance and prepares it for deployment.

4. npm run eject: Allows you to eject from Create React App’s built-in configurations. This operation is irreversible and gives you full control over the build tools configuration.
   )

-   [Project Structure](

    ## Project Stracture

    React-Final-DanielAllali/
    │
    ├── public/
    │ ├── index.html
    │ └── logo.png
    │ └── manifest.json
    │ └── robots.txt
    │
    ├── src/
    │ ├── components/
    │ │ ├── header.jsx
    │ │ ├── NavBar.jsx
    │ │ ├── searchComp.jsx
    │ │ ├── CardsPage.jsx
    │ │ ├── Favorites.jsx
    │ │ ├── MyCards.jsx
    │ │ ├── About.jsx
    │ │ ├── footer.jsx
    │ │ └── ...
    │ │
    │ ├── hooks/
    │ │ ├── useApi.jsx
    │ │ └──
    │ │ app.css
    │ │ app.js
    │ │ index.css
    │ │ index.js
    │ │ reportWebVitals.js
    │ │ store.js
    │
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md
    )

## Installation

1. Clone the repository

```bash
git clone https://github.com/DanielAllali/React-Final_DanielAllali
```
