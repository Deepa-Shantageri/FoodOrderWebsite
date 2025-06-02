import { useContext, useRef } from "react"
import logo from "../assets/logo.jpg"
import Cart from "./Cart"
import { MealsDataContext } from "../store/MealsContext";
import CheckoutForm from "./CheckoutForm";
import Button from "../UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
export default function Header(){
    const cartRef=useRef();
    const formref=useRef();
    const context=useContext(MealsDataContext);
    const usercontext=useContext(UserProgressContext);
    function handleCartClick(){
       usercontext.showCart();
    }
    function handleCartClose(){
        usercontext.hideCart();
    }
   function handleShowForm(){
    //usercontext.hideCart();
    usercontext.showCheckout();
   }
    let modalActions = <button onClick={handleCartClose}>Close</button>;
    
    if(context.CartData.length>0)
    {
        modalActions=(
            <div className="modal-actions">
             <Button onClick={handleCartClose} textOnly>Close</Button>
             <Button onClick={handleShowForm} >Go to Checkout</Button>
            </div>
        )
    }
    const TotalAmount=context.CartData.reduce((accu,cur)=>{return accu+(cur.price*cur.quantity)},0).toFixed(2);
    return(
        <>
      <CheckoutForm  TotalAmount={TotalAmount} />
        <Cart title="Your Cart" modalActions={modalActions}/>
        <header id="main-header">
            <div id="title">
            <img src={logo}/>
            <h1>DELICIOUS FOOD</h1>
            </div>
            <nav>
            <Button onClick={handleCartClick} textOnly>Cart({context.CartData?.length})</Button>
            </nav>
        </header>
        
        </>
     
    )
}