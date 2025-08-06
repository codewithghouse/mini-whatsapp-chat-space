const handleValidationError=(err)=>{
    console.log("this was a validation error please follow the rules");
    return err;
}

module.exports = handleValidationError;