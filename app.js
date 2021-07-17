var express=require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');;
var {studentModel}=require('./models/studentModel')
var {studentRouter}=require('./controllers/studentController')
var {facultyRouter}=require('./controllers/facultyController')

mongoose.connect(
    "mongodb+srv://testuser:newpass@cluster0.ad8ju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {useNewUrlParser:true}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


let app=express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/student',studentRouter)
app.use('/faculty',facultyRouter)


app.get('/',(req,res)=>{

    res.send("welcome to my website")

})

app.listen( process.env.PORT || 3000, ()=>{
    console.log("Server started at http://localhost:3000")
})








