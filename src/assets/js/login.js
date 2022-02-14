// import { get } from '../../utilities/util.js';
$(document).ready(function () {
    $('div.carousel').carousel();
    $(function () {
        //localStorage.clear();
    });

    //facebook
    function checkLoginState(response) {
        console.log(response);
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me?fields=id,email,name', function (response) {
                console.log(response.email + "-" + response.name);
            });
        }
        else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }

    //Linkedin
    function getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }
    var accessCode = "";
    var getAccessCode = setInterval(() => {
        if (getQueryStringValue("code")) {
            accessCode = getQueryStringValue("code");
            clearInterval(getAccessCode);
            localStorage.setItem("linkedInAccessCode", accessCode);
            window.close();
        }
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.searchParams.get("error")) {
            localStorage.setItem("linkedInAuthError", url.searchParams.get("error"));
            window.close();
        }

    }, 100);

    function storeAccessToken(accessCode) {
        var url = 'https://www.linkedin.com/oauth/v2/accessToken';
        var data = {
            grant_type: 'authorization_code',
            code: accessCode,
            redirect_uri: 'http://localhost:8080/#/',
            client_id: '81c0n7vano9a6h',
            client_secret: 'YWY5ve5giH46C5Qr'
        };

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }
    var getAccessToken = setInterval(() => {
        let code = localStorage.getItem('linkedInAccessCode');
        let error = localStorage.getItem('linkedInAuthError');
        if (code) {
            console.log(code);
            //storeAccessToken(code);
            clearInterval(getAccessCode);
            clearInterval(getAccessToken);
        }
        else if (error) {
            clearInterval(getAccessCode);
        }
    }, 100);
    $(document).on('click', '#fbLogin,#fbSignup', function () {
        // FB.login(function (response) {
        //     if (response.authResponse) {
        //         console.log('Welcome!  Fetching your information.... ');
        //         FB.api('/me?fields=id,email,name', function (response) {
        //             console.log(response.email + "-" + response.name);
        //         });
        //     } else {
        //         console.log('User cancelled login or did not fully authorize.');
        //     }
        // });
    });



    // Share right 
    $(document).on('click', '#shareOnFB', function (e) {
        e.preventDefault();
        FB.ui(
            {
                method: 'feed',
                name: 'This is the content of the "name" field.',
                link: 'https://gradright.com',
                picture: 'https://gradright.com',
                caption: 'What do you think of these recommendation?',
                description: "What do you think of these recommendation?",
                message: "What do you think of these recommendation?"
            });
    });

    // $(document).on('click', '#shareOnFB', function (e) {
    //     e.preventDefault();
    //     var $temp = $("<input>");
    //     $("body").append($temp);
    //     $temp.val($(element).text()).select();
    //     document.execCommand("copy");
    //     $temp.remove();
    // });

});