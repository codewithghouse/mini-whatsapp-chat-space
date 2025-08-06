function asyncWrap(fn){
    return function (req,res,next){
        fn(req,res,next).catch((err)=>{
            console.log(err.message);
            //agar error hai t6o hamare  global handler ke paass  us error ku send kardega 
            next(err);
        })
    }

}

module.exports = asyncWrap;