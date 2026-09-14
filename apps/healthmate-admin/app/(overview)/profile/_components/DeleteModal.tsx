import React from 'react'

const DeleteModal = ({text}:{text: string}) => {
  return (
    <div>
        <p className='font-inter font-medium text-[16px] text-black'> {text} </p>
    </div>
  )
}

export default DeleteModal