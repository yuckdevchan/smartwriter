const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let theme = '';

function s(style, value) {
    document.documentElement.style.setProperty(style, value);
}

function setDarkTheme() {
    theme = 'dark';
    s('--accent-color', '#dbb13d');
    s('--sidebar-color', '#292929');
    s('--modal-color', '#292929');
    s('--sidebar-icon-color', '#fff');
    s('--note-item-color', '#292929');
    s('--note-item-color-hover', '#464646');
    s('--note-item-color-selected', '#3d3d3d');
    s('--note-item-color-active', '#262626');
    s('--text-color', '#fff');
    s('--status-bar-color', '#1E1E1E');
    s('--buttons-and-dropdowns', '#1E1E1E');
    const editor = document.querySelector('.ql-editor');
    editor.style.backgroundColor = '#1E1E1E';
    editor.style.color = '#fff';
    const toolbar = document.querySelector('.ql-toolbar');
    toolbar.style.backgroundColor = '#1E1E1E';
    toolbar.style.color = '#fff';
    const style = document.createElement('style');
    style.innerHTML = '.ql-toolbar * { color: #fff; }';
    document.head.appendChild(style);
    const options = document.querySelector('.ql-picker-options');
    options.style.backgroundColor = '#292929';

    document.cookie = `theme=${theme}`;

    const themeIcons = document.querySelectorAll('.theme-icon');
    const themeTexts = document.querySelectorAll('.theme-text');
    themeIcons.forEach(icon => {
        icon.setAttribute('icon', 'ci:sun');
    });
    themeTexts.forEach(text => {
        text.innerText = 'Light Theme';
    });
}

function setLightTheme() {
    theme = 'light';
    s('--accent-color', '#dbb13d');
    s('--sidebar-color', '#F9F9F9');
    s('--modal-color', '#F9F9F9');
    s('--sidebar-icon-color', '#242424');
    s('--note-item-color', '#F9F9F9');
    s('--note-item-color-hover', '#bfbfbf');
    s('--note-item-color-selected', '#e6e6e6');
    s('--note-item-color-active', '#d9d9d9');
    s('--text-color', '#242424');
    s('--status-bar-color', '#F9F9F9');
    s('--buttons-and-dropdowns', '#bfbfbf');
    const editor = document.querySelector('.ql-editor');
    editor.style.backgroundColor = '#fff';
    editor.style.color = '#242424';
    const toolbar = document.querySelector('.ql-toolbar');
    toolbar.style.backgroundColor = '#fff';
    toolbar.style.color = '#242424';
    const style = document.createElement('style');
    style.innerHTML = '.ql-toolbar * { color: #242424; }';
    document.head.appendChild(style);
    const options = document.querySelector('.ql-picker-options');
    options.style.backgroundColor = '#fff';

    document.cookie = `theme=${theme}`;

    const themeIcons = document.querySelectorAll('.theme-icon');
    const themeTexts = document.querySelectorAll('.theme-text');
    themeIcons.forEach(icon => {
        icon.setAttribute('icon', 'ci:moon');
    });
    themeTexts.forEach(text => {
        text.innerText = 'Dark Theme';
    });
}

function toggleTheme() {
    if (theme === 'dark') {
        setLightTheme();
    } else {
        setDarkTheme();
    }
}

if (document.cookie.includes('theme=dark')) {
    setDarkTheme();
} else {
    if (document.cookie.includes('theme=light')) {
        setLightTheme();
    } else {
        if (prefersDarkScheme.matches) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }
}