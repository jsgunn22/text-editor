const butInstall = document.getElementById("buttonInstall");

let deferredPrompt; // Store the beforeinstallprompt event

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;

  butInstall.style.display = "block";
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  console.log("test");
  if (deferredPrompt) {
    deferredPrompt.prompt("test");

    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("PWA installed");
    } else {
      console.log("PWA installation declined");
    }
    deferredPrompt = null;

    butInstall.style.display = "none";
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("PWA was installed by the user.");
});
