# HRM Software – Location-based Employee Attendance Management (Frontend)

## 🌐 Deployed Links
- **Frontend (Netlify)**: [https://your-netlify-site.netlify.app](#)
- **Backend (Render)**: [https://hrm-backend-api-ue97.onrender.com](https://hrm-backend-api-ue97.onrender.com)
- **Swagger Docs**: [https://hrm-backend-api-ue97.onrender.com/api-docs](#)

---

## 🚀 Tech Stack
- React.js (Hooks)
- React Router v6
- Axios with JWT + Refresh token
- Bootstrap 5
- Geolocation API
- Netlify deployment

---

## 🧩 Features
### Admin
- Dashboard summary (employee & attendance stats)
- Manage Employees (Create, View, Edit, Delete)
- Set Office Geolocation (Lat, Long, Radius)
- View Attendance, Filter by Employee/Date/Department
- Export Attendance (CSV / JSON)

### Employee
- Dashboard summary with attendance stats
- Check-in / Check-out with location validation
- View Attendance History (paginated)

### Common
- JWT-based authentication with refresh tokens
- Profile page (Admin & Employee)
- Responsive UI with collapsible sidebar
- Protected Routes

---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/hrm-frontend.git
   cd hrm-frontend

2. Install dependencies 
npm install

3. Run locally
  npm start