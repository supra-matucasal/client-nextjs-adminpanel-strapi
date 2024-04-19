import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getStrapiURL } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const globalAttributes = await getGlobalAttributes();
  const { navigation } = globalAttributes;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header links={navigation?.links ?? []} />
        {children}
      </body>
    </html>
  );
}
