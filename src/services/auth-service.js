import { API_CONFIG } from "../config";
import { apiClient } from "./api-client";
export async function sendDataToSignUp(values){
    try {
         const options={
  method:"post",
  url:`/auth/signup`,
  data:{
    name:values.name,
    email:values.email,
    password:values.password,
    rePassword:values.rePassword,
    phone:values.phone,

  },
 };
 const response= await apiClient.request(options);
return response;
    } catch (error) {
        throw error;
    }

}
export async function sendDataToLogIn(values){


try{
 const options={
  method:"post",
  url:`/auth/signin`,
  data:{
    email:values.email,
    password:values.password,
  }
 }
    const response= await apiClient.request(options);
    return response;
}
catch(error){
throw error;
}

}
