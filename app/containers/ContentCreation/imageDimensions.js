const imageDimensions = {
  articleImage: {
    title: 'Article Image',
    crop: {
      unit: 'px',
      minWidth: 900,
      minHeight: 562.5,
      aspect: 900 / 562.5,
    },
    resize: { width: 900, height: 562.5 },
  },
  gridView: {
    title: 'Grid view thumbnail',
    crop: {
      unit: 'px',
      minWidth: 100,
      minHeight: 100,
      aspect: 100 / 100,
    },
    resize: { width: 100, height: 100 },
  },
  listView: {
    title: 'List view thumbnail',
    crop: {
      unit: 'px',
      minWidth: 155,
      minHeight: 115,
      aspect: 155 / 115,
    },
    resize: { width: 155, height: 115 },
  },
};

export { imageDimensions };
