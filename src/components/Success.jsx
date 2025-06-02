import { useRef } from "react"

export default function Success(){
    const successdialog=useRef();
    function handleClose(){
        successdialog.current.close();
    }
    return(<dialog ref={successdialog}>
        
       
    </dialog>)
}