
const express = require("express")
const { verifyToken } = require("../jwt/verifyToken")
const router = express.Router()

const Item = require('../models/items')

router.get('/item/',(req,res,next)=>{
    Item.find({status:"readyToSale"})
        .then((data) => res.json(data))
        .catch(next)
})

router.get('/sold/',async(req,res,next)=>{
 const nobids =  await Item.find({status: "no bids"})
 const sold =  await Item.find({status: "sold"})
 const together =  nobids.concat(sold)

 if (together){res.json({items:together})}
 else{ res.json({items: null})}     
})

router.post('/additems/', async(req,res,next)=>{
    const email= req.body.email
    console.log(email);
    const useritems  = await Item.find({ objselleremail:email})
    if (useritems){res.json({items:useritems})}
    else{ res.json({items: null})}
        
})
router.post('/soldto/', async(req,res,next)=>{
    const email= req.body.email
    const status = req.body.status
    console.log(email);
    const useritems  = await Item.find({ objselleremail:email,status:status})
    if (useritems){res.json({items:useritems})}
    else{ res.json({items: null})}
        
})
router.post('/won/', async(req,res,next)=>{
    const email= req.body.email
    console.log(email);
    const useritems  = await Item.find({ clientemail:email})
    if (useritems){res.json({items:useritems})}
    else{ res.json({items: null})}
        
})

router.get('/categorie/:type', async(req,res,next)=>{
  
    const itemType  = await Item.find({objtype:req.params.type,status:"readyToSale"}   )
    if (itemType){res.json({items:itemType})}
    else{ res.json({items: null})}
        
})
router.get('/item/:id',(req,res,next)=>{
    Item.findById(req.params.id)
    .then((data)=> res.json(data))
    .catch(next)
})
//////,verifyToken
router.post('/item',verifyToken,(req,res,next)=>{
   
    req.body.objname?  
    Item.create(req.body)
        .then((data) => res.json(data))
        .catch(next):
        res.json({error:'this input is emty'})
})


router.delete('/item/:id',(req,res,next)=>{
    Item.findOneAndDelete({_id:req.params.id})
         .then((data)=> res.json(data))
         .catch(next)

})

router.patch('/item/:id', (req,res,next)=>{
    Item.findByIdAndUpdate(req.params.id,req.body)
         .then((data)=> res.status(200).json(data))
         .catch(next)

})



module.exports = router