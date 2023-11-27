import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function MenuFooter(props) {
  const gs = useSelector((state) => state.globalSettings);
  const anySocialIsEnabled =
    gs.footer.isFacebookLinkShown ||
    gs.footer.isTwitterLinkShown ||
    gs.footer.isTiktokLinkShown ||
    gs.footer.isInstagramLinkShown;
  return (
    <footer>
      {gs.footer.isShown && (
        <div
          className=" mx-auto  text-center"
          style={{
            backgroundColor: gs.footer.backgroundColor,
          }}
        >
          <div className="custom-footer">
            {anySocialIsEnabled && (
              <div className="p-2 flex justify-center text-3xl">
                {gs.footer.isFacebookLinkShown && (
                  <div className="social-account m-2">
                    <a target="_blank" href={gs.footer.facebookURL}>
                      <FontAwesomeIcon
                        className="cursor-pointer hover:text-slate-300  hover:scale-125"
                        icon={faFacebook}
                      />
                    </a>
                  </div>
                )}
                {gs.footer.isInstagramLinkShown && (
                  <div className="social-account m-2">
                    <a target="_blank" href={gs.footer.instagramURL}>
                      <FontAwesomeIcon
                        className="cursor-pointer hover:text-slate-300  hover:scale-125"
                        icon={faInstagram}
                      />
                    </a>
                  </div>
                )}
                {gs.footer.isTiktokLinkShown && (
                  <div className="social-account m-2">
                    <a target="_blank" href={gs.footer.tiktokURL}>
                      <FontAwesomeIcon
                        className="cursor-pointer hover:text-slate-300 hover:scale-125"
                        icon={faTiktok}
                      />
                    </a>
                  </div>
                )}
                {gs.footer.isTwitterLinkShown && (
                  <div className="social-account m-2">
                    <a target="_blank" href={gs.footer.twitterURL}>
                      <FontAwesomeIcon
                        className="cursor-pointer hover:text-slate-300  hover:scale-125"
                        icon={faTwitter}
                      />
                    </a>
                  </div>
                )}
              </div>
            )}
            {gs.footer.text && (
              <div className="py-4">
                <div className="markup-content text-center">
                  <div>
                    <p
                      className="whitespace-pre-line"
                      style={{
                        color: gs.footer.textColor,
                      }}
                    >
                      {gs.footer.text}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {gs.footer.isFreeMenuTrademarkShown && (
        <div className="bg-white">
          <div className="container mx-auto px-4 py-6 text-center">
            <p>
              Made with
              <strong className="ml-1">
                <a href="https://fastmenu.com/">Fast Menu</a>
              </strong>
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
