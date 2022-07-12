const multer = require("multer");
var fs = require("fs");
let defaultDir = "./Public";

// Return multer object

module.exports = {
  uploader(destination, fileNamePrefix) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const dir = destination ? defaultDir + destination : defaultDir;
        if (fs.existsSync(dir)) {
          console.log(`${dir}, "exists"`);
          cb(null, dir);
        } else {
          fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
          console.log(`${dir}, "make"`);
        }
      },
      filename: (req, file, cb) => {
        let originalname = file.originalname;
        let ext = originalname.split(".");
        let filename = fileNamePrefix + Date.now() + "." + ext[ext.length - 1];
        cb(null, filename);
      },
    });

    const imageFilter = (req, file, callback) => {
      const ext = /\.(jpg|jpeg|png|JPEG|JPG)$/;
      if (!file.originalname.match(ext)) {
        return callback(
          new Error("Only selected file type are allowed"),
          false
        );
      }
      callback(null, true);
    };

    return multer({
      storage,
      fileFilter: imageFilter,
    });
  },
};

// const multer = require("multer");
// const fs = require("fs");

// module.exports = {
//   uploader: (directory, fileNamePrefix) => {
//     // mendefine lokasi penyimpanan utama
//     let defaultDir = "./Public";

//     // Konfigurasi multer
//     const storageUploader = multer.diskStorage({
//       destination: (req, file, cb) => {
//         // Menentukan lokasi penyimpanan file
//         const pathDir = directory ? defaultDir + directory : defaultDir;

//         // melakukan pemeriksaan pathDir
//         if (fs.existsSync(pathDir)) {
//           // Jika directory ada, maka akan langsung digunakan untuk menyimpan file
//           console.log(`Directory ${pathDir} exist ✅`);
//           cb(null, pathDir);
//         } else {
//           fs.mkdir(pathDir, { recursive: true }, (err) => cb(err, pathDir));
//           console.log(`Success created ${pathDir} ✅`);
//         }
//       },
//       filename: (req, file, cb) => {
//         // Membaca tipe data file
//         let ext = file.originalname.split(".");

//         // Membuat filename baru
//         let filename = fileNamePrefix + Date.now() + "." + ext[ext.length - 1];

//         cb(null, filename);
//       },
//     });

//     const fileFilter = (req, file, cb) => {
//       const extFilter = /\.(jpg|png|webp|svg|jpeg)/;

//       if (!file.originalname.toLowerCase().match(extFilter)) {
//         return cb(new Error("Your file ext are denied ❌", false));
//       }

//       cb(null, true);
//     };

//     return multer({ storage: storageUploader, fileFilter });
//   },
// };
