import { useSelector } from "react-redux";

export default function MenuHeader(props) {
  const globalSettings = useSelector((store) => store.globalSettings);
  const gs = globalSettings;

  return (
    <nav
      className={`
    h-20
    p-6
    flex
    items-center
    justify-between
    flex-wrap
    bg-white
    border-b-2 border-gray-200
    shadow-sm
    ${gs.isNavbarFixed ? "sticky top-0 z-10" : ""}
  `}
      style={{ backgroundColor: gs.theme.headerColor }}
    >
      <div className="flex items-center flex-shrink-0 text-gray-900 h-full">
        {gs.logoURL ? (
          <img src={gs.logoURL} alt="Logo" className="h-full" />
        ) : (
          <span className="font-semibold text-xl tracking-tight">
            {gs.websiteName}
          </span>
        )}
      </div>
    </nav>
  );
}
