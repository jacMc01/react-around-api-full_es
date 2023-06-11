import axios from "axios";

const baseURL = "https://https://api.mackyuniverse.desarrollointerno.com";

const axiosAuth = axios.create({
  baseURL: baseURL
});

export async function Register(email, password){

  const url = `/signup`;

  const data = {
    password: password,
    email: email
  };
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await axiosAuth.post(url, data, { headers });
    if (response.status === 201) {
      return response;
    } else {
      console.log('POST request failed', response);
      return response;
    }
  } catch (error) {
    console.log('An error occurred:', error);
    return error;
  }
}

export async function Login(email, password){
  const url = `/signin`;

  const data = {
    password: password,
    email: email
  };
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await axiosAuth.post(url, data, { headers });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('POST request failed with status:', response.status);
      // Additional logic for failed response
      return response;
    }
  } catch (error) {
    console.log('An error occurred:', error);
    // Additional error handling logic
    return error;
  }
}

export async function CheckToken(JWT) {
  const url = `/users/me`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JWT}`
  };

  try {
    const response = await axiosAuth.get(url, { headers });
    if (response.status === 200) {
      return response;
    } else {
      console.log('GET request failed with status:', response.status);
      // Additional logic for failed response
      return response;
    }
  } catch (error) {
    console.log('An error occurred:', error);
    // Additional error handling logic
    return error;
  }
}
