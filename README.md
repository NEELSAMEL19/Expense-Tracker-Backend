<a href="https://expense-tracker-backend-e4gf.onrender.com/"><img align="right" src="./backend-button.svg" width="140" alt="Live Backend" /></a>

### Expense Tracker Backend
<em>REST API for user authentication and personal income, expense, and dashboard data, built with Express and MongoDB.</em>


<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" alt="Node.js" />
  &nbsp;
  <img src="https://img.shields.io/badge/Express-222222?style=flat&logo=express&logoColor=white" alt="Express" />
  &nbsp;
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB" />
  &nbsp;
  <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  &nbsp;
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white" alt="Zod" />
  &nbsp;
  <img src="https://img.shields.io/badge/ExcelJS-217346?style=for-the-badge&logo=microsoftexcel&logoColor=white" alt="ExcelJS" />
</p>

<hr />

### 🚀 About the project

**Expense Tracker Backend** provides the API for tracking personal income and expenses. It supports account registration and login, cookie-based authentication, per-user transaction management, dashboard totals and recent activity, and Excel exports for income and expense records.

### ✨ Features

<table>
  <tr>
    <td valign="top">

- ✅ User registration and login with hashed passwords
- ✅ JWT authentication stored in an HTTP-only cookie
- ✅ Authenticated profile endpoint and logout
- ✅ Add, list, and delete personal income records
- ✅ Add, list, and delete personal expense records

</td>
    <td valign="top">

- ✅ Dashboard totals for income, expenses, and balance
- ✅ Dashboard feed of recent income and expense transactions
- ✅ Download income and expense records as Excel workbooks
- ✅ Optional avatar upload during registration using Cloudinary
- ✅ MongoDB persistence with request validation and centralized error handling

</td>
  </tr>
</table>


### 🛠️ Tech Stack

| Backend | Database | Auth & Validation | Tools & Utilities |
|:-------:|:--------:|:-----------------:|:-----------------:|
| Node.js, Express.js | MongoDB, Mongoose | JWT, bcryptjs, Zod | Cloudinary, Multer, ExcelJS, CORS, Cookie Parser, dotenv |

### 🚀 Getting Started

<table>
  <tr>
    <td valign="top" width="40%">

#### Prerequisites

- **Node.js** (v18+ recommended)
- **npm**
- **MongoDB** running locally or through MongoDB Atlas
- **Cloudinary account** (only required for avatar uploads)

#### ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3030
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_own_jwt_secret
NODE_ENV=development

# Required only when uploading avatars
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

`PORT` defaults to `3030`. `MONGO_URI` and `JWT_SECRET` are required. The configured frontend origins are `https://expense-tracker-one-delta-51.vercel.app` and `http://localhost:3000`. Never commit your `.env` file or real credentials.

</td>
    <td valign="top" width="60%">

#### Installation

1. Clone the repository

```bash
   git clone https://github.com/NEELSAMEL19/Expense-Tracker-Backend.git
   cd Expense-Tracker-Backend
```

2. Install dependencies

```bash
   npm install
```

3. Start the development server

```bash
   npm run dev
```

4. Start the server

```bash
   npm start
```

The API root at `/` responds with `Expense Tracker API is running...`.

</td>
  </tr>
</table>

### 🔗 API Endpoints (Base URL: `/api`)

Protected endpoints require the `token` cookie set during registration or login. Requests that create records should send JSON; registration accepts an optional `avatar` image in multipart form data.

| Method | Endpoint | Description | Auth Required |
|:------:|----------|-------------|:-------------:|
| `POST` | `/auth/register` | Register a user and set the authentication cookie | No |
| `POST` | `/auth/login` | Authenticate a user and set the authentication cookie | No |
| `POST` | `/auth/logout` | Clear the authentication cookie | No |
| `GET` | `/auth/profile` | Get the authenticated user's profile | Yes |
| `GET` | `/dashboard` | Get income, expenses, balance, and recent transactions | Yes |
| `POST` | `/income/add` | Add an income record | Yes |
| `GET` | `/income/` | List the authenticated user's income records | Yes |
| `GET` | `/income/download` | Download income records as an Excel workbook | Yes |
| `DELETE` | `/income/:id` | Delete an income record | Yes |
| `POST` | `/expense/add` | Add an expense record | Yes |
| `GET` | `/expense/` | List the authenticated user's expense records | Yes |
| `GET` | `/expense/download` | Download expense records as an Excel workbook | Yes |
| `DELETE` | `/expense/:id` | Delete an expense record | Yes |

### 📁 Project Structure

```text
Expense-Tracker-Backend/
├── src/
│   ├── app.js                            # Express app, CORS, route mounting, and error handlers
│   ├── server.js                         # Loads environment and starts the API server
│   ├── common/
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js        # JWT cookie authentication
│   │   │   ├── error.middleware.js       # Not-found and error responses
│   │   │   └── upload.middleware.js      # Avatar image upload handling
│   │   └── utils/
│   │       ├── AppError.js                # Application error type
│   │       ├── asyncHandler.js             # Async route error forwarding
│   │       ├── cloudinary.js               # Cloudinary client configuration
│   │       └── generateToken.js            # JWT creation
│   ├── config/
│   │   └── db.js                          # MongoDB connection
│   ├── models/
│   │   ├── Expense.js                     # Expense record schema
│   │   ├── Income.js                      # Income record schema
│   │   └── User.js                        # User account schema
│   └── modules/
│       ├── auth/                          # Registration, login, logout, and profile
│       ├── income/                        # Income API, validation, and Excel export
│       ├── expenses/                      # Expense API, validation, and Excel export
│       └── dasboard/                      # Dashboard API and aggregation
├── uploads/                              # Temporary avatar uploads
├── .env                                  # Local environment variables (not committed)
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── backend-button.svg
```

<table>
  <tr>
    <td valign="top" width="50%">

#### 👥 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for bug fixes, documentation improvements, or new expense-tracking features.

</td>
    <td valign="top" width="50%">

#### 📄 License

This project currently declares the ISC license in `package.json`.

</td>
  </tr>
</table>


Made with ❤️ by [Neel Samel](https://github.com/NEELSAMEL19)
