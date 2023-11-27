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
