import React, { useState } from 'react'

import { FileButtonInput, FileAreaInput } from 'react-image-main-color'


const dropAreaStyle = {
  width: "400px",
  backgroundColor: "#ccc",
  textAlign: "center" as "center",
  paddingTop: "20%",
  paddingBottom: "20%"
}

const App = () => {
  const [colorData, setColorData] = useState('')

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{margin: "auto"}}>
          <FileButtonInput
            button={
              <button
                style={{
                  border: 'solid black 1px',
                  backgroundColor: '#ccc',
                  padding: '20px'
                }}
              >
                Upload File
              </button>
            }
            setColorData={setColorData}
          />
        </div>
        <div style={{margin: "auto"}}>
          <FileAreaInput
            container={
              <div
                style={dropAreaStyle}
              >
                <h1>Drop File Here</h1>
              </div>
            }
            setColorData={setColorData}
          />
        </div>
      </div>
      <div style={{width: "100%", textAlign: "center" as "center"}}>
      <div>{colorData}</div>
      <div
        style={{ width: '100px', height: '100px', backgroundColor: colorData, margin: "auto" }}
      ></div>
      </div>

    </div>
  )
}

export default App

