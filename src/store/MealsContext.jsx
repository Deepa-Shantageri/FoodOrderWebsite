import { createContext, useEffect, useReducer, useState } from "react"
export const MealsDataContext=createContext({
   CartData:[],
   addItem:()=>{},
   RemoveItem:()=>{},
   sendOrder:()=>{}
})

function cartReducer(state,action){
  console.log(action.type);
if(action.type==="AddItem"){
  const updateItems=[...state.items];
  const existingitemIndex=state.items.findIndex(item=>item.id===action.item.id);
  if(existingitemIndex>-1){
    const existingItem=updateItems[existingitemIndex];
    const updateitem={...existingItem,quantity:existingItem.quantity+1};
    updateItems[existingitemIndex]=updateitem;
  }
  else{
    
    updateItems.push({...action.item,quantity:1});
  }
return {...state,items:updateItems};
}
if(action.type==="RemoveItem"){
  console.log("remove item ");
  const updateItems=[...state.items];
  const existingitemIndex=state.items.findIndex(item=>item.id===action.id);
  const existingcartitem=updateItems[existingitemIndex];
  if(existingcartitem.quantity===1){
    console.log("i am existing cart item with quantity 1");
    updateItems.splice(existingitemIndex,1);
  }
  else{
    console.log("i am existing cart item with quantity greater then 1",existingcartitem.quantity);

    const updateitem={...existingcartitem,quantity:existingcartitem.quantity-1};
    updateItems[existingitemIndex]=updateitem;

  }
  return {...state,items:updateItems};
}
if(action.type==='ClearCart'){
  return {...state,items:[]};
}
return state;
}
export default function MealsContext({children}){

  const[error,setError]=useState();
 
  const [state,dispatchCartItem]=useReducer(cartReducer,{items:[]});

  function handleAddCartItems(item){
    dispatchCartItem({type:"AddItem",item});
  }

  function handleDecreaseQuantity(id){
    console.log("hi handleremove clicked",id);
  dispatchCartItem({type:"RemoveItem",id});
  }
  function clearCart(){
    dispatchCartItem({type:"ClearCart"});
  }
 const MealsData={
   CartData:state.items,
   addItem:handleAddCartItems,
   RemoveItem:handleDecreaseQuantity,
   clearCart
 }
   return <MealsDataContext value={MealsData}>
   {children}
   </MealsDataContext>
}