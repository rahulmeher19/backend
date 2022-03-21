
const  apiResponse = {
    code: 200,
    success: true,
    error: null,
    data: [], 
  };

  function genApiResponse (code = 200 , success = true , error = null , data = [] , message = ""){
    return {code , success , error , data , message }
  }

  module.exports = {
    apiResponse , 
    genApiResponse
  }