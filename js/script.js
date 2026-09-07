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

// "Submit your problem" form — build a clean email instead of a raw form-post,
// which avoids the browser's "insecure form" warning on mailto actions, and
// also logs each submission (with a date) to a Google Sheet.

// Paste the Google Apps Script Web App URL here once it's deployed — see
// README.md for the one-time setup steps. Until then, sheet logging is
// skipped silently and the email fallback still works on its own.
const SHEET_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

const briefForm = document.getElementById('briefForm');
if (briefForm) {
  briefForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = briefForm.elements['Name'].value.trim();
    const email = briefForm.elements['Email'].value.trim();
    const phone = briefForm.elements['Phone'].value.trim();
    const problem = briefForm.elements['Problem'].value.trim();

    // Show the confirmation first, so the visitor clearly sees their
    // submission went through — this should never look like "it just
    // opened my email app and did nothing."
    briefForm.hidden = true;
    const successEl = document.getElementById('briefFormSuccess');
    if (successEl) successEl.hidden = false;

    if (SHEET_ENDPOINT && !SHEET_ENDPOINT.startsWith('PASTE_')) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('problem', problem);
      fetch(SHEET_ENDPOINT, { method: 'POST', mode: 'no-cors', body: formData }).catch(() => {});
    }

    const subject = `New enquiry from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n\n` +
      `Problem:\n${problem}`;

    const mailtoUrl =
      `mailto:adireddybhanudatascience@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  });
}
