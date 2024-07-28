
document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Get form data
    fetch('/add-book', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Book Added Successfully'); // Show alert on success
            this.reset(); // Reset the form
        } else {
            alert('Failed to Add Book'); // Show alert on failure
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred'); // Show alert on error
    });
});
