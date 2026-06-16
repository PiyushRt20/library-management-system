const express = require('express');
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();


//to fetch all books
router.get('', (req, res)=>{
    res.status(200).json({
        success : true,
        message : "All books fetched successfully",
        data : books
    })
})

//to fetch a single book by its id
router.get('/:id', (req, res)=>{
    const {id} = req.params;
    const book = books.find((b)=> b.id === id);

    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book with id ${id} not found`
        })
    }
    res.status(200).json({
        success : true,
        message : "Book fetched successfully",
        data : book
    })
})

//POST : create /add a new book
router.post('', (req, res)=>{
    //req.body should have id, title , author, genre, publicationDate
    const {id, title, author, genre,price,  publisher} = req.body;

    //validation
    if(!id || !title || !author || !genre || !price  || !publisher ){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    //check if book with the same id already exists
    const book = books.find((b)=> b.id === id);
    if(book){
        return res.status(400).json({
            success : false,
            message : `Book with id ${id} already exists`
        })
    }

    books.push({id, title, author, genre, price , publisher});
    res.status(201).json({
        success : true,
        message : "Book added successfully",
    })
})


//PUT : update a book by its id
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    //validation
    const book = books.find((b)=> b.id === id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book with id ${id} not found`
        })
    }

    //update book details
    const updatedBook = books.map((each)=>{
        if(each.id === id){
            return {...each, ...data};
        }
        return each;
    })
    res.status(200).json({
        success : true,
        message : "Book updated successfully",
        data : updatedBook
    })
})

//DELETE : delete a book by its id
router.delete('/:id', (req, res)=>{
    const {id} = req.params;

    //validation
    const book = books.find((b)=> b.id === id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book with id ${id} not found`
        })
    }

    const updatedBooks = books.filter((b)=> b.id !== id);
    res.status(200).json({
        success : true,
        message : "Book deleted successfully",
        data : updatedBooks
    })
})    

//Get all the issued books
//Route - GET /books/issued/use-name
router.get('/issued/user-name', (req, res)=>{

    const userWithIssuedBooks = users.filter((user)=>{
        if(user.issuedBook){
            return user;
        }
    })

    const issuedBooks = [];

    userWithIssuedBooks.forEach((user)=>{
        const book = books.find((b)=> b.id === user.issuedBook);

        book.userName = user.name;
        book.userId = user.id;
        issuedBooks.push(book);
    })
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success : false,
            message : "No books have been issued"
        })
    }
    res.status(200).json({
        success : true,
        message : "Issued books fetched successfully",
        data : issuedBooks
    })
})

module.exports = router;