import Link from 'next/link';

const CustomLink = ({ label, href, locale, target, isExternal }: { label: string, href: string, locale: string, target: string, isExternal: boolean }) => {
  if (isExternal) {
    return (
      // <Link href={href}>
      //   <a target={target}>{label}</a>
      // </Link>
      <a href = {href} target={target}>{label}</a>
    );
  } else {
    return (
      // <Link href={`${href}?lang=${locale || 'en'}`}>
      //   <a target={target}>{label}</a>
      // </Link>
      <a href = {`${href}?lang=${locale || 'en'}`} target={target}>{label}</a>
    );
  }
};

CustomLink.defaultProps = {};

export default CustomLink;
