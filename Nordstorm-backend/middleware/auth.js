const secretkey=process.env.secretkey
console.log(secretkey)
const authmiddleware=(roles)=>(req,res,next)=>{
    var jwt = require('jsonwebtoken');
    // console.log("header",req.headers.authorization)
    let token=req.headers.authorization.split(" ")[1]
    console.log(token)
    var decoded = jwt.verify(token, secretkey);
    console.log(decoded)
    if(decoded){
        req.body.id=decoded.userid
           console.log(req.body)
        next()
    }
    else{
        console.log("please login again")
    }


}
module.exports=authmiddleware;