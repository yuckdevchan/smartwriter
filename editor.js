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