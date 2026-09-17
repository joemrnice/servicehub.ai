/**
 * ServiceHub - Core Application Controller & State
 */
import {
  mockCategories,
  mockPromotions,
  mockProviders,
  initialBookings,
  initialProviderRequests,
  initialMessages,
  initialNotifications
} from './data.js';

import { renderHomepage } from './homepage.js';
import { renderMarketplace } from './marketplace.js';
import { renderProviderProfile } from './profile.js';
import { renderCustomerDashboard, renderProviderDashboard } from './dashboards.js';

// Application State Object
export const state = {
  currentRole: 'customer', // 'customer' | 'provider'
  currentView: 'home', // 'home' | 'marketplace' | 'profile' | 'customer-dash' | 'provider-dash'
  selectedCategory: null,
  selectedProvider: null,
  activeFilter: {
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
  },
  savedProviders: ['pro-1', 'pro-3'],
  recentlyViewed: ['pro-1', 'pro-2'],
  bookings: [...initialBookings],
  providerRequests: [...initialProviderRequests],
  messages: [...initialMessages],
  notifications: [...initialNotifications],
  bookingFlow: {
    provider: null,
    selectedService: null,
    selectedDate: '',
    selectedTime: '',
    address: '742 Market Street, San Francisco, CA',
    notes: '',
    step: 1
  }
};

// UI Element References
const appContent = document.getElementById('app-content');
const roleCustomerBtn = document.getElementById('role-customer-btn');
const roleProviderBtn = document.getElementById('role-provider-btn');

// View Renderer Engine
export function renderApp() {
  updateHeaderActiveNav();
  if (state.currentRole === 'provider') {
    renderProviderDashboard();
  } else {
    switch (state.currentView) {
      case 'home':
        renderHomepage();
        break;
      case 'marketplace':
        renderMarketplace();
        break;
      case 'profile':
        renderProviderProfile();
        break;
      case 'customer-dash':
        renderCustomerDashboard();
        break;
      default:
        renderHomepage();
    }
  }
  lucide.createIcons();
}

// Navigation Highlights Helper
function updateHeaderActiveNav() {
  const navHome = document.getElementById('nav-home');
  const navSearch = document.getElementById('nav-search');

  if (navHome && navSearch) {
    navHome.className = 'px-3.5 py-2 rounded-xl transition font-medium hover:bg-slate-100 text-slate-600';
    navSearch.className = 'px-3.5 py-2 rounded-xl transition font-medium hover:bg-slate-100 text-slate-600';

    if (state.currentRole === 'customer') {
      if (state.currentView === 'home') {
        navHome.className = 'px-3.5 py-2 rounded-xl transition font-semibold text-indigo-600 bg-indigo-50';
      } else if (state.currentView === 'marketplace') {
        navSearch.className = 'px-3.5 py-2 rounded-xl transition font-semibold text-indigo-600 bg-indigo-50';
      }
    }
  }

  // Update Saved Badge
  const savedBadge = document.getElementById('saved-badge');
  if (savedBadge) {
    savedBadge.textContent = state.savedProviders.length;
  }
}

// Global Toast Notification Helper
export function showToast(title, message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-indigo-600';

  toast.className = `${bgColor} text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 toast-animate pointer-events-auto min-w-[280px] max-w-sm`;
  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
      <i data-lucide="${type === 'success' ? 'check' : type === 'error' ? 'alert-triangle' : 'info'}" class="w-4 h-4"></i>
    </div>
    <div class="flex-1 text-xs">
      <p class="font-bold">${title}</p>
      <p class="text-white/90 mt-0.5">${message}</p>
    </div>
  `;
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Navigation Triggers
export function setView(viewName, payload = null) {
  state.currentView = viewName;
  if (payload) {
    if (payload.provider) {
      state.selectedProvider = payload.provider;
      if (!state.recentlyViewed.includes(payload.provider.id)) {
        state.recentlyViewed.unshift(payload.provider.id);
      }
    }
    if (payload.category) state.activeFilter.category = payload.category;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

export function setRole(role) {
  state.currentRole = role;
  if (role === 'provider') {
    roleProviderBtn.className = 'px-3 py-1.5 rounded-lg bg-indigo-600 text-white shadow-sm transition font-bold flex items-center gap-1.5';
    roleCustomerBtn.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5';
    showToast('Switched Mode', 'Now viewing as Service Provider', 'info');
  } else {
    roleCustomerBtn.className = 'px-3 py-1.5 rounded-lg bg-white text-indigo-700 shadow-sm transition font-bold flex items-center gap-1.5';
    roleProviderBtn.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5';
    showToast('Switched Mode', 'Now viewing as Customer', 'info');
  }
  renderApp();
}

// Global Event Listeners Setup
document.addEventListener('DOMContentLoaded', () => {
  roleCustomerBtn.addEventListener('click', () => setRole('customer'));
  roleProviderBtn.addEventListener('click', () => setRole('provider'));

  document.getElementById('nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    setRole('customer');
    setView('home');
  });

  document.getElementById('nav-home').addEventListener('click', () => {
    setRole('customer');
    setView('home');
  });

  document.getElementById('nav-search').addEventListener('click', () => {
    setRole('customer');
    setView('marketplace');
  });

  document.getElementById('nav-emergency').addEventListener('click', () => {
    setRole('customer');
    state.activeFilter.emergencyOnly = true;
    setView('marketplace');
  });

  document.getElementById('btn-customer-dash').addEventListener('click', () => {
    setRole('customer');
    setView('customer-dash');
  });

  document.getElementById('btn-saved-pros').addEventListener('click', () => {
    setRole('customer');
    setView('customer-dash');
  });

  // Mobile Menu Drawer Toggles
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuDrawer.classList.toggle('hidden');
  });

  document.getElementById('mobile-nav-home').addEventListener('click', () => {
    mobileMenuDrawer.classList.add('hidden');
    setRole('customer');
    setView('home');
  });
  document.getElementById('mobile-nav-search').addEventListener('click', () => {
    mobileMenuDrawer.classList.add('hidden');
    setRole('customer');
    setView('marketplace');
  });
  document.getElementById('mobile-nav-emergency').addEventListener('click', () => {
    mobileMenuDrawer.classList.add('hidden');
    setRole('customer');
    state.activeFilter.emergencyOnly = true;
    setView('marketplace');
  });
  document.getElementById('mobile-nav-dash').addEventListener('click', () => {
    mobileMenuDrawer.classList.add('hidden');
    setRole('customer');
    setView('customer-dash');
  });

  // Notifications Drawer Toggles
  const notifDrawer = document.getElementById('notifications-drawer');
  document.getElementById('btn-notifications').addEventListener('click', () => {
    renderNotifications();
    notifDrawer.classList.remove('hidden');
  });
  document.getElementById('btn-close-notif').addEventListener('click', () => {
    notifDrawer.classList.add('hidden');
  });
  document.getElementById('notif-backdrop').addEventListener('click', () => {
    notifDrawer.classList.add('hidden');
  });

  // Location Modal Toggles
  const locationModal = document.getElementById('location-modal');
  const changeLocBtn = document.getElementById('btn-change-location');
  const closeLocBtn = document.getElementById('btn-close-location');
  const saveLocBtn = document.getElementById('btn-save-location');
  const detectLocBtn = document.getElementById('btn-detect-location');

  changeLocBtn.addEventListener('click', () => locationModal.classList.remove('hidden'));
  closeLocBtn.addEventListener('click', () => locationModal.classList.add('hidden'));
  document.getElementById('location-backdrop').addEventListener('click', () => locationModal.classList.add('hidden'));

  saveLocBtn.addEventListener('click', () => {
    const newLoc = document.getElementById('input-location-modal').value.trim();
    if (newLoc) {
      state.activeFilter.locationQuery = newLoc;
      document.getElementById('current-location-text').textContent = newLoc;
      locationModal.classList.add('hidden');
      showToast('Location Updated', `Services mapped for ${newLoc}`);
      if (state.currentView === 'marketplace') renderMarketplace();
    }
  });

  detectLocBtn.addEventListener('click', () => {
    // BACKEND: Geolocation/search API
    detectLocBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Detecting GPS...`;
    lucide.createIcons();
    setTimeout(() => {
      document.getElementById('input-location-modal').value = 'San Francisco, CA';
      detectLocBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> Location Detected`;
      lucide.createIcons();
    }, 800);
  });

  // Hash Navigation Handler
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#pro=')) {
      const pId = hash.replace('#pro=', '');
      const p = mockProviders.find(pro => pro.id === pId);
      if (p) setView('profile', { provider: p });
    }
  });

  // Initial Load
  renderApp();
});

function renderNotifications() {
  const notifList = document.getElementById('notifications-list');
  notifList.innerHTML = state.notifications.map(n => `
    <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 hover:bg-slate-100/80 transition">
      <div class="w-8 h-8 rounded-full ${n.read ? 'bg-slate-200 text-slate-600' : 'bg-indigo-100 text-indigo-600'} flex items-center justify-center shrink-0">
        <i data-lucide="bell" class="w-4 h-4"></i>
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-xs text-slate-900">${n.title}</h4>
        <p class="text-xs text-slate-600 mt-0.5">${n.text}</p>
        <span class="text-[10px] text-slate-400 mt-1 block">${n.time}</span>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}
