/**
 * ServiceHub - Customer Homepage Component
 */
import { mockCategories, mockPromotions, mockProviders } from './data.js';
import { state, setView, showToast } from './app.js';

export function renderHomepage() {
  const container = document.getElementById('app-content');
  if (!container) return;

  const popularCats = mockCategories.filter(c => c.popular);
  const emergencyPros = mockProviders.filter(p => p.emergency);
  const highlyRatedPros = mockProviders.filter(p => p.rating >= 4.9);
  const nearbyPros = [...mockProviders].sort((a, b) => a.distanceKm - b.distanceKm);
  const recentlyViewedPros = mockProviders.filter(p => state.recentlyViewed.includes(p.id));

  container.innerHTML = `
    <!-- HERO SECTION -->
    <section class="relative bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Ambient Glows -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30">
        <div class="absolute top-12 left-10 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-5xl mx-auto text-center space-y-6">

        <!-- Value Prop Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Over 2,400+ Background-Checked Pros Available Today
        </div>

        <!-- Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          I need someone to <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-amber-200">solve this problem.</span>
        </h1>
        <p class="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
          Who is available, where are they, how much does it cost, and can I book them instantly?
        </p>

        <!-- OVERSIZED SEARCH / BOOKING INTERFACE -->
        <div class="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/20 text-slate-800 text-left max-w-4xl mx-auto mt-8">
          <form id="hero-search-form" class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

            <!-- 1. What service? -->
            <div class="md:col-span-5 relative group px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/80 transition">
              <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">What service do you need?</label>
              <div class="flex items-center gap-2 mt-0.5">
                <i data-lucide="search" class="w-4 h-4 text-indigo-600 shrink-0"></i>
                <input type="text" id="hero-input-service" placeholder="e.g. Electrician, Plumber, Cleaner" class="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder-slate-400">
              </div>
            </div>

            <!-- 2. Where? -->
            <div class="md:col-span-3 relative px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/80 transition">
              <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Where?</label>
              <div class="flex items-center gap-2 mt-0.5">
                <i data-lucide="map-pin" class="w-4 h-4 text-indigo-600 shrink-0"></i>
                <input type="text" id="hero-input-location" value="${state.activeFilter.locationQuery}" placeholder="City or ZIP" class="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder-slate-400">
              </div>
            </div>

            <!-- 3. When? -->
            <div class="md:col-span-2 relative px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/80 transition">
              <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">When?</label>
              <div class="flex items-center gap-2 mt-0.5">
                <i data-lucide="calendar" class="w-4 h-4 text-indigo-600 shrink-0"></i>
                <input type="text" id="hero-input-date" placeholder="Today / Tomorrow" class="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder-slate-400">
              </div>
            </div>

            <!-- Submit Button -->
            <div class="md:col-span-2">
              <button type="submit" class="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition hover:scale-[1.02]">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                Find Pros
              </button>
            </div>
          </form>

          <!-- QUICK CATEGORY PILLS -->
          <div class="flex items-center gap-2 mt-4 px-2 overflow-x-auto pb-1 text-xs text-slate-600">
            <span class="font-bold text-slate-400 shrink-0">Popular:</span>
            ${popularCats.slice(0, 5).map(c => `
              <button data-hero-cat="${c.id}" class="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition shrink-0">
                ${c.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Trust Badges Bar -->
        <div class="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-400 text-xs font-semibold">
          <div class="flex items-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Verified Professionals
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> Upfront Transparent Pricing
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="clock" class="w-4 h-4 text-emerald-400"></i> Instant Booking Confirmation
          </div>
        </div>

      </div>
    </section>

    <!-- CONTENT SECTIONS -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 -mt-10 relative z-10">

      <!-- 1. POPULAR SERVICE CATEGORIES CAROUSEL / GRID -->
      <section class="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Popular Services</h2>
            <p class="text-xs sm:text-sm text-slate-500">Book background-checked professionals in a few clicks</p>
          </div>
          <button id="btn-all-categories" class="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View All Marketplace <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          ${mockCategories.map(cat => `
            <div data-cat-card="${cat.id}" class="p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg hover:border-indigo-200 border border-slate-100 transition duration-200 cursor-pointer group flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
              </div>
              <h3 class="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600">${cat.name}</h3>
              <span class="text-[11px] text-slate-400 mt-1 font-medium">${cat.count}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 2. EMERGENCY 24/7 SERVICES (HIGHLIGHT BANNER) -->
      <section class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div class="space-y-2 max-w-xl">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-amber-100 backdrop-blur-sm">
              <i data-lucide="zap" class="w-3.5 h-3.5 fill-amber-300"></i> Immediate Dispatch Available
            </div>
            <h3 class="text-2xl sm:text-3xl font-black">Emergency Local Services</h3>
            <p class="text-amber-100 text-xs sm:text-sm">
              Burst pipe? Power outage? Locked out? Fast arrival guaranteed within 30-45 minutes from nearby verified pros.
            </p>
          </div>
          <button id="btn-explore-emergency" class="px-6 py-3 bg-white text-amber-900 hover:bg-amber-50 font-extrabold text-sm rounded-2xl shadow-lg transition hover:scale-105 shrink-0 flex items-center gap-2">
            <i data-lucide="phone-call" class="w-4 h-4 text-amber-600"></i> View 24/7 Responders
          </button>
        </div>

        <!-- Emergency Pros Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          ${emergencyPros.slice(0, 3).map(p => `
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between text-white">
              <div class="flex items-center gap-3">
                <img src="${p.avatar}" alt="${p.name}" class="w-12 h-12 rounded-xl object-cover ring-2 ring-white/50">
                <div>
                  <h4 class="font-bold text-sm">${p.name}</h4>
                  <p class="text-xs text-amber-200">${p.profession}</p>
                  <div class="flex items-center gap-2 mt-1 text-[11px] text-amber-100">
                    <span class="flex items-center gap-0.5 text-amber-300 font-bold"><i data-lucide="star" class="w-3 h-3 fill-amber-300"></i> ${p.rating}</span>
                    <span>•</span>
                    <span>Arrival: ${p.responseTime}</span>
                  </div>
                </div>
              </div>
              <button data-view-pro="${p.id}" class="px-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-amber-100 transition shadow">
                Book
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3. NEARBY PROFESSIONALS SECTION -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center gap-2">
              <i data-lucide="navigation" class="w-5 h-5 text-indigo-600"></i>
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Nearby Professionals</h2>
            </div>
            <p class="text-xs sm:text-sm text-slate-500">Closest active service providers around ${state.activeFilter.locationQuery}</p>
          </div>
          <button id="btn-see-all-nearby" class="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            See Map <i data-lucide="map" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${nearbyPros.slice(0, 4).map(p => renderProviderCardHtml(p)).join('')}
        </div>
      </section>

      <!-- 4. HIGHLY RATED PROVIDERS SECTION -->
      <section class="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center gap-2">
              <i data-lucide="award" class="w-5 h-5 text-amber-400"></i>
              <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Top Rated Professionals</h2>
            </div>
            <p class="text-xs sm:text-sm text-slate-400">4.8+ stars rated by verified local homeowners</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${highlyRatedPros.map(p => renderProviderCardHtml(p, true)).join('')}
        </div>
      </section>

      <!-- 5. PROMOTIONAL CATEGORIES & OFFERS -->
      <section>
        <div class="mb-6">
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Featured Deals & Promotions</h2>
          <p class="text-xs sm:text-sm text-slate-500">Special seasonal discounts on local services</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${mockPromotions.map(promo => `
            <div class="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 h-64 flex flex-col justify-end p-6">
              <img src="${promo.image}" alt="${promo.title}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <div class="relative z-10 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider">${promo.discount}</span>
                  <span class="text-xs font-medium text-slate-300 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">${promo.tag}</span>
                </div>
                <h3 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">${promo.title}</h3>
                <button data-promo-cat="${promo.category}" class="w-full py-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
                  Claim Offer <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 6. RECENTLY VIEWED PROVIDERS -->
      ${recentlyViewedPros.length > 0 ? `
        <section class="bg-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <i data-lucide="history" class="w-5 h-5 text-slate-500"></i> Recently Viewed
            </h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            ${recentlyViewedPros.map(p => `
              <div class="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-indigo-300 transition">
                <div class="flex items-center gap-3">
                  <img src="${p.avatar}" class="w-10 h-10 rounded-xl object-cover">
                  <div>
                    <h4 class="font-bold text-xs text-slate-900">${p.name}</h4>
                    <p class="text-[11px] text-slate-500">${p.profession}</p>
                  </div>
                </div>
                <button data-view-pro="${p.id}" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition">
                  View
                </button>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

    </div>
  `;

  // Attach Event Listeners for Homepage
  attachHomepageEvents();
}

// Reuseable Provider Card HTML Generator
export function renderProviderCardHtml(p, darkTheme = false) {
  const isSaved = state.savedProviders.includes(p.id);
  const bgClass = darkTheme ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-white border-slate-200/90 text-slate-800';
  const subTextClass = darkTheme ? 'text-slate-400' : 'text-slate-500';

  return `
    <div class="${bgClass} rounded-3xl border p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <!-- Card Header Image & Badges -->
        <div class="relative h-40 rounded-2xl overflow-hidden mb-3 bg-slate-100">
          <img src="${p.coverImage}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <!-- Avatar Overlay -->
          <div class="absolute bottom-3 left-3 flex items-center gap-2">
            <img src="${p.avatar}" alt="${p.name}" class="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-md">
            <div>
              <span class="text-xs font-extrabold text-white block leading-none drop-shadow">${p.name}</span>
              <span class="text-[10px] text-indigo-200 font-medium block mt-0.5">${p.profession}</span>
            </div>
          </div>

          <!-- Save Heart Button -->
          <button data-toggle-save="${p.id}" class="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white text-slate-700 hover:text-rose-600 transition shadow">
            <i data-lucide="heart" class="w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}"></i>
          </button>

          <!-- Top Badge -->
          ${p.badge ? `
            <span class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold tracking-wide">
              ${p.badge}
            </span>
          ` : ''}
        </div>

        <!-- Rating & Distance -->
        <div class="flex items-center justify-between text-xs mb-2">
          <div class="flex items-center gap-1 font-bold text-amber-500">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
            <span>${p.rating}</span>
            <span class="${subTextClass} font-normal">(${p.reviewsCount})</span>
          </div>
          <div class="flex items-center gap-1 ${subTextClass} text-[11px]">
            <i data-lucide="map-pin" class="w-3 h-3 text-indigo-500"></i>
            <span>${p.distanceKm} km away</span>
          </div>
        </div>

        <!-- Features Badges -->
        <div class="flex flex-wrap gap-1.5 mb-3 text-[10px]">
          ${p.verified ? `<span class="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold flex items-center gap-1"><i data-lucide="check-circle" class="w-2.5 h-2.5"></i> Verified</span>` : ''}
          ${p.instantBooking ? `<span class="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-semibold flex items-center gap-1"><i data-lucide="zap" class="w-2.5 h-2.5"></i> Instant Book</span>` : ''}
        </div>

        <!-- Price -->
        <div class="border-t border-slate-100 dark:border-slate-700 pt-2.5 mb-3 flex items-baseline justify-between">
          <span class="text-[11px] ${subTextClass}">Starting price</span>
          <span class="text-base font-black text-slate-900 dark:text-white">$${p.startingPrice}<span class="text-xs font-normal ${subTextClass}">/${p.unit}</span></span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-2 pt-1">
        <button data-view-pro="${p.id}" class="py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition text-center">
          View Profile
        </button>
        <button data-quick-book="${p.id}" class="py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm text-center">
          Book Now
        </button>
      </div>
    </div>
  `;
}

function attachHomepageEvents() {
  // Search Form Submit
  const heroForm = document.getElementById('hero-search-form');
  if (heroForm) {
    // Flatpickr for date input
    if (window.flatpickr) {
      flatpickr('#hero-input-date', { minDate: 'today', dateFormat: 'Y-m-d' });
    }

    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('hero-input-service').value.trim();
      const location = document.getElementById('hero-input-location').value.trim();
      const date = document.getElementById('hero-input-date').value.trim();

      state.activeFilter.searchQuery = service;
      if (location) state.activeFilter.locationQuery = location;
      state.activeFilter.dateQuery = date;

      setView('marketplace');
    });
  }

  // Quick Category Pills
  document.querySelectorAll('[data-hero-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-hero-cat');
      setView('marketplace', { category: catId });
    });
  });

  // Category Grid Cards
  document.querySelectorAll('[data-cat-card]').forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.getAttribute('data-cat-card');
      setView('marketplace', { category: catId });
    });
  });

  document.getElementById('btn-all-categories')?.addEventListener('click', () => setView('marketplace'));
  document.getElementById('btn-explore-emergency')?.addEventListener('click', () => {
    state.activeFilter.emergencyOnly = true;
    setView('marketplace');
  });
  document.getElementById('btn-see-all-nearby')?.addEventListener('click', () => setView('marketplace'));

  // Promo category clicks
  document.querySelectorAll('[data-promo-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-promo-cat');
      setView('marketplace', { category: cat });
    });
  });

  // View Provider Profile Buttons
  document.querySelectorAll('[data-view-pro]').forEach(btn => {
    btn.addEventListener('click', () => {
      const proId = btn.getAttribute('data-view-pro');
      const pro = mockProviders.find(p => p.id === proId);
      if (pro) setView('profile', { provider: pro });
    });
  });

  // Quick Book Buttons
  document.querySelectorAll('[data-quick-book]').forEach(btn => {
    btn.addEventListener('click', () => {
      const proId = btn.getAttribute('data-quick-book');
      const pro = mockProviders.find(p => p.id === proId);
      if (pro && window.openBookingModal) {
        window.openBookingModal(pro);
      }
    });
  });

  // Save Heart Buttons
  document.querySelectorAll('[data-toggle-save]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const proId = btn.getAttribute('data-toggle-save');
      if (state.savedProviders.includes(proId)) {
        state.savedProviders = state.savedProviders.filter(id => id !== proId);
        showToast('Saved Pros', 'Removed from saved list', 'info');
      } else {
        state.savedProviders.push(proId);
        showToast('Saved Pros', 'Added to saved list', 'success');
      }
      renderHomepage();
    });
  });
}
