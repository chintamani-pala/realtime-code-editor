const saveFile = (fileName, value) => {
  // Get the correct file extension
  const blob = new Blob([value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Default file name and extension
  a.click();
  URL.revokeObjectURL(url); // Clean up after download
};

export default saveFile;
