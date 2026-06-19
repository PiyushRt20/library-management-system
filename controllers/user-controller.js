const userModel = require('../model/users-model');

//to fetch all users
// router.get('', (req, res)=>{
//     res.status(200).json({
//         success : true, 
//         data : users
//     })
// })
exports.getAllUsers = async (req, res) => {
    const user = await userModel.find();
    res.status(200).json({
        success: true,
        data : user
    })
}


//to fetch a single user by their id
// router.get('/:id', (req, res)=>{
//     const {id} = req.params;
//     const user = users.find((u)=> u.id === id);

//     if(!user){
//         return res.status(404).json({
//             success : false, 
//             message : `User with id ${id} not found`
//         })
//     }
//     res.status(200).json({
//         success : true, 
//         data : user
//     })
// })
exports.getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success : false, 
            message : `User with id ${id} not found`
        })
    }
    res.status(200).json({
        success : true, 
        data : user
    })
}


// //POST : create /register a new user
// router.post('', (req, res)=>{
//     //req.body should have id, name , email, subscriptionType, subscriptionDate
//     const {id, name , email, subscriptionType, subscriptionDate} = req.body;

//     //validation
//     if(!id || !name || !email || !subscriptionType || !subscriptionDate){
//         return res.status(400).json({
//             success : false, 
//             message : "All fields are required"
//         })
//     }
//      //check if user with the same id already exists
//     const user = users.find((u)=> u.id === id);
//     if(user){
//         return res.status(400).json({
//             success : false, 
//             message : `User with id ${id} already exists`
//         })
//     }

//     //create new user and add to users array
//     users.push({id, name , email, subscriptionType, subscriptionDate});
    
//     res.status(201).json({
//         success : true, 
//         message : "User created successfully",
//     })
// })
exports.createUser = async (req, res) => {
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false, 
            message : "All fields are required"
        })
    }
    await userModel.create(data);
    const getAllUsers = await userModel.find();
    res.status(201).json({
        success : true, 
        message : "User created successfully",
        data : getAllUsers
    })
}

//put method to update user details
// router.put('/:id', (req , res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     //validation
//     const user = users.find((u)=> u.id === id);
//     if(!user){
//         return res.status(404).json({
//             success : false, 
//             message : `User with id ${id} not found`
//         })
//     }
//     //update user details
//     const updateUser = users.map((each)=>{
//         if(each.id === id){
//             return {
//                 ...each,
//                 ...data
//             }
//         } 
//         return each;
//     })
//     //update the users array with the updated user details
//     res.status(200).json({
//         success : true, 
//         message : "User updated successfully",
//         data : updateUser
//     })
// })
exports.updateUserById = async (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    if(!data){
        return res.status(400).json({
            success : false, 
            message : "All fields are required"
        })
    }
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success : false, 
            message : `User with id ${id} not found`
        })
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json({
        success : true, 
        message : "User updated successfully",
        data : updatedUser
    })
}

// //delete method to delete a user by their id
// router.delete('/:id', (req, res)=>{
//     const {id} = req.params;

//     const user = users.find((u)=> u.id === id);
//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `User with id ${id} not found`
//         });
//     }
//     const updatedUsers = users.filter((u)=> u.id !== id);
//     res.status(200).json({
//         success : true,
//         message : `User with id ${id} deleted successfully`,
//         data : updatedUsers
//     })
// })
exports.deleteUserById = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : `User with id ${id} not found`
        });
    }
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.status(200).json({
        success : true,
        message : `User with id ${id} deleted successfully`,
        data : deletedUser
    })
}

//Route - users/subscription-details/:id
//method - GET
//description - get subscription details of a user by their id

// router.get('/subscription-details/:id', (req, res)=>{
//     const {id} = req.params;

//     const user = users.find((u)=> u.id === id);
//     if(!user){
//         return res.status(404).json({
//             success : false,
//             message : `User with id ${id} not found`
//         })
//     }

//     const getDateInDays = (data = '')=>{
//         let date;
//         if(data){
//             date = new Date(data);
//         }
//         else{
//             date = new Date();
//         }
//         let days = Math.floor(date / (1000*60*60*24));
//         return days;
//     }

//     const subscriptionType = (date)=>{
//         if(user.subscriptionType === 'Basic'){
//             date = date + 90;
//         }else if(user.subscriptionType === 'Standard'){
//             date = date + 180;
//         }else if(user.subscriptionType === 'Premium'){
//             date = date + 365;
//         }    
//         return date;
//     }

//     //subscription expiration calculation

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subcriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subcriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired : subscriptionExpiration < currentDate,
//         subscriptionDaysLeft : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
//         daysLeftForExpiration : returnDate - currentDate,
//         returnDate : returnDate < currentDate ? "Book return date expired" : returnDate,
//         fine : returnDate < currentDate ? subscriptionExpiration < currentDate ? 200 : 100 : 0
//     }

//     res.status(200).json({
//         success : true,
//         data : data
//     })
// })
exports.getSubscriptionDetailsById = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : `User with id ${id} not found`
        })
    }

    const getDateInDays = (data = '')=>{
        let date;
        if(data){
            date = new Date(data);
        }
        else{
            date = new Date();
        }
        let days = Math.floor(date / (1000*60*60*24));
        return days;
    }
    const subscriptionType = (date)=>{
        if(user.subscriptionType === 'Basic'){
            date = date + 90;
        }else if(user.subscriptionType === 'Standard'){
            date = date + 180;
        }else if(user.subscriptionType === 'Premium'){
            date = date + 365;
        }    
        return date;
    }

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subcriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subcriptionDate);

    const data = {
        ...user._doc,
        subscriptionExpired : subscriptionExpiration < currentDate,
        subscriptionDaysLeft : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        daysLeftForExpiration : returnDate - currentDate,
        returnDate : returnDate < currentDate ? "Book return date expired" : returnDate,
        fine : returnDate < currentDate ? subscriptionExpiration < currentDate ? 200 : 100 : 0
    }
    res.status(200).json({
        success : true,
        data : data
    })

}