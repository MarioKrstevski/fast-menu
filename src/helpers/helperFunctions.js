export function updateFavicon(newFaviconUrl) {
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
