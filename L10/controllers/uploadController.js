const pkg = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config(); // .env dosyasını yükle

const cloudinary = pkg.v2; // cloudinary.v2 nesnesini kullan

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadImage = async (filePath) => {
   try {
     const result = await cloudinary.uploader.upload(filePath, {
       folder: "contacts", // 📂 Cloudinary'de "contacts" klasörüne kaydedilecek
     });
     return result.secure_url;
   } catch (error) {
     console.error("upload error", error);
     throw new Error("Image upload failed");
   }
 };


const uploadRequest = async (req, res) => {
   try {
      const { filePath } = req.body;
      console.log("FilePath : ", filePath);
      const result = await uploadImage(filePath);
      res.json({ url: result });
   } catch (error) {
      console.error("yukleme hatasi:", error);
      res.status(500).json({ error: "yukleme basarisiz" });
   }
};


 module.exports = { uploadRequest };

/*export const uploadController = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log(uploadedResponse);
    res.json({ msg: "Yükleme başarılı", data: uploadedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Yükleme başarısız", error });
  }
};*/