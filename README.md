# react-image-main-color


> Will create a button or drop area to upload a JPG or PNG image and then will return a Hex Color value

[![NPM](https://img.shields.io/npm/v/react-image-main-color.svg)](https://www.npmjs.com/package/react-image-main-color) [![React Version ](https://img.shields.io/badge/React_version-18.0.1-brightgreen.svg)](https://standardjs.com) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-image-main-color
```

## Usage

# Button Example

```tsx
import React, { useState } from 'react'
import { FileButtonInput  } from 'react-image-main-color'


class Example extends Component {
    const [colorData, setColorData] = useState('')

  render() {
    return <FileButtonInput
            button={<button>Upload File</button>}
            setColorData={setColorData}
          />
  }
}
```

# Drop example

```tsx
import React, { useState } from 'react'
import { FileAreaInput  } from 'react-image-main-color'


class Example extends Component {
    const [colorData, setColorData] = useState('')

  render() {
    return <FileAreaInput
            container={
              <div style={dropAreaStyle}>
                <h1>Drop File Here</h1>
              </div>
            }
            setColorData={setColorData}
          />
  }
}
```

## License

MIT © [danielth-uk](https://github.com/danielth-uk)
