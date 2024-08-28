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
      async function (error, result) {
        if (error) {
          return error.message;
        } else {
          return result;
        }
      }
    );
    return uploadResult;
  } catch (error) {
    console.log("ERROR", error.message);
    throw error;
  }
}

export async function loadStudiesInterconsultation(
  files, //array que contiene objetos  1 o mas archivos  {data = "archivo en base64", name : "nombredel archivo"}
  maxConcurrentUploads = 5 //define el maximo de upload simultaneo ya que puede traer problemas con cloudinary
) {
  let resultURLs = []; // guardo las url exitosas, pueden no estar en orden
  let failedUploads = []; // guardo los problemas que puedan surgir por si algun archivo no sube.

  if (files && Array.isArray(files)) {
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const data = files[i];

      const uploadPromise = loadFile(data.data)
        .then((result) => {
          resultURLs.push({ name: data.name, url: result.secure_url });
        })
        .catch((error) => {
          failedUploads.push({ name: data.name, error: error.message });
        });

      uploadPromises.push(uploadPromise);

      // Control de concurrencia
      if (uploadPromises.length >= maxConcurrentUploads) {
        await Promise.all(uploadPromises); // Espera a que se completen las subidas actuales
        uploadPromises.length = 0; // Vacía el array para la siguiente tanda de subidas
      }
    }

    // Subir los archivos restantes si quedaron promesas pendientes
    if (uploadPromises.length > 0) {
      await Promise.all(uploadPromises);
    }
  }

  // Devolver las URLs exitosas y los errores de subida
  return {
    success: resultURLs,
    failed: failedUploads,
  };
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
