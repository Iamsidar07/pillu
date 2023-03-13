import React from 'react'

const FormField = ({labelName,name,isSupriseMe,handleChange,handleSupriseMe,value,placeholder,type}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="font-bold" >{labelName}</label>
        {
          isSupriseMe && (
            <button type='button' onClick={handleSupriseMe} className="bg-[#ECECF1] text-xs px-2 py-1 rounded-sm font-semibold">Suprise me</button>
          )
        }
      </div>
      <input id={name} name={name} required onChange={handleChange}  value={value} placeholder={placeholder} type={type} className="w-full rounded border-gray-200 border-[1px] text-gray-500 p-2 outline-none focus:ring-1 bg-gray-50" />
    </div>
  )
}

export default FormField