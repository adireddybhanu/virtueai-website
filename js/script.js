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
// which avoids the browser's "insecure form" warning on mailto actions.
const briefForm = document.getElementById('briefForm');
if (briefForm) {
  briefForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = briefForm.elements['Name'].value.trim();
    const email = briefForm.elements['Email'].value.trim();
    const problem = briefForm.elements['Problem'].value.trim();

    const subject = `New enquiry from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Problem:\n${problem}`;

    const mailtoUrl =
      `mailto:adireddybhanudatascience@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  });
}
