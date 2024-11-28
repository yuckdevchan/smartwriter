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

function closePopup() {
    noteOptionsPopup.style.opacity = '0';
    noteOptionsPopup.style.pointerEvents = 'none';
    document.querySelector(".main-content").removeEventListener('click', closePopup);
}

function openNoteOptions(e) {
    if (!e || !e.target) {
        console.error('Event or event target is undefined');
        return;
    }
    const noteOptionsPopup = document.querySelector('#noteOptionsPopup');
    noteOptionsPopup.style.top = `${e.clientY}px`;
    noteOptionsPopup.style.left = `${e.clientX}px`;
    noteOptionsPopup.style.opacity = '1';
    noteOptionsPopup.style.pointerEvents = 'auto';
    document.querySelector(".main-content").addEventListener('click', closePopup);
};

document.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        openNoteOptions(e);
    });
});

document.querySelectorAll('.note-options-button').forEach(item => {
    item.addEventListener('click', openNoteOptions);
});

function closeQuillContextMenu() {
    const quillContextMenu = document.querySelector('#quillContextMenu');
    quillContextMenu.style.opacity = '0';
    quillContextMenu.style.pointerEvents = 'none';
}

function openQuillContextMenu(e) {
    const quillContextMenu = document.querySelector('#quillContextMenu');
    quillContextMenu.style.top = `${e.clientY}px`;
    quillContextMenu.style.left = `${e.clientX}px`;
    quillContextMenu.style.opacity = '1';
    quillContextMenu.style.pointerEvents = 'auto';
    document.querySelector('.main-content').addEventListener('click', closeQuillContextMenu);
}

document.querySelector('.ql-editor').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    openQuillContextMenu(e);
});

function closeCommandPalette() {
    quill.focus();
    const commandPalette = document.querySelector('#palette');
    commandPalette.style.opacity = '0';
    commandPalette.style.pointerEvents = 'none';
    document.querySelector('.main-content').style.filter = 'brightness(1)';
    document.querySelector('.main-content').style.pointerEvents = 'auto';
    const closeCommandPaletteButton = document.querySelector('#closeCommandPaletteButton');
    closeCommandPaletteButton.style.opacity = '0';
    closeCommandPaletteButton.style.pointerEvents = 'none';
    setTimeout(() => {
        document.querySelector('#palette input').value = '';
        document.querySelector('#commandPaletteResults').innerHTML = '';
    }, 300);
}

commands = {
    "Toggle Theme": [
        function() {
            document.querySelector('.toggle-theme-button').click();
        },
        "mdi:theme",
        false,
        "Settings > Theme > Toggle Theme"
    ],
    "Settings": [
        openSettings,
        "ci:settings",
        true,
        "Edit > Settings"
    ],
    "About": [
        openAbout,
        "mdi:information",
        true,
        "View About"
    ],
    "Sign Out": [
        openAccountPopup,
        "ci:log-out",
        true,
        "Account > Sign Out"
    ]
}

function updateCommandPaletteResults(e) {
    const query = e.target.value;
    const results = Object.keys(commands).filter(command => command.toLowerCase().includes(query.toLowerCase()));
    const commandPaletteResults = document.querySelector('#commandPaletteResults');
    commandPaletteResults.innerHTML = '';
    results.forEach(result => {
        const commandElement = document.createElement('div');
        commandElement.classList.add('command');
        const iconAndText = document.createElement('div');
        const icon = document.createElement('iconify-icon');
        icon.setAttribute('icon', commands[result][1]);
        iconAndText.appendChild(icon);
        const span = document.createElement('span');
        span.textContent = result;
        commandElement.appendChild(span);
        const path = document.createElement('span');
        path.classList.add('path');
        path.textContent = commands[result][3];
        commandElement.appendChild(path);
        commandElement.addEventListener('click', function() {
            commands[result][0]();
            if (commands[result][2]) {
                closeCommandPalette();
            }
        });
        commandPaletteResults.appendChild(commandElement);
    });
}

document.querySelector('#palette input').addEventListener('input', updateCommandPaletteResults);

function openCommandPalette() {
    document.querySelector('#palette input').focus();
    const commandPalette = document.querySelector('#palette');
    commandPalette.style.opacity = '1';
    commandPalette.style.pointerEvents = 'auto';
    document.querySelector('.main-content').style.filter = 'brightness(0.5)';
    document.querySelector('.main-content').style.pointerEvents = 'none';
    const closeCommandPaletteButton = document.querySelector('#closeCommandPaletteButton');
    closeCommandPaletteButton.style.opacity = '1';
    closeCommandPaletteButton.style.pointerEvents = 'auto';
    document.addEventListener('keydown', function runFirstCommand(e) {
        if (e.key === 'Enter') {
            const firstCommand = document.querySelector('.command');
            if (firstCommand) {
                firstCommand.click();
            }
        }
    });
}

function toggleCommandPalette() {
    const commandPalette = document.querySelector('#palette');
    if (commandPalette.style.opacity === '1') {
        closeCommandPalette();
    } else {
        openCommandPalette();
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || (e.ctrlKey && e.key === 'k') || (e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.shiftKey && e.key === 'p')) {
        toggleCommandPalette();
    }
});

function closeWelcomeDialog() {
    const welcomeDialog = document.querySelector('#welcomeDialog');
    welcomeDialog.style.opacity = '0';
    welcomeDialog.style.pointerEvents = 'none';
}

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
