import { useActionState } from "react";
import { useRef } from "react"
import { useContext } from "react";
import { MealsDataContext } from "../store/MealsContext";
import Success from "./Success";
import { UserProgressContext } from "../store/UserProgressContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Input from "../UI/Input";
import useHttp from "../hooks/useHttp";
const initialconfig={
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    }};
export default function CheckoutForm({TotalAmount})
{
    const usercontext=useContext(UserProgressContext);
  
    const context=useContext(MealsDataContext);

    const { data,
        error,
        isLoading,sendRequest,clearData} =useHttp("http://localhost:3000/orders",initialconfig);
        
function handleclose(){
    usercontext.hideCheckout();
}
function handleClearCart(){
    context.clearCart();
    clearData();
    usercontext.hideCheckout();
}
     function submitForm(event){
        console.log("cart data is");
        console.log(context.CartData);
        event.preventDefault();
        const fd=new FormData(event.target);
        const customerdata=Object.fromEntries(fd.entries());
      
      
        sendRequest(JSON.stringify({
            order:{
                items:context.CartData,
                customer:customerdata
            }
        }));
       
      
    }
    let actions=(<> <Button  type="button" onClick={()=>{usercontext.hideCheckout()}} textOnly>Close</Button>
    <Button  type="submit" >SubmitForm</Button></>)
 if(isLoading){
    actions= <span>Sending data...</span>
 }
    //const [formState,formAction,isPending]=useActionState(submitForm,{SuccessfullSubmission:null});
if(data&&!error){
    return <Modal open={usercontext.progress==='checkout'} onClose={handleclose}>
        <h2>Success</h2>
        <p>Your order was submitted successfully. </p>
        <p>We will get back to you with more details via email within next few minutes.</p>
        <p className="modal-actions">
        <Button type="button" onClick={handleClearCart}>Okay</Button>
        </p>
    </Modal>
}
   return <>
   {/* {formState.SuccessfullSubmission && <Success ref={Successref}/>} */}
   <Modal open={usercontext.progress==='checkout'} onClose={handleclose}>
    <h2>Checkout</h2>
    <p>Total Amount {TotalAmount}</p>
    <form onSubmit={submitForm} className="control">
        <Input label="Full Name" id="name" type="text"/>
        <Input label="Email" id="email" type="email"/>
        <Input label="Street" id="street" type="text"/>
        <div className="control-row">
        <Input label="Postal Code" id="postal-code" type="text"/>
        <Input label="City" id="city" type="text"/>
        </div>

        <p className="modal-actions" >
          {actions}
        </p>
    </form>
   </Modal>
   </>
}