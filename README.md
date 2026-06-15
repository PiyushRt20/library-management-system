# library-management-system

this is a library management API backend for the managemnet of users and books in a library.

# Routes and the Endpoints

## /users
GET : get all the list of users in the library management system.
POST : create a new user in the library management system.

## /users/{id}

GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleting a user by their ID  (Check if the user still has an issued book) && {is there any fine/penalty to be collected}

## /users/subscription-details/{id}

GET: Get a user subscription details by their ID
    >> Date of subscription
    >> Valid till ?
    >> Fine if any ?

## /books

GET: Get all the books in the system
POST: Add a new book to the system

## /books/{id}

GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID

## /books/issued

GET: Get all the issued books

## /books/issued/withFine

GET: Get all issued books with their fine amount

### Subscription Types
    >>Basic (3 months)
    >>Standard (6 months)
    >>Premium (12 months)

>> if a user missed the subscription , renewal date then user should be collected with ₹1000

## Commands
npm init 
npm install express
npm install nodemon --save-dev

npm run dev

to restore node_modules and package-lock.json  --> npm install / npm i 