/**
 * ServiceHub - Marketplace & Interactive Leaflet Map Component
 */
import { mockCategories, mockProviders } from './data.js';
import { state, setView, showToast } from './app.js';
import { renderProviderCardHtml } from './homepage.js';

let leafletMap = null;
let mapMarkers = [];

export function renderMarketplace() {
  const container = document.getElementById('app-content');
  if (!container) return;

  // BACKEND: Geolocation/search API & Provider database
  const filteredPros = filterProviders();

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- TOP SEARCH SUMMARY & SEARCH BAR -->
      <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">Services Marketplace</h1>
            <p class="text-xs text-slate-500 mt-1">
              Showing <span class="font-bold text-indigo-600">${filteredPros.length} verified pros</span> around <span class="font-semibold text-slate-700">${state.activeFilter.locationQuery}</span>
            </p>
          </div>

          <!-- Quick Active Filter Chips -->
          <div class="flex flex-wrap items-center gap-2">
            ${state.activeFilter.category !== 'all' ? `
              <span class="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-full flex items-center gap-1.5">
                Category: ${mockCategories.find(c => c.id === state.activeFilter.category)?.name || state.activeFilter.category}
                <button id="chip-clear-cat" class="hover:text-indigo-900"><i data-lucide="x" class="w-3 h-3"></i></button>
              </span>
            ` : ''}

            ${state.activeFilter.emergencyOnly ? `
              <span class="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-full flex items-center gap-1.5">
                <i data-lucide="zap" class="w-3 h-3 fill-amber-400"></i> Emergency 24/7
                <button id="chip-clear-emergency" class="hover:text-amber-900"><i data-lucide="x" class="w-3 h-3"></i></button>
              </span>
            ` : ''}

            ${state.activeFilter.searchQuery ? `
              <span class="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-full flex items-center gap-1.5">
                Search: "${state.activeFilter.searchQuery}"
                <button id="chip-clear-search" class="hover:text-slate-900"><i data-lucide="x" class="w-3 h-3"></i></button>
              </span>
            ` : ''}

            <button id="btn-reset-all-filters" class="text-xs font-semibold text-slate-500 hover:text-rose-600 underline ml-2">
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Inline Quick Query Bar -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div class="md:col-span-6 relative">
            <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"></i>
            <input type="text" id="market-search-input" value="${state.activeFilter.searchQuery}" placeholder="Search profession, skill, or service..." class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </div>
          <div class="md:col-span-4 relative">
            <i data-lucide="map-pin" class="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400"></i>
            <input type="text" id="market-location-input" value="${state.activeFilter.locationQuery}" placeholder="Location or ZIP" class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          </div>
          <div class="md:col-span-2">
            <button id="market-apply-search" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl transition shadow">
              Update Search
            </button>
          </div>
        </div>
      </div>

      <!-- MAIN MARKETPLACE LAYOUT (Left Filters Sidebar + Right Cards & Map Area) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- LEFT SIDEBAR: FILTERS -->
        <aside class="lg:col-span-3 bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 class="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="sliders-horizontal" class="w-4 h-4 text-indigo-600"></i> Filters
            </h3>
            <span class="text-[11px] font-semibold text-slate-400">${filteredPros.length} Results</span>
          </div>

          <!-- 1. Service Category -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Service Category</label>
            <select id="filter-category-select" class="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Categories (${mockProviders.length})</option>
              ${mockCategories.map(c => `
                <option value="${c.id}" ${state.activeFilter.category === c.id ? 'selected' : ''}>${c.name}</option>
              `).join('')}
            </select>
          </div>

          <!-- 2. Price Range Slider -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700">
              <label class="uppercase tracking-wider">Max Price</label>
              <span id="price-slider-val" class="text-indigo-600">$${state.activeFilter.priceMax}/hr</span>
            </div>
            <input type="range" id="filter-price-range" min="30" max="300" step="10" value="${state.activeFilter.priceMax}" class="w-full accent-indigo-600 cursor-pointer">
            <div class="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>$30</span>
              <span>$150</span>
              <span>$300+</span>
            </div>
          </div>

          <!-- 3. Minimum Rating -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Minimum Rating</label>
            <div class="grid grid-cols-4 gap-1.5 text-xs">
              ${[0, 4.0, 4.5, 4.8].map(r => `
                <button data-filter-rating="${r}" class="py-1.5 px-2 rounded-xl font-bold border ${state.activeFilter.minRating === r ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} transition flex items-center justify-center gap-1">
                  ${r === 0 ? 'Any' : `${r}<i data-lucide="star" class="w-2.5 h-2.5 fill-amber-400"></i>`}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 4. Max Distance Slider -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700">
              <label class="uppercase tracking-wider">Distance Radius</label>
              <span id="distance-slider-val" class="text-indigo-600">${state.activeFilter.distanceKm} km</span>
            </div>
            <input type="range" id="filter-distance-range" min="1" max="50" step="1" value="${state.activeFilter.distanceKm}" class="w-full accent-indigo-600 cursor-pointer">
          </div>

          <!-- 5. Toggles (Verified, Instant Booking, Emergency) -->
          <div class="space-y-3 pt-2 border-t border-slate-100">
            <label class="flex items-center justify-between cursor-pointer">
              <span class="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600"></i> Verified Pros Only
              </span>
              <input type="checkbox" id="filter-verified-toggle" ${state.activeFilter.verifiedOnly ? 'checked' : ''} class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer">
            </label>

            <label class="flex items-center justify-between cursor-pointer">
              <span class="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <i data-lucide="zap" class="w-3.5 h-3.5 text-indigo-600"></i> Instant Booking Only
              </span>
              <input type="checkbox" id="filter-instant-toggle" ${state.activeFilter.instantBooking ? 'checked' : ''} class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer">
            </label>

            <label class="flex items-center justify-between cursor-pointer">
              <span class="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-amber-600"></i> 24/7 Emergency Pros
              </span>
              <input type="checkbox" id="filter-emergency-toggle" ${state.activeFilter.emergencyOnly ? 'checked' : ''} class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer">
            </label>
          </div>
        </aside>

        <!-- RIGHT MAIN MARKETPLACE CONTENT AREA -->
        <main class="lg:col-span-9 space-y-6">

          <!-- SORT & MAP / GRID CONTROLS BAR -->
          <div class="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">

            <div class="flex items-center gap-3 text-xs">
              <span class="font-bold text-slate-500 uppercase tracking-wider">Sort By:</span>
              <select id="market-sort-select" class="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="distance">Nearest Distance</option>
              </select>
            </div>

            <!-- View Toggle Button (Show / Hide Split Map) -->
            <button id="btn-toggle-map" class="py-1.5 px-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition flex items-center gap-2 border border-indigo-200/80">
              <i data-lucide="map" class="w-4 h-4"></i>
              <span id="toggle-map-label">Hide Map</span>
            </button>
          </div>

          <!-- MAP & CARDS CONTAINER -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="market-layout-wrapper">

            <!-- Cards Grid -->
            <div class="lg:col-span-7 space-y-4" id="cards-container">
              ${filteredPros.length > 0 ? `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  ${filteredPros.map(p => renderProviderCardHtml(p)).join('')}
                </div>
              ` : `
                <div class="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                  <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <i data-lucide="search-x" class="w-6 h-6"></i>
                  </div>
                  <h3 class="font-bold text-slate-800 text-base">No matching professionals found</h3>
                  <p class="text-xs text-slate-500 max-w-sm mx-auto">Try broadening your price range, distance, or resetting selected filters.</p>
                </div>
              `}
            </div>

            <!-- Leaflet Interactive Map Area -->
            <div class="lg:col-span-5 sticky top-20" id="map-container-wrapper">
              <div class="bg-white rounded-3xl p-2 border border-slate-200 shadow-sm overflow-hidden">
                <div id="leaflet-map" class="w-full h-[520px] rounded-2xl z-10"></div>
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  `;

  // Attach Event Listeners
  attachMarketplaceEvents(filteredPros);
  // Initialize Interactive Leaflet Map
  initLeafletMap(filteredPros);
}

// Filter Logic Helper
function filterProviders() {
  return mockProviders.filter(p => {
    // Category Filter
    if (state.activeFilter.category !== 'all' && p.categoryId !== state.activeFilter.category) {
      return false;
    }
    // Search Query Filter
    if (state.activeFilter.searchQuery) {
      const q = state.activeFilter.searchQuery.toLowerCase();
      const match = p.name.toLowerCase().includes(q) ||
                    p.profession.toLowerCase().includes(q) ||
                    p.title.toLowerCase().includes(q) ||
                    p.services.some(s => s.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    // Price Range Filter
    if (p.startingPrice > state.activeFilter.priceMax) return false;
    // Rating Filter
    if (p.rating < state.activeFilter.minRating) return false;
    // Distance Filter
    if (p.distanceKm > state.activeFilter.distanceKm) return false;
    // Verified Only
    if (state.activeFilter.verifiedOnly && !p.verified) return false;
    // Instant Booking Only
    if (state.activeFilter.instantBooking && !p.instantBooking) return false;
    // Emergency Only
    if (state.activeFilter.emergencyOnly && !p.emergency) return false;

    return true;
  });
}

function attachMarketplaceEvents(filteredPros) {
  // Category Select Filter
  const catSelect = document.getElementById('filter-category-select');
  catSelect?.addEventListener('change', (e) => {
    state.activeFilter.category = e.target.value;
    renderMarketplace();
  });

  // Price Range Slider
  const priceRange = document.getElementById('filter-price-range');
  priceRange?.addEventListener('input', (e) => {
    state.activeFilter.priceMax = parseInt(e.target.value);
    document.getElementById('price-slider-val').textContent = `$${state.activeFilter.priceMax}/hr`;
  });
  priceRange?.addEventListener('change', () => renderMarketplace());

  // Rating Filter Buttons
  document.querySelectorAll('[data-filter-rating]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeFilter.minRating = parseFloat(btn.getAttribute('data-filter-rating'));
      renderMarketplace();
    });
  });

  // Distance Range Slider
  const distRange = document.getElementById('filter-distance-range');
  distRange?.addEventListener('input', (e) => {
    state.activeFilter.distanceKm = parseInt(e.target.value);
    document.getElementById('distance-slider-val').textContent = `${state.activeFilter.distanceKm} km`;
  });
  distRange?.addEventListener('change', () => renderMarketplace());

  // Toggles
  document.getElementById('filter-verified-toggle')?.addEventListener('change', (e) => {
    state.activeFilter.verifiedOnly = e.target.checked;
    renderMarketplace();
  });
  document.getElementById('filter-instant-toggle')?.addEventListener('change', (e) => {
    state.activeFilter.instantBooking = e.target.checked;
    renderMarketplace();
  });
  document.getElementById('filter-emergency-toggle')?.addEventListener('change', (e) => {
    state.activeFilter.emergencyOnly = e.target.checked;
    renderMarketplace();
  });

  // Search & Location Inputs
  document.getElementById('market-apply-search')?.addEventListener('click', () => {
    state.activeFilter.searchQuery = document.getElementById('market-search-input').value.trim();
    state.activeFilter.locationQuery = document.getElementById('market-location-input').value.trim();
    renderMarketplace();
  });

  // Filter Chips Reset
  document.getElementById('chip-clear-cat')?.addEventListener('click', () => {
    state.activeFilter.category = 'all';
    renderMarketplace();
  });
  document.getElementById('chip-clear-emergency')?.addEventListener('click', () => {
    state.activeFilter.emergencyOnly = false;
    renderMarketplace();
  });
  document.getElementById('chip-clear-search')?.addEventListener('click', () => {
    state.activeFilter.searchQuery = '';
    renderMarketplace();
  });
  document.getElementById('btn-reset-all-filters')?.addEventListener('click', () => {
    state.activeFilter = {
      category: 'all',
      priceMax: 200,
      minRating: 0,
      distanceKm: 20,
      verifiedOnly: false,
      instantBooking: false,
      emergencyOnly: false,
      searchQuery: '',
      locationQuery: 'San Francisco, CA',
      dateQuery: ''
    };
    renderMarketplace();
  });

  // View Toggle Map Button
  const toggleMapBtn = document.getElementById('btn-toggle-map');
  const mapWrapper = document.getElementById('map-container-wrapper');
  const cardsWrapper = document.getElementById('cards-container');

  toggleMapBtn?.addEventListener('click', () => {
    if (mapWrapper.classList.contains('hidden')) {
      mapWrapper.classList.remove('hidden');
      cardsWrapper.className = 'lg:col-span-7 space-y-4';
      document.getElementById('toggle-map-label').textContent = 'Hide Map';
      if (leafletMap) setTimeout(() => leafletMap.invalidateSize(), 100);
    } else {
      mapWrapper.classList.add('hidden');
      cardsWrapper.className = 'lg:col-span-12 space-y-4';
      document.getElementById('toggle-map-label').textContent = 'Show Map';
    }
  });

  // Card View Profile & Book Buttons
  document.querySelectorAll('[data-view-pro]').forEach(btn => {
    btn.addEventListener('click', () => {
      const proId = btn.getAttribute('data-view-pro');
      const pro = mockProviders.find(p => p.id === proId);
      if (pro) setView('profile', { provider: pro });
    });
  });

  document.querySelectorAll('[data-quick-book]').forEach(btn => {
    btn.addEventListener('click', () => {
      const proId = btn.getAttribute('data-quick-book');
      const pro = mockProviders.find(p => p.id === proId);
      if (pro && window.openBookingModal) {
        window.openBookingModal(pro);
      }
    });
  });
}

// Leaflet Map Initialization
function initLeafletMap(providers) {
  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl || !window.L) return;

  if (leafletMap) {
    leafletMap.remove();
    leafletMap = null;
  }

  // Default SF Center
  const defaultLat = 37.7749;
  const defaultLng = -122.4194;

  leafletMap = L.map('leaflet-map').setView([defaultLat, defaultLng], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(leafletMap);

  mapMarkers = [];

  providers.forEach(p => {
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div class="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] px-2 py-1 rounded-xl shadow-lg border-2 border-white flex items-center gap-1 cursor-pointer transition hover:scale-110">
          <span>$${p.startingPrice}</span>
        </div>
      `,
      iconSize: [42, 28],
      iconAnchor: [21, 28]
    });

    const marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(leafletMap);

    const popupHtml = `
      <div class="p-1 max-w-[200px]">
        <img src="${p.coverImage}" class="w-full h-20 rounded-lg object-cover mb-2">
        <h4 class="font-bold text-xs text-slate-900">${p.name}</h4>
        <p class="text-[10px] text-indigo-600 font-semibold">${p.profession}</p>
        <div class="flex items-center justify-between text-[11px] mt-1">
          <span class="font-bold text-amber-500">★ ${p.rating}</span>
          <span class="font-black">$${p.startingPrice}/hr</span>
        </div>
        <button onclick="window.location.hash='pro=${p.id}'" id="map-btn-${p.id}" class="w-full mt-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg text-center block">
          View Profile
        </button>
      </div>
    `;

    marker.bindPopup(popupHtml);
    mapMarkers.push(marker);
  });

  // Fit bounds if markers exist
  if (mapMarkers.length > 0) {
    const group = new L.featureGroup(mapMarkers);
    leafletMap.fitBounds(group.getBounds().pad(0.2));
  }
}
