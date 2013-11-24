// Originally based on https://github.com/Srirangan/notifer.js/;

define(function () {
    "use strict";

    var container, Notifier;

    container = document.createElement("div");
    container.style.position = "fixed";
    container.style.zIndex = 9999;
    container.style.bottom = 0;
    container.style.left = "12px";
    document.body.appendChild(container);

    Notifier = {};

    Notifier.notify = function (message, title, iconUrl, timeOut) {
        var i, iconElement, notificationElement, removeOnFadeOut, text, textElement, timeoutId, timeoutRemaining, timeoutStart;

        notificationElement = document.createElement("div");
        notificationElement.classList.add("notification");

        timeoutRemaining = timeOut || 5000;

        if (iconUrl) {
            iconElement = document.createElement("img");
            iconElement.setAttribute("src", iconUrl);
            iconElement.style.width = "36px";
            iconElement.style.height = "36px";
            iconElement.style.display = "inline-block";
            iconElement.style.verticalAlign = "middle";
            notificationElement.appendChild(iconElement);
        }

        textElement = document.createElement("div");
        textElement.style.display = "inline-block";
        textElement.style.verticalAlign = "middle";

        text = "";
        if (title) {
            text += "<strong>" + title + "</strong><br>";
        }
        if (message) {
            text += message;
        }
        textElement.innerHTML = text;
        notificationElement.appendChild(textElement);

        // Hide notification after timeout
        function notificationTimeout() {
            timeoutId = setTimeout(function () {
                if (container.contains(notificationElement)) {
                    notificationElement.classList.add("notification-delete");
                }
            }, timeoutRemaining);
            timeoutStart = new Date();
        }
        notificationTimeout();

        // When hovering over, don't count towards timeout
        notificationElement.addEventListener("mouseenter", function () {
            clearTimeout(timeoutId);
            timeoutRemaining -= new Date() - timeoutStart;
        });
        notificationElement.addEventListener("mouseleave", function () {
            notificationTimeout();
        });

        /*// Hide notification on click, except if it's a link
        notificationElement.addEventListener("click", function (event) {
            container.removeChild(notificationElement);
            notificationElement = null;
        });
        // Stopping hiding on link click doesn't work because it also stops Davis.js from working
        links = notificationElement.getElementsByTagName("a");
        for (i = 0; i < links.length; i++) {
            links[0].addEventListener("click", function (event) {
                event.stopPropagation();
            });
        }*/

        // Limit displayed notifications to 5
        for (i = 0; i <= container.childNodes.length - 5; i++) {
            container.childNodes[i].classList.add("notification-delete");
        }

        removeOnFadeOut = function (event) {
            if (event.animationName === "fadeOut") {
                container.removeChild(notificationElement);
                notificationElement = null;
            }
        }
        notificationElement.addEventListener("webkitAnimationEnd", removeOnFadeOut, false);
        notificationElement.addEventListener("animationend", removeOnFadeOut, false);


        container.appendChild(notificationElement);
    };

    Notifier.info = function(message, title) {
        Notifier.notify(message, title, "data:image/png;base64,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%3D%3D");
    };
    Notifier.warning = function(message, title) {
        Notifier.notify(message, title, "data:image/png;base64,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%3D");
    };
    Notifier.error = function(message, title) {
        Notifier.notify(message, title, "data:image/png;base64,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%3D%3D");
    };
    Notifier.success = function(message, title) {
        Notifier.notify(message, title, "data:image/png;base64,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%3D");
    };

    return {
        notify: Notifier.notify
    };

});