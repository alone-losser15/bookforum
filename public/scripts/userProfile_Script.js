document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          const targetId = tab.getAttribute('data-tab-target');
          const targetContent = document.getElementById(targetId);

          tabs.forEach(t => t.classList.remove('active'));
          tabContents.forEach(tc => tc.classList.remove('active'));

          tab.classList.add('active');
          targetContent.classList.add('active');
      });
  });
});

//for deleting reviews
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-review-btn');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function(event) {
            const reviewId = button.dataset.reviewId;
            
            try {
                const response = await fetch(`/reviews/delete/${reviewId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Remove the deleted review from the UI
                    button.closest('.review-container').remove();
                    alert('Review Deleted Successfully');
                } else {
                    console.error('Failed to delete review');
                }
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        });
    });
});

//Remove from favourites
document.querySelectorAll('.removeFromFavourites').forEach(button => {
    button.addEventListener('click', async () => {
        const bookId = button.dataset.bookId;
        try {
            const response = await fetch(`/profile/remove-from-favourites/${bookId}`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                // Update the UI to reflect the change (remove the book from the UI)
                button.parentElement.parentElement.remove(); // Assuming the button is inside a container that represents the book
                alert('Book Removed from Favourites');
            } else {
                alert('Failed to remove book from favourites');
            }
        } catch (error) {
            console.error('Error removing book from favourites:', error);
        }
    });
});



const changeProfilePicBtn = document.getElementById('change-profile-pic');
const profilePicInput = document.getElementById('profile-pic-input');
const uploadBtn = document.getElementById('upload-btn');

changeProfilePicBtn.addEventListener('click', () => {
    profilePicInput.click(); // Trigger file input click
});

profilePicInput.addEventListener('change', () => {
    uploadBtn.style.display = 'flex'; // Show the upload button
});

document.getElementById('profilePicForm').addEventListener('submit', () => {
    // Handle form submission (e.g., show loading spinner, etc.)
});
