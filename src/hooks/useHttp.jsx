import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,config){
    const response=await fetch(url,config);
    const resData=response.json();
    if(!response.ok){
        throw new Exception(resData.message|| "something went wrong");
    }
    return resData;
}

export default function useHttp(url,config,initialvalue){
    const [data,setData]=useState(initialvalue);
    const [isLoading,setIsLoading]=useState(false);
    const[error,setError]=useState();
    function clearData(){
        setData(initialvalue);
    }
   const sendRequest=useCallback(async function sendRequest(data){
        setIsLoading(true);
        try{
          const response=await sendHttpRequest(url,{...config,body:data});
          setData(response);
          
        }catch(error){
            setError(error.message||"something went wrong");
        }
        setIsLoading(false);
    },[url,config]); 
    useEffect(()=>{
        if((config &&(config.method==='GET'||!config.method))||!config)
        { sendRequest();}
       
    },[sendRequest])
    return{
        data,
        error,
        isLoading,sendRequest,
        clearData
    }
}