import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

export const handleError = (error: any) => {
    if(axios.isAxiosError(error)){
        var err = error.response;
        if(Array.isArray(err?.data.error)){
           for( let val of err?.data.error){
             toast.warning(val.description);
           }
        }else if(typeof err?.data.error === 'object'){
            for(let e in err?.data.error){
                toast.warning(err.data.error[e][0]);
            }
        }else if(err?.data){
            toast.warning(err.data);
        }
        else if(err?.status == 401){
            toast.warning("Please login");
            window.history.pushState({},"Loginpage", "/login");
        }
        else if(err){
            toast.warning(err?.data);
        }
        
    }
    
}