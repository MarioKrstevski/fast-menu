export function updateFavicon(newFaviconUrl) {
  console.log("newFaviconLink", newFaviconUrl);
  if (newFaviconUrl === "") {
    return;
  }
  // console.log("favicon with link", newFaviconUrl);
  // Create a new link element
  const newFaviconLink = document.createElement("link");

  // Set the attributes for the new link element
  newFaviconLink.rel = "icon";
  newFaviconLink.href = newFaviconUrl;

  // Get the existing favicon element
  const existingFavicon = document.querySelector('link[rel="icon"]');

  // Replace the existing favicon with the new one
  if (existingFavicon) {
    document.head.removeChild(existingFavicon);
  }

  document.head.appendChild(newFaviconLink);
}

export function updateTitle(newTitle) {
  if (!newTitle) {
    return;
  }

  document.title = newTitle;
}

export function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const keyValues = String(item[key])
      .split(",")
      .filter((value) => value !== "undefined")
      .map((value) => value.trim());

    keyValues.forEach((value) => {
      acc[value] = acc[value] || [];
      acc[value].push(item);
    });

    return acc;
  }, {});
}
export function isALink(string) {
  return (
    typeof string === "string" &&
    (string.includes("http") || string.includes("www"))
  );
}
export function calculateTimeRemaining(timestamp) {
  // Get the current date and time
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the provided timestamp
  const difference = timestamp - currentDate.getTime();

  // Calculate the remaining hours, minutes, and seconds
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Create a formatted string for time remaining
  const timeRemainingString = `${hours}h ${minutes}min`;

  return timeRemainingString;
}
export function addOrReplaceStyle(style) {
  const styleString = style;
  const styleId = "fm-custom-style";

  const head =
    document.head || document.getElementsByTagName("head")[0];
  const existingStyle = document.getElementById(styleId);

  if (existingStyle) {
    // If an element with the given ID exists, replace it with the new style tag
    console.log("existin style yes", existingStyle);
    existingStyle.remove();
  }

  // If no element with the given ID is found, append the style tag to the head
  const styleTag = document.createElement("style");
  styleTag.type = "text/css";
  styleTag.appendChild(document.createTextNode(styleString));

  styleTag.id = styleId;
  head.appendChild(styleTag);
}
export function convertDriveLinkToDirect(link) {
  if (!link) {
    return link;
  }
  // Check if the link matches the Google Drive pattern
  const driveLinkRegex =
    /^https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view\?usp=sharing$/;
  const match = link.match(driveLinkRegex);

  if (match) {
    // If it's a match, construct the direct link
    const fileId = match[1];
    const directLink = `https://drive.google.com/uc?id=${fileId}`;
    return directLink;
  } else {
    // If it's not a match, return the original link
    return link;
  }
}
export function checkForValidSpreadsheetLink(link) {
  // Regular expression to match the correct link structure
  const regex =
    /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)\/edit/;

  // Use the regular expression to check if the link matches
  return regex.test(link);
}
