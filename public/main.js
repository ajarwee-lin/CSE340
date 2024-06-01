// main.js
document.addEventListener("DOMContentLoaded", function() {
    const generateErrorLink = document.getElementById('generate-error');
    generateErrorLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Simulate generating an error with AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/generate-error', true);
        xhr.onload = function() {
            if (xhr.status >= 400) {
                console.error("Error status:", xhr.status);
                console.error("Error response:", xhr.responseText);
                // Handle error response accordingly
                alert("An error occurred: " + xhr.status);
            } else {
                console.log("No error");
                // Handle successful response accordingly
                alert("Request successful!");
            }
        };
        xhr.onerror = function() {
            console.error("Request failed");
            // Handle request error accordingly
            alert("Request failed!");
        };
        xhr.send();
    });
});
