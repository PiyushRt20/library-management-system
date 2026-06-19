const express = require("express");
// const {users} = require('./data/users.json');

const dotenv = require('dotenv');



//import database connection file
const DbConnection = require('./databaseConnection');


//importing routes
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');


dotenv.config(); 


const app = express();

DbConnection();

const PORT = 8081;


app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({
        message : `Home page :-)`
    })
})

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running at port http://localhost:${PORT}`);
})
