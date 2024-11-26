function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to decode JWT
function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(base64);
}

function handleCredentialResponse(response) {
    document.cookie = "id_token=" + response.credential + "; path=/; max-age=3600; secure; sameSite=Lax";
    const accountButton = document.querySelector('#accountButton');
    const decoded = parseJwt(response.credential);
    document.querySelector('#accountName').innerText = decoded.given_name;
    document.querySelector('#accountButton img').src = decoded.picture;
    accountButton.style.display = 'block';
    document.getElementById("googleLoginButton").style.display = 'none';
    tippy("#accountButton", {
        content: "Signed in as " + decoded.name + " (" + decoded.email + ")",
        placement: "top",
    });
}

function signOut() {
    document.cookie = "id_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; sameSite=Lax";
    google.accounts.id.disableAutoSelect();
    location.reload();
}

window.onload = function () {
    const id_token = getCookie("id_token");
    if (!id_token) {
        google.accounts.id.initialize({
            client_id: "712821347110-2uma4qc17qvav309ngmvcovdi0a6cdj3.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleLoginButton"),
            { theme: "outline", size: "large" }
        );
        google.accounts.id.prompt();
    } else {
        // Decode the JWT to get user info
        const decoded = parseJwt(id_token);
        const accountButton = document.querySelector('#accountButton');
        document.querySelector('#accountName').innerText = decoded.given_name;
        document.querySelector('#accountButton img').src = decoded.picture;
        accountButton.style.display = 'block';
        tippy("#accountButton", {
            content: "Signed in as " + decoded.name + " (" + decoded.email + ")",
            placement: "top",
        });
    }
}