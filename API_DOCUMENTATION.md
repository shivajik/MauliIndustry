# API Documentation

This document describes the RESTful API endpoints for the Mauli Industries CMS.

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

Most API endpoints require authentication. To authenticate:

1. **Login** - POST `/api/auth/login`
   ```json
   {
     "email": "admin@mauliindustries.co.in",
     "password": "admin123"
   }
   ```
   
   Response includes a `session-id` cookie that should be sent with subsequent requests.

2. **Session Management** - Sessions are stored in cookies and expire after 24 hours.

## API Endpoints

### Products

#### List Products
- **GET** `/api/products`
- **Auth**: Not required
- **Response**: 
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "shearing-blades",
        "name": "Shearing Blades",
        "description": "...",
        "image_url": "...",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
  ```

#### Get Product
- **GET** `/api/products/:id`
- **Auth**: Not required
- **Response**: Single product object

#### Create Product
- **POST** `/api/products`
- **Auth**: Required
- **Body**:
  ```json
  {
    "id": "product-id",
    "name": "Product Name",
    "description": "Product description",
    "image_url": "https://example.com/image.jpg"
  }
  ```

#### Update Product
- **PUT** `/api/products/:id`
- **Auth**: Required
- **Body**: Partial product object (all fields optional except id)

#### Delete Product
- **DELETE** `/api/products/:id`
- **Auth**: Required

### Clients

#### List Clients
- **GET** `/api/clients`
- **Auth**: Not required

#### Get Client
- **GET** `/api/clients/:id`
- **Auth**: Not required

#### Create Client
- **POST** `/api/clients`
- **Auth**: Required
- **Body**:
  ```json
  {
    "id": "client-id",
    "name": "Client Name",
    "logo_url": "https://example.com/logo.jpg"
  }
  ```

#### Update Client
- **PUT** `/api/clients/:id`
- **Auth**: Required

#### Delete Client
- **DELETE** `/api/clients/:id`
- **Auth**: Required

### Company Info

#### Get Company Info
- **GET** `/api/company`
- **Auth**: Not required
- **Response**: Company information object

#### Update Company Info
- **PUT** `/api/company`
- **Auth**: Required
- **Body**: Partial company info object

### Pages

#### List Pages
- **GET** `/api/pages`
- **Auth**: Not required

#### Get Page
- **GET** `/api/pages/:id`
- **Auth**: Not required

#### Create Page
- **POST** `/api/pages`
- **Auth**: Required
- **Body**:
  ```json
  {
    "id": "page-id",
    "title": "Page Title",
    "slug": "page-slug",
    "content": "Page content",
    "status": "published",
    "author": "Admin",
    "excerpt": "Page excerpt"
  }
  ```

#### Update Page
- **PUT** `/api/pages/:id`
- **Auth**: Required

#### Delete Page
- **DELETE** `/api/pages/:id`
- **Auth**: Required

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Additional details"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Validation

All input data is validated using Zod schemas. Validation errors include detailed field-level error messages.

## Database

The API uses a layered architecture:
1. **API Routes** (`app/routes/api/`) - Handle HTTP requests/responses
2. **Database Service** (`app/lib/services/database.ts`) - Business logic
3. **Supabase Client** (`app/lib/supabase.ts`) - Database connection

The system automatically falls back to PostgreSQL pool or static data if Supabase is unavailable.

