# Bike Service Booking Application

This is the MERN Application stack for managing bike services. It provides a platform for users to schedule bike services, track maintenance and history, and receive email notifications when a customer booked for service and when bike is ready for delivery. Admins can manage services , change the status of bookings, and receive email notifications for each booking.

## User Roles
  1.Admin: The Admin role manages the overall system, including managing services, booking statuses, and viewing customer bookings.
  2.Customer: The Customer role can add new bookings, view the status and history of their bookings.

## Features
- Notification
- Authentication
  
### Bike station owner:
 - View a list of all bookings filtered by status (Pending, Ready, Completed, All)
 - View details of each booking
 - Mark a booking as ready for delivery
 - Mark a booking as completed
 - Receive email notifications whenever a booking is made


### Customers
 - Register for an account with email address and mobile number
 - Book a service for a particular date
 - View the status of their bookings
 - View all previous bookings
 - Receive email notifications when their booking is ready for delivery
 - User account login/signup
 - Update password using OTP via email

## Technologies
- Reactjs
- Nodejs
- Expressjs
- MongoDB 
- Tailwind CSS
- NodeMailer (Email)

## Login

- Admin 
`username: vibeeshnataraj1@gmail.com`
-You have to add the password to the admin info DB to Login Admin Role

## Deployment

#### 1. Clone the Repository
Clone the Repository by using this github link 
```bash
https://github.com/vibeeshvibi/Bike-Service
```

#### 2. Go to the directory and install dependencies for both the FrontEnd and server
```bash
cd Front-End
npm install
```
```bash
cd Server
npm install
```

#### 3. Start the both, Server and Front-End

```bash
npm start
nodemon server.js
```

## Sample Data
Sample Data is in the Model Page
