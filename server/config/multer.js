import multer from 'multer';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;

// const imageStorage = multer.diskStorage({

//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// // Set storage engine for videos
// const videoStorage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// export const imageUpload = multer({
//   storage: imageStorage,
//   limits: { fileSize: 10000000 }, // 10MB
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG, PNG, and GIF image files are allowed.'));
//     }
//   }
// }).single('image');

 
// Initiate Multer for video upload
// export const videoUpload = multer({
//   storage: videoStorage,
//   limits: { fileSize: 50000000 }, // 50MB
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype === 'video/mp4' || file.mimetype === 'video/quicktime' || file.mimetype === 'video/x-msvideo') {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only MP4, MOV, and AVI video files are allowed.'));
//     }
//   }
// }).single('my-video');
