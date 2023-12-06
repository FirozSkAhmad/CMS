import { useState } from 'react'
import SharedContext from './SharedContext'

const SharedState = (props) => {
  const [loader, setLoader] = useState(false);

  return (
    <SharedContext.Provider value={{
      loader, setLoader
    }}>{
        props.children
      }</SharedContext.Provider>
  )
}

export default SharedState