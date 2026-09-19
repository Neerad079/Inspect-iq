# SmartInspect AI — API Documentation

> **For Member 2 (Frontend Developer)**
> Base URL: `http://localhost:8080`
> All protected endpoints require: `Authorization: Bearer <JWT_TOKEN>`

---

## Authentication

### Login
| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/api/auth/login` |
| **Auth** | None |

**Request:**
```json
{
  "email": "admin@smartinspect.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "role": "ADMIN",
    "name": "Admin User",
    "email": "admin@smartinspect.com"
  },
  "timestamp": "2026-09-18T21:45:00"
}
```

**Demo Accounts:**
| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@smartinspect.com | password123 |
| INSPECTOR | rajesh.kumar@smartinspect.com | password123 |
| INSPECTOR | priya.sharma@smartinspect.com | password123 |
| INSPECTOR | amit.patel@smartinspect.com | password123 |
| INSPECTOR | sneha.reddy@smartinspect.com | password123 |
| INSPECTOR | vikram.singh@smartinspect.com | password123 |

---

## Institutions

### List All Institutions
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/institutions` |
| **Auth** | ADMIN |
| **Query Params** | `?status=ACTIVE` (optional, values: ACTIVE/INACTIVE/FLAGGED) |

**Response (200):**
```json
{
  "success": true,
  "message": "Institutions retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School - Dwarka",
      "address": "Sector 12, Dwarka, New Delhi",
      "latitude": 28.5921,
      "longitude": 77.0460,
      "capacity": 1200,
      "staffCount": 85,
      "beneficiaryCount": 1100,
      "status": "ACTIVE",
      "createdAt": "2026-09-18T21:00:00",
      "updatedAt": "2026-09-18T21:00:00"
    }
  ],
  "timestamp": "2026-09-18T21:45:00"
}
```

### Get Institution by ID
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/institutions/{id}` |
| **Auth** | ADMIN |

### Create Institution
| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/api/institutions` |
| **Auth** | ADMIN |

**Request:**
```json
{
  "name": "New School",
  "address": "123 Main Street, Mumbai",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "capacity": 500,
  "staffCount": 30,
  "beneficiaryCount": 450,
  "status": "ACTIVE"
}
```

### Update Institution
| Field | Value |
|-------|-------|
| **Method** | `PUT` |
| **URL** | `/api/institutions/{id}` |
| **Auth** | ADMIN |

**Request:** Same as Create (partial updates — only send fields to update)

---

## Inspectors

### List All Inspectors
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/inspectors` |
| **Auth** | ADMIN |

### Get Inspector by ID
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/inspectors/{id}` |
| **Auth** | ADMIN |

---

## Inspections

### List All Inspections
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/inspections` |
| **Auth** | ADMIN |

### Get Inspection by ID
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/inspections/{id}` |
| **Auth** | ADMIN, INSPECTOR |

### Get Inspector's Inspections
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/inspections/inspector/{inspectorId}` |
| **Auth** | ADMIN, INSPECTOR |

### Trigger Surprise Inspection
| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/api/inspections/surprise` |
| **Auth** | ADMIN |
| **Request Body** | None |

**Response (200):**
```json
{
  "success": true,
  "message": "Surprise inspection created successfully",
  "data": {
    "inspectionId": "INS-1005",
    "institution": "Government ITI - Pune",
    "inspector": "Officer Priya Sharma",
    "status": "ASSIGNED",
    "assignedAt": "2026-09-18T21:45:00"
  },
  "timestamp": "2026-09-18T21:45:00"
}
```

### Submit Inspection Report
| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/api/inspections/{id}/submit` |
| **Auth** | INSPECTOR |

**Request:**
```json
{
  "remarks": "Infrastructure needs improvement. Lab equipment outdated.",
  "checklistJson": "{\"cleanliness\":\"PASS\",\"safety\":\"PASS\",\"staffPresence\":\"PASS\",\"records\":\"FAIL\"}"
}
```

---

## Attendance

### Record Attendance
| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/api/attendance` |
| **Auth** | ADMIN |

**Request:**
```json
{
  "institutionId": 1,
  "date": "2026-09-18",
  "presentCount": 1050,
  "absentCount": 50,
  "totalCount": 1100
}
```

