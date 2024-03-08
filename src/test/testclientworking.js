import React, { useState, useRef } from "react";
import "./App.css";

const filterOptions = [
  { id: "brightness", name: "Brightness" },
  { id: "saturation", name: "Saturation" },
  { id: "contrast", name: "Contrast" }, // Added contrast
  { id: "sharpness", name: "Sharpness" }, // Added sharpness
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
  const [contrast, setContrast] = useState(100); // State for contrast
  const [sharpness, setSharpness] = useState(0); // State for sharpness
  const [inversion, setInversion] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [lineThickness, setLineThickness] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(1);
  const [flipVertical, setFlipVertical] = useState(1);

  const fileInputRef = useRef(null);
  const previewImgRef = useRef(null);

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    fetch("http://localhost:5000/api/process-image", {
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
        setPreviewImg(sketchUrl); // Update preview image with processed image URL
        resetFilter(); // Reset filters
      })
      .catch((error) => {
        console.error("Error processing image:", error);
        // Handle error if needed
      });
  };

  const applyFilter = () => {
    // Apply CSS filters for brightness, saturation, and grayscale
    previewImgRef.current.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%)`;

    // Apply blur using CSS filter
    previewImgRef.current.style.filter += `blur(${sharpness}px)`;

    // Apply rotate and scale transformations using CSS transform
    previewImgRef.current.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;

    // Set opacity directly
    previewImgRef.current.style.filter = `opacity(${opacity})`; // Use filter property for opacity

    // Adjust width for zoom
    previewImgRef.current.style.width = `${zoom * 100}%`;

    // Apply contrast using CSS custom property if supported, otherwise, use canvas
    previewImgRef.current.style.setProperty("--contrast", `${contrast}%`);
  };

  const resetFilter = () => {
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
  };

  const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
      ctx.filter += `blur(${sharpness}px)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL();
      link.click();
    };

    image.src = previewImg;
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
        setSliderValue(zoom * 100); // Convert zoom to percentage
        break;
      case "opacity":
        setSliderValue(opacity * 100); // Convert opacity to percentage
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
        setZoom(value / 100); // Convert back to a decimal
        break;
      case "opacity":
        setOpacity(value / 100); // Convert back to a decimal
        break;
       default:
      break;
  }
  applyFilter(); // Call applyFilter after updating state
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
  };

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
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button id="right" onClick={() => handleRotate("right")}>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button
                id="horizontal"
                onClick={() => handleRotate("horizontal")}
              >
                <i className="bx bx-reflect-horizontal"></i>
              </button>
              <button id="vertical" onClick={() => handleRotate("vertical")}>
                <i className="bx bx-reflect-vertical"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="preview-img">
          {previewImg ? (
          <img
          src={previewImg}
          alt="preview"
          ref={previewImgRef}
          onLoad={applyFilter} // Add the onLoad event listener
        />
        
          ) : (
            <img src="image-placeholder.svg" alt="preview-img" />
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
          <button onClick={saveImage} className="save-img">
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default Client;
