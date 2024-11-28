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

function openNoteOptions(e) {
    if (!e || !e.target) {
        console.error('Event or event target is undefined');
        return;
    }

    // Get the bounding rectangle of the clicked element
    const rect = e.target.getBoundingClientRect();

    // Open the popup to the right of the note
    const noteOptionsPopup = document.querySelector('#noteOptionsPopup');
    noteOptionsPopup.style.top = `${rect.top + window.scrollY}px`;
    noteOptionsPopup.style.left = `${rect.left + rect.width + window.scrollX+10}px`;
    noteOptionsPopup.style.opacity = '1';
    noteOptionsPopup.style.pointerEvents = 'auto';
}

document.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('click', openNoteOptions);
});

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
    currentNote = document.querySelector('#currentNote');
    if (!disallowedTitles.includes(noteTitle.trim())) {
        currentNote.querySelector('.note-title').textContent = noteTitle;
        document.title = noteTitle + ' - Notes';
    } else {
        currentNote.querySelector('.note-title').textContent = 'New Note';
        document.title = 'New Note' + ' - Notes';
    }
}

function updateScaleSliderValue() {
    const scaleSliderValue = document.querySelector('#scaleSliderValue');
    const scaleSlider = document.querySelector('#scaleSlider');
    scaleSliderValue.innerText = `${Math.round(scaleSlider.value * 100)}%`;
}

scaleSlider.value = 1.3;
document.querySelector('#scaleSlider').oninput = function() {
    updateScaleSliderValue();
    document.querySelector('#editor').style.zoom = this.value;
}

document.querySelector('#scaleSlider').addEventListener('input', function() {
    document.querySelector('#editor').style.zoom = this.value;
});

function updateClockTime() {
    const clockText = document.querySelector('#clockTime');
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    clockText.innerText = time;

    // Trigger reflow to restart the animation
    clockText.classList.remove('clock-time');
    void clockText.offsetWidth; // Trigger reflow
    clockText.classList.add('clock-time');

    setTimeout(updateClockTime, 1000);
}


quill.on('text-change', function(delta, oldDelta, source) {
    updateWordCount();
    updateCharacterCount();
    updateNoteTitle();
});

updateClockTime();
updateScaleSliderValue();
updateWordCount();
updateCharacterCount();
updateNoteTitle();
quill.focus();
