// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!
sleep(5000).then(() => {
  document.getElementsByTagName("gradio-app")[0].wrapper.classList.remove("dark")
});

