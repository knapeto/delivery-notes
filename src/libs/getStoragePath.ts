const getStoragePath = (relativePath: string) => {
  return `https://storage.googleapis.com/dmc-gallery/${relativePath}`;
};

export default getStoragePath;
