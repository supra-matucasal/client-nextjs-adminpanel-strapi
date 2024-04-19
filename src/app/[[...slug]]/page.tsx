import { getPage } from '@/services/page.service';
import BlockManager from '../../shared/BlockManager';


async function getData(slug:string, lang?:string, contentType?:string, type?:string) {
  const res = await getPage(slug)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}



const Home = async ({ params }: { params: { slug: string } }) => {

  var delve = require('delve')
  const actualSlug = params.slug || 'home';

  const data = await getData(
    actualSlug,
    'en',
    'page',
    'collectionType',
  );

  const pageData = data.data[0]
  const blocks = delve(pageData, 'attributes.blocks');

  return (
    <div>
      {blocks && (
        <BlockManager
          blocks={blocks}
          type="collectionType"
          contentType="page"
          pageData={pageData}
        />
      )}
    </div>
  );
}


export default Home;