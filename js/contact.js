function copytoClipboard(element) {
    var copyText = element.parentElement.textContent.slice(0, 14);
    var textarea = document.createElement("textarea");
    textarea.value = copyText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Phone Number copied to clipboard: " + copyText);
}
