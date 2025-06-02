import { useContext,useImperativeHandle, useRef } from "react";
import { MealsDataContext } from "../store/MealsContext";
import { UserProgressContext } from "../store/UserProgressContext";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";

export default function Cart({ref,title,modalActions}){
    
    const usercontext=useContext(UserProgressContext);
    const context=useContext(MealsDataContext);
   
   
    function handleIncreseQuantity(item){
        context.addItem(item);
    }
    function handleRemoveQuantity(id){
        context.RemoveItem(id);
    }
    const TotalAmount=context.CartData.reduce((accu,cur)=>{return accu+(cur.price*cur.quantity)},0).toFixed(2);
    return <>
    
    <Modal open={usercontext.progress==='cart'} className="cart">
        <div className="cart"><h2>{title}</h2>
        {context.CartData && <ul>
            {context.CartData.map((cartitem)=>(<CartItem key={cartitem.id} cartData={cartitem} 
            IncreaseQuantity={()=>{handleIncreseQuantity(cartitem)}} 
            DecreaseQuantity={()=>{handleRemoveQuantity(cartitem.id)}}/> ))}
            </ul>}
            <p className="cart-total">{TotalAmount}</p>
            {modalActions}
            </div>

        
    </Modal></>
    
}