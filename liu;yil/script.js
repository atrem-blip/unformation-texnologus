'use strict';
// Google Tag устанавливается отдельно в head каждой HTML-страницы.
const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        lead_source: 'contact_form'
      });
    }
    document.querySelector('#form-status').textContent =
      'Учебная форма проверена. Данные не отправлены.';
  });
}
}
leadForm.addEventListener('submit', (event) => {
  event.preventDefault();
});
const leadForm = document.querySelector('#lead-form');
const programCta = document.querySelector('#program-cta');
if (programCta) {
  programCta.addEventListener('click', () => {
    document.querySelector('#program-preview').hidden = false;
    if (typeof gtag === 'function') {
      gtag('event', 'cta_click', {
        button_name: 'program',
        page_section: 'hero'
      });
    }
  });
gtag('event', 'cta_click', {
  button_name: 'program',
  page_section: 'hero'
});
  const programCta = document.querySelector('#program-cta');
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8SVP8JCWF5"></script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8SVP8JCWF5');
programCta.addEventListener('click', () => {
  gtag('event', 'cta_click', {
    button_name: 'program', page_section: 'hero'
  });
});
