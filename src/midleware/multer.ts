import { Request } from "express";
import * as multer from "multer";
import * as path from "path";

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "src/uploads");
  },

  filename: (req: Request, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

export default upload;
