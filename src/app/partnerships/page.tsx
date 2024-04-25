import delve from 'dlv';


import { getPartnerships } from "@/services/partnerships.service";
import PartnershipCard from '@/components/PartnershipCard';


async function getData() {
  const res = await getPartnerships({
    queryKey: [
      'partnerships',
      'en',
      '1',
      '10'
    ]
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}




const PartnershipsPage = async () => {


  const partnershipsData = await getData();

  const partnershipsDataResult = partnershipsData.data

  console.log('partnershipsData', partnershipsDataResult)
  console.log('pagination: ', partnershipsData.meta.pagination)

  return (
    <div>
      <div>Partnerships Page</div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 mt-24 px-4">
        {partnershipsDataResult && 
          partnershipsDataResult.map((partnership: any, index: number) => (
            <PartnershipCard
              {...partnership.attributes}
              locale={partnership.locale}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default PartnershipsPage;