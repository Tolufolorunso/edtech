# EdTech Platform

This is an EdTech platform with courses, bootcamps, and live classes.

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the following content:

```
NEXT_PUBLIC_USE_MOCK_API=true
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Mock API

For development purposes, the platform includes a mock API that simulates authentication without needing a backend server.

### Demo Accounts

- Regular User:
  - Email: test@example.com
  - Password: password123

- Bootcamp User:
  - Email: bootcamp@example.com
  - Password: password123

## Features

- Unified authentication system for both regular and bootcamp users
- Course catalog
- Bootcamp programs
- Live classes
- User tracking for completed lessons 