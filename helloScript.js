async function loadWidget() {
  console.log("Script loaded and DOMContentLoaded event fired.");

  const targetDiv = document.querySelector(".hello-inline-widget");
  console.log({ targetDiv });

  if (targetDiv) {
    const dataUrl = targetDiv.getAttribute("data-url");
    console.log({ dataUrl });

    if (dataUrl) {
      const iframe = document.createElement("iframe");
      iframe.src = dataUrl;

      // Get computed width and height of the parent div
      const divStyles = window.getComputedStyle(targetDiv);
      const width = divStyles.getPropertyValue("width");
      const height = divStyles.getPropertyValue("height");
      console.log({ width, height });

      // Set iframe size to match the parent div size
      iframe.style.width = width;
      iframe.style.height = height;
      iframe.style.border = "none";

      targetDiv.appendChild(iframe);
      console.log("Iframe added successfully.");
    } else {
      console.error("data-url attribute is missing or empty.");
    }
  } else {
    console.error("Target div not found.");
  }
}

// Call the function to load the chat widget when the page is fully loaded
window.addEventListener("load", loadWidget);
