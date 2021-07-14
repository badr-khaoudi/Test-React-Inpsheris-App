const checkFavicon = path =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve({ path, status: 'Ok' });
    image.onerror = () => resolve({ path, status: 'Error' });
    image.src = path;
  });

export { checkFavicon };
