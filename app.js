var express=require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');;
var {studentModel}=require('./models/studentModel')


mongoose.connect("mongodb://mongo:27017/docker-node-mongo",{useNewUrlParser:true})


let app=express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get('/',(req,res)=>{

    res.send("welcome to my website")

})


app.get('/viewall', async (req,res)=>{

  try{

    var result= await studentModel.find()

    res.json(result)

  }

  catch(error)
  {
    res.send(error)


  }

})


app.post('/read', (req,res)=>{
  

var studentObject=new studentModel(req.body);

studentObject.save(
    (error)=>{

        if(error)
        {
            res.send("ERROR" + error)
        }
        else{
            res.json( {"status":"success"})
        }


    }
)


})





app.post('/add',(req,res)=>{
    var getNum1= parseFloat( req.body.num1 )
    var getNum2= parseFloat (req.body.num2 )

var x= getNum1 +getNum2

res.json({"sum":x})

})




app.listen( process.env.PORT || 3000, ()=>{
    console.log("Server started at http://localhost:3000")
})








