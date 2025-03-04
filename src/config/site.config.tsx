import { Metadata } from 'next';

//import logoImg from '@public/logo.svg';
import logoImg from '@public/logo.png';

import { LAYOUT_OPTIONS } from '@/config/enums';

///import logoIconImg from '@public/logo-short.svg';
import logoIconImg from '@public/logo-short.png';


import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Corky',
  description: `Corky`,
  logo: logoImg,
  icon: logoIconImg,
  
  mode: MODE.LIGHT,


  ///layout: LAYOUT_OPTIONS.HYDROGEN,

  //layout: LAYOUT_OPTIONS.HELIUM,

  layout: LAYOUT_OPTIONS.LITHIUM,

  //layout: LAYOUT_OPTIONS.BERYLLIUM,


  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Corky` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Corky` : title,
      description,
      url: 'https://lefimall.vercel.app',
      siteName: 'Corky', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://lefimall.vercel.app/logo.png',
        width: 1200,
        height: 630,
      },
      //locale: 'en_US',
      locale: 'ko_KR',
      type: 'website',
    },
  };
};
