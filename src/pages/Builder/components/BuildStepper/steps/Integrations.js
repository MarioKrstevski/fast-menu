import { useSelector } from "react-redux";

export default function Integrations(props) {
  const gs = useSelector((store) => store.globalSettings);
  const { isPro, isOnFreeTrial } = useSelector((store) => store.menu);

  let widgetDetails = "";
  widgetDetails += "Copy these parts and put them \n";
  widgetDetails += "in the right places of your website \n";
  widgetDetails += " \n";
  if (isPro || isOnFreeTrial) {
    widgetDetails += "<!-- This goes in the <head> tag --> \n";
    widgetDetails +=
      "  <link rel='stylesheet' href='https://mariokrstevski.github.io/fastmenu-widget/static/css/main.css' /> \n";
    widgetDetails += " \n";
    widgetDetails +=
      "<!-- Use this widget wherever you want the menu items to show up -->  \n";
    widgetDetails +=
      " <fastmenu-widget subdomain='" +
      gs.subdomain +
      "'></fastmenu-widget> \n";
    widgetDetails += " \n";
    widgetDetails +=
      "<!-- This goes at the end before you close the </body> tag  -->  \n";
    widgetDetails +=
      " <script defer='defer' src='https://mariokrstevski.github.io/fastmenu-widget/static/js/main.js'></script>\n";
  }
  return (
    <div className="p-2">
      <div className="font-bold mt-2">Embed widget</div>
      {!(isPro || isOnFreeTrial) && (
        <div className="text-sm font-normal text-gray-600">
          (PRO version only)
        </div>
      )}
      <textarea
        className={` rounded p-2 my-2 w-full    
        ${
          false || !(isPro || isOnFreeTrial)
            ? "bg-gray-100 text-gray-300 resize-none overflow-y-hidden select-none hover:cursor-not-allowed"
            : "border border-black bg-white select-all"
        }
        `}
        disabled={!(isPro || isOnFreeTrial)}
        name="widget"
        cols="28"
        rows={!(isPro || isOnFreeTrial) ? "2" : "10"}
        defaultValue={widgetDetails}
      ></textarea>
    </div>
  );
}
