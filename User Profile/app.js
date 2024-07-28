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
