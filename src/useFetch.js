import { useEffect, useState } from "react";
export const useFetch = (url)=>{
    const [data,setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setPending] = useState(true);
    useEffect(()=>{
        fetch(url)
        .then(res=>{
            if(!res.ok){
                throw Error("can't fetch the data")
            }
            return res.json();
        })
        .then(data=>{
            setError(null);
            setData(data);
            setPending(false);
        }).catch(err=>{
            setPending(false);
            setError(err.message);
        })
        
    },[url])
    return {data,error,isPending}
}