// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// "Submit your problem" form — saves each submission (with a date) to a
// Google Sheet. Does NOT open the visitor's email app.

// Paste the Google Apps Script Web App URL here once it's deployed — see
// README.md for the one-time setup steps. Until then, submissions are
// only shown as "sent" in the browser but are not actually saved anywhere.
const SHEET_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

const briefForm = document.getElementById('briefForm');
if (briefForm) {
  briefForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = briefForm.elements['Name'].value.trim();
    const email = briefForm.elements['Email'].value.trim();
    const phone = briefForm.elements['Phone'].value.trim();
    const problem = briefForm.elements['Problem'].value.trim();

    if (SHEET_ENDPOINT && !SHEET_ENDPOINT.startsWith('PASTE_')) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('problem', problem);
      fetch(SHEET_ENDPOINT, { method: 'POST', mode: 'no-cors', body: formData }).catch(() => {});
    }

    briefForm.hidden = true;
    const successEl = document.getElementById('briefFormSuccess');
    if (successEl) successEl.hidden = false;
  });
}
