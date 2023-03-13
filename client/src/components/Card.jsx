import React from 'react'
import { download } from "../assets"
import { downloadImage } from "../utils"

const Card = ({_id,name,photo,prompt}) => {
  return (
    <div className='rounded group relative shadow-card hover:shadow-cardhover card bg-slate-200'>
      <img src={photo} alt={prompt} className="w-full h-auto object-contain rounded" />
      <div className="group-hover:flex flex-col max-h-[94%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded">
        <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className='w-7 h-7 rounded-full object-cover bg-green-500 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'
            >{name}</p>
          </div>
          <button type='button' onClick={()=>downloadImage(_id,photo)} className='outline-none bg-transparent border-none'>
            <img src={download} alt="download" className='w-7 h-7 object-contain rounded-full invert' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card