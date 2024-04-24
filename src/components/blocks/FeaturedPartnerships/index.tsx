import FeaturedPartnershipsImages from "@/components/FeaturedPartnershipsImages";
import Link from "next/link";

export type Partnership = {
  data: any[]
}


const FeaturedPartnerships = ({ header, partnerships, theme }: { header: any, partnerships: Partnership, theme: string }) => {
  console.log('Featured partnerships: ', partnerships)
  return (
    <div className={`bg-${theme} py-40 px-4`}>
      Partnerships


      <div className="mt-4 relative relative-20 lg:mt-0 lg:col-start-1">
        {partnerships && partnerships.data && partnerships.data.map((partnership, index) => {
          return (
            <Link href={partnership.attributes.Link} key={`partnership-${index}`}>
              <FeaturedPartnershipsImages
                key={`partnership-${index}`}
                image={partnership.attributes.Image} />
            </Link>
          )
        })}

      </div>

    </div>
  );
};

FeaturedPartnerships.defaultProps = {};

export default FeaturedPartnerships;
