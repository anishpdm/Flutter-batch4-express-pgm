var express=require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var {studentModel}=require('../models/studentModel')

var {markModel}=require('../models/markModel')

var {examModel}=require('../models/examModel')




let studentRouter=express.Router()



studentRouter.use(bodyParser.urlencoded({ extended: false }))

studentRouter.use(bodyParser.json())



studentRouter.get('/',(req,res)=>{

    return res.send("My Student Page")
})


///////////////

studentRouter.get('/viewavg',(req,res)=>{

  try{

    markModel.aggregate(
      [

        { $group: {
          "_id":"_id",
          
          markAvg: { $avg: '$mark_Physics'}
      }},

      ], (error,data)=>{
        return res.json(data)
      }
    )
   

  }

  catch(error)
  {
    res.send(error)


  }


})


//////////////




///////////////

studentRouter.get('/viewgreater',async (req,res)=>{

  try{

    var result= await markModel.find(
      {
      mark_Physics : { $gt: 35 }
      }
      )

    res.json(result)

    markModel.find( {
      
    
   
    }

    )
  }

  catch(error)
  {
    res.send(error)


  }


})


//////////////






studentRouter.get('/viewmarks',(req,res)=>{

  try{

    studentModel.aggregate(
      [
        {
          $lookup:{
            from:"marks",
            localField:"_id",
            foreignField:"studentId",
            as:"studentmarks"

          }
        },
        // {$unwind:'$studentmarks'}

      ], (error,data)=>{
        return res.json(data)
      }
    )
   

  }

  catch(error)
  {
    res.send(error)


  }


})





studentRouter.post('/addmarks',(req,res)=>{
  var mark=new markModel(req.body);
  
  mark.save(
    (error)=>{
      if(error){
        res.send("ERROR" + error)
      }
      else{
          res.json( {"status":"success"})
      }
    }
  )


})



studentRouter.post('/addexams',(req,res)=>{
  var mark=new examModel(req.body);
  
  mark.save(
    (error,data)=>{
      if(error){
        res.send("ERROR" + error)
      }
      else{
          res.json( {"status":"success" + data})
      }
    }
  )


})




studentRouter.get('/viewexams', async (req,res)=>{

  try{

    var result= await examModel.find()

    res.json(result)

  }

  catch(error)
  {
    res.send(error)


  }

})



studentRouter.post('/read', (req,res)=>{
  

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


    studentRouter.post('/edit',async (req,res)=>{

        try{
      
          var result= await studentModel.findOneAndUpdate({"_id":req.body._id},req.body)
          res.json(result)
      
        }
      
        catch(error)
        {
            res.json({"status":"error"})
      
        }
      })
    


      studentRouter.get('/viewall', async (req,res)=>{

        try{
      
          var result= await studentModel.find()
      
          res.json(result)
      
        }
      
        catch(error)
        {
          res.send(error)
      
      
        }
      
      })
      
      
      studentRouter.post('/search',async (req,res)=>{
      
        try{
      
          var result= await studentModel.find(req.body)
          res.json(result)
      
        }
      
        catch(error)
        {
            res.json({"status":"error"})
      
        }
      
      
      
      })
      
      
      
      studentRouter.post('/delete',async (req,res)=>{
      
          try{
        
            var result= await studentModel.findByIdAndDelete({"_id":req.body._id})
            res.json(result)
        
          }
        
          catch(error)
          {
              res.json({"status":"error"})
        
          }
        })

        module.exports={studentRouter}
