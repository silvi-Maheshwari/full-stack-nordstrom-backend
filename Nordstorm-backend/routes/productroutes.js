const express=require('express')
const productmodel = require('../models/productmodel')

const productrouter=express.Router()


productrouter.get('/', async (req,res)=>{

    try{
    const obj={}
    if(req.query.name){
        obj.name= {$regex: req.query.name, $options: "i"}
    }

    console.log(obj)

    if (req.query.category) {
      obj.category = req.query.category; 
    }
    let sortobj={}
    sortobj[req.query.sort]=req.query.title == "asc"? -1 : 1

    let paginationobj={}
   paginationobj[req.query.page]=res.query

    let data= await productmodel.find(obj).sort(sortobj)
    res.json({msg:data})
}
  catch(err){
        res.status(400).json({msg:err})
    }

    
})


productrouter.get('/:id', async (req, res) => {
    try {
      const productId = req.params.id; // Get the product ID from the URL
      const product = await productmodel.findById(productId);
  
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      res.json({ msg: product });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });


productrouter.post('/', async (req,res)=>{
    try{
    let data=await productmodel.insertMany([req.body])
    res.status(200).json({msg:data})
    } catch(err){
        res.status(400).json({msg:err})
    }

  
})
productrouter.post('/',async(req,res)=>{
  let id=req.params.id
  try{
    let data=await productmodel.findByIdAndDelete(id)
    res.status(200).json({msg:data})
    } catch(err){
        res.status(400).json({msg:err})
    }
})
module.exports=productrouter
