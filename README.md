# Simba Motors - Car Dealership Website

A full-stack car dealership website built with React.js, Node.js, Express.js, MongoDB, and Tailwind CSS.

## Features

- **Public View**: Car listings with filtering, sorting, search, and WhatsApp ordering
- **Admin Panel**: Secure login with full CRUD operations for car management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Uploads**: Cloudinary integration for car images
- **Real-time Updates**: Instant reflection of changes on the public view
- **Wishlist**: Save favorite cars functionality

## Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB Atlas
- **Authentication**: JWT
- **Image Storage**: Cloudinary
- **Deployment**: Ready for production

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI="your_mongodb_connection_string"
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   PORT=3001 npm start
   ```

2. Start the Next.js frontend development server:

   ```bash
   cd nextjs-simba-motors
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

- **Email**: clintonochieng072@gmail.com
- **Password**: admin123
- Access the admin panel at `/admin`

## API Endpoints

### Public Routes

- `GET /api/cars` - Get all cars with optional filtering
- `GET /api/cars/:id` - Get a specific car

### Admin Routes (Protected)

- `POST /api/auth/login` - Admin login
- `GET /api/admin/cars` - Get all cars (admin)
- `POST /api/admin/cars` - Add a new car
- `PUT /api/admin/cars/:id` - Update a car
- `DELETE /api/admin/cars/:id` - Delete a car

## Deployment

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Serve the backend and frontend build files using a production server (e.g., PM2, Heroku, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

🟢 Last redeploy triggered for environment variable update.
