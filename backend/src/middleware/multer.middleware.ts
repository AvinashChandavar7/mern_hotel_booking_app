import multer, { Multer } from 'multer';

const diskStorageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/temp');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const memoryStorageConfig = multer.memoryStorage();

const upload: Multer = multer({
  // storage: process.env.STORAGE_TYPE === 'memory' ? memoryStorageConfig : diskStorageConfig,
  storage: memoryStorageConfig,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;


