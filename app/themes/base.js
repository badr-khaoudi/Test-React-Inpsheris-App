export const ThemeData = {
  typography: {
    fontFamily: 'Lato, Helvetica, Arial, sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 400 },
    fontWeightMedium: 700,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: 'Lato, Helvetica, Arial, sans-serif',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#DB1F26',
    },
    secondary: {
      main: '#143C7D',
    },
    warning: {
      main: '#F0BC52',
    },
    success: {
      main: '#347D14',
    },
  },
  uiConfig: {
    typography: {
      color: '#000000',
    },
    header: {
      height: 75,
    },
    carousel: {
      homepage: {
        levelOne: {
          height: 315,
          width: 1500,
        },
        levelTwo: {
          height: 266,
          width: 266,
        },
      },
      community: {
        levelOne: {
          height: 315,
          width: 1200,
        },
        levelTwo: {
          height: 266,
          width: 266,
        },
      },
    },
  },
  imageMap: {
    bannerDimensions: {
      banner: {
        title: '',
        crop: {
          unit: 'px',
          minWidth: 1200,
          minHeight: 260,
          aspect: 1200 / 260,
        },
        resize: { width: 1200, height: 260 },
      },
    },
    imageLevel1: {
      image: {
        title: '',
        crop: {
          unit: 'px',
          minWidth: 1500,
          minHeight: 315,
          aspect: 1500 / 315,
        },
        resize: { width: 1500, height: 315 },
      },
    },
    imageLevel2: {
      image: {
        title: '',
        crop: {
          unit: 'px',
          minWidth: 226,
          minHeight: 226,
          aspect: 226 / 226,
        },
        resize: { width: 226, height: 226 },
      },
    },
    logoDimensions: {
      logo: {
        title: '',
        crop: {
          unit: 'px',
          minWidth: 337,
          minHeight: 337,
          aspect: 337 / 337,
        },
        resize: { width: 337, height: 337 },
      },
    },
    communityBanner: {
      banner: {
        title: 'Banner image',
        crop: {
          unit: 'px',
          minWidth: 1200,
          minHeight: 260,
          aspect: 1200 / 260,
        },
        resize: { width: 1200, height: 260 },
      },
      listView: {
        title: 'List view image',
        crop: {
          unit: 'px',
          minWidth: 300,
          minHeight: 168,
          aspect: 300 / 168,
        },
        resize: { width: 300, height: 168 },
      },
    },
  },
};

export const ClientData = {
  social: [
    {
      id: 1,
      type: 'linked_in',
      url: 'https://www.linked_in.com',
    },
    {
      id: 2,
      type: 'youtube',
      url: 'https://www.youtube.com',
    },
    {
      id: 3,
      type: 'twitter',
      url: 'https://www.twitter.com',
    },
    {
      id: 4,
      type: 'facebook',
      url: 'https://www.facebook.com',
    },
    {
      id: 5,
      type: 'instagram',
      url: 'https://www.instagram.com',
    },
  ],
  links: [
    {
      id: 1,
      name: 'www.inpheris.com',
      url: 'https://www.inspheris.com',
      type: 'link',
    },
    {
      id: 3,
      name: '24 Rue Jacques Ibert, 92533 Levallois-Perret Paris',
      url: 'https://www.inspheris.com',
      type: 'address',
    },
    {
      id: 4,
      name: 'Paris',
      url: 'https://www.inspheris.com',
      type: 'phone',
    },
    {
      id: 5,
      name: 'Lively 2019',
      url: 'https://www.inspheris.com',
      type: 'copyright',
    },
  ],
};
