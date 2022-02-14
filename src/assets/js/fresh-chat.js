
$(function () {
    window.fcWidget.init({
        token: "a399853f-ca0e-4e2d-8c10-8fb89a3c8478",
        host: "https://wchat.freshchat.com",
        "config": {
            showFAQOnOpen: true
        },
        onInit: function () {
            window.fcWidget.on("widget:closed", function () {
                document.getElementById('fc_frame').style.display = 'none';
            });
            window.fcWidget.user.setFirstName(localStorage.getItem("user_name"));
        }
    });
});

$(document).on('click', '#faqs', function (e) {
    e.preventDefault();
    document.getElementById('fc_frame').style.display = 'block';
    // document.getElementById('fc_frame').style.height = '55%';
    window.fcWidget.open();
});

jQuery(document).ready(function () {
    document.getElementById('fc_frame').style.display = 'none';
});