import { getData } from '@/utils';

const getPage = async (pageSlug: string) => {

  var delve = require('delve')

  const data = getData(
    pageSlug,
    'en',
    'page',
    'collectionType',
  );
  const res = await fetch(delve(data, 'data'), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    next: { tags: ['getPage'], revalidate: 20 },
  });

  return res;
}

export {
  getPage
};

