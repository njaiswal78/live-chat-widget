console.log("dialScript.js is loaded");

function getCRMTokenFromUrl() {
  var scriptElement = document.querySelector('script[src*="dialScript.js"]');
  if (scriptElement) {
    var src = scriptElement.getAttribute("src");
    var urlParams = new URLSearchParams(src.split("?")[1]);
    var crmToken = urlParams.get("crmToken");
    console.log("CRM Token:", crmToken);
    return crmToken;
  }
}

function getTeamEmailFromUrl() {
  var scriptElement = document.querySelector('script[src*="dialScript.js"]');
  if (scriptElement) {
    var src = scriptElement.getAttribute("src");
    var urlParams = new URLSearchParams(src.split("?")[1]);
    var team = urlParams.get("team");
    console.log("Team Email:", team);
    return team;
  }
}

async function loadChatWidget() {
  let crmToken = getCRMTokenFromUrl();
  let team = getTeamEmailFromUrl();
  console.log({ crmToken, team });
  const alignment = "right";
  const container = document.createElement("div");
  container.id = "chatContainer";
  container.classList.add("chat-container");
  container.style.position = "fixed";
  container.style.overflow = "hidden";
  container.style.zIndex = "9999";
  container.style.backgroundColor = "transparent";
  container.style.padding = "2px";

  if (window.innerWidth >= 768) {
    container.style.width = "300px";
    container.style.height = "calc(100% - 40px)";
    container.style.top = "20px";
    container.style.bottom = "20px";
    if (alignment === "right") {
      container.style.right = "20px";
    } else {
      container.style.left = "20px";
    }
  } else {
    container.style.width = "calc(100% - 40px)";
    container.style.height = "calc(100% - 110px)";
    container.style.top = "90px";
    container.style.bottom = "20px";
    container.style.right = "20px";
  }

  const iframe = document.createElement("iframe");
  iframe.src = `https://calling.crm-messaging.cloud/dial?token=${crmToken}&team=${team}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.background = "transparent";
  iframe.allow = "microphone; camera";
  iframe.sandbox = "allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation";

  container.appendChild(iframe);
  document.body.appendChild(container);
}

window.addEventListener("load", loadChatWidget);
