import delve from 'dlv';
import { getStrapiMedia } from '../../utils';
import Image from 'next/image';

export type Image = {
  data: any[]
}


const FeaturedPartnershipsImages = ({ image }: { image: Image }) => {
  if (!image || !image.data) return null;

  const imageUrl = getStrapiMedia(delve(image.data, 'attributes.url'));
  if (!imageUrl) return null;


  return (
    <div className="relative space-y-4">
      <div className="flex items-end justify-center lg:justify-start space-x-4">
        <Image
          className="rounded-lg shadow-lg w-32 md:w-56"
          width={500}
          height={500}
          src={imageUrl}
          alt={delve(image, 'attributes.alternativeText')}
        />
      </div>

    </div>
  );
};

FeaturedPartnershipsImages.defaultProps = {};

export default FeaturedPartnershipsImages;
