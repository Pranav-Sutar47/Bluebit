import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import axios from "axios";
import AppContext from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import Notify from './Notify'
import Login from './LoginDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import LoginDialog from './LoginDialog'

const AuthButton = () => {
  const { login, setLogin } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) setLogin(true);
    else setLogin(false);
  }, [login]);

  const { toast } = useToast();

  const logOut = async()=>{
    try{
      const token = localStorage.getItem("token");
      const url = String(import.meta.env.VITE_BACKEND)+"/user/logout";
      const response = await axios.get(url,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.status === 200){
        localStorage.clear();
        setLogin(prev=>!prev);
        toast({
          description: "User Logged Out Successfully!",
          className: "bg-green-500 text-white",
        });
        navigate('/');
      }else{
        toast({
          description: "Error while Logout!",
          variant: "destructive",
        });
      } 
    }catch(err){
      console.error('Error at Logout',err);
    }
  }

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      console.log('idToken',idToken);

      const url = String(import.meta.env.VITE_BASEURL) + "auth/login/";

      const response = await axios.post(
        url,
        { idToken },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setLogin(true);
        localStorage.setItem("token", response.data.tokens.access);
        console.log(response);
        if(response.data.role === 'Doctor'){
          toast({
            description: "Doctor Logged In Successfully!",
            className: "bg-green-500 text-white",
          });
          navigate('/dashboard');
        }else{
        // toast({
        //   description: "User Logged In Successfully!",
        //   className: "bg-green-500 text-white",
         };
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        setLogin(false);
      }
    } catch (error) {
      setLogin(false);
      console.error("Error during login:", error);
    }
  };

  if (login) {
    return (
      <div className="flex items-center space-x-4"> 
        {/* Notification Component */}
        <Notify />
  
        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="font-[Work-Sans]">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-[Work-Sans]" onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logOut} className="font-[Work-Sans]">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

    <LoginDialog/>
    
  } else {
    return (
      <motion.button
        className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
      >
        Login
      </motion.button>
    );
  }  
};

export default AuthButton;