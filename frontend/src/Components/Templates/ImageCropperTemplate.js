//Cropper -Final
import React, { useState, useRef, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ImageCropperTemplate.css";

function ImageCropperTemplate({
  imageURL,
  setImageURL,
  croppedImgURL,
  setCroppedImgURL,
  SaveButtonClick,
  isSaveButtonRequired,
  deleteSrcImage,
  cropperAspectRatio,
}) {
  //--------------------------------------------------------------------------------
  //  State Handles
  //--------------------------------------------------------------------------------

  const [x1, setX1] = useState(50);
  const [y1, setY1] = useState(50);
  const [x2, setX2] = useState(150);
  const [y2, setY2] = useState(150);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const canvasRef = useRef(null);

  // const STANDARD_WIDTH = window.innerWidth*0.3;
  // const STANDARD_WIDTH = 350;
  // const STANDARD_HEIGHT = 250;
  const [STANDARD_WIDTH, setSTANDARD_WIDTH] = useState(window.innerWidth * 0.3);
  const [STANDARD_HEIGHT, setSTANDARD_HEIGHT] = useState(250);

  //--------------------------------------------------------------------------------xxxx
  //  Set Initial render the cropper - need to fix
  //--------------------------------------------------------------------------------xxxx
  useEffect(() => {
    const dummyFile = new File(
      [new Blob([""], { type: "image/png" })],
      "dummy.png",
      { type: "image/png" }
    );
    const objectURL = URL.createObjectURL(dummyFile);
    setImageURL(objectURL);
  }, [setImageURL]);

  //--------------------------------------------------------------------------------
  //  On Change Image function
  //--------------------------------------------------------------------------------
  const handleChange = (event) => {
    const file = event.target.files[0];
    setImageURL(URL.createObjectURL(file));
    //   alert(URL.createObjectURL(file))
  };

  //--------------------------------------------------------------------------------
  //  Cropping Functions by Mouse Handling
  //--------------------------------------------------------------------------------
  const handleMouseDown = (event) => {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;

    if (
      mouseX >= x1 - 5 &&
      mouseX <= x1 + 5 &&
      mouseY >= y1 - 5 &&
      mouseY <= y1 + 5
    ) {
      setResizing(true);
      setResizeCorner("top-left");
    } else if (
      mouseX >= x2 - 5 &&
      mouseX <= x2 + 5 &&
      mouseY >= y1 - 5 &&
      mouseY <= y1 + 5
    ) {
      setResizing(true);
      setResizeCorner("top-right");
    } else if (
      mouseX >= x1 - 5 &&
      mouseX <= x1 + 5 &&
      mouseY >= y2 - 5 &&
      mouseY <= y2 + 5
    ) {
      setResizing(true);
      setResizeCorner("bottom-left");
    } else if (
      mouseX >= x2 - 5 &&
      mouseX <= x2 + 5 &&
      mouseY >= y2 - 5 &&
      mouseY <= y2 + 5
    ) {
      setResizing(true);
      setResizeCorner("bottom-right");
    } else if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
      setDragging(true);
      setDragOffsetX(mouseX - x1);
      setDragOffsetY(mouseY - y1);
    }
  };

  const MIN_WIDTH = 20; // Minimum width of the blue box
  const MIN_HEIGHT = 20; // Minimum height of the blue box

  const handleMouseMove = (event) => {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    const aspectRatio = (x2 - x1) / (y2 - y1);

    if (dragging) {
      let newX1 = mouseX - dragOffsetX;
      let newY1 = mouseY - dragOffsetY;
      let newX2 = newX1 + (x2 - x1);
      let newY2 = newY1 + (y2 - y1);

      // Ensure the box stays within the canvas bounds
      newX1 = Math.max(
        0,
        Math.min(newX1, canvasRef.current.width - (newX2 - newX1))
      );
      newY1 = Math.max(
        0,
        Math.min(newY1, canvasRef.current.height - (newY2 - newY1))
      );
      newX2 = newX1 + (x2 - x1);
      newY2 = newY1 + (y2 - y1);

      setX1(newX1);
      setY1(newY1);
      setX2(newX2);
      setY2(newY2);
    } else if (resizing) {
      let newX1 = x1,
        newY1 = y1,
        newX2 = x2,
        newY2 = y2;
      const newWidth = Math.abs(mouseX - x1);
      const newHeight = Math.abs(mouseY - y1);

      if (cropperAspectRatio === "fixed") {
        switch (resizeCorner) {
          case "top-left":
            newX1 = Math.min(mouseX, x2 - MIN_WIDTH);
            newY1 = Math.min(mouseY, y2 - MIN_HEIGHT);
            const widthFromTopLeft = x2 - newX1;
            const heightFromTopLeft = widthFromTopLeft / aspectRatio;
            newX1 = x2 - widthFromTopLeft;
            newY1 = y2 - heightFromTopLeft;
            break;
          case "top-right":
            newX2 = Math.max(mouseX, x1 + MIN_WIDTH);
            newY1 = Math.min(mouseY, y2 - MIN_HEIGHT);
            const widthFromTopRight = newX2 - x1;
            const heightFromTopRight = widthFromTopRight / aspectRatio;
            newY1 = y2 - heightFromTopRight;
            break;
          case "bottom-left":
            newX1 = Math.min(mouseX, x2 - MIN_WIDTH);
            newY2 = Math.max(mouseY, y1 + MIN_HEIGHT);
            const widthFromBottomLeft = x2 - newX1;
            const heightFromBottomLeft = widthFromBottomLeft / aspectRatio;
            newY2 = y1 + heightFromBottomLeft;
            break;
          case "bottom-right":
            newX2 = Math.max(mouseX, x1 + MIN_WIDTH);
            newY2 = Math.max(mouseY, y1 + MIN_HEIGHT);
            const widthFromBottomRight = newX2 - x1;
            const heightFromBottomRight = widthFromBottomRight / aspectRatio;
            newY2 = y1 + heightFromBottomRight;
            break;
          default:
            break;
        }
      } else if (cropperAspectRatio === "free") {
        switch (resizeCorner) {
          case "top-left":
            newX1 = Math.min(mouseX, x2 - MIN_WIDTH);
            newY1 = Math.min(mouseY, y2 - MIN_HEIGHT);
            break;
          case "top-right":
            newX2 = Math.max(mouseX, x1 + MIN_WIDTH);
            newY1 = Math.min(mouseY, y2 - MIN_HEIGHT);
            break;
          case "bottom-left":
            newX1 = Math.min(mouseX, x2 - MIN_WIDTH);
            newY2 = Math.max(mouseY, y1 + MIN_HEIGHT);
            break;
          case "bottom-right":
            newX2 = Math.max(mouseX, x1 + MIN_WIDTH);
            newY2 = Math.max(mouseY, y1 + MIN_HEIGHT);
            break;
          default:
            break;
        }
      }

      // Ensure the box stays within the canvas bounds
      newX1 = Math.max(
        0,
        Math.min(newX1, canvasRef.current.width - (newX2 - newX1))
      );
      newY1 = Math.max(
        0,
        Math.min(newY1, canvasRef.current.height - (newY2 - newY1))
      );
      newX2 = Math.max(newX1 + MIN_WIDTH, newX2);
      newY2 = Math.max(newY1 + MIN_HEIGHT, newY2);

      setX1(newX1);
      setY1(newY1);
      setX2(newX2);
      setY2(newY2);
    }

    drawCanvas();
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);

    const width = x2 - x1;
    const height = y2 - y1;

    // Create a new canvas for the cropped image
    const newCanvas = document.createElement("canvas");
    newCanvas.width = width;
    newCanvas.height = height;

    const newCtx = newCanvas.getContext("2d");
    const img = new Image();
    img.src = imageURL;

    img.onload = () => {
      const scaleX = canvasRef.current.width / img.width;
      const scaleY = canvasRef.current.height / img.height;
      const scale = Math.min(scaleX, scaleY);

      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      const offsetX = (canvasRef.current.width - scaledWidth) / 2;
      const offsetY = (canvasRef.current.height - scaledHeight) / 2;

      // Adjust the crop coordinates
      const adjustedCropX = (x1 - offsetX) / scale;
      const adjustedCropY = (y1 - offsetY) / scale;

      newCtx.drawImage(
        img,
        adjustedCropX,
        adjustedCropY,
        width / scale,
        height / scale,
        0,
        0,
        width,
        height
      );

      const croppedProfileImageDataURL = newCanvas.toDataURL();
      setCroppedImgURL(croppedProfileImageDataURL);
    };
  };

  const drawCanvas = () => {
    if (imageURL) {
      // const canvas = imageURL.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageURL;

      img.onload = () => {
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.min(scaleX, scaleY);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        // Clear and redraw the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          (canvas.width - scaledWidth) / 2,
          (canvas.height - scaledHeight) / 2,
          scaledWidth,
          scaledHeight
        );

        // Constrain the selection box within the image bounds
        const adjustedX1 = Math.max(0, Math.min(x1, canvas.width - (x2 - x1)));
        const adjustedY1 = Math.max(0, Math.min(y1, canvas.height - (y2 - y1)));
        const adjustedX2 = Math.min(
          canvas.width,
          Math.max(adjustedX1 + MIN_WIDTH, x2)
        );
        const adjustedY2 = Math.min(
          canvas.height,
          Math.max(adjustedY1 + MIN_HEIGHT, y2)
        );

        // Draw the selection box
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          adjustedX1,
          adjustedY1,
          adjustedX2 - adjustedX1,
          adjustedY2 - adjustedY1
        );

        // Draw handles - 4 corner Box
        ctx.fillStyle = "blue";
        ctx.fillRect(adjustedX1 - 5, adjustedY1 - 5, 10, 10); // top-left handle
        ctx.fillRect(adjustedX2 - 5, adjustedY1 - 5, 10, 10); // top-right handle
        ctx.fillRect(adjustedX1 - 5, adjustedY2 - 5, 10, 10); // bottom-left handle
        ctx.fillRect(adjustedX2 - 5, adjustedY2 - 5, 10, 10); // bottom-right handle
      };
    }
  };

  return (
    <>
      <div className="imageCropperContainerComplete">
        <div className="imageCropperContainer">
          <div className="imageCropperContainer_inner imgCropperPhotoResp">
            <>
              {/*_____________________________  Image Cropper Container  (Left) _____________________ */}
              <div className="imgProfileCropper_Container">
                {/* {imageURL} */}
                <h5 className="imgCropper_TabHeadings">Original Photo</h5>
                <p className="imgCropper_ModParaText">
                  Drag the box / adjust the position to see Preview
                </p>
                <div className="imgCropper_InnerContainer">
                  {imageURL && (
                    <canvas
                      ref={canvasRef}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      width={STANDARD_WIDTH}
                      height={STANDARD_HEIGHT}
                      style={{
                        overflow: "scroll",
                        textAlign: "center",
                        border: "2px solid red",
                      }} //  in css file not working
                    />
                  )}
                </div>
                {/*__________________________  Input for Image __________________________ */}
                <div>
                  <input
                    type="file"
                    id="imgsModal"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>

                {/*____________  Icons(Pen & Trash) to Insert & Delete Image ____________ */}
                <div className="imgPhotoModal_Pen">
                  <Tooltip title="Insert Image">
                    <label htmlFor="imgsModal" className="imgCropperEditPen">
                      <i>
                        <AddPhotoAlternateIcon color="success" />
                      </i>
                    </label>
                  </Tooltip>
                  <Tooltip title="Clear Cropper Image">
                    <IconButton
                      variant="contained"
                      color="error"
                      // onClick={deleteSrcImage}
                      onClick={() => {
                        setImageURL(null);
                        setCroppedImgURL(null);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              {/*_____________________________  Image Preview Container  (Right) _____________________ */}
              <div
                className="imgProfileCroppedPreview_Container"
                // style={{  display: 'flex', flexDirection: 'column',  }}
              >
                <h5 className="imgCropper_TabHeadings">Preview</h5>
                <p className="imgCropper_ModParaText">
                  This is how your photo will look
                </p>

                {/*____________   Image Preview    _____________ */}
                <div className="imgProfilePhotoModal_Preview_Container">
                  <div className="imgProfilePhotoModal_Preview">
                    <div className="imgCroppedPreview">
                      {croppedImgURL && (
                        <>
                          <img
                            src={croppedImgURL}
                            alt="Cropped"
                            className="imgInsidePreviewer"
                          />
                          <br />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pmDelete_ProfileSrcImage_FromDB">
                    <Tooltip title="Delete Profile Picture">
                      <IconButton
                        variant="contained"
                        color="error"
                        onClick={deleteSrcImage}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>

                {/*____________    x-------------x   ____________ */}
              </div>
            </>
          </div>
        </div>
      </div>
      {/*_________________________________  Save Button  ____________________________ */}
      {isSaveButtonRequired && (
        <div className="profilePicModalFooter">
          <Button
            id="button-zoom"
            variant="contained"
            color="success"
            onClick={SaveButtonClick}
          >
            <SaveIcon className="buttonicons" />
            &nbsp;Save
          </Button>
        </div>
      )}
    </>
  );
}

export default ImageCropperTemplate;
