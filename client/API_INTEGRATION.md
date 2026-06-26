# School ERP Client - Frontend Setup

## Environment Variables

Copy `.env.local` to set your backend API URL:

```env
VITE_API_URL=http://localhost:5300/api
```

If not set, defaults to `http://localhost:5300/api`.

## Architecture

### Services

#### `src/services/authService.ts`
Handles all authentication API calls:
- `login(identifier, password)` - Login with username/email
- `requestPasswordReset(email)` - Request password reset code
- `storeAuthData(token, user)` - Store token and user in localStorage
- `getToken()` - Retrieve stored token
- `getUser()` - Retrieve stored user data
- `clearAuth()` - Clear all auth data on logout
- `isAuthenticated()` - Check if user is logged in

#### `src/services/apiClient.ts`
Reusable HTTP client with automatic token injection:
- `apiRequest(endpoint, options)` - Generic request maker
- `apiGet(endpoint)` - GET helper
- `apiPost(endpoint, body)` - POST helper
- `apiPut(endpoint, body)` - PUT helper
- `apiDelete(endpoint)` - DELETE helper

### Context

#### `src/context/AuthContext.tsx`
Global authentication state management:
- `useAuth()` - Hook to access auth state and methods
- `AuthProvider` - Wrapper component for app

### Components

#### `src/Login.tsx`
Login form with:
- Username/email and password inputs
- Password visibility toggle
- Error handling with specific messages from backend
- Forgot password modal with email confirmation

## Backend API Contract

### Login Endpoint
**POST** `/api/auth/login`

**Request:**
```json
{
  "identifier": "username_or_email",
  "password": "password"
}
```

**Response (Success):**
```json
{
  "message": "Login successful!",
  "token": "eyJhbGciOi...",
  "user": {
    "email": "user@example.com",
    "role": "student|teacher|admin",
    "title": "Math Teacher",
    "redirectTo": "/dashboard/student"
  }
}
```

**Response (Error):**
```json
{
  "error": "Username not found."
}
```

### Error Handling

The client automatically handles these error cases:
- "Username not found." → "Username or email not found"
- "User profile does not exist." → "Username or email not found"
- "Incorrect password" → "Incorrect password"
- Network errors → "Failed to connect to the server"

## Usage

### In Components

```typescript
import { useAuth } from './context/AuthContext'

function MyComponent() {
  const { user, token, isAuthenticated, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <div>Not logged in</div>
  }
  
  return <div>Welcome, {user?.email}</div>
}
```

### Making Authenticated API Calls

```typescript
import { apiGet } from './services/apiClient'

async function fetchUserData() {
  try {
    const data = await apiGet('/users/profile')
    console.log(data)
  } catch (err) {
    console.error('Failed to fetch:', err.message)
  }
}
```

## Running the App

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm build
```

Dev server runs on `http://localhost:5173` by default.
