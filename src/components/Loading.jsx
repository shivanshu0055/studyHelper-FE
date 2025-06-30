import React from 'react'
import {GridLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className='h-screen top-0 left-0 z-10 fixed flex w-full bg-black/20 backdrop-blur-lg justify-center items-center'>
        <div>
            <GridLoader size={15} color='white'></GridLoader>
        </div>
    </div>
  )
}

export default Loading