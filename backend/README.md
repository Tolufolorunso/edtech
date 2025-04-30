# 📘 Authentication API Docs

Base URL: `http://localhost:5000/api/auth`

---

## 📝 1. Register a New User

**Endpoint:** `POST /register`  
**Access:** Public

### ✅ Request Body (Register)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "role": "student" // or "instructor"
}
```

### ✅ Success Response

```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### ❌ Possible Errors

```json
{ "message": "Email already in use" }
```

```json
{ "errors": [ { "msg": "Email is invalid" }, ... ] }
```

---

## 🔐 2. Login

**Endpoint:** `POST /login`  
**Access:** Public

### ✅ Request Body

```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

### ✅ Success Response

```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### ❌ Possible Errors

```json
{ "message": "Invalid credentials" }
```

---

## 🧠 3. Forgot Password

**Endpoint:** `POST /forgot-password`  
**Access:** Public

### ✅ Request Body

```json
{
  "email": "john@example.com"
}
```

### ✅ Success Response

```json
{ "message": "Reset email sent (check console)" }
```

📌 _The reset link will appear in your backend console like:_  
`http://localhost:3000/reset-password?token=RANDOM_TOKEN`

---

## 🔁 4. Reset Password

**Endpoint:** `POST /reset-password`  
**Access:** Public (via token)

### ✅ Request Body

```json
{
  "token": "RANDOM_TOKEN_FROM_RESET_LINK",
  "newPassword": "newsecure123"
}
```

### ✅ Success Response

```json
{ "message": "Password reset successful" }
```

### ❌ Possible Errors

```json
{ "message": "Invalid or expired token" }
```

---

## 🔒 Middleware (for Protected Routes)

**Add this to `Authorization` header:**

```
Authorization: Bearer JWT_TOKEN_HERE
```

If token is missing or invalid:

```json
{ "message": "Unauthorized" }
```

# 📚 EdTech API – Step 2: Courses, Tracks, Lessons, Enrollments, Resources

---

## 📁 Base Paths

- Tracks: `http://localhost:5000/api/tracks`
- Courses: `http://localhost:5000/api/courses`
- Enrollments: `http://localhost:5000/api/enrollments`
- Lessons: `http://localhost:5000/api/lessons`
- Resources: `http://localhost:5000/api/resources`

---

## 🧱 TRACKS

### ▶️ Create Track  
**POST /api/tracks** (Auth required)

```json
{
  "title": "Fullstack Development",
  "description": "Learn JS end-to-end"
}
```

**Response:**

```json
{
  "_id": "track_id",
  "title": "Fullstack Development",
  "description": "...",
  ...
}
```

### ▶️ Get All Tracks  
**GET /api/tracks**

---

## 🎓 COURSES

### ▶️ Create Course  
**POST /api/courses** (Auth required)

```json
{
  "title": "React Basics",
  "description": "Learn React.js",
  "trackIds": ["track_id_1", "track_id_2"]
}
```

**Response:**

```json
{
  "_id": "course_id",
  "title": "React Basics",
  ...
}
```

### ▶️ Get All Courses  
**GET /api/courses**

### ▶️ Get Course by ID  
**GET /api/courses/:id**

---

## 🙋 ENROLLMENTS

### ▶️ Enroll in Course  
**POST /api/enrollments/:courseId** (Student only)

**Response:**

```json
{
  "_id": "enrollment_id",
  "student": "...",
  "course": "...",
  ...
}
```

### ▶️ View My Enrollments  
**GET /api/enrollments/my**

---

## 📺 LESSONS

### ▶️ Create Lesson for Course  
**POST /api/lessons/:courseId** (Instructor only)

```json
{
  "title": "Intro to Arrays",
  "videoUrl": "https://youtube.com/embed/xyz",
  "content": "Lesson notes...",
  "position": 1
}
```

### ▶️ Get Lessons by Course  
**GET /api/lessons/course/:courseId**

### ▶️ Get Single Lesson  
**GET /api/lessons/:lessonId**

---

## 📂 RESOURCES

### ▶️ Add Resource to Lesson  
**POST /api/resources/:lessonId** (Instructor)

```json
{
  "type": "pdf",
  "title": "Array Cheatsheet",
  "url": "https://example.com/arrays.pdf"
}
```

### ▶️ Get All Resources for Lesson  
**GET /api/resources/lesson/:lessonId**

---

## 🧾 Resource Types Supported

- `"pdf"`
- `"doc"`
- `"link"`
- `"note"`
- `"assignment"`

---

🔐 Protected endpoints require JWT token in headers:

```
Authorization: Bearer YOUR_JWT_TOKEN
```
