import cloudinary from "cloudinary";

const { API_CLOUDINARY_KEY, API_CLOUDINARY_SECRET, API_CLOUDINARY_CLOUDNAME } =
  process.env;

// Configuration
cloudinary.config({
  cloud_name: API_CLOUDINARY_CLOUDNAME,
  api_key: API_CLOUDINARY_KEY,
  api_secret: API_CLOUDINARY_SECRET, // Click 'View Credentials' below to copy your API secret
});

// Upload an image
export async function loadImage(idImg, url) {
  const uploadResult = await cloudinary.uploader.upload(
    url,
    {
      public_id: idImg,
    },
    async function (error, result) {
      if (error) {
        console.log(error);
        return error;
      } else {
        return result;
      }
    }
  );

  return uploadResult;
}
// Upload file
export async function loadFile(url) {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      url,
      {},
      async function (error, result) {
        if (error) {
          console.log(error);
          return error;
        } else {
          return result;
        }
      }
    );
    return uploadResult;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Optimize delivery by resizing and applying auto-format and auto-quality
export async function autoOptimizeImg(idImg) {
  const optimizeUrl = cloudinary.url(idImg, {
    fetch_format: "auto",
    quality: "auto",
  });
  return optimizeUrl;
}

// Transform the image: auto-crop to square aspect_ratio
export async function transformImage(idImg, width, height) {
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: width,
    height: height,
  });
  return autoCropUrl;
}
