const FeaturedPartnerships = ({ header, partnerships, theme }: { header: any, partnerships: [], theme: string }) => {
  console.log('Featured partnerships: ', partnerships)
  return (
    <div className={`bg-${theme} py-40 px-4`}>
      Partnerships

      <div className="mt-4 relative relative-20 lg:mt-0 lg:col-start-1">
        {/* <ImageCards images={images} /> */}
      </div>

    </div>
  );
};

FeaturedPartnerships.defaultProps = {};

export default FeaturedPartnerships;
