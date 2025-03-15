import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  if (!file) throw new Error("File is missing");
  const extName = path.extname(file.originalname).toString(); // ✅ Fixed lowercase "n"
  return parser.format(extName, file.buffer).content;
};

export default getDataUri;
