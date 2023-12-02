import { useSelector } from "react-redux";

export default function MenuHero(props) {
  const gs = useSelector((store) => store.globalSettings);
  if (!gs.hero.isShown) {
    return;
  }
  return (
    <div className="h-96 w-full relative">
      <div
        className="h-full bg-no-repeat bg-center bg-cover bg-gray-400"
        data-src=""
        lazy="error"
        style={{
          background: "url(" + gs.hero.image + ")  no-repeat ",
          backgroundSize: "cover",
        }}

        // style='background-image: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");'
      ></div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white p-4 py-6 lg:py-8">
        <div className="text-center">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-6"
            style={{ color: gs.hero.titleColor }}
          >
            {gs.hero.title}
          </h1>
          <p
            className="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium"
            style={{ color: gs.hero.subheadingColor }}
          >
            {gs.hero.subheading}
          </p>
        </div>
      </div>
    </div>
  );
}
