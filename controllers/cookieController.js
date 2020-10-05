exports.cookieCheck = function(){
    let cookie = req.cookies
    
    if(!cookie){
        continue;
    }
    else if (cookie._id === null){
        res.cookie("_id", null, {maxAge: 0});
    }
    else{
        continue;
    }
}
