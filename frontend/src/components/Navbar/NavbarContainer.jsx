import React, { useContext } from 'react';
import { NavbarView } from "./NavbarView";
import { UserContext } from '../../UserContext';
import { logout } from '../../services/User';

export function NavbarContainer(){
    const {user,setUser} = useContext(UserContext)

    function handleLogout(){
        logout(user)
        setUser(null)
    }
    return(
        <>
            <NavbarView  user={user} logout={handleLogout}/>
        </>
    )
}