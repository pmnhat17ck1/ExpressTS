import multer from "multer";
import { Request } from "express";
import fs from "fs-extra";

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb: any) {
    const Id = req.params.id;
    const path = `public/uploads/users/${String(Id)}`;
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename(req: Request, file: any, cb: any) {
    const uniqueSuffix = `${String(Date.now())}-${String(
      Math.round(Math.random() * 1e9)
    )}`;
    const extension = `.${String(file.mimetype.split("/")[1])}`;
    cb(null, `${String(file.fieldname)}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = async (req: Request, file: any, cb: any): Promise<any> => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});
export { upload };
export default {
  upload,
};
