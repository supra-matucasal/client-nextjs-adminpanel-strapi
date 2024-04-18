const Header = ({ links }: { links: any[] }) => {
  return (
    <div className="text-center pt-24">
      {links && (
        <ul className="flex justify-center">
          {links.map((link, index) => (
            <li key={index} className="mx-4">
              <a href={link.href} className="text-blue-500">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default Header;
