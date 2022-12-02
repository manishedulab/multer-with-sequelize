/* Importing the required modules. */
const express = require('express');
const { Sequelize,DataTypes } = require('sequelize');
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');
const img = require('./db');


/* Creating an instance of express. */
const app = express();


/* A middleware for handling multipart/form-data, which is primarily used for uploading files. */
app.use(bodyparser.json());



/* Setting the view engine to ejs. */
app.set('view engine', 'ejs');


//uploading images
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});


/* Creating a middleware for handling multipart/form-data, which is primarily used for uploading files. */
const upload=multer({storage:storage,
    limits:{fileSize:2000000},
    fileFilter:
    (req,file,cb)=>{
        const filetypes=/png|jpeg|jpg/;
        const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype=filetypes.test(file.mimetype)
        if(extname && mimetype)
        {
            cb(null,true)
        }
        else
        {
            cb("Error: chala ja b**k!!!!")
        }
    }
})


//rende index.ejs
app.get('/',(req,res)=>{
    res.render('index')
});


/* Creating a post request to the server. */
app.post('/app',upload.single('photo'),(req,res)=>{
    img.create({
    name:req.body.name,
    photo:req.file.filename 
}).then((res)=>
{
    console.log('data inserted ',res)
}).catch((err)=>{
    console.log(err)
})
res.send("successfully")
});



/* Listening to the port 3000. */
app.listen(3000,()=>{
console.log("\nport listening on port 3000\n\n");
});