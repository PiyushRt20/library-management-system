const express = require('express');

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({
        message : `Home page :-)`
    })
})

app.use((req, res)=>{
    res.status(500).json({
        message : "Not build yet"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at port http://localhost:${PORT}`);
})