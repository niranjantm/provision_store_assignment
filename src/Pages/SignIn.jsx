import React, { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "../Components/Context";
import sha256 from "sha256"


function SignIn() {
  const { setUser } = useContext(LoginContext);
  const [data,setData] = useState({username:"",password:""});
  const [error,setError] = useState(false)
  console.log(data)
  
  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
    setError(false)
  };

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(validatePassword(data.password)===false){
        setError(true)
    }else{
        try{
            const formData = new FormData();
            formData.append("username",data.username);
            formData.append("password",sha256(data.password));
            formData.append("grant_type","password");
            const request = await fetch("https://apiv2stg.promilo.com/user/oauth/token",{
                method:"POST",
                headers:{
                    "Authorization": 'Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg=='
                },
                body:formData
            })
            const res = await request.json()
            console.log(res)
            if(res.response.user_name){
                setUser({username:res.response.user_name,access_token:res.response.access_token})
            }
        }
        catch(error){
            console.error(error);
        }
        setError(false)
      };
    }
    

  return (
    <div className="flex justify-center  bg-green-100 h-screen p-5">
      <form className="flex flex-col w-[500px] gap-4" onSubmit={handleSubmit}>
        <div className="w-full flex justify-center">
          <img
            src="http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png"
            className="max-w-[300px]"
          ></img>
        </div>
        <p className="text-center text-4xl capitalize font-bold mb-10">
          Login to your account
        </p>
        <input
          value={data.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="email"
          name="username"
          placeholder="email"
        ></input>
        <input
          value={data.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          name="password"
          placeholder="password"
        ></input>
        {error && <p className="text-sm text-red-500 text-center">Password must be 8 characters long, must contain one uppercase letter, one number and special character </p>}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
