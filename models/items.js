const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    objname:{
        type:String,
        required:true
    },
    
       objtype:{
            type:String,
            required:true

        },
    
        picture:{
             type:String,
             required:true
 
         },
    
         objselleremail:{
              type:String,
              required: true
  
          },
    
        objlastprice:{
            type:String,
            required:true

        },
    
        objbidprice:{ 
            type:Array,
            required:false},
            
         personbid:{
                type:Array,
                required:false},
                
          selltime:{
                type:String,
                required:true},  
            startselltime:{
                type:String,
                required:true},
           
            clientemail:{
                type:String},
             status:{
                type:String}
                         
      
    }
)
const Item = mongoose.model('item',UserSchema)
module.exports =Item