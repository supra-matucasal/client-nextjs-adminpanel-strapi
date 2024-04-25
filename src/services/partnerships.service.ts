import { getPartnershipsDataPage, getPartnershipsData, QueryKey, getPartnershipByIdData } from '@/utils';
import delve from 'dlv';


const getPartnershipsPage = async (pageSlug: string) => {

//export function getData(slug: string, locale: string, apiID: string, kind: string, preview?: boolean): DataReturn {

  const data = getPartnershipsDataPage(
    pageSlug,
    'en',
    'partnerships-pages',
    'collectionType',
  );
  const res = await fetch(delve(data, 'data'), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { tags: ['getPartnershipsPage'], revalidate: 20 },
  });

  return res;
}

const getPartnerships = async (key: QueryKey) => {
  const data = getPartnershipsData(
    key
  );

  const res = await fetch(delve(data, 'data'), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { tags: ['getPartnerships'], revalidate: 20 },
  });

  return res;

}

const getPartnershipsById = async (id: number) => {
  const data = getPartnershipByIdData(
    id
  );

  const res = await fetch(delve(data, 'data'), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { tags: ['getPartnershipById'], revalidate: 20 },
  });

  return res;
}

export {
  getPartnershipsPage,
  getPartnerships,
  getPartnershipsById
};

