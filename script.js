
// ---------- QUICK CONFIG ----------
    // Replace this with your WhatsApp number in international format (no +).
    // Example: '919876543210' for India +91 9876543210
    // const WHATSAPP_NUMBER = '919876543210';
    // If you'd rather keep link in HTML, you can ignore this; this script updates the link automatically.
    // document.getElementById('whatsappLink').href = 'https://wa.me/' + WHATSAPP_NUMBER;

    // ---------- Mobile Menu Toggle ----------
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
       document.body.classList.toggle('overflow-hidden');
    });

     // Close menu when clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });

    // ---------- Intersection Observer for reveal animations ----------
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // don't unobserve if you want repeated reveals; here we stop observing to keep performance
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ---------- Gallery item click to open large preview (simple) ----------
    document.querySelectorAll('.art-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.querySelector('img').src;
        openLightbox(src);
      });
      item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const src = item.querySelector('img').src;
          openLightbox(src);
        }
      });
    });

    function openLightbox(src){
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-60 flex items-center justify-center p-6';
      overlay.style.background = 'rgba(0,0,0,0.85)';
      overlay.innerHTML = `
        <div class="max-w-4xl w-full rounded-lg overflow-hidden">
          <img src="${src}" alt="Artwork preview" class="w-full h-auto block" />
        </div>
      `;
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    }

    // ---------- Toast helper ----------
    function showToast(message, duration = 3500){
      const container = document.getElementById('toastContainer');
      container.classList.remove('hidden');
      const toast = document.createElement('div');
      toast.className = 'toast glass';
      toast.style.background = 'linear-gradient(90deg, rgba(167,139,250,0.12), rgba(253,164,175,0.12))';
      toast.innerHTML = `<div style="color:var(--accent); font-weight:700; margin-bottom:4px;">Thanks!</div><div style="color:#dce8ff;">${message}</div>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
      }, duration - 400);

      setTimeout(() => {
        toast.remove();
        if (!container.childElementCount) container.classList.add('hidden');
      }, duration);
    }

    // Show small welcome toast on first load (optional)
    window.addEventListener('load', () => {
      // small delay so page loads and animation is visible
      setTimeout(() => {
        showToast('Thanks for visiting my art gallery!');
      }, 1200);

      // year
      document.getElementById('year').textContent = new Date().getFullYear();
    });

    // Also allow manual triggering via button (useful for mobile)
    document.getElementById('visitToastBtn').addEventListener('click', () => {
      showToast('Thanks for visiting my art gallery!');
    });

    // Smooth scroll offset fix for fixed header (optional)
    // If you jump to an anchor, offset by header height
    (function adjustAnchorOffset(){
      function offsetHash(){
        if(location.hash.length > 0){
          window.scrollBy(0, -72); // adjust if header height differs
        }
      }
      window.addEventListener("hashchange", offsetHash);
      window.addEventListener("load", offsetHash);
    })();

