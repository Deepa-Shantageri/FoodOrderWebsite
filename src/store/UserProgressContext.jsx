import { createContext, useState } from "react";
export const UserProgressContext=createContext({
    progress:'',
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
});

export default function UserProgressContextProvider({children}){
    const [userProgress,setUserProgress]=useState('');
    function handleShowCart(){
        console.log("show cart clicked");
        setUserProgress('cart');
    }
    function handleHideCart(){
        console.log("hide cart clicked");
        setUserProgress('');
    }
    function handleShowCheckout(){
        setUserProgress('checkout');
    }
    function handlehideCheckout(){
        setUserProgress('');
    }
    const userProgresCtxt={
        progress:userProgress,
        showCart:handleShowCart,
        hideCart:handleHideCart,
        showCheckout:handleShowCheckout,
        hideCheckout:handlehideCheckout
    }
return <UserProgressContext.Provider value={userProgresCtxt}>
    {children}
</UserProgressContext.Provider>
}