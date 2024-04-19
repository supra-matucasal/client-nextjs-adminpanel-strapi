import delve from 'dlv';


import { getPartnershipsPage } from "@/services/partnerships.service";


async function getData(slug:string, lang?:string, contentType?:string, type?:string) {
  const res = await getPartnershipsPage(slug)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}




const PartnershipsPage = async () => {


  const data = await getData(
    '',
    'en',
    'page',
    'collectionType',
  );

  const pageData = data.data[0]
  const blocks = delve(pageData, 'attributes.blocks');

  console.log('pageData', pageData)

  return <div>Restaurants Page</div>;
}

export default PartnershipsPage;