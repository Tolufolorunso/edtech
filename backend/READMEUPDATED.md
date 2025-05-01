
# 📘 EdTech API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔐 AUTHENTICATION

### ▶️ Register  
**POST /auth/register**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "role": "student"
}
```

### ▶️ Login  
**POST /auth/login**

```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

### ▶️ Forgot Password  
**POST /auth/forgot-password**

```json
{
  "email": "john@example.com"
}
```

### ▶️ Reset Password  
**POST /auth/reset-password**

```json
{
  "token": "RESET_TOKEN_HERE",
  "newPassword": "newpass123"
}
```

---

## 🧠 TRACKS

### ▶️ Create Track  
**POST /tracks** (Instructor only)

```json
{
  "title": "Frontend Dev",
  "description": "HTML, CSS, JS"
}
```

### ▶️ Get All Tracks  
**GET /tracks**

---

## 🎓 COURSES

### ▶️ Create Course  
**POST /courses** (Instructor only)

```json
{
  "title": "React Basics",
  "description": "Intro to React",
  "trackIds": ["trackId1", "trackId2"],
  "isPremium": true
}
```

### ▶️ Get All Courses  
**GET /courses**

### ▶️ Get Course by ID  
**GET /courses/:id**

### ▶️ Update Course  
**PUT /courses/:id**

### ▶️ Delete Course  
**DELETE /courses/:id**

---

## 🧩 LESSONS

### ▶️ Create Lesson  
**POST /lessons/:courseId** (Instructor only)

```json
{
  "title": "JS Arrays",
  "videoUrl": "https://youtube.com/embed/abc123",
  "content": "Lesson content",
  "position": 1
}
```

### ▶️ Get Lessons by Course  
**GET /lessons/course/:courseId**

### ▶️ Get Single Lesson  
**GET /lessons/:lessonId**

---

## 📂 RESOURCES

### ▶️ Add Resource to Lesson  
**POST /resources/:lessonId**

```json
{
  "type": "pdf",
  "title": "Cheatsheet",
  "url": "https://cdn.com/file.pdf"
}
```

### ▶️ Get Resources by Lesson  
**GET /resources/lesson/:lessonId**

---

## ✅ PROGRESS TRACKING

### ▶️ Complete Lesson  
**POST /progress/lesson/:lessonId**

### ▶️ View Course Progress  
**GET /progress/course/:courseId**

### ▶️ Check Certificate Eligibility  
**GET /progress/certificate/:courseId**

---

## 📥 ENROLLMENTS

### ▶️ Enroll in Course or Track  
**POST /enrollments**

```json
{ "courseId": "abc123" }
// or
{ "trackId": "xyz456" }
```

### ▶️ View My Enrollments  
**GET /enrollments/my**

---

## 🔐 AUTH HEADERS

All protected routes require this header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```
