import { useSelector } from "react-redux";
import { useEffect } from "react";
import MenuDisplay from "../../../components/MenuDisplay/MenuDisplay";
import {
  addOrReplaceStyle,
  updateFavicon,
  updateTitle,
} from "../../../helpers/helperFunctions";
import { Helmet } from "react-helmet";

export default function WebsitePreview(props) {
  const gs = useSelector((state) => state.globalSettings);

  // updateFavicon(gs.faviconURL);
  // updateTitle(gs.websiteTitle);

  console.log("test");
  //add css
  useEffect(() => {
    addOrReplaceStyle(gs.card.appliedCustomCss);
  }, []);

  console.log("gs.", gs.faviconURL);
  return (
    <div className="h-full w-full overflow-hidden">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={"The Menu for " + gs.subdomain}
        />
        <title>
          {gs.websiteTitle ? gs.websiteTitle : "The Menu"}
        </title>
        {console.log("gggs", gs.faviconURL)}

        <link
          rel="icon"
          data-testing="wassap"
          type="image/png"
          href={gs.faviconURL}
        ></link>
      </Helmet>
      <MenuDisplay />
    </div>
  );
}
