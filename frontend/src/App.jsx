import { useState } from 'react'
import './App.css'

import UploadExcel from './components/uploadExcel'
import Theme from './components/dynamicTheme'

function App() {
  const [file, setFile] = useState([])

  return (
    <div>
    
      <Theme />
      <UploadExcel file={file}/>

    </div>
    
      
  )
}

export default App
