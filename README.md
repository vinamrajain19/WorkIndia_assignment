<div align="center">
    <h1>WorkIndia IRCTC Assignment</b></h1>
</div>

## 🎓Overview
The Railway Management System is a web application designed to facilitate train booking and management. It provides functionalities for both administrators and logged-in users.

### Key Features
1. User Roles:
          Admin: Responsible for managing trains, including adding new trains, updating seat availability, and other administrative tasks.
          Logged-in Users: Can check train availability, seat availability between stations, book seats, and view booking details.
          
2. Real-time Train Availability:
          Users can check the availability of trains between two stations in real-time.
          Seat availability is displayed dynamically, allowing users to decide on booking based on current availability.
   
3. Booking System:
        Users can book seats if available.
        Concurrent booking scenarios are handled to prevent overbooking through race condition management.
   
4. Role-Based Access Control (RBAC):
        Different functionalities are accessible based on the user's role.
        Admins have full control over train management and system configurations.
        Logged-in users have restricted access to booking and checking functionalities.

5. Security Measures:
        Authentication and authorization mechanisms are implemented to secure user data and operations.
        Admin actions are protected to prevent unauthorized modifications.

## 👨‍💻 Tech Stack
Node.js<br></br>
Express.js<br></br>
MySQL<br></br>

## Setup

1. Clone the repository.
2. Install all the dependencies ( npm install )
3. Create a db connection and add a .env file with all these credentials: PORT, USER, HOST, PASSWORD, JWT_SECRET.
4. Start a server (node index.js).
5. Verify the details using Postman.

## Screenshots

### Admin Registration
![Screenshot (9)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/80e4c96f-07e2-4a73-92b0-8edac870ffde)
![Screenshot (10)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/b3ffe032-8af4-4a5d-a32e-9e7bdcb53787)

### Admin Login
![Screenshot (11)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/77d66b02-3cca-42e9-9299-510b038f4d2d)

### Add Train by Admin
![Screenshot (13)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/6b00cc67-5e96-4c0a-a81e-a328ce5cbfe6)
![Screenshot (14)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/36fc1310-743a-41c6-a565-62b6a9ebc429)

### Get Train details
![Screenshot (18)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/df3e8098-1e19-48d2-9ba3-06d4d8013af9)

### Book a Seat 
![Screenshot (19)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/2a28a463-7979-4486-8e3c-b4a6756d7f6f)

### Get Specific booking details
![Screenshot (20)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/489d7c3d-4160-4008-a23e-48608eba50b7)
![Screenshot (21)](https://github.com/vinamrajain19/WorkIndia_assignment/assets/91343225/b06cb056-e2eb-406b-946b-cc2e9438e926)

## How to handle Race Condition

Row-Level Locking: When a user initiates a booking, the specific row for that train is locked during the transaction. This lock prevents other transactions from accessing or altering the same row until the ongoing transaction completes, either by being committed or rolled back.

Transactional Integrity: All actions, including locating the train, updating the seat count, and creating the booking, are executed within a single transaction. This ensures that either all actions are completed successfully, or none are, thereby maintaining the integrity of the database.

Example Scenario:

1. User A begins a booking transaction, locking the row for the specific train.
2. User B attempts to book a seat on the same train while User A's transaction is still active. Since the row is locked, User B's request is put on hold until User A's transaction concludes.
3. Once User A's transaction is either committed or rolled back, User B's request proceeds. If User A booked the last available seat, User B will find no seats available and receive a "No available seats" message.
   
This approach ensures that no two users can book the same seat simultaneously, effectively preventing race conditions and ensuring consistent and reliable seat booking.

