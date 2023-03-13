import { surpriseMePrompts } from "../constants"
import FileSaver from "file-saver"
import { toast  } from "react-toastify"
export const getRandomPrompt=()=>{
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    return surpriseMePrompts[randomIndex];
}

export const downloadImage=async(_id,photo)=>{
    console.log(_id,photo)
 FileSaver.saveAs(photo,`download-${_id}.jpg`)
}

export const showToast = (message,type="error")=>{
    const option = {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };
    if (type==="success") {
        toast.success(message, option);
    }else if(type=="info"){
        toast.info(message, option);
    }else{
        toast.error(message, option);
    }
    
}