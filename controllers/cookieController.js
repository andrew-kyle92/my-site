const cookieParser = require(cookie-parser);

exports.cookieCheck = function(){
    const allCookies = cookieParser.JSONCookie(String);
    
    if(allCookies === 0){
        return "";
    }
    else if (cookie._id === null){
        res.cookie("_id", null, {maxAge: 0});
    }
    else{
        return cookie;
    }
}
