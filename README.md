 ****************RBA System - Backend Developer Assessment
A complete Role-Based Access Control system demonstrating secure authentication, session management, and activity logging with different user privileges.

******************* Project Overview
This application implements a robust RBAC system where different user roles have distinct access levels.
Built with Node.js backend and vanilla JavaScript frontend, it showcases professional-grade authentication and authorization patterns.

Core Features
****************Authentication & Security

JWT authentication with 15-minute token expiry for enhanced security

Password encryption using bcrypt hashing

Protected routes with role-based middleware

Secure session management with automatic logout

 ***********Role Management

Admin: Complete system control - create users, assign roles, manage activity logs

Manager: Read-only access to activity logs, can interact with buttons

User: Basic access to interactive features only

******************Activity Tracking

Real-time button click logging with user details and timestamps

Role-based log access (Admin can edit/delete, Manager can only view)

Complete audit trail of user interactions

 *******Interactive Interface

Clean, responsive design with role-appropriate UI elements

Real-time updates and feedback

Professional styling with intuitive navigation

***************** Technical Stack
Backend: Node.js + Express.js + MongoDB (Mongoose) + JWT + bcrypt
Frontend: HTML5 + CSS3 + Vanilla JavaScript + Fetch API
Database: MongoDB with two collections (users, activitylogs)

************* Project Architecture

pear-projet/
├── backend/
│   ├── controllers/          # Business logic
│   │   ├── authController.js     # Login/logout with 15min JWT expiry
│   │   ├── adminController.js    # User management & role assignment
│   │   └── activityController.js # Activity logging & CRUD operations
│   ├── middlewares/
│   │   └── auth.js              # JWT verification & role authorization
│   ├── models/
│   │   ├── user.model.js        # User schema with roles
│   │   └── activityLog.model.js # Activity logging schema
│   ├── routes/                  # API endpoints
│   ├── server.js               # Express server setup
│   └── .env                    # Environment configuration
├── frontend/
│   └── index.html              # Complete SPA with role-based rendering
└── README.md

 *************Key Implementation Details
Session Management (15-min expiry): JWT tokens are configured in controllers/authController.js with expiresIn: "15m" for security. The middleware/auth.js automatically validates token expiry and forces re-authentication.

Role Hierarchy: Admin > Manager > User with granular permissions enforced at both API and UI levels.

Security Features: All passwords are bcrypt-hashed, routes are protected by authentication middleware, and role-based authorization prevents unauthorized access.

**************** Quick Start & Testing
Setup: npm install → Configure .env with MongoDB URI → npm run dev

Initialize: Create first admin via frontend interface

Test Roles: Login as admin to create manager/user accounts, then test different access levels

Verify Security: Try accessing admin features with manager/user accounts (should be blocked)
