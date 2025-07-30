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

export async function verifyResetCode(code) {
  try {
    const options = {
      method: "POST",
      url: "/auth/verifyResetCode",
      data: {
        resetCode: code,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(values) {
  try {
    const options = {
      method: "put",
      url: "/auth/resetPassword",
      data: {
        email: values.email,
        newPassword: values.newPassword,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function forgotPassword(email) {
  try {
    const options = {
      method: "POST",
      url: "/auth/forgotPasswords",
      data: {
        email,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}



