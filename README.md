Credit Score Frontend
Credit Score Frontend is a user-friendly React application for managing clients in a credit scoring system, visualizing their statuses, applications, and profiles.
The interface features a digital/dark theme, kanban board with drag & drop, persistent data storage, and authentication support.

🚀 Core Features
CreditForm: Fill-out form to send client parameters for scoring, with live results display.

Profile: User profile page with Logout functionality and personal info.

Clients Kanban board: Visual management of applicants by status (New, In Review, Approved, Rejected).

Add new clients (modal form)

Drag & drop between statuses

Persistent storage in JSON + localStorage (clients never disappear after page refresh!)

View, edit, and delete clients directly from the board

Navigation menu: Fixed and adaptive (hidden on the login page)

Login page: Simple login flow for user authentication

🛠️ Tech Stack
React 19+

react-router-dom (routing)

@hello-pangea/dnd (modern drag and drop for Kanban)

CSS-in-JS (inline styles for digital/dark theme)

localStorage for storing client data locally

⚡ Quick Start
Install dependencies:

text
npm install
Start the project:

text
npm run start
The app will open at http://localhost:3000

Usage highlights:

Add new clients in the “Kanban” page

Manage statuses via drag & drop

Edit, delete, and view client details

Navigation menu is visible on all pages except login

Log in to access full functionality

📁 Data Storage
Client data is loaded from src/data/clients.json on first run.

All changes are automatically saved in localStorage—your clients and Kanban data persist across refreshes.

To reset clients, manually clear your browser’s localStorage.

🖥️ Project Structure
text
src/
  pages/
    CreditFormPage.jsx
    ProfilePage.jsx
    KanbanClientsPage.jsx
    LoginPage.jsx
    CreditFormPage.jsx
  components/
    MenuNav.jsx
  data/
    clients.json
App.jsx
🔒 Authentication
Login page (/login) provides simple email/password authentication.

After login, you have access to main app functions and navigation menu.

“Logout” button on ProfilePage sends you to the login page.

💡 Development & Expansion
Add components for application history, reports, admin dashboard, stats, etc.

Easily add any new page to the router (App.jsx) and menu (MenuNav).

Replace localStorage/JSON with API calls to your backend for full-stack integration.

📝 License
MIT

For questions/feature requests, contact the repository owner.
Everything is extendable, customizable, and ready for your next big use case!

Enjoy building with Credit Score Frontend!
