import { files } from "./constants";
const getDefaultContent = (language) => {
  const file = files.find((file) => file.name === language.toLowerCase());
  return file ? file.value : "";
};
export default getDefaultContent;