### Get Attendance for Institution
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/attendance/{institutionId}` |
| **Auth** | ADMIN |

---

## Evidence

### Upload Evidence
| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/api/evidence` |
| **Auth** | INSPECTOR |
| **Content-Type** | `multipart/form-data` |

**Form Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| file | File | Yes | Photo/video/document file |
| inspectionId | Long | Yes | Associated inspection ID |
| latitude | Double | No | GPS latitude |
| longitude | Double | No | GPS longitude |
| type | String | No | PHOTO (default), VIDEO, DOCUMENT |

### Get Evidence for Inspection
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/evidence/{inspectionId}` |
| **Auth** | ADMIN, INSPECTOR |

---

## AI Analysis

### Trigger AI Analysis
| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `/api/ai/analyze/{institutionId}` |
| **Auth** | ADMIN |
| **Request Body** | None |

**Response (200):**
```json
{
  "success": true,
  "message": "AI analysis completed",
  "data": {
    "institutionId": 11,
    "institutionName": "District Institute of Education - Patna",
    "anomalyScore": 0.85,
    "riskLevel": "HIGH",
    "details": "Low attendance pattern detected. Multiple complaints filed.",
    "alertGenerated": true,
    "analyzedAt": "2026-09-18T21:45:00"
  },
  "timestamp": "2026-09-18T21:45:00"
}
```

### Get Prediction History
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/ai/predictions/{institutionId}` |
| **Auth** | ADMIN |

---

## Alerts

### List All Alerts
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/alerts` |
| **Auth** | ADMIN |

### Get Alert by ID
| Field | Value |
|-------|-------|
| **Method** | `GET` |
| **URL** | `/api/alerts/{id}` |
| **Auth** | ADMIN |

### Mark Alert as Read
| Field | Value |
|-------|-------|
| **Method** | `PUT` |
| **URL** | `/api/alerts/{id}/read` |
| **Auth** | ADMIN |

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "timestamp": "2026-09-18T21:45:00"
}
```

| HTTP Code | Meaning |
|-----------|---------|
| 400 | Bad Request — Validation errors |
| 401 | Unauthorized — Missing/invalid JWT |
| 403 | Forbidden — Insufficient role |
| 404 | Not Found — Resource doesn't exist |
| 500 | Internal Server Error |

---

## Quick Reference Table

| # | API | Method | URL | Auth |
|---|-----|--------|-----|------|
| 1 | Login | POST | `/api/auth/login` | None |
| 2 | List Institutions | GET | `/api/institutions` | ADMIN |
| 3 | Get Institution | GET | `/api/institutions/{id}` | ADMIN |
| 4 | Create Institution | POST | `/api/institutions` | ADMIN |
| 5 | Update Institution | PUT | `/api/institutions/{id}` | ADMIN |
| 6 | List Inspectors | GET | `/api/inspectors` | ADMIN |
| 7 | Get Inspector | GET | `/api/inspectors/{id}` | ADMIN |
| 8 | List Inspections | GET | `/api/inspections` | ADMIN |
| 9 | Get Inspection | GET | `/api/inspections/{id}` | ADMIN/INSPECTOR |
| 10 | Inspector's Inspections | GET | `/api/inspections/inspector/{id}` | ADMIN/INSPECTOR |
| 11 | Surprise Inspection | POST | `/api/inspections/surprise` | ADMIN |
| 12 | Submit Inspection | POST | `/api/inspections/{id}/submit` | INSPECTOR |
| 13 | Record Attendance | POST | `/api/attendance` | ADMIN |
| 14 | Get Attendance | GET | `/api/attendance/{institutionId}` | ADMIN |
| 15 | Upload Evidence | POST | `/api/evidence` | INSPECTOR |
| 16 | Get Evidence | GET | `/api/evidence/{inspectionId}` | ADMIN/INSPECTOR |
| 17 | AI Analysis | POST | `/api/ai/analyze/{institutionId}` | ADMIN |
| 18 | AI Predictions | GET | `/api/ai/predictions/{institutionId}` | ADMIN |
| 19 | List Alerts | GET | `/api/alerts` | ADMIN |
| 20 | Get Alert | GET | `/api/alerts/{id}` | ADMIN |
| 21 | Mark Alert Read | PUT | `/api/alerts/{id}/read` | ADMIN |
