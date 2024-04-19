import { getPartnershipsDataPage } from '@/utils';
import delve from 'dlv';


const getPartnershipsPage = async (pageSlug: string) => {

//export function getData(slug: string, locale: string, apiID: string, kind: string, preview?: boolean): DataReturn {

  const data = getPartnershipsDataPage(
    pageSlug,
    'en',
    'partnerships-pages',
    'collectionType',
  );
  console.log('partnerships url: ', )
  const res = await fetch(delve(data, 'data'), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { tags: ['getPartnershipsPage'], revalidate: 20 },
  });

  return res;
}

export {
  getPartnershipsPage
};

