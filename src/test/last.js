import React, { useState, useRef,useEffect } from "react";
import "./App.css";

const filterOptions = [
  { id: "brightness", name: "Brightness" },
  { id: "saturation", name: "Saturation" },
  { id: "contrast", name: "Contrast" },
  { id: "sharpness", name: "Sharpness" },
  { id: "inversion", name: "Inversion" },
  { id: "grayscale", name: "Grayscale" },
  { id: "lineThickness", name: "Line Thickness" },
  { id: "zoom", name: "Zoom" },
  { id: "opacity", name: "Opacity" },
];

function Client() {

  const [previewImg, setPreviewImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState("brightness");
  const [sliderValue, setSliderValue] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [sharpness, setSharpness] = useState(0);
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [lineThickness, setLineThickness] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(1);
  const [flipVertical, setFlipVertical] = useState(1);
  const [isErasing, setIsErasing] = useState(false);
  const eraserWidth = 10; // Adjust eraser size as needed
  // Additional state for drawing
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#000000");
  const [drawWidth, setDrawWidth] = useState(3);


  const fileInputRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // ... existing code from Client.js ...
  const handleEraserClick = () => {
    setIsErasing(!isErasing);
  };
  const startDrawing = (e) => {
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawWidth;
    ctx.lineCap = "round"; // Ensure smooth line endings
  };
  const clearCanvas = () => {
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (previewImg) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = previewImg;
    }
  };
  const draw = (e) => {
    if (!isDrawing && !isErasing) return;
  
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
  
    if (isDrawing) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = drawWidth;
      ctx.stroke();
    } else if (isErasing) {
      ctx.beginPath();
      ctx.arc(x, y, eraserWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 1)"; // Erase with white color
      ctx.fill();
    }
  };
  

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handleDownload = () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return; // Handle potential errors gracefully
    alert('this working')
    // Capture the canvas content with drawing
    const dataURL = canvas.toDataURL();
  
    const link = document.createElement("a");
    link.download = "edited_image.png";
    link.href = dataURL;
    link.click();
  };
  
  
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !previewImg) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = img.width / img.height;

      // Adjust the width and height of the canvas based on the aspect ratio
      canvas.width = 300; // Set a desired width
      canvas.height = canvas.width / aspectRatio;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = previewImg;
  }, [previewImg]);

  // existing code...

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    fetch("https://khan804.pythonanywhere.com/api/process-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to process image");
        }
        return response.json();
      })
      .then((data) => {
        const { sketchUrl } = data;
        setPreviewImg(sketchUrl);
        resetFilter();
      })
      .catch((error) => {
        console.error("Error processing image:", error);
      });
  };

  const applyFilter = () => {
    // Apply CSS filters
    previewCanvasRef.current.style.filter = `
      brightness(${brightness}%)
      saturate(${saturation}%)
      grayscale(${grayscale}%)
    `;
    // Apply additional filters
    previewCanvasRef.current.style.filter += `contrast(${contrast}%)`;
    previewCanvasRef.current.style.filter += `blur(${sharpness}px)`;
    previewCanvasRef.current.style.setProperty("--contrast", `${contrast}%`);
    // Apply transformations
    previewCanvasRef.current.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    // Apply opacity
    previewCanvasRef.current.style.filter += `opacity(${opacity})`;
  };

  const resetFilter = () => {
    // Reset all filter and transformation states
    setBrightness(100);
    setSaturation(100);
    setContrast(100);
    setSharpness(0);
    setInversion(0);
    setGrayscale(0);
    setLineThickness(1);
    setZoom(1);
    setOpacity(1);
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
    setActiveFilter("brightness");
    setSliderValue(100);
    // Apply default filter on reset
    applyFilter();
    clearCanvas();
  };

  const saveImage = () => {
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = previewImg;
    link.click();
  };

  const handleFilterClick = (option) => {
    setActiveFilter(option.id);
    switch (option.id) {
      case "brightness":
        setSliderValue(brightness);
        break;
      case "saturation":
        setSliderValue(saturation);
        break;
      case "contrast":
        setSliderValue(contrast);
        break;
      case "sharpness":
        setSliderValue(sharpness);
        break;
      case "inversion":
        setSliderValue(inversion);
        break;
      case "grayscale":
        setSliderValue(grayscale);
        break;
      case "lineThickness":
        setSliderValue(lineThickness);
        break;
      case "zoom":
        setSliderValue(zoom * 100);
        break;
      case "opacity":
        setSliderValue(opacity * 100);
        break;
      default:
        setSliderValue(100);
    }
  };

  const handleSliderChange = (event) => {
    const value = parseFloat(event.target.value);
    setSliderValue(value);
    switch (activeFilter) {
      case "brightness":
        setBrightness(value);
        break;
      case "saturation":
        setSaturation(value);
        break;
      case "contrast":
        setContrast(value);
        break;
      case "sharpness":
        setSharpness(value);
        break;
      case "inversion":
        setInversion(value);
        break;
      case "grayscale":
        setGrayscale(value);
        break;
      case "lineThickness":
        setLineThickness(value);
        break;
      case "zoom":
        setZoom(value / 100);
        break;
      case "opacity":
        setOpacity(value / 100);
        break;
      default:
        break;
    }
    applyFilter();
  };

  const handleRotate = (option) => {
    if (option === "left") {
      setRotate(rotate - 90);
    } else if (option === "right") {
      setRotate(rotate + 90);
    } else if (option === "horizontal") {
      setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
    } else {
      setFlipVertical(flipVertical === 1 ? -1 : 1);
    }
    applyFilter();
  };

  // Additional function to handle drawing

  return (
    <div className={`container ${!previewImg ? "disable" : ""}`}>
      <div className="wrapper">
        <div className="editor-panel">
          <div className="filter">
            <label className="title">Filters</label>
            <div className="options">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  id={option.id}
                  className={activeFilter === option.id ? "active" : ""}
                  onClick={() => handleFilterClick(option)}
                >
                  {option.name}
                </button>
                
              ))}
            </div>
            <div className="slider">
              <div className="filter-info">
                <p className="name">{activeFilter}</p>
                <p className="value">{`${sliderValue}${
                  activeFilter === "zoom" || activeFilter === "opacity"
                    ? "%"
                    : ""
                }`}</p>
              </div>
              <input
                type="range"
                min="0"
                max={
                  activeFilter === "brightness" || activeFilter === "saturation"
                    ? "200"
                    : "100"
                }
                value={sliderValue}
                onChange={handleSliderChange}
              />
            </div>
          </div>
          <div className="rotate">
            <label className="title">Rotate & Flip</label>
            <div className="options">
              <button id="left" onClick={() => handleRotate("left")}>
                Rotate Left
              </button>
              <button id="right" onClick={() => handleRotate("right")}>
                Rotate Right
              </button>
              <button
                id="horizontal"
                onClick={() => handleRotate("horizontal")}
              >
                Flip Horizontal
              </button>
              <button id="vertical" onClick={() => handleRotate("vertical")}>
                Flip Vertical
              </button>
            </div>
          </div>
          <div className="drawing-tools">
            <label className="title">Drawing Tools</label>
            <div className="options">
              <input
                type="color"
                value={drawColor}
                onChange={(e) => setDrawColor(e.target.value)}
              />
              <input
                type="number"
                value={drawWidth}
                onChange={(e) => setDrawWidth(e.target.value)}
              />
            </div>
            <button onClick={handleEraserClick} className="eraser-btn">
          {isErasing ? "Stop Erasing" : "Erase"}
        </button>
          </div>
        </div>
        <div className="preview-img">
          {previewImg && (
            <canvas
            ref={previewCanvasRef}
            className="preview-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
            style={{ backgroundImage: `url(${previewImg})` }}
          />
          )}
        </div>
      </div>
      <div className="controls">
        <button className="reset-filter" onClick={resetFilter}>
          Reset Filters
        </button>
        <div className="row">
          <input
            type="file"
            className="file-input"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={loadImage}
          />
          <button
            className="choose-img"
            onClick={() => fileInputRef.current.click()}
          >
            Choose Image
          </button>
          <button onClick={handleDownload} className="save-img">
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default Client;
