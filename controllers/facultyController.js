var express=require('express')
var bodyParser = require('body-parser')


let facultyRouter=express.Router()


facultyRouter.get('/',(req,res)=>{


    return res.send("My Fcaulty Page")
})

module.exports={facultyRouter}
