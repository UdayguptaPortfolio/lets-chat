module.exports.validateRegisterInput=(
    username,
    email,
    password,
    confirmpassword
)=>{
    const errors={};
    if(username.trim()===''){
        errors.username='Username is Mandatory'
    }
    if(email.trim()===''){
        errors.username='Email is Mandatory'
    }else{
        const regEx= /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email='Email must be a valid email address';
        }
    }
    if(password===''){
        errors.password='Password is Mandatory';
    }else if(password!==confirmpassword){
        errors.confirmpassword='Password does not match';
    }
    return {
        errors,
        valid:Object.keys(errors).length<1
    };
};
module.exports.validateLoginInput=(username,password)=>{
    const errors={};
    if(username.trim()===''){
        errors.username="Username is Mandatory";
    }
    if(password.trim()===''){
        errors.password='Password is Mandatory';
    }
    return {
        errors,
        valid:Object.keys(errors).length<1
    };
};