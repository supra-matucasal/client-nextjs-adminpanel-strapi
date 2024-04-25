import delve from "dlv";
import Link from "next/link";
import { getStrapiMedia } from "../../utils";
import Image from 'next/image';

type LocalImage = {
  data: any[]
}

const PartnershipCard = ({ id, slug, image, name }: { id: number, slug: String, image: LocalImage, name: String }) => {


  const imageUrl = getStrapiMedia(delve(image.data, 'attributes.url'));

  return (
    <div>
      <Link href={`/partnerships/${id}`}>
        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-full cursor-pointer">
          {imageUrl && (

            <Image
              className="rounded-lg shadow-lg w-32 md:w-56"
              width={500}
              height={500}
              src={imageUrl}
              alt={delve(image, 'attributes.alternativeText')}

            />
          )

          }


          <div className="bg-white w-full p-4">
            {name && (
              <p className="text-gray-800 text-xl font-medium mb-2">{name}</p>
            )}


          </div>
        </div>
      </Link>
    </div>
  );
};

export default PartnershipCard;
