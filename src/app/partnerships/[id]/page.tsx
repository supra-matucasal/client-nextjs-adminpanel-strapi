import { getPartnershipsById } from "@/services/partnerships.service";


const getData = async (id: number) => {
  const res = await getPartnershipsById(id);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Partnership = async ({ params }: { params: { id: string } }) => {
  console.log('Partnership: ', params)

  const partnershipData = await getData(+params.id);

  return (
    <div>
      Partnership:
      <div>Name: {partnershipData.data.attributes.name}</div>
      <div>Slug: {partnershipData.data.attributes.slug}</div>
      <div>Description: {partnershipData.data.attributes.description}</div>
    </div>
  );

}

export default Partnership;
