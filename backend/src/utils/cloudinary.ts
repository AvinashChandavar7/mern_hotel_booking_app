import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});


const uploadOnCloudinary = async (localFilePath: any) => {
  try {
    if (!localFilePath) {
      return null;
    }

    //* Upload the File on Cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: 'auto' },
    );


    fs.unlinkSync(localFilePath);

    return response;

  } catch (error) {

    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
}

export { uploadOnCloudinary };


