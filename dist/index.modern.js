import { useState, useEffect, createElement, useRef } from 'react';

const FileAreaInput = ({
  container,
  setColorData,
  dropActiveClass,
  imageBaseData
}) => {
  const [hexValue, setHexValue] = useState();
  const [activeDrop, setActiveDrop] = useState(false);
  useEffect(() => {
    setColorData(hexValue);
  }, [hexValue]);

  const handleFile = event => {
    event.preventDefault();

    if (imageBaseData !== undefined) {
      var base64 = getBase64(event.dataTransfer.files[0]);

      base64.onload = function () {
        imageBaseData(base64.result);
      };
    }

    getMainColor(event.dataTransfer.files[0], setHexValue);
  };

  return createElement("div", {
    className: activeDrop ? dropActiveClass : "",
    style: {
      width: "fit-content",
      height: "fit-content"
    },
    onDragOver: e => {
      setActiveDrop(true);
      e.preventDefault();
    },
    onDragLeave: e => {
      setActiveDrop(false);
      e.preventDefault();
    },
    onDrop: e => handleFile(e)
  }, container);
};
const FileButtonInput = ({
  button,
  setColorData,
  imageBaseData
}) => {
  const [hexValue, setHexValue] = useState();
  const buttonRef = useRef();
  useEffect(() => {
    setColorData(hexValue);
  }, [hexValue]);

  const handleClick = () => {
    if (buttonRef.current !== undefined) {
      buttonRef.current.click();
    }
  };

  const handleFile = event => {
    if (imageBaseData !== undefined) {
      var base64 = getBase64(event.target.files[0]);

      base64.onload = function () {
        imageBaseData(base64.result);
      };
    }

    getMainColor(event.target.files[0], setHexValue);
  };

  return createElement("div", null, createElement("div", {
    role: 'button',
    onClick: handleClick
  }, button), createElement("input", {
    type: 'file',
    accept: '.jpg, .png',
    onChange: handleFile,
    ref: buttonRef,
    style: {
      display: 'none'
    }
  }));
};

function getMainColor(file, setHexValue) {
  var base64 = getBase64(file);

  base64.onload = function () {
    getAverageRGB(base64.result).then(values => {
      setHexValue(RGBToHex(values.r, values.g, values.b));
    });
  };
}

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  return reader;
}

async function getAverageRGB(imgBase) {
  var dimensions = {
    w: 0,
    h: 0
  };
  dimensions = await getImageDimensions(imgBase);
  var imgEl = document.createElement('img');
  imgEl.src = imgBase;
  var blockSize = 5,
      defaultRGB = {
    r: 0,
    g: 0,
    b: 0
  },
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data,
      width,
      height,
      i = -4,
      length,
      rgb = {
    r: 0,
    g: 0,
    b: 0
  },
      count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height = dimensions.h;
  width = canvas.width = dimensions.w;
  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    console.log(e);
    alert('x');
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);
  return rgb;
}

function getImageDimensions(file) {
  return new Promise(function (resolved) {
    var i = new Image();

    i.onload = function () {
      resolved({
        w: i.width,
        h: i.height
      });
    };

    i.src = file;
  });
}

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

export { FileAreaInput, FileButtonInput };
//# sourceMappingURL=index.modern.js.map
