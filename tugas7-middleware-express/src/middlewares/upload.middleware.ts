import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Maksimal 5MB
  },
});

export const single = upload.single("file"); // Nama field harus sesuai dengan yang dikirim dari klien
export const multiple = upload.array("files", 10); // Nama field harus sesuai dengan yang dikirim dari klien

export default {
  single,
  multiple,
};
