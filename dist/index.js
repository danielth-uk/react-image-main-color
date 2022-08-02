var React = require('react');

var getAverageRGB = function getAverageRGB(imgBase) {
  try {
    var blockSize, defaultRGB, canvas, context, data, width, height, i, length, rgb, count;
    var dimensions = {
      w: 0,
      h: 0
    };
    return Promise.resolve(getImageDimensions(imgBase)).then(function (_getImageDimensions) {
      dimensions = _getImageDimensions;
      var imgEl = document.createElement('img');
      imgEl.src = imgBase;
      blockSize = 5;
      defaultRGB = {
        r: 0,
        g: 0,
        b: 0
      };
      canvas = document.createElement('canvas');
      context = canvas.getContext && canvas.getContext('2d');
      i = -4;
      rgb = {
        r: 0,
        g: 0,
        b: 0
      };
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
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var FileAreaInput = function FileAreaInput(_ref) {
  var container = _ref.container,
      setColorData = _ref.setColorData,
      dropActiveClass = _ref.dropActiveClass;

  var _React$useState = React.useState(),
      hexValue = _React$useState[0],
      setHexValue = _React$useState[1];

  var _React$useState2 = React.useState(false),
      activeDrop = _React$useState2[0],
      setActiveDrop = _React$useState2[1];

  React.useEffect(function () {
    setColorData(hexValue);
  }, [hexValue]);

  var handleFile = function handleFile(event) {
    event.preventDefault();
    getMainColor(event.dataTransfer.files[0], setHexValue);
  };

  return React.createElement("div", {
    className: activeDrop ? dropActiveClass : "",
    style: {
      width: "fit-content",
      height: "fit-content"
    },
    onDragOver: function onDragOver(e) {
      setActiveDrop(true);
      e.preventDefault();
    },
    onDragLeave: function onDragLeave(e) {
      setActiveDrop(false);
      e.preventDefault();
    },
    onDrop: function onDrop(e) {
      return handleFile(e);
    }
  }, container);
};
var FileButtonInput = function FileButtonInput(_ref2) {
  var button = _ref2.button,
      setColorData = _ref2.setColorData;

  var _React$useState3 = React.useState(),
      hexValue = _React$useState3[0],
      setHexValue = _React$useState3[1];

  var buttonRef = React.useRef();
  React.useEffect(function () {
    setColorData(hexValue);
  }, [hexValue]);

  var handleClick = function handleClick() {
    if (buttonRef.current !== undefined) {
      buttonRef.current.click();
    }
  };

  var handleFile = function handleFile(event) {
    getMainColor(event.target.files[0], setHexValue);
  };

  return React.createElement("div", null, React.createElement("div", {
    role: 'button',
    onClick: handleClick
  }, button), React.createElement("input", {
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
    getAverageRGB(base64.result).then(function (values) {
      setHexValue(RGBToHex(values.r, values.g, values.b));
    });
  };
}

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  return reader;
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

exports.FileAreaInput = FileAreaInput;
exports.FileButtonInput = FileButtonInput;
//# sourceMappingURL=index.js.map
