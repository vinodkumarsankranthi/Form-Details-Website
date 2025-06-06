import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { Modal, IconButton, Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { canvasPreview } from "./canvasPreview"; // Adjust the path if necessary
import "react-image-crop/dist/ReactCrop.css";
import "./Imagecropertemplate2.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  //--------------------------------------------------------------------------------
  // Function to center and create an aspect ratio crop based on media dimensions
  //--------------------------------------------------------------------------------

  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function ImageCropperTemplate2({open,setOpen,handleSave,croppedImageDataUrl,setCroppedImageDataUrl}) {
  //--------------------------------------------------------------------------------
  // State variables
  //--------------------------------------------------------------------------------
  // const [croppedImageDataUrl, setCroppedImageDataUrl] = useState("");
  // const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");

    //--------------------------------------------------------------------------------
  // Function to handle the save the data url
  //--------------------------------------------------------------------------------
  useEffect(()=>{
    if(croppedImageDataUrl){
    handleSave()
  }
  },[croppedImageDataUrl])
  

  //--------------------------------------------------------------------------------
  // Function to close the modal
  //--------------------------------------------------------------------------------
  const handleClose = () => setOpen(false);

  //--------------------------------------------------------------------------------
  // Function to trigger the file input when the "Select Image" button is clicked
  //--------------------------------------------------------------------------------
  const handleImageClick = () => {
    document.getElementById("file-input")?.click();
  };

  //--------------------------------------------------------------------------------
  // Function to handle file selection and read the selected image
  //--------------------------------------------------------------------------------
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result?.toString() || "");
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //--------------------------------------------------------------------------------
  // Function to handle image load and set the initial crop based on the aspect ratio
  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  // Function to handle image load and set the initial crop based on the aspect ratio
  //--------------------------------------------------------------------------------
  const onImageLoad = (e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    // Automatically center the crop area when the image loads
    const centeredCrop = centerAspectCrop(width, height, aspect || 1); // Adjust aspect ratio as needed
    setCrop(centeredCrop);
    setCompletedCrop(centeredCrop);
  };

  //--------------------------------------------------------------------------------
  // Function to download the cropped image or save it as a data URL
  //--------------------------------------------------------------------------------
  const onDownloadCropClick = async () => {
    if (imgRef.current && previewCanvasRef.current && completedCrop) {
      const image = imgRef.current;
      const previewCanvas = previewCanvasRef.current;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Create a regular canvas element
      const canvas = document.createElement("canvas");
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No 2d context");

      ctx.drawImage(
        previewCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert the canvas content to a Blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Create a Data URL from the canvas
          const dataURL = canvas.toDataURL("image/png");

          // Save the Data URL (you can save it in state or use it elsewhere)
          //console.log("Data URL:", dataURL);
          // You can set the Data URL to state or pass it to another function:
          setCroppedImageDataUrl(dataURL);
          
          // Handle Blob URL for downloading the image
          if (blobUrlRef.current) {
            URL.revokeObjectURL(blobUrlRef.current);
          }
          blobUrlRef.current = URL.createObjectURL(blob);


          // Trigger download using the hidden anchor
          // if (hiddenAnchorRef.current) {
          //   hiddenAnchorRef.current.href = blobUrlRef.current;
          //   hiddenAnchorRef.current.download = "cropped-image.png"; // Specify the file name for download
          //   hiddenAnchorRef.current.click();
          // }
          
        }
      }, "image/png");

      
    }
  };

  //--------------------------------------------------------------------------------
  // Function to toggle the aspect ratio for cropping
  //--------------------------------------------------------------------------------

  const handleToggleAspectClick = () => {
    setAspect(aspect ? undefined : 16 / 9);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, 16 / 9);
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  };

  //--------------------------------------------------------------------------------
  // Function to convert percentage-based crop to pixel-based crop (example implementation)
  //--------------------------------------------------------------------------------

  const convertToPixelCrop = (crop) => {
    // Example implementation; adjust according to your needs
    return {
      x: crop.x * 1000, // assuming you need to convert to pixels
      y: crop.y * 1000,
      width: crop.width * 1000,
      height: crop.height * 1000,
    };
  };

  //--------------------------------------------------------------------------------
  // Effect hook to update the cropped preview when the crop, scale, or rotate values change
  //--------------------------------------------------------------------------------
  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate
      );
    }
  }, [completedCrop, scale, rotate]);

  return (
    <>
      {/*_________________ Modal containing the image cropper interface__________________ */}
      <Modal open={open} onClose={handleClose}>
        <div className="image-croper2-container">
          <div className="image-croper2-content-container">
            <IconButton
              id="button-zoom"
              className="image-croper2-addeducationalMapmodalcancel"
              onClick={handleClose}
            >
              <CloseIcon className="image-croper2-addeducationalMapmodalcancelX" />
            </IconButton>

            <div className="image-croper2-table-header">Profile Editor</div>
            <div className="image-croper2-grid-container">
              {/* __________Left section of the modal: Adjust image and controls__________ */}
              <div className="image-cropper-left-section">
                <div className="image-croper2-subHeading">Adjust Image</div>
                <div className="image-subheading-tagline">
                  Drag the box / adjust the position to see Preview
                </div>
                <div className="image-shown-container">
                  {/*__________ Display the selected image within ReactCrop for cropping_____ */}
                  {image && (
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      // minHeight={50}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={image}
                        style={{
                          transform: `scale(${scale}) rotate(${rotate}deg)`,
                        }}
                        className="Adust-image-conatiner"
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                </div>
                <div className="image-cropper-controls">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleImageClick}
                    id="button-zoom"
                  >
                    <AddPhotoAlternateIcon className="buttonicons" />
                    Select Image
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <div className="cropper-select-and-heading">
                    Scale:
                    <input
                      type="number"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      disabled={!image}
                      className="input-size-and-design"
                    />
                  </div>
                  <div className="cropper-select-and-heading">
                    Rotate:
                    <input
                      type="number"
                      value={rotate}
                      onChange={(e) =>
                        setRotate(
                          Math.min(180, Math.max(-180, Number(e.target.value)))
                        )
                      }
                      disabled={!image}
                      className="input-size-and-design"
                    />
                  </div>
                  {/* <button onClick={handleToggleAspectClick}>
                    Toggle Aspect {aspect ? "Off" : "On"}
                  </button> */}
                </div>
              </div>
              {/*________________ Right section of the modal: Cropped image preview and save options________ */}
              <div className="image-croper-right-section">
                <div>
                  <div className="image-croper2-subHeading">Croped Image</div>
                  <div>This is how your photo will look</div>
                </div>
                {/* __________Canvas element to preview the cropped image____________ */}
                <div className="image-shown-container2">
                  <canvas
                    ref={previewCanvasRef}
                    className="images-show-cropted-image"
                  />
                </div>
                {/* <button onClick={onDownloadCropClick}>Download Crop</button> */}

                {/* <a
                  href="#hidden"
                  ref={hiddenAnchorRef}
                  download
                  style={{
                    position: "absolute",
                    top: "-200vh",
                    visibility: "hidden",
                  }}
                >
                  Hidden download
                </a> */}
              </div>
            </div>
            <div className="imgae-croper-save-button">
              <Button
                variant="contained"
                color="success"
                onClick={onDownloadCropClick}
                id="button-zoom"
              >
                <SaveIcon className="buttonicons" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ImageCropperTemplate2;
