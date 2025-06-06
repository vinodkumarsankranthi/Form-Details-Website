import React ,{useState} from "react";
import ImageCropperTemplate2 from "./ImageCropperTemplate2";

function SampleCode() {
  // use the  'croppedImageDataUrl' state for croped image
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState("");
  const [open, setOpen] = useState(true);

  //   to open the modal(use this fuction foe open the croper when onclick event)
  const handleOpenImageCroper = () => {
    setOpen(true);
  };

  const handleSave=()=>{
    console.log( 'dddd',croppedImageDataUrl)
  }
  return (
    <div>

      <div onClick={handleOpenImageCroper}>Image Croper</div>
      <ImageCropperTemplate2
        open={open}
        setOpen={setOpen}       
        handleSave={handleSave}
      />
      
    </div>
  );
}

export default SampleCode;
