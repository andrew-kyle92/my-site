exports.cookieCheck = function(){
    const allCookies = document.cookie;
    
    if(!cookie){
        return false;
    }
    else if (cookie._id === null){
        res.cookie("_id", null, {maxAge: 0});
    }
    else{
        return cookie;
    }
}
