const {bookModel, userModel} = require('../model/index');

const IssuedBook = require('../dtos/book-dto');
// const getAllBooks = ()=>{

// }

// const getSingleBookById = ()=>{

// }

// module.export = {
//     getAllBooks, getSingleBookById
// }



//to fetch all books
// router.get('/', (req, res)=>{
//     res.status(200).json({
//         success : true,
//         message : "All books fetched successfully",
//         data : books
//     })
// })
exports.getAllBooks = async(req, res)=>{
    const books = await bookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success : false,
            message : "No books found"
        })
    }
    res.status(200).json({
        success : true,
        message : "All books fetched successfully",
        data : books
    })
}

//to fetch a single book by its id
// router.get('/:id', (req, res)=>{
//     const {id} = req.params;
//     const book = books.find((b)=> b.id === id);

//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message : `Book with id ${id} not found`
//         })
//     }
//     res.status(200).json({
//         success : true,
//         message : "Book fetched successfully",
//         data : book
//     })
// })
exports.getSingleBookById = async(req, res)=>{
    const {id} = req.params;
    const book = await bookModel.findById(id);
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
}


// router.get('/issued/user-name', (req, res)=>{

//     const userWithIssuedBooks = users.filter((user)=>{
//         if(user.issuedBook){
//             return user;
//         }
//     })

//     const issuedBooks = [];

//     userWithIssuedBooks.forEach((user)=>{
//         const book = books.find((b)=> b.id === user.issuedBook);

//         book.userName = user.name;
//         book.userId = user.id;
//         issuedBooks.push(book);
//     })
//     if(issuedBooks.length === 0){
//         return res.status(404).json({
//             success : false,
//             message : "No books have been issued"
//         })
//     }
//     res.status(200).json({
//         success : true,
//         message : "Issued books fetched successfully",
//         data : issuedBooks
//     })
// })
exports.allIssuedBooks = async(req, res)=>{
    const user = await userModel.find({
        issuedBook : {$exists : true}
    }).populate('issuedBook');

    const issuedBooks = user.map((each)=>{
        return new IssuedBook(each);
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
}


// router.post('', (req, res)=>{
//     //req.body should have id, title , author, genre, publicationDate
//     const {id, title, author, genre,price,  publisher} = req.body;

//     //validation
//     if(!id || !title || !author || !genre || !price  || !publisher ){
//         return res.status(400).json({
//             success : false,
//             message : "All fields are required"
//         })
//     }

//     //check if book with the same id already exists
//     const book = books.find((b)=> b.id === id);
//     if(book){
//         return res.status(400).json({
//             success : false,
//             message : `Book with id ${id} already exists`
//         })
//     }

//     books.push({id, title, author, genre, price , publisher});
//     res.status(201).json({
//         success : true,
//         message : "Book added successfully",
//     })
// })
exports.addNewBook = async(req, res)=>{
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    await bookModel.create(data);
    const allBooks = await bookModel.find();
    res.status(201).json({
        success : true,
        message : "Book added successfully",
        data : allBooks
    })
}


// router.put('/:id', (req, res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     //validation
//     const book = books.find((b)=> b.id === id);
//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message : `Book with id ${id} not found`
//         })
//     }

//     //update book details
//     const updatedBook = books.map((each)=>{
//         if(each.id === id){
//             return {...each, ...data};
//         }
//         return each;
//     })
//     res.status(200).json({
//         success : true,
//         message : "Book updated successfully",
//         data : updatedBook
//     })
// })
exports.updateBookById = async(req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    //check if the book exists
    const book = await bookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book with id ${id} not found`
        })
    }
    //update the book details
    Object.assign(book, data);
    await book.save();

    res.status(200).json({
        success : true,
        message : "Book updated successfully",
        data : book
    })
}

//DELETE : delete a book by its id
// router.delete('/:id', (req, res)=>{
//     const {id} = req.params;

//     //validation
//     const book = books.find((b)=> b.id === id);
//     if(!book){
//         return res.status(404).json({
//             success : false,
//             message : `Book with id ${id} not found`
//         })
//     }

//     const updatedBooks = books.filter((b)=> b.id !== id);
//     res.status(200).json({
//         success : true,
//         message : "Book deleted successfully",
//         data : updatedBooks
//     })
// })  
exports.deleteBookById = async(req, res)=>{
    const {id} = req.params;
    
    //check if book exists
    const book = await bookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : `Book with id ${id} not found`
        })
    }
    await bookModel.findByIdAndDelete(id);
    res.status(200).json({
        success : true,
        message : "Book deleted successfully"
    })
}