
export default function CartItem({cartData,IncreaseQuantity,DecreaseQuantity}){
   
    
    return <li key={cartData.id} className="cart-item">
    <div><p><span>{cartData.name} - </span><span>{cartData.quantity} x </span><span>{cartData.price}</span></p>
  
    </div>
    <div className="cart-item-actions">
        <button onClick={DecreaseQuantity}>-</button>
        <p>{cartData.quantity}</p>
        <button onClick={IncreaseQuantity}>+</button>
    </div>
   
</li>
}