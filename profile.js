/**
 * ServiceHub - Detailed Provider Profile & Interactive Step-by-Step Booking Modal
 */
import { mockProviders } from './data.js';
import { state, setView, showToast } from './app.js';

let activeProfileTab = 'about';

export function renderProviderProfile() {
  const container = document.getElementById('app-content');
  if (!container) return;

  const provider = state.selectedProvider || mockProviders[0];
  const isSaved = state.savedProviders.includes(provider.id);

  container.innerHTML = `
    <!-- PROFILE COVER & HEADER -->
    <div class="relative bg-slate-900 text-white">
      <div class="h-64 sm:h-80 w-full overflow-hidden relative">
        <img src="${provider.coverImage}" alt="${provider.name}" class="w-full h-full object-cover opacity-60">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <button id="btn-back-to-market" class="absolute top-6 left-6 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur text-white text-xs font-bold rounded-xl flex items-center gap-2 border border-white/20 transition">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Marketplace
        </button>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 pb-8">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">

          <div class="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <img src="${provider.avatar}" alt="${provider.name}" class="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-slate-900 shadow-2xl">

            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white">${provider.name}</h1>
                ${provider.verified ? `<span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Verified Pro</span>` : ''}
                ${provider.badge ? `<span class="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold">${provider.badge}</span>` : ''}
              </div>

              <p class="text-sm font-semibold text-slate-300">${provider.title}</p>

              <div class="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div class="flex items-center gap-1 font-bold text-amber-400">
                  <i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>
                  <span>${provider.rating}</span>
                  <span class="text-slate-400 font-normal">(${provider.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <div class="flex items-center gap-1">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-indigo-400"></i>
                  <span>${provider.location}</span>
                </div>
                <span>•</span>
                <div class="flex items-center gap-1 text-emerald-400 font-semibold">
                  <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                  <span>Responds ${provider.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Right Actions -->
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button id="btn-save-pro-profile" class="p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl border border-white/20 text-white transition">
              <i data-lucide="heart" class="w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}"></i>
            </button>
            <button id="btn-open-booking-modal-profile" class="flex-1 sm:flex-initial py-3.5 px-8 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition hover:scale-[1.02] flex items-center justify-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4"></i> Book Service
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- MAIN PROFILE TABS & DETAILS -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- NAV TABS -->
      <div class="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px mb-8 text-sm font-semibold">
        ${[
          { id: 'about', label: 'About & Credentials', icon: 'info' },
          { id: 'services', label: 'Services & Pricing', icon: 'wrench' },
          { id: 'portfolio', label: 'Portfolio & Work', icon: 'image' },
          { id: 'reviews', label: `Reviews (${provider.reviewsCount})`, icon: 'star' }
        ].map(tab => `
          <button data-profile-tab="${tab.id}" class="px-4 py-3 border-b-2 transition flex items-center gap-2 shrink-0 ${activeProfileTab === tab.id ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}">
            <i data-lucide="${tab.icon}" class="w-4 h-4"></i> ${tab.label}
          </button>
        `).join('')}
      </div>

      <!-- GRID CONTAINER (Tab Content + Right Sticky Booking Box) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- LEFT CONTENT AREA -->
        <div class="lg:col-span-8 space-y-8" id="profile-tab-content">
          ${renderTabContent(provider)}
        </div>

        <!-- RIGHT SIDEBAR: QUICK PRICING & DIRECT BOOKING CARD -->
        <aside class="lg:col-span-4 sticky top-24 space-y-6">
          <div class="bg-white p-6 rounded-3xl shadow-lg border border-slate-200/90 space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span class="text-xs text-slate-400 font-medium">Starting from</span>
                <div class="text-2xl font-black text-slate-900">$${provider.startingPrice}<span class="text-xs font-semibold text-slate-500">/${provider.unit}</span></div>
              </div>
              <span class="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full flex items-center gap-1">
                <i data-lucide="check" class="w-3 h-3"></i> Available
              </span>
            </div>

            <!-- Stats Highlights -->
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span class="text-slate-400 block font-medium">Response Rate</span>
                <span class="font-bold text-slate-800 text-sm mt-0.5 block">${provider.responseRate}</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span class="text-slate-400 block font-medium">Completed Jobs</span>
                <span class="font-bold text-slate-800 text-sm mt-0.5 block">${provider.completedJobs}+</span>
              </div>
            </div>

            <!-- Direct Book Trigger -->
            <button id="btn-sidebar-book-now" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2">
              <i data-lucide="zap" class="w-4 h-4"></i> Book Appointment Now
            </button>

            <!-- Trust Guarantee Box -->
            <div class="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100/80 text-xs text-indigo-900 space-y-1.5">
              <div class="flex items-center gap-1.5 font-bold">
                <i data-lucide="shield-check" class="w-4 h-4 text-indigo-600"></i> ServiceHub Money-Back Guarantee
              </div>
              <p class="text-[11px] text-indigo-800/80 leading-relaxed">
                Payments held securely in escrow until job completion. Full refund if you are not satisfied.
              </p>
            </div>
          </div>
        </aside>

      </div>

    </div>
  `;

  attachProfileEvents(provider);
}

function renderTabContent(p) {
  if (activeProfileTab === 'services') {
    return `
      <div class="space-y-4">
        <h3 class="text-lg font-extrabold text-slate-900">Services Offered & Rates</h3>
        <div class="space-y-3">
          ${p.services.map(s => `
            <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="space-y-1 flex-1">
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-slate-900 text-sm">${s.name}</h4>
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">${s.duration}</span>
                </div>
                <p class="text-xs text-slate-500">${s.description}</p>
              </div>
              <div class="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0 border-slate-100">
                <span class="text-lg font-black text-slate-900">$${s.price}</span>
                <button data-select-service="${s.id}" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition">
                  Select & Book
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeProfileTab === 'portfolio') {
    return `
      <div class="space-y-4">
        <h3 class="text-lg font-extrabold text-slate-900">Recent Projects Portfolio</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${p.portfolio.map(item => `
            <div class="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
              <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300">
              <div class="p-3">
                <h4 class="font-bold text-xs text-slate-800">${item.title}</h4>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (activeProfileTab === 'reviews') {
    return `
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="text-center sm:text-left space-y-1">
            <div class="text-4xl font-black text-slate-900">${p.rating}</div>
            <div class="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
              ${[1, 2, 3, 4, 5].map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>`).join('')}
            </div>
            <p class="text-xs text-slate-500">Based on ${p.reviewsCount} verified customer reviews</p>
          </div>
          <button id="btn-write-review" class="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition">
            Write a Review
          </button>
        </div>

        <div class="space-y-4">
          ${p.reviews.map(r => `
            <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="${r.avatar}" class="w-9 h-9 rounded-full object-cover">
                  <div>
                    <h5 class="font-bold text-xs text-slate-900">${r.author}</h5>
                    <span class="text-[10px] text-slate-400">${r.date}</span>
                  </div>
                </div>
                <div class="flex items-center gap-0.5 text-amber-400">
                  ${[...Array(r.rating)].map(() => `<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>`).join('')}
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed pt-1">${r.comment}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Default 'about' Tab
  return `
    <div class="space-y-8">
      <!-- Bio -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <h3 class="font-extrabold text-slate-900 text-base">About ${p.name}</h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${p.bio}</p>
      </div>

      <!-- Quick Highlights Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-bold text-xs text-slate-900">Background Checked</h4>
            <p class="text-[10px] text-slate-400">Verified identity & license</p>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <i data-lucide="award" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-bold text-xs text-slate-900">Insured Service</h4>
            <p class="text-[10px] text-slate-400">Up to $1M liability coverage</p>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-bold text-xs text-slate-900">Punctual Arrival</h4>
            <p class="text-[10px] text-slate-400">99.4% on-time guarantee</p>
          </div>
        </div>
      </div>

      <!-- Service Area -->
      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <h3 class="font-extrabold text-slate-900 text-base">Service Area Coverage</h3>
        <p class="text-xs text-slate-500">Servicing ${p.location} and surrounding neighborhoods within 15 km.</p>
        <div class="p-3 bg-slate-100 rounded-2xl text-xs font-semibold text-slate-700 flex items-center gap-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-indigo-600"></i> Primary Hub: ${p.location}
        </div>
      </div>
    </div>
  `;
}

function attachProfileEvents(provider) {
  document.getElementById('btn-back-to-market')?.addEventListener('click', () => setView('marketplace'));

  // Profile Save Heart Button
  document.getElementById('btn-save-pro-profile')?.addEventListener('click', () => {
    if (state.savedProviders.includes(provider.id)) {
      state.savedProviders = state.savedProviders.filter(id => id !== provider.id);
      showToast('Saved Pros', 'Removed from saved list', 'info');
    } else {
      state.savedProviders.push(provider.id);
      showToast('Saved Pros', 'Saved to your profile', 'success');
    }
    renderProviderProfile();
  });

  // Tab Triggers
  document.querySelectorAll('[data-profile-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeProfileTab = btn.getAttribute('data-profile-tab');
      renderProviderProfile();
    });
  });

  // Open Booking Modal Triggers
  const openModal = () => {
    if (window.openBookingModal) {
      window.openBookingModal(provider);
    }
  };

  document.getElementById('btn-open-booking-modal-profile')?.addEventListener('click', openModal);
  document.getElementById('btn-sidebar-book-now')?.addEventListener('click', openModal);

  // Select service and open booking modal
  document.querySelectorAll('[data-select-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-select-service');
      const service = provider.services.find(s => s.id === sId);
      if (window.openBookingModal) {
        window.openBookingModal(provider, service);
      }
    });
  });
}

// INTERACTIVE STEP-BY-STEP BOOKING MODAL
window.openBookingModal = function(provider, defaultService = null) {
  state.bookingFlow = {
    provider: provider,
    selectedService: defaultService || provider.services[0],
    selectedDate: new Date().toISOString().split('T')[0],
    selectedTime: '10:00 AM',
    address: '742 Market Street, Apt 4B, San Francisco, CA',
    notes: '',
    step: 1
  };

  const modal = document.getElementById('booking-modal');
  modal.classList.remove('hidden');
  renderBookingModalStep();
};

function renderBookingModalStep() {
  const container = document.getElementById('booking-modal-container');
  const flow = state.bookingFlow;
  const p = flow.provider;

  const basePrice = flow.selectedService ? flow.selectedService.price : p.startingPrice;
  const serviceFee = 15;
  const tax = Math.round(basePrice * 0.08);
  const totalPrice = basePrice + serviceFee + tax;

  let stepHtml = '';

  if (flow.step === 1) {
    // Step 1: Select Service
    stepHtml = `
      <div class="space-y-6">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 1 of 5</span>
            <button onclick="document.getElementById('booking-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
          </div>
          <h2 class="text-xl font-black text-slate-900">Select Service Option</h2>
          <p class="text-xs text-slate-500">Booking with <span class="font-bold text-slate-800">${p.name}</span> (${p.profession})</p>
        </div>

        <div class="space-y-3">
          ${p.services.map(s => `
            <div data-choose-service="${s.id}" class="p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${flow.selectedService?.id === s.id ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:bg-slate-50'}">
              <div>
                <h4 class="font-bold text-xs text-slate-900">${s.name}</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">${s.description}</p>
                <span class="text-[10px] font-semibold text-slate-400 mt-1 block">${s.duration}</span>
              </div>
              <span class="text-sm font-black text-slate-900 shrink-0 ml-3">$${s.price}</span>
            </div>
          `).join('')}
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button id="btn-booking-next-1" class="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2">
            Next: Select Schedule <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  } else if (flow.step === 2) {
    // Step 2: Date & Time
    stepHtml = `
      <div class="space-y-6">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 2 of 5</span>
            <button onclick="document.getElementById('booking-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
          </div>
          <h2 class="text-xl font-black text-slate-900">Choose Date & Time</h2>
          <p class="text-xs text-slate-500">Selected service: <span class="font-bold text-slate-800">${flow.selectedService?.name}</span></p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Select Date</label>
            <input type="text" id="modal-date-picker" value="${flow.selectedDate}" class="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-2">Select Available Slot</label>
            <div class="grid grid-cols-3 gap-2 text-xs font-semibold">
              ${['09:00 AM', '10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM', '05:00 PM'].map(slot => `
                <button data-choose-time="${slot}" class="py-2.5 rounded-xl border text-center transition ${flow.selectedTime === slot ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">
                  ${slot}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <button id="btn-booking-prev" class="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition">
            Back
          </button>
          <button id="btn-booking-next-2" class="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2">
            Next: Details & Address <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  } else if (flow.step === 3) {
    // Step 3: Address & Notes
    stepHtml = `
      <div class="space-y-6">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 3 of 5</span>
            <button onclick="document.getElementById('booking-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
          </div>
          <h2 class="text-xl font-black text-slate-900">Service Location & Details</h2>
        </div>

        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Service Address</label>
            <input type="text" id="modal-input-address" value="${flow.address}" class="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Problem Description / Special Notes</label>
            <textarea id="modal-input-notes" rows="3" placeholder="Describe what needs to be done..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">${flow.notes}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <button id="btn-booking-prev" class="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition">
            Back
          </button>
          <button id="btn-booking-next-3" class="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2">
            Next: Price Breakdown <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  } else if (flow.step === 4) {
    // Step 4: Price Breakdown & Review
    stepHtml = `
      <div class="space-y-6">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 4 of 5</span>
            <button onclick="document.getElementById('booking-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
          </div>
          <h2 class="text-xl font-black text-slate-900">Review & Confirm Booking</h2>
        </div>

        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
          <div class="flex items-center gap-3 pb-3 border-b border-slate-200">
            <img src="${p.avatar}" class="w-10 h-10 rounded-xl object-cover">
            <div>
              <h4 class="font-bold text-slate-900">${p.name}</h4>
              <p class="text-indigo-600 font-medium">${flow.selectedService?.name}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div><span class="font-bold text-slate-800">Date:</span> ${flow.selectedDate}</div>
            <div><span class="font-bold text-slate-800">Time:</span> ${flow.selectedTime}</div>
            <div class="col-span-2"><span class="font-bold text-slate-800">Address:</span> ${flow.address}</div>
          </div>
        </div>

        <!-- Pricing Summary Table -->
        <div class="space-y-2 text-xs">
          <div class="flex justify-between text-slate-600">
            <span>Service Base Rate</span>
            <span class="font-bold text-slate-800">$${basePrice}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>Platform Service Fee</span>
            <span class="font-bold text-slate-800">$${serviceFee}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>Est. Tax & Insurance</span>
            <span class="font-bold text-slate-800">$${tax}</span>
          </div>
          <div class="border-t border-slate-200 pt-2 flex justify-between text-sm font-black text-slate-900">
            <span>Total Payable</span>
            <span class="text-indigo-600">$${totalPrice}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <button id="btn-booking-prev" class="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition">
            Back
          </button>
          <!-- BACKEND: Payment processing & Booking API -->
          <button id="btn-booking-submit" class="py-3 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2">
            <i data-lucide="lock" class="w-4 h-4"></i> Confirm & Reserve ($${totalPrice})
          </button>
        </div>
      </div>
    `;
  } else if (flow.step === 5) {
    // Step 5: Instant Confirmation
    stepHtml = `
      <div class="text-center py-6 space-y-4">
        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <i data-lucide="check-circle" class="w-10 h-10"></i>
        </div>
        <h2 class="text-2xl font-black text-slate-900">Booking Requested!</h2>
        <p class="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          Your booking request has been sent to <span class="font-bold text-slate-800">${p.name}</span>. You can track status and message the provider from your Customer Dashboard.
        </p>

        <div class="pt-4 flex justify-center gap-3">
          <button id="btn-booking-goto-dash" class="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition">
            Go to My Dashboard
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = stepHtml;
  lucide.createIcons();

  // Attach Step Navigation Listeners
  attachModalStepListeners(flow, p, totalPrice);
}

function attachModalStepListeners(flow, p, totalPrice) {
  // Service Picker
  document.querySelectorAll('[data-choose-service]').forEach(card => {
    card.addEventListener('click', () => {
      const sId = card.getAttribute('data-choose-service');
      flow.selectedService = p.services.find(s => s.id === sId);
      renderBookingModalStep();
    });
  });

  // Time Slot Picker
  document.querySelectorAll('[data-choose-time]').forEach(btn => {
    btn.addEventListener('click', () => {
      flow.selectedTime = btn.getAttribute('data-choose-time');
      renderBookingModalStep();
    });
  });

  // Flatpickr for step 2
  if (flow.step === 2 && window.flatpickr) {
    flatpickr('#modal-date-picker', {
      minDate: 'today',
      dateFormat: 'Y-m-d',
      onChange: function(selectedDates, dateStr) {
        flow.selectedDate = dateStr;
      }
    });
  }

  // Next / Prev Buttons
  document.getElementById('btn-booking-prev')?.addEventListener('click', () => {
    flow.step -= 1;
    renderBookingModalStep();
  });

  document.getElementById('btn-booking-next-1')?.addEventListener('click', () => {
    flow.step = 2;
    renderBookingModalStep();
  });

  document.getElementById('btn-booking-next-2')?.addEventListener('click', () => {
    flow.step = 3;
    renderBookingModalStep();
  });

  document.getElementById('btn-booking-next-3')?.addEventListener('click', () => {
    flow.address = document.getElementById('modal-input-address').value;
    flow.notes = document.getElementById('modal-input-notes').value;
    flow.step = 4;
    renderBookingModalStep();
  });

  // Submit Final Booking
  document.getElementById('btn-booking-submit')?.addEventListener('click', () => {
    // BACKEND: Booking API & Payment processing
    const newBk = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      providerId: p.id,
      providerName: p.name,
      providerProfession: p.profession,
      providerAvatar: p.avatar,
      serviceName: flow.selectedService ? flow.selectedService.name : p.title,
      date: flow.selectedDate,
      time: flow.selectedTime,
      status: 'Confirmed',
      totalPrice: totalPrice,
      address: flow.address,
      notes: flow.notes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    state.bookings.unshift(newBk);
    flow.step = 5;
    renderBookingModalStep();
    showToast('Booking Confirmed!', `Service reserved with ${p.name}`);
  });

  document.getElementById('btn-booking-goto-dash')?.addEventListener('click', () => {
    document.getElementById('booking-modal').classList.add('hidden');
    setView('customer-dash');
  });
}
