export default function MenuHero(props) {
  return (
    <div class="h-96 w-full relative">
      <div
        class="h-full bg-no-repeat bg-center bg-cover bg-gray-400"
        data-src=""
        lazy="error"
        // style='background-image: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");'
      ></div>
      <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white p-4 py-6 lg:py-8">
        <div class="text-center">
          <h1
            class="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-6"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            {" "}
            title{" "}
          </h1>
          <p
            class="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            {" "}
            Subheading{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
