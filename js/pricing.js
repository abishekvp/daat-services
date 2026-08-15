/* ============================================================
   DAAT SERVICES — Pricing Page Logic
   Billing toggle, GST tooltip, Razorpay stub
   ============================================================ */

const PRICING = {
  growth: {
    monthly: { web: 24999, seo: 9999, video: 14999, marketing: 19999 },
  },
  professional: {
    monthly: { web: 59999, seo: 24999, video: 34999, marketing: 44999 },
  },
  enterprise: {
    monthly: { web: 129999, seo: 54999, video: 74999, marketing: 94999 },
  },
};

const ANNUAL_DISCOUNT = 0.20; // 20% off
let isAnnual = false;
let activeCategory = 'web';

document.addEventListener('DOMContentLoaded', () => {
  initBillingToggle();
  initCategoryTabs();
  initRazorpayButtons();
  initGSTTooltip();
  initSachetPricing();
});

/* ─── Format INR ────────────────────────────────────────── */
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/* ─── Billing Toggle ──────────────────────────────────────── */
function initBillingToggle() {
  const toggle = document.getElementById('billing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnual  = document.getElementById('label-annual');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.classList.toggle('on', isAnnual);
    labelMonthly.classList.toggle('active', !isAnnual);
    labelAnnual.classList.toggle('active', isAnnual);
    updatePrices();
  });
}

/* ─── Category Tabs ──────────────────────────────────────── */
function initCategoryTabs() {
  document.querySelectorAll('.pricing-cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pricing-cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      updatePrices();
    });
  });
}

/* ─── Update Prices ──────────────────────────────────────── */
function updatePrices() {
  ['growth', 'professional', 'enterprise'].forEach(tier => {
    const monthly = PRICING[tier].monthly[activeCategory];
    if (!monthly) return;

    const annual     = Math.round(monthly * (1 - ANNUAL_DISCOUNT));
    const display    = isAnnual ? annual : monthly;
    const original   = isAnnual ? monthly : null;

    const priceEl    = document.querySelector(`[data-price="${tier}"]`);
    const origEl     = document.querySelector(`[data-original="${tier}"]`);
    const saveEl     = document.querySelector(`[data-save="${tier}"]`);
    const periodEl   = document.querySelector(`[data-period="${tier}"]`);

    if (priceEl) {
      priceEl.style.transform = 'scale(0.9)';
      priceEl.style.opacity   = '0';
      setTimeout(() => {
        priceEl.textContent = formatINR(display).replace('₹', '');
        priceEl.style.transform = 'scale(1)';
        priceEl.style.opacity   = '1';
      }, 150);
    }

    if (origEl) {
      origEl.style.display = isAnnual ? 'block' : 'none';
      if (isAnnual) origEl.textContent = formatINR(monthly) + '/mo';
    }

    if (saveEl) {
      saveEl.style.display = isAnnual ? 'inline-block' : 'none';
      if (isAnnual) saveEl.textContent = `Save ${ANNUAL_DISCOUNT * 100}%`;
    }

    if (periodEl) {
      periodEl.textContent = isAnnual ? '/mo (billed annually)' : '/month';
    }
  });
}

/* ─── GST Tooltip ────────────────────────────────────────── */
function initGSTTooltip() {
  document.querySelectorAll('.gst-tooltip-trigger').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const tip = el.querySelector('.gst-tooltip-content');
      if (tip) tip.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
      const tip = el.querySelector('.gst-tooltip-content');
      if (tip) tip.style.opacity = '0';
    });
  });
}

/* ─── Razorpay Stub ──────────────────────────────────────── */
function initRazorpayButtons() {
  document.querySelectorAll('[data-razorpay]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tier = btn.dataset.razorpay;
      const monthly = PRICING[tier]?.monthly[activeCategory];
      if (!monthly) return;

      const amount = isAnnual
        ? Math.round(monthly * (1 - ANNUAL_DISCOUNT)) * 12
        : monthly;

      // TODO: Replace with real Razorpay order creation API call
      // POST /api/payments/create-order/ → { order_id, amount, currency }
      console.info(`[Razorpay] Opening checkout for ${tier}: ₹${amount}`);

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with actual key
        amount: amount * 100, // paise
        currency: 'INR',
        name: 'DAAT Services',
        description: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan — ${isAnnual ? 'Annual' : 'Monthly'}`,
        image: 'assets/logo.png',
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#00F0FF' },
        handler: function(response) {
          // TODO: POST to /api/payments/verify/ with payment_id, order_id, signature
          console.info('[Razorpay] Payment success:', response.razorpay_payment_id);
          showToast('🎉 Payment successful! Check your email for onboarding details.', '✅');
        },
      };

      if (typeof Razorpay !== 'undefined') {
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        // Razorpay not loaded — open contact page instead
        showToast('Redirecting to contact for manual onboarding…', 'ℹ️');
        setTimeout(() => window.location.href = 'contact.html', 1200);
      }
    });
  });
}

/* ─── Sachet / One-Off Packages ──────────────────────────── */
function initSachetPricing() {
  // Static — no toggle required
  // Rendered in HTML, just animate on scroll
}

/* ─── GSTIN Field Toggle ─────────────────────────────────── */
document.addEventListener('change', e => {
  if (e.target.id === 'has-gstin') {
    const field = document.getElementById('gstin-field');
    if (field) field.style.display = e.target.checked ? 'block' : 'none';
  }
});
