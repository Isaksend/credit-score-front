🚦 Credit Score Frontend
Credit Score Frontend is a modern React application for visual credit scoring, client management, and UX analytics, designed with a sleek dark/digital style.

✨ Features
Credit Form — Submit client data to get instant credit scoring and risk analysis results.
<img width="1905" height="943" alt="image" src="https://github.com/user-attachments/assets/4f1ebcf1-92bb-4b4e-89e8-99ddd8a8a396" />


Kanban Board — Track clients by status: New, Review, Approved, Rejected (with drag-and-drop).
<img width="1898" height="946" alt="image" src="https://github.com/user-attachments/assets/a5466548-3389-4d75-b121-f3cd7a96b89f" />


Add, Edit, Delete Clients — Manage clients on the fly with modal forms, persistent across refreshes.

Profile Page — View and edit user info, logout securely.
<img width="1899" height="574" alt="image" src="https://github.com/user-attachments/assets/62b7e3b4-918a-4f30-b06c-38a22783d41a" />

Authentication — Navigate freely after login, clean auth flow.

Navigation Menu — Elegant, fixed navbar; auto-hides on the login page.

🛠️ Stack & Technologies
React 19+

react-router-dom — Routing

@hello-pangea/dnd — Kanban drag-and-drop

localStorage — Persistent client data (refresh-safe)

CSS-in-JS — Fully dark UI, digital accents

⚡ Quick Start
bash
git clone https://github.com/your-username/credit-score-frontend.git
cd credit-score-frontend
npm install
npm run start
# Open http://localhost:3000 in your browser
📁 Data Storage
Initial clients loaded from src/data/clients.json.

All changes saved automatically to browser localStorage.

Local data is persistent; reset by clearing browser localStorage.

📚 App Structure
text
src/
  pages/
    CreditFormPage.jsx
    ProfilePage.jsx
    KanbanClientsPage.jsx
    LoginPage.jsx
    ...
  components/
    MenuNav.jsx
  data/
    clients.json
App.jsx
🧑‍💼 Usage Tips
Add a Client: Click ‘+ Add Client’ on Kanban Board, fill out the modal form.

Edit/Delete: Click any client card to open editing modal, update details or delete.

Drag & Drop: Move cards between statuses intuitively.

Authentication: Log in on /login; “Logout” is on ProfilePage.

Navigation Menu: Shows on all pages except login for a distraction-free auth flow.

🚀 Extending
Add pages for history, reports, admin dashboard, stats, and more!

Plug in API endpoints for production backends (swap out localStorage/JSON).

Fully customizable for your business case.

📝 License
MIT

For issues, ideas, or contributions:
Open a pull request, or contact the repo owner directly!
