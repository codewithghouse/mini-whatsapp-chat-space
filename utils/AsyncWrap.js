function asyncWrap(fn){
    return function (req,res,next){
        fn(req,res,next).catch((err)=>{
            console.log(err.message);
            next(err);
        })
    }

}

module.exports = asyncWrap;