import { canvasPreview } from "./canvasPreview"

let previewUrl = ""

function toBlob(canvas) {
  return new Promise(resolve => {
    canvas.toBlob(resolve)
  })
}


export async function compressImage(image, crop, scale = 1, rotate = 0, quality = 0.8) {
    const canvas = document.createElement("canvas");
    canvasPreview(image, canvas, crop, scale, rotate);
  
    // Convert canvas to base64-encoded string with specified image quality
    const base64Image = canvas.toDataURL("image/jpeg", quality);
  
    return base64Image;
  }

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(image, crop, scale = 1, rotate = 0) {
  const canvas = document.createElement("canvas")
  canvasPreview(image, canvas, crop, scale, rotate)

  const blob = await toBlob(canvas)

  if (!blob) {
    console.error("Failed to create blob")
    return ""
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl)
  }

  previewUrl = URL.createObjectURL(blob)
  return previewUrl
}
