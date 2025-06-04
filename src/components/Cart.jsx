import { useContext,useImperativeHandle, useRef } from "react";
import { MealsDataContext } from "../store/MealsContext";
import { UserProgressContext } from "../store/UserProgressContext";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function Cart({ref,title,modalActions}){
    
    const usercontext=useContext(UserProgressContext);
    const context=useContext(MealsDataContext);
   console.log(context.CartData);
   
    function handleIncreseQuantity(item){
        context.addItem(item);
    }
    function handleRemoveQuantity(id){
        context.RemoveItem(id);
    }
    function handleCartClose(){
        usercontext.hideCart();
    }
    const TotalAmount=context.CartData.reduce((accu,cur)=>{return accu+(cur.price*cur.quantity)},0).toFixed(2);

    let cartViewData;
    if(context.CartData.length==0)
        {
            cartViewData= <div className="cart">
                <h2>Your cart is empty</h2>
                <p>Add your favorite foods to cart.</p>
                <Button onClick={handleCartClose}>Close</Button>
            </div>
        }
        else{
            cartViewData= <div className="cart"><h2>{title}</h2>
            {context.CartData && <ul>
                
                {context.CartData.map((cartitem)=>(<CartItem key={cartitem.id} cartData={cartitem} 
                IncreaseQuantity={()=>{handleIncreseQuantity(cartitem)}} 
                DecreaseQuantity={()=>{handleRemoveQuantity(cartitem.id)}}/> ))}
                </ul>}
                <p className="cart-total">{TotalAmount}</p>
                {modalActions}
                </div>
        }
    return <>
    
    <Modal open={usercontext.progress==='cart'} className="cart">

            {cartViewData}
               
    </Modal></>
    
}