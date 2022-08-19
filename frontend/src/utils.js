



const validate = (input) => {
  const inputRegEx = /^\s|\(|"|<|>|\)|\\$/
    const isValid = inputRegEx.test(input)
    return isValid
    
}



export default validate


const formRegEx = {
  name: /^[A-Za-z]{3,20}\s[A-Za-z]{3,20}$/,
  email: /^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/,
  password: /^[^'"()=*<>\\]{7,}$/,
  confirmPassword:/^[^'"()=*<>\\]{8,}$/
}

export const validateData = (element,setError) => {
    let isvalidated = formRegEx[element.current.name].test(element.current.value)
      if (!isvalidated) {
        element.current.style.borderBottom = '5px solid red'
        const index = parseInt(element.current.id)
        const pre = document.querySelectorAll('.tap p span')[index]
        setError(pre.textContent)
        
      } else {
        element.current.style.borderBottom = '5px solid purple'
        const index = parseInt(element.current.id)
        const pre = document.querySelectorAll('.tap p span')[index]
        pre.style.display = 'none'
        setError('')

      }
      
    return isvalidated

}
    



export const formDataValidation = (input,setFormError) => {
    const patern = /^ \0|<|>|\(|\)|"|'| $/
    const valid = patern.test(input)
    if (valid) {
        setFormError("Please Provide Valid Data")
        
    } else {
        setFormError('')
    }
    return valid
}



export const courseProperties = {
    title: '',
    abbr: '',
    faculty: '',
    partTimeDuration: '',
    fullTimeDuration: '',
    description: '',
    requirement: '',
    url: '',
    tuition: '',
    applicationPeriod: '',
    startDate: '',
    studyMode: '',
    apply: '',
    email: '',
    phoneNumber: '',
    programDirector:''
}