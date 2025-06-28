import React from 'react'
import {GridLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className='h-screen fixed flex w-full bg-black/10 backdrop-blur-lg justify-center items-center'>
        <div>
            <GridLoader size={15}></GridLoader>
        </div>
    </div>
  )
}

export default Loading