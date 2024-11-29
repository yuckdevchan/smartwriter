function contextCopy() {
    const selectedText = document.querySelector('.ql-editor').textContent;
    navigator.clipboard.writeText(selectedText).then(() => {
        closeQuillContextMenu();
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function contextCut() {
    contextCopy();
    const range = quill.getSelection();
    quill.deleteText(range.index, range.length);
}

function contextPaste() {
    clipboardText = navigator.clipboard.readText()
        .then(text => {
            quill.pasteHTML(text);
            closeQuillContextMenu();
        })
        .catch(err => {
            console.error('Failed to paste text: ', err);
        });
}

function contextPasteWithoutFormatting() {
}

function closeGeneratePopup() {
    const generatePopup = document.querySelector('#generatePopup');
    generatePopup.style.opacity = 0;
    generatePopup.style.pointerEvents = 'none';
    document.querySelector(".main-content").removeEventListener('click', closeGeneratePopup);
}

function openGeneratePopup(e) {
    closeQuillContextMenu();
    const generatePopup = document.querySelector('#generatePopup');
    generatePopup.style.top = `${e.clientY}px`;
    generatePopup.style.left = `${e.clientX}px`;
    generatePopup.style.opacity = 1;
    generatePopup.style.pointerEvents = 'auto';
    document.querySelector(".main-content").addEventListener('click', closeGeneratePopup);
}

document.querySelector("#openGeneratePopupButton").addEventListener('click', openGeneratePopup);

function generateText() {
    const generateInput = document.querySelector('#generateInput');
    const prompt = encodeURIComponent(generateInput.value);
    fetch(`http://localhost:5000/api/promptGemini`, {
        method: 'POST',
        body: JSON.stringify({ prompt: prompt }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        quill.pasteHTML(data.text);
        closeGeneratePopup();
    })
    .catch(error => console.error('Error:', error));
}