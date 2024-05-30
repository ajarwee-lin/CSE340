// public/js/validation.js

document.addEventListener('DOMContentLoaded', function () {
    // Add classification form validation
    const addClassificationForm = document.getElementById('addClassificationForm');
    if (addClassificationForm) {
      addClassificationForm.addEventListener('submit', function (event) {
        const classificationName = document.getElementById('classification_name').value;
        const nameRegex = /^[a-zA-Z0-9]+$/;
        if (!nameRegex.test(classificationName)) {
          alert('Classification name cannot contain spaces or special characters.');
          event.preventDefault();
        }
      });
    }
  
    // Add inventory form validation
    const addInventoryForm = document.getElementById('addInventoryForm');
    if (addInventoryForm) {
      addInventoryForm.addEventListener('submit', function (event) {
        const invMake = document.getElementById('inv_make').value;
        const invModel = document.getElementById('inv_model').value;
        const invDescription = document.getElementById('inv_description').value;
        const invPrice = document.getElementById('inv_price').value;
        const invYear = document.getElementById('inv_year').value;
        const invMiles = document.getElementById('inv_miles').value;
        const invColor = document.getElementById('inv_color').value;
        const classificationId = document.getElementById('classificationList').value;
  
        if (!invMake || !invModel || !invDescription || !invPrice || !invYear || !invMiles || !invColor || !classificationId) {
          alert('All fields are required.');
          event.preventDefault();
        }
      });
    }
  });
  