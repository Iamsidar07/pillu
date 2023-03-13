import React, { useState } from 'react'
import { Loader, FormField } from "../components"
import { getRandomPrompt } from '../utils'
import { preview } from "../assets"
import { useNavigate } from "react-router-dom"
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: ""
  });
  const [generatingImage, setGeneratingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(form.prompt)
  const generateImage=async()=>{
      if (form.prompt) {
        setGeneratingImage(true);
        try {
          const response = await fetch("https://pillu.onrender.com/api/v1/dalle",{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({prompt:form.prompt}),
          })
          const data=await response.json();
          console.log({data})
          setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
        } catch (error) {
          alert(error);
        }finally{
          setGeneratingImage(false);
        }
      }else{
        alert("Please enter a prompt.")
      }
  }
  const handleSubmit =async (event) => {
    event.preventDefault();
    if (form.photo && form.prompt) {
      setIsLoading(true);
      try {
        const response = await fetch("https://pillu.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error)
      }finally{
        setIsLoading(false);
      }

    }else{
      alert("Please enter a prompt and generate image and start sharing.")
    }


  }
  const handleChange = (e) => {
    console.log(e.target.value)
    setForm({...form,[e.target.name]:e.target.value})

  }
  const handleSupriseMe = () => {
    const randomPrompt=getRandomPrompt();
    setForm({...form,prompt:randomPrompt});

  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-bold text-3xl'>Create</h1>
        <p className="text-[16px] mt-2 text-gray-400 max-w-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, nam. Lorem ipsum dolor sit amet.</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Manoj kumar"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          <div className="relative w-64 h-64 flex items-center justify-center border border-gray-200  bg-gray-100 rounded-lg">
            {
              form.photo?
              <img src={form.photo} alt={form.name} className="w-full h-full object-contain"/>
              :
              <img src={preview} alt={"preview"} className="w-9/12 h-9/12 object-contain opacity-60 " />
            }
            {
              generatingImage && (
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/40 rounded-lg">
                  <Loader/>
                </div>
              )
            }

          </div>
        </div>
        <div className="flex mt-5 gap-5">
           <button type='button' onClick={generateImage} className={"outline-none border-none bg-green-800 text-white rounded sm:w-auto w-full px-5 py-3 text-center"}>
{
  generatingImage ?"Generating...":"Generate"
}
           </button>
        </div>
        <div className="mt-10 gap-5">
          <p>Once you have created the image you want,you can share it with the world.</p>
          <button onClick={handleSubmit} type='button' className={"mt-2 outline-none border-none bg-blue-800 text-white rounded sm:w-auto w-full px-5 py-3 text-center"}>
            {
              isLoading ? "Sharing..." : "Share with the world"
            }
          </button>
        </div>
      </form>

    </section>
  )
}

export default CreatePost