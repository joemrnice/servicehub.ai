/**
 * ServiceHub - Customer & Provider Dashboard Component
 */
import { mockProviders, mockCategories } from './data.js';
import { state, setView, showToast } from './app.js';
import { renderProviderCardHtml } from './homepage.js';

let activeDashTab = 'upcoming'; // 'upcoming' | 'past' | 'saved' | 'messages'

export function renderCustomerDashboard() {
  const container = document.getElementById('app-content');
  if (!container) return;

  const upcomingBookings = state.bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  const pastBookings = state.bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');
  const savedPros = mockProviders.filter(p => state.savedProviders.includes(p.id));

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      <!-- DASHBOARD HEADER -->
      <div class="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/80 text-indigo-200 text-xs font-bold">
            <i data-lucide="user" class="w-3.5 h-3.5"></i> Customer Portal
          </div>
          <h1 class="text-2xl sm:text-3xl font-black">Welcome back, Alex!</h1>
          <p class="text-xs sm:text-sm text-indigo-200">Manage your active service bookings, messages, and saved professionals.</p>
        </div>

        <button id="btn-dash-find-pro" class="px-5 py-3 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs rounded-2xl shadow-md transition flex items-center gap-2 shrink-0">
          <i data-lucide="search" class="w-4 h-4 text-indigo-600"></i> Book New Service
        </button>
      </div>

      <!-- STATS SUMMARY CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block">Upcoming Bookings</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block">${upcomingBookings.length}</span>
          </div>
          <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <i data-lucide="calendar" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block">Past Completed</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block">${pastBookings.length}</span>
          </div>
          <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <i data-lucide="check-circle" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider block">Saved Pros</span>
            <span class="text-2xl font-black text-slate-900 mt-1 block">${savedPros.length}</span>
          </div>
          <div class="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <i data-lucide="heart" class="w-5 h-5"></i>
          </div>
        </div>
      </div>

      <!-- DASHBOARD TABS -->
      <div class="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px text-sm font-bold">
        <button data-dash-tab="upcoming" class="px-4 py-3 border-b-2 transition flex items-center gap-2 shrink-0 ${activeDashTab === 'upcoming' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
          <i data-lucide="clock" class="w-4 h-4"></i> Upcoming (${upcomingBookings.length})
        </button>
        <button data-dash-tab="past" class="px-4 py-3 border-b-2 transition flex items-center gap-2 shrink-0 ${activeDashTab === 'past' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
          <i data-lucide="history" class="w-4 h-4"></i> Past History (${pastBookings.length})
        </button>
        <button data-dash-tab="saved" class="px-4 py-3 border-b-2 transition flex items-center gap-2 shrink-0 ${activeDashTab === 'saved' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
          <i data-lucide="heart" class="w-4 h-4"></i> Saved Pros (${savedPros.length})
        </button>
        <button data-dash-tab="messages" class="px-4 py-3 border-b-2 transition flex items-center gap-2 shrink-0 ${activeDashTab === 'messages' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
          <i data-lucide="message-square" class="w-4 h-4"></i> Messages (${state.messages.length})
        </button>
      </div>

      <!-- TAB CONTENT AREA -->
      <div id="dash-tab-content">
        ${renderCustomerTabContent(upcomingBookings, pastBookings, savedPros)}
      </div>

    </div>
  `;

  attachCustomerDashEvents();
}

function renderCustomerTabContent(upcoming, past, saved) {
  if (activeDashTab === 'past') {
    return `
      <div class="space-y-4">
        ${past.length > 0 ? past.map(b => renderBookingItemCard(b, false)).join('') : `
          <div class="bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-400 text-xs font-semibold">No past completed bookings yet.</div>
        `}
      </div>
    `;
  }

  if (activeDashTab === 'saved') {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${saved.length > 0 ? saved.map(p => renderProviderCardHtml(p)).join('') : `
          <div class="col-span-full bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-400 text-xs font-semibold">No saved professionals yet.</div>
        `}
      </div>
    `;
  }

  if (activeDashTab === 'messages') {
    return `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
        <!-- Contact List -->
        <div class="md:col-span-4 border-r border-slate-200 p-4 space-y-3 bg-slate-50">
          <h3 class="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">Conversations</h3>
          ${state.messages.map((m, idx) => `
            <div class="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:border-indigo-300 transition ${idx === 0 ? 'ring-2 ring-indigo-500/20' : ''}">
              <img src="${m.contactAvatar}" class="w-9 h-9 rounded-full object-cover">
              <div class="flex-1 overflow-hidden">
                <h4 class="font-bold text-xs text-slate-900">${m.contactName}</h4>
                <p class="text-[11px] text-slate-500 truncate mt-0.5">${m.history[m.history.length - 1]?.text}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Chat Window -->
        <div class="md:col-span-8 p-6 flex flex-col justify-between space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <img src="${state.messages[0]?.contactAvatar}" class="w-9 h-9 rounded-full object-cover">
              <div>
                <h4 class="font-bold text-xs text-slate-900">${state.messages[0]?.contactName}</h4>
                <span class="text-[10px] text-emerald-600 font-semibold flex items-center gap-1"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Online</span>
              </div>
            </div>
          </div>

          <!-- Messages History -->
          <!-- BACKEND: Real-time messaging -->
          <div class="flex-1 space-y-3 overflow-y-auto max-h-[300px] text-xs">
            ${state.messages[0]?.history.map(h => `
              <div class="flex ${h.sender === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[80%] p-3 rounded-2xl ${h.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'} space-y-1">
                  <p>${h.text}</p>
                  <span class="text-[9px] block text-right opacity-70">${h.time}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Send Message Input -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
            <input type="text" id="chat-input-text" placeholder="Type a message to provider..." class="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <button id="btn-send-chat" class="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow transition">
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Default 'upcoming' Tab
  return `
    <div class="space-y-4">
      ${upcoming.length > 0 ? upcoming.map(b => renderBookingItemCard(b, true)).join('') : `
        <div class="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-3">
          <i data-lucide="calendar-x" class="w-8 h-8 text-slate-400 mx-auto"></i>
          <h3 class="font-bold text-slate-800 text-sm">No upcoming bookings scheduled</h3>
          <p class="text-xs text-slate-500">Browse available service professionals and book in seconds.</p>
        </div>
      `}
    </div>
  `;
}

function renderBookingItemCard(b, isUpcoming) {
  return `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-start gap-4">
        <img src="${b.providerAvatar}" class="w-12 h-12 rounded-2xl object-cover shrink-0">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'}">${b.status}</span>
            <span class="text-xs text-slate-400 font-mono">#${b.id}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-sm">${b.serviceName}</h4>
          <p class="text-xs text-slate-500">Provider: <span class="font-semibold text-slate-800">${b.providerName}</span> (${b.providerProfession})</p>
          <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
            <span class="flex items-center gap-1 font-semibold text-slate-700"><i data-lucide="calendar" class="w-3.5 h-3.5 text-indigo-600"></i> ${b.date} at ${b.time}</span>
            <span>•</span>
            <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-indigo-600"></i> ${b.address}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0 border-slate-100">
        <div class="text-right">
          <span class="text-[10px] text-slate-400 block font-medium">Total Paid</span>
          <span class="text-base font-black text-slate-900">$${b.totalPrice}</span>
        </div>

        ${isUpcoming ? `
          <button data-cancel-booking="${b.id}" class="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition border border-rose-200/60">
            Cancel
          </button>
        ` : `
          <button data-rebook-pro="${b.providerId}" class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition border border-indigo-200/60">
            Book Again
          </button>
        `}
      </div>
    </div>
  `;
}

function attachCustomerDashEvents() {
  document.getElementById('btn-dash-find-pro')?.addEventListener('click', () => setView('marketplace'));

  // Dash Tab Switcher
  document.querySelectorAll('[data-dash-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeDashTab = btn.getAttribute('data-dash-tab');
      renderCustomerDashboard();
    });
  });

  // Cancel Booking
  document.querySelectorAll('[data-cancel-booking]').forEach(btn => {
    btn.addEventListener('click', () => {
      const bId = btn.getAttribute('data-cancel-booking');
      state.bookings = state.bookings.filter(b => b.id !== bId);
      showToast('Booking Cancelled', 'Booking removed from schedule', 'info');
      renderCustomerDashboard();
    });
  });

  // Chat Send Listener
  document.getElementById('btn-send-chat')?.addEventListener('click', () => {
    const input = document.getElementById('chat-input-text');
    if (input && input.value.trim()) {
      state.messages[0].history.push({
        sender: 'user',
        text: input.value.trim(),
        time: 'Just now'
      });
      input.value = '';
      renderCustomerDashboard();
    }
  });
}


// PROVIDER-SIDE DASHBOARD INTERFACE
export function renderProviderDashboard() {
  const container = document.getElementById('app-content');
  if (!container) return;

  const requests = state.providerRequests;

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      <!-- PROVIDER HEADER BANNER -->
      <div class="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div class="flex items-center gap-4">
          <img src="${mockProviders[0].avatar}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-black">${mockProviders[0].name}</h1>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold">Online & Accepting Jobs</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${mockProviders[0].title}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 w-full md:w-auto">
          <div class="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-xs">
            <span class="text-slate-400 block font-medium">This Week's Earnings</span>
            <span class="text-lg font-black text-emerald-400 mt-0.5 block">$1,480.00</span>
          </div>
        </div>
      </div>

      <!-- ANALYTICS CHART & JOBS SCHEDULE GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- LEFT: EARNINGS ANALYTICS CHART -->
        <div class="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="trending-up" class="w-4 h-4 text-indigo-600"></i> Weekly Revenue Analytics
            </h3>
            <span class="text-xs text-slate-400 font-semibold">+18% vs last week</span>
          </div>
          <div class="h-64 relative">
            <canvas id="provider-earnings-chart"></canvas>
          </div>
        </div>

        <!-- RIGHT: PENDING BOOKING REQUESTS -->
        <div class="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 class="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <i data-lucide="inbox" class="w-4 h-4 text-indigo-600"></i> Incoming Job Requests (${requests.length})
            </h3>
          </div>

          <div class="space-y-3">
            ${requests.length > 0 ? requests.map(req => `
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <img src="${req.customerAvatar}" class="w-8 h-8 rounded-full object-cover">
                    <div>
                      <h4 class="font-bold text-xs text-slate-900">${req.customerName}</h4>
                      <p class="text-[10px] text-slate-500">${req.address}</p>
                    </div>
                  </div>
                  <span class="text-sm font-black text-emerald-600">$${req.price}</span>
                </div>

                <div class="p-2.5 bg-white rounded-xl border border-slate-200/80 text-[11px] text-slate-700 space-y-1">
                  <div class="font-bold text-indigo-600">${req.serviceName}</div>
                  <div class="text-slate-500"><span class="font-semibold text-slate-800">Schedule:</span> ${req.date} at ${req.time}</div>
                  <div class="text-slate-500 italic">"${req.notes}"</div>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-1">
                  <button data-decline-req="${req.id}" class="py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition">
                    Decline
                  </button>
                  <button data-accept-req="${req.id}" class="py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow">
                    Accept Job
                  </button>
                </div>
              </div>
            `).join('') : `
              <div class="p-8 text-center text-xs text-slate-400 font-semibold">No pending requests at the moment.</div>
            `}
          </div>
        </div>

      </div>

    </div>
  `;

  attachProviderDashEvents();
  initEarningsChart();
}

function attachProviderDashEvents() {
  // Accept Request
  document.querySelectorAll('[data-accept-req]').forEach(btn => {
    btn.addEventListener('click', () => {
      const rId = btn.getAttribute('data-accept-req');
      state.providerRequests = state.providerRequests.filter(r => r.id !== rId);
      showToast('Job Accepted!', 'Added to your active schedule', 'success');
      renderProviderDashboard();
    });
  });

  // Decline Request
  document.querySelectorAll('[data-decline-req]').forEach(btn => {
    btn.addEventListener('click', () => {
      const rId = btn.getAttribute('data-decline-req');
      state.providerRequests = state.providerRequests.filter(r => r.id !== rId);
      showToast('Request Declined', 'Customer notified', 'info');
      renderProviderDashboard();
    });
  });
}

function initEarningsChart() {
  const canvas = document.getElementById('provider-earnings-chart');
  if (!canvas || !window.Chart) return;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Earnings ($)',
        data: [180, 240, 310, 190, 420, 280, 140],
        backgroundColor: '#4f46e5',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });
}
