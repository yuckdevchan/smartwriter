const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

let theme = '';

function s(style, value) {
    document.documentElement.style.setProperty(style, value);
}

function setDarkTheme() {
    theme = 'dark';
    s('--sidebar-color', '#292929');
    s('--sidebar-icon-color', '#fff');
    s('--note-item-color', '#292929');
    s('--note-item-color-hover', '#464646');
    s('--note-item-color-selected', '#3d3d3d');
    s('--text-color', '#fff');
    s('--status-bar-color', '#292929');
    const editor = document.querySelector('.ql-editor');
    editor.style.backgroundColor = '#292929';
    editor.style.color = '#fff';
    const toolbar = document.querySelector('.ql-toolbar');
    toolbar.style.backgroundColor = '#292929';
    toolbar.style.color = '#fff';
    const style = document.createElement('style');
    style.innerHTML = '.ql-toolbar * { color: #fff; }';
    document.head.appendChild(style);
    document.cookie = `theme=${theme}`;
}

function setLightTheme() {
    theme = 'light';
    s('--sidebar-color', '#F9F9F9');
    s('--sidebar-icon-color', '#242424');
    s('--note-item-color', '#F9F9F9');
    s('--note-item-color-hover', '#bfbfbf');
    s('--note-item-color-selected', '#e6e6e6');
    s('--text-color', '#242424');
    s('--status-bar-color', '#F9F9F9');
    const editor = document.querySelector('.ql-editor');
    editor.style.backgroundColor = '#F9F9F9';
    editor.style.color = '#242424';
    const toolbar = document.querySelector('.ql-toolbar');
    toolbar.style.backgroundColor = '#F9F9F9';
    toolbar.style.color = '#242424';
    const style = document.createElement('style');
    style.innerHTML = '.ql-toolbar * { color: #242424; }';
    document.head.appendChild(style);
    document.cookie = `theme=${theme}`;
}

function toggleTheme() {
    themeIcon = document.getElementById('themeIcon');
    themeText = document.getElementById('themeText');
    if (theme === 'dark') {
        themeIcon.icon = 'ci:moon'
        setLightTheme();
        themeText.innerText = 'Dark Mode';
    } else {
        themeIcon.icon = 'ci:sun'
        setDarkTheme();
        themeText.innerText = 'Light Mode';
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