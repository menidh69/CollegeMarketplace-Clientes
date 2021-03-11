export const numberValidation = (val)=>{
    return !isNaN(val)
}

export const textValidation = (text)=>{
    var regex = /^[a-zA-Z]*$/;
    return(regex.test(text)) 
}

export const emailValidation = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

export const isEmpty = (input)=>{
    return input==""
}

export const isNull = (input)=>{
    return input==null
}
export const isEmptyNull = (input)=>{
    return (input=="" || input==null)
}

export const securePassword = (password)=>{

}
export const repeatPassword = (password1, password2)=>{
    return password1==password2
}

export function limit(text, num)
{
    var max_chars = num;
    if(text.length > max_chars) {
        return true
        // return text.substr(0, max_chars);
    }
    return false
}