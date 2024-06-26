//import { ParsedUrlQuery } from 'querystring';
//import { GetServerSidePropsResult } from 'next';

// Assuming you have installed types for 'pluralize'
var pluralize = require('pluralize');

interface Redirection {
  redirect: {
    destination: string;
    permanent: false;
  };
}

interface DataReturn {
  data: string;
  slug?: string;
}

interface PartnershipsResponse {
  data: any[]; // Specify the data type more accurately if known
  meta: {
    pagination: {
      total: number;
    };
  };
}

interface ArticlesResponse {
  data: any[]; // Specify the data type more accurately if known
  meta: {
    pagination: {
      total: number;
    };
  };
}

export interface QueryKey {
  queryKey: string[];
}

export function getStrapiMedia(url: string | null): string | null {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${url}`;
}

export function getStrapiURL(path: string): string {
  const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api${path}`;
  console.log('getStrapiUrl: ', url);
  return url;
}

export function handleRedirection(preview?: boolean, custom?: string): Redirection {
  if (preview) {
    return {
      redirect: {
        destination: `/api/exit-preview`,
        permanent: false,
      },
    };
  } else if (custom) {
    return {
      redirect: {
        destination: `/${custom}`,
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
}

export function getData(slug: string, locale: string, apiID: string, kind: string, preview?: boolean): DataReturn {
  const previewParams = preview ? '&publicationState=preview&published_at_null=true' : '';
  let apiUrl = '';
  let slugToReturn = '';

  if (kind === 'collectionType') {
    let prefix = apiID === 'page' ? '' : `/${pluralize(apiID)}`;
    prefix = apiID === 'article' ? '/blog' : prefix;
    slugToReturn = `${prefix}/${slug}?lang=${locale}`;
    apiUrl = `/${pluralize(apiID)}?filters[slug][$eq]=${slug}&locale=${locale}${previewParams}&populate[seo][populate]=metaSocial.image&populate[blocks][on][blocks.featured-partnerships][populate]=partnerships.image&populate[blocks][on][blocks.hero][populate]=*&populate[blocks][on][blocks.faq][populate]=*`;
  } else {
    apiUrl = `/${apiID}?locale=${locale}${previewParams}&populate[seo][populate]=metaSocial.image&populate[blocks][on][blocks.featured-partnerships][populate]=partnerships.image&populate[blocks][on][blocks.hero][populate]=*&populate[blocks][on][blocks.faq][populate]=*`;
    slugToReturn = apiID.includes('-page') ?
      `/${apiID.replace('-page', '')}?lang=${locale}` :
      `/${apiID.replace('-page', 's')}?lang=${locale}`;
  }

  return {
    data: getStrapiURL(apiUrl),
    slug: slugToReturn,
  };
}


export function getPartnershipsDataPage(slug: string, locale: string, apiID: string, kind: string, preview?: boolean): DataReturn {
  const previewParams = preview ? '&publicationState=preview&published_at_null=true' : '';

  let prefix = apiID === 'page' ? '' : `/${pluralize(apiID)}`;
  prefix = apiID === 'article' ? '/blog' : prefix;

  const slugToReturn = `${prefix}/${slug}?lang=${locale}`;
  const apiUrl = `/${pluralize(apiID)}??populate[header]=*&populate[blocks]=*&locale=en`;

  return {
    data: getStrapiURL(apiUrl),
    slug: slugToReturn,
  };
}


export function getPartnershipsData (key: QueryKey): DataReturn {
  const [_, localeCode, pageNumber, perPage] = key.queryKey;
  const start = +pageNumber === 1 ? 0 : (+pageNumber - 1) * +perPage;

  const baseUrl = getStrapiURL(`/partnerships?pagination[limit]=${perPage}&pagination[start]=${start}&pagination[withCount]=true&populate=image`);

  //const res = await fetch(baseUrl);
  //const partnerships: PartnershipsResponse = await res.json();

  //console.log('partnerships in get partnerships data: ', partnerships)

  return {
    // partnerships: partnerships.data,
    // count: partnerships.meta.pagination.total,
    data: baseUrl
  };

}

export function getPartnershipByIdData (id: number): DataReturn {
  const apiUrl = getStrapiURL(`/partnerships/${id}?populate=image`);
  return {
    data: apiUrl
  };
}
