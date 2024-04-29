function getCRMTokenFromUrl() {
  // Get the script element
  var scriptElement = document.querySelector(
    'script[src*="chatWidgetScript.js"]'
  );

  // If the script element is found
  if (scriptElement) {
    // Get the src attribute value
    var src = scriptElement.getAttribute("src"); // src url which is in script tag

    // Get the URL of the current script
    var scriptUrl = src;

    // Extract the token from the query parameters
    var urlParams = new URLSearchParams(scriptUrl.split("?")[1]);
    var crmToken = urlParams.get("crmToken");
    console.log({ scriptUrl, crmToken });

    return crmToken;
  }
}

const fetchWidgetConfig = async (token) => {
    let widgetConfig = null;
  try {

    // Fetch widget configuration data
    const response = await fetch(
      `https://live-chat-api.crm-messaging.cloud/api/v1/widgetConfig/${token}`
    );

    // Check if the fetch was successful
    if (!response.ok) {
      return widgetConfig;
    }

    // Parse response data
    const data = await response.json();

    // Check if the response indicates success
    if (data && data.success) {
      console.log("Received widget config:", data.data);

      // Store widget config data in localStorage
      localStorage.setItem("widgetConfig", JSON.stringify(data.data));

      widgetConfig = data.data;
    }
    return widgetConfig;
  } catch (error) {
    console.log("Error in fetch widget config:", error.message);
    return widgetConfig;
  }
};

// Function to load the chat widget
async function loadChatWidget() {
  // Get the token from the URL
  var crmToken = getCRMTokenFromUrl();
  const widgetConfig = await fetchWidgetConfig(crmToken);
  console.log("stfff88888888 - ", widgetConfig);
  const alignment = widgetConfig?.alignment || "right";
  // Create container element
  const container = document.createElement("div");
  container.id = "chatContainer";
  container.classList.add("chat-container");
  container.style.position = "fixed";
  container.style.overflow = "hidden";
  container.style.zIndex = "9999"; /* Ensure it's above other content */
  container.style.backgroundColor = "transparent";
  container.style.padding = "2px";

  // Set width and height based on screen size
  if (window.innerWidth >= 768) {
    // For desktop and tablet
    container.style.width = "380px";
    container.style.height = "calc(100% - 40px)";
    container.style.top = "20px";
    container.style.bottom = "20px";
    if (alignment === "right") {
      container.style.right = "20px";
    } else {
      container.style.left = "20px";
    }
  } else {
    // For mobile
    container.style.width = "calc(100% - 40px)";
    container.style.height = "calc(100% - 110px)";
    container.style.top = "90px";
    container.style.bottom = "20px";
    container.style.right = "20px";
  }

  // Create iframe element
  const iframe = document.createElement("iframe");
  // iframe.src = `http://localhost:3000/${crmToken}`;
  iframe.src = `https://live-chat-api.crm-messaging.cloud/${crmToken}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.background = "transparent";

  // Append iframe to container
  container.appendChild(iframe);

  // Append container to body
  document.body.appendChild(container);
}

// Call the function to load the chat widget when the page is fully loaded
window.addEventListener("load", loadChatWidget);
