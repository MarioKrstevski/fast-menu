export function updateFavicon(newFaviconUrl) {
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

export function calculateTimeRemaining(timestamp) {
  console.log("timestamp", timestamp);
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
