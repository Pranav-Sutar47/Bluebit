import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios';

export default function AppState(props) {

    const [login,setLogin] = useState(false);

    const [user,setUser] = useState({});

    const fetchUser = async()=>{
      try{
        const token = localStorage.getItem('token');
        
        const url = String(import.meta.env.VITE_BASEURL) + 'auth/get-user-details/';

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {

          setUser(response.data.user);
        } else {
          console.log(response);
          setUser({});
        }
      }catch(err){
        console.error("Error during fetching user:", err);
      }
    }

  return (
    <AppContext.Provider value={{login,setLogin,user,fetchUser}}>
        {props.children}
    </AppContext.Provider>
  )
}
