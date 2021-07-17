var mongoose=require('mongoose')
var examSchema=new mongoose.Schema(
 {
        
        exam_Name :  {
            type:String,
            required:true
        }

    }

);
var examModel=mongoose.model('exams',examSchema);
module.exports={examModel}
