document.getElementById('contact-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const statusEl = document.getElementById('form-status');
  statusEl.textContent = 'Sending your request...';

  setTimeout(() => {
    statusEl.textContent = 'Your request has been sent! We will reply within 24 hours.';
    statusEl.style.color = '#0f8a58';
    this.reset();
  }, 800);
});
