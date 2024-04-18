import Header from "@/components/Header";
import { getStrapiURL } from "@/utils";


type Navigation = {
  links?: any[]
  id?: string
}

type GlobalAttributes = {
  navigation: Navigation
}

export async function getGlobalAttributes(): Promise<GlobalAttributes> {

  const res = await fetch(
    getStrapiURL(
      `/global?populate[navigation][populate]=*&populate[footer][populate][footerColumns][populate]=*`
    ),
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { tags: ['getGlobal'], revalidate: 20 },
    }
  );
  const globalData = await res.json();
  const globalDataAttributes = globalData.data.attributes;

  return globalDataAttributes;
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const globalAttributes = await getGlobalAttributes();
  const { navigation } = globalAttributes;

  return (
    <html lang="en">
      <body>
        <Header links={navigation?.links ?? []}/>
        <main className="my-0 py-16">{children}</main>
      </body>
    </html>
  );
}