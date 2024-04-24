
import dynamic from 'next/dynamic';
const Faq = dynamic(() => import('../../components/blocks/Faq'), {
  ssr: true,
});

const Hero = dynamic(() => import('../../components/blocks/Hero'), {
  ssr: true,
});

const FeaturedPartnerships = dynamic(() => import('../../components/blocks/FeaturedPartnerships'), {
  ssr: true,
});


const BlockManager = ({ blocks, contentType, pageData, type }: { blocks: any[], contentType: string, pageData: any, type: string }) => {
  return (
    <div>
      {blocks.map((block, index) => {
        let Block;

        switch (block.__component) {
          case 'blocks.faq':
            Block = Faq;
            break;

        }

        switch (block.__component) {
          case 'blocks.hero':
            Block = Hero;
            break;

        }

        switch (block.__component) {
          case 'blocks.featured-partnerships':
            Block = FeaturedPartnerships;
            break;

        }
        

        return Block ? (
          <div key={`index-${index}`}>
            {type && contentType && (
              <span className="group bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center absolute right-0 m-2 p-1.5 rounded-full dark:bg-gray-700 dark:text-blue-400">
                <div className="hidden group-hover:block">
                  {contentType} {'>'} {pageData?.id} {'>'} {block.__component}
                </div>
              </span>
            )}

            <Block component={block.__component} {...block} />
          </div>
        ) : null;
      })}
    </div>
  );
};

BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;