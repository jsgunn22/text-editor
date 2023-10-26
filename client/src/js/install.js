const butInstall = document.getElementById("buttonInstall");

let deferredPrompt; // Store the beforeinstallprompt event

// handles the beforeinstallprompt
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;

  butInstall.style.display = "block";
});

// listener for the install button
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
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  deferredPrompt = null;
  butInstall.style.display = "none";
  console.log("PWA was installed by the user.");
});
