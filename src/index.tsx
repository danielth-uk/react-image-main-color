import * as React from 'react'

interface FileAreaInputProps {
  container: React.ReactElement
  setColorData: React.Dispatch<React.SetStateAction<any>>
  dropActiveClass? : string
}

export const FileAreaInput = ({
  container,
  setColorData,
  dropActiveClass
}: FileAreaInputProps) => {
  const [hexValue, setHexValue] = React.useState<string>()
  const [activeDrop, setActiveDrop] = React.useState<boolean>(false)

  React.useEffect(() => {
    setColorData(hexValue)
  }, [hexValue])

  const handleFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    getMainColor(event.dataTransfer.files[0], setHexValue)
  }

  return (
    <div
    className={activeDrop ? dropActiveClass : "" }
    style={{width: "fit-content", height: "fit-content"}}
    onDragOver={(e) => {
      setActiveDrop(true)
      e.preventDefault();
    }}
    onDragLeave={(e) => {
      setActiveDrop(false)
      e.preventDefault();
    }}
      onDrop={(e) => handleFile(e)}
    >
      {container}
    </div>
  )
}

interface FileButtonInputProps {
  button: React.ReactElement
  setColorData: React.Dispatch<React.SetStateAction<any>>
}

export const FileButtonInput = ({
  button,
  setColorData
}: FileButtonInputProps) => {
  const [hexValue, setHexValue] = React.useState<string>()
  const buttonRef = React.useRef<any>()

  React.useEffect(() => {
    setColorData(hexValue)
  }, [hexValue])

  const handleClick = () => {
    if (buttonRef.current !== undefined) {
      buttonRef.current.click()
    }
  }

  const handleFile = (event: any) => {
    getMainColor(event.target.files[0], setHexValue)
  }

  return (
    <div>
      <div role='button' onClick={handleClick}>
        {button}
      </div>
      <input
        type='file'
        accept='.jpg, .png'
        onChange={handleFile}
        ref={buttonRef}
        style={{ display: 'none' }}
      />
    </div>
  )
}

function getMainColor(
  file: File,
  setHexValue: React.Dispatch<React.SetStateAction<string>>
) {
  var base64 = getBase64(file)
  base64.onload = function () {
    getAverageRGB(base64.result).then((values) => {
      setHexValue(RGBToHex(values.r, values.g, values.b))
    })
  }
}

function getBase64(file: File) {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  return reader
}

async function getAverageRGB(imgBase: any) {
  var dimensions = { w: 0, h: 0 }
  dimensions = await getImageDimensions(imgBase)

  var imgEl = document.createElement('img')
  imgEl.src = imgBase

  var blockSize = 5,
    defaultRGB = { r: 0, g: 0, b: 0 },
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0

  if (!context) {
    return defaultRGB
  }

  height = canvas.height = dimensions.h
  width = canvas.width = dimensions.w

  context.drawImage(imgEl, 0, 0)

  try {
    data = context.getImageData(0, 0, width, height)
  } catch (e) {
    console.log(e)
    alert('x')
    return defaultRGB
  }

  length = data.data.length

  while ((i += blockSize * 4) < length) {
    ++count
    rgb.r += data.data[i]
    rgb.g += data.data[i + 1]
    rgb.b += data.data[i + 2]
  }

  rgb.r = ~~(rgb.r / count)
  rgb.g = ~~(rgb.g / count)
  rgb.b = ~~(rgb.b / count)
  return rgb
}

function getImageDimensions(file: any): any {
  return new Promise(function (resolved) {
    var i = new Image()
    i.onload = function () {
      resolved({ w: i.width, h: i.height })
    }
    i.src = file
  })
}

function RGBToHex(r: any, g: any, b: any) {
  r = r.toString(16)
  g = g.toString(16)
  b = b.toString(16)

  if (r.length == 1) r = '0' + r
  if (g.length == 1) g = '0' + g
  if (b.length == 1) b = '0' + b

  return '#' + r + g + b
}
