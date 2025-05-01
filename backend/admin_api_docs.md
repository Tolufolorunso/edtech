
# 🛡️ Admin API Documentation

Base URL: `http://localhost:5000/api/admin`

---

## 🔐 Headers

All admin routes require:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 👥 Get All Users

**GET /users**  
**Access:** `admin`, `superadmin`

### ✅ Response

```json
[
  {
    "_id": "userId",
    "name": "John",
    "email": "john@example.com",
    "role": "student"
  },
  ...
]
```

---

## 🔼 Promote User

**PUT /promote/:userId**  
**Access:**  
- `admin` → can promote to `instructor`, `student`  
- `superadmin` → can promote to `admin`, `superadmin`, `instructor`

### ✅ Request Body

```json
{
  "role": "instructor"
}
```

### ✅ Response

```json
{ "message": "User promoted to instructor" }
```

### ❌ Errors

```json
{ "message": "Only superadmin can assign admin roles" }
```

---

## 🗑️ Delete User

**DELETE /users/:userId**  
**Access:**  
- `admin` → can delete `student`, `instructor`  
- `superadmin` → can delete anyone

### ✅ Response

```json
{ "message": "User deleted" }
```

### ❌ Errors

```json
{ "message": "Only superadmin can delete an admin" }
```

---

## ✅ Roles Summary

| Role        | Can Promote | Can Delete | Notes                      |
|-------------|-------------|------------|----------------------------|
| student     | ❌          | ❌         | -                          |
| instructor  | ❌          | ❌         | -                          |
| admin       | ✅ (limited)| ✅         | Cannot touch other admins |
| superadmin  | ✅ (all)    | ✅         | Full control               |

