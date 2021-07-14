export const baseOptions = {
  credits: {
    enabled: false,
  },
  exporting: {
    buttons: {
      contextButton: {
        menuItems: [
          'downloadXLS',
          'downloadPNG',
          'downloadJPEG',
          'downloadPDF',
          'downloadSVG',
        ],
      },
    },
  },
};

export const timeSeriesZoomableOptions = {
  ...baseOptions,
  chart: {
    type: 'area',
    zoomType: 'x',
  },
  subtitle: {
    text:
      document.ontouchstart === undefined
        ? 'Click and drag in the plot area to zoom in'
        : 'Pinch the chart to zoom in',
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: null,
    },
  },
};
