import path from "path"; //jpg aniqlash uchun path
import multer from "multer"; //yuklash jarayoni
import { v4 } from "uuid"; //nom berish uchun

/** MULTER IMAGE UPLOADER **/
function getTargetImageStorage(address: any) {
  //qayerga va qanday nomlash
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`); //kirib kegan address argumentga qarab
      //  upload/member upload/s products papkalaga joylidi
    },
    filename: function (req, file, cb) {
      //fileni asl nomini orniga v4 unikal nom beradi
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension; //jpg qiymay
      cb(null, random_name);
    },
  });
}

const makeUploader = (address: string) => {
  //Bu funksiya yuqoridagi getTargetImageStorage(address)
  // sozlamasini oladi va tayyor multer middleware (oraliq dastur) obyektini yaratib qaytaradi.
  const storage = getTargetImageStorage(address);
  return multer({ storage: storage });
};

export default makeUploader;

/*const product_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const extension = path.parse(file.originalname).ext;
    const random_name = v4() + extension;
    cb(null, random_name);
  },
});

export const uploadProductImage = multer({ storage: product_storage }); */
