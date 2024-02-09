import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});


// Update processImageUpload function
export const processImageUpload = async (image: any) => {
  try {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = "data:" + image.mimetype + ";base64," + b64;

    const response = await cloudinary.uploader.upload(dataURI);

    // return response.secure_url; // Use secure_url from Cloudinary response

    return response.url;

  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Error uploading image to Cloudinary');
  }
};
