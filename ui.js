function openAccountPopup() {
    const accountButton = document.querySelector('#accountButton');
    const accountPopup = document.querySelector('#accountPopup');
    accountPopup.style.top = `${accountButton.offsetTop - accountPopup.offsetHeight}px`;
    accountPopup.style.left = `${accountButton.offsetLeft}px`;
    accountPopup.style.opacity = '1';
    accountPopup.style.pointerEvents = 'auto';
    // add event listener to close the popup when clicked outside and then remove the event listener
    document.addEventListener(
        'click',
        function closePopup(e) {
            if (!accountPopup.contains(e.target) && !accountButton.contains(e.target)) {
                accountPopup.style.opacity = '0';
                accountPopup.style.pointerEvents = 'none';
                document.removeEventListener('click', closePopup);
            }
        }
    );
}

function openSettings() {
    document.querySelector('.settings-modal').style.opacity = '1';
    document.querySelector('.settings-modal').style.pointerEvents = 'auto';
    document.querySelector('.main-content').style.filter = 'brightness(0.5)';
    document.querySelector('.main-content').style.pointerEvents = 'none';
}

function closeSettings() {
    document.querySelector('.settings-modal').style.opacity = '0';
    document.querySelector('.settings-modal').style.pointerEvents = 'none';
    document.querySelector('.main-content').style.filter = 'brightness(1)';
    document.querySelector('.main-content').style.pointerEvents = 'auto';
}

function openAbout() {
    document.querySelector('.about-modal').style.opacity = '1';
    document.querySelector('.about-modal').style.pointerEvents = 'auto';
    document.querySelector('.main-content').style.filter = 'brightness(0.5)';
    document.querySelector('.main-content').style.pointerEvents = 'none';
}

function closeAbout() {
    document.querySelector('.about-modal').style.opacity = '0';
    document.querySelector('.about-modal').style.pointerEvents = 'none';
    document.querySelector('.main-content').style.filter = 'brightness(1)';
    document.querySelector('.main-content').style.pointerEvents = 'auto';
}

// function updateWordCount() {
//     const content = editor.getMarkdown().trim();
//     const words = content.split(/\s+/).filter(word => word.match(/[a-zA-Z0-9]/));
//     const wordCount = words.length;
//     document.querySelector('#wordCount').innerText = `${wordCount} words`;
// }

// function updateCharacterCount() {
//     const content = editor.getMarkdown().trim();
//     const characterCount = content.replace(/\s/g, '').length;
//     document.querySelector('#characterCount').innerText = `${characterCount} characters excl. spaces`;
// }

function updateWordCount() {
    const content = quill.getText().trim();
    const words = content.split(/\s+/).filter(word => word.match(/[a-zA-Z0-9]/));
    const wordCount = words.length;
    document.querySelector('#wordCount').innerText = `${wordCount} words`;
}

function updateCharacterCount() {
    const content = quill.getText().trim();
    const characterCount = content.replace(/\s/g, '').length;
    document.querySelector('#characterCount').innerText = `${characterCount} characters excl. spaces`;
}

function updateNoteTitle() {
    const noteTitle = quill.getText().split('\n')[0];
    document.querySelector('#currentNote .note-title').textContent = noteTitle;
    const disallowedTitles = ['']
    if (!disallowedTitles.includes(noteTitle.trim())) {
        currentNote = document.querySelector('#currentNote');
        currentNote.querySelector('.note-title').textContent = noteTitle;
    } else {
        currentNote = document.querySelector('#currentNote');
        currentNote.querySelector('.note-title').textContent = 'New Note';
    }
}

document.querySelector('#scaleSlider').addEventListener('input', function() {
    document.querySelector('#editor').style.zoom = this.value;
});

quill.on('text-change', function(delta, oldDelta, source) {
    updateWordCount();
    updateCharacterCount();
    updateNoteTitle();
});

updateWordCount();
updateCharacterCount();
updateNoteTitle();
quill.focus();