import React, { useEffect } from 'react';
import SITE_CONTENT from '../data/siteContent';
import { TOURS } from '../constants';

declare global { interface Window { selectLocationById?: any; navigateToLocation?: any; map?: any; __roteiros_cleanup?: any } }

const Roteiros: React.FC = () => {
  useEffect(() => {
    const ensureLink = (href: string, id?: string) => {
      if (id && document.getElementById(id)) return;
      if (Array.from(document.head.querySelectorAll('link')).some(l => (l as HTMLLinkElement).href === href)) return;
      const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; if (id) link.id = id; document.head.appendChild(link);
    };

    ensureLink('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'leaflet-css');
    ensureLink('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'fa-css');

    const loadLeaflet = () => new Promise<void>((resolve) => {
      if ((window as any).L) return resolve();
      const existing = document.querySelector('script[data-leaflet]') as HTMLScriptElement | null;
      if (existing) {
        // if script exists but Leaflet not yet available, wait until window.L is defined
        if ((window as any).L) return resolve();
        existing.addEventListener('load', () => resolve());
        // also poll as fallback
        const poll = setInterval(() => { if ((window as any).L) { clearInterval(poll); resolve(); } }, 100);
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      s.async = true;
      s.setAttribute('data-leaflet', '1');
      s.onload = () => resolve();
      s.onerror = () => {
        console.error('Failed to load leaflet.js');
        resolve();
      };
      document.body.appendChild(s);
    });

    let destroyed = false;

    (async () => {
      await loadLeaflet();
      if (destroyed) return;
      const L = (window as any).L;
      if (!L) return console.error('Leaflet not available');

      const CAMPOS_BOUNDS = L.latLngBounds([[-22.85, -45.65], [-22.65, -45.45]]);

      const rawLocations = [
        { id: 1, name: "Bendito Cacao Resort & SPA", category: "hotel", lat: -22.725889, lng: -45.578102, address: "R. Eng. Diogo José de Carvalho, 550 - Capivari", phone: "(12) 3662-4000", hours: "Check-in: 14h, Check-out: 12h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72588900%2C-45.57810200&navigate=yes", google: "" },
        { id: 2, name: "Parque Hotel", category: "hotel", lat: -22.736889, lng: -45.58794, address: "Av. Adhemar de Barros, 3001 - Alto da Boa Vista", phone: "(12) 3668-9739", hours: "Check-in: 14h, Check-out: 12h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73688900%2C-45.58794000&navigate=yes", google: "" },
        { id: 3, name: "Champet Boutique Hotel", category: "hotel", lat: -22.7375, lng: -45.5795, address: "R. Eng. Diogo José de Carvalho, 801 - Capivari", phone: "(12) 3662-8000", hours: "Check-in: 14h, Check-out: 12h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73750000%2C-45.57950000&navigate=yes", google: "" },
        { id: 4, name: "Hotel Toriba", category: "hotel", lat: -22.724, lng: -45.581, address: "Av. Ernesto Diederichsen, 2966 - Abernéssia", phone: "(12) 3663-1566", hours: "Check-in: 14h, Check-out: 12h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72400000%2C-45.58100000&navigate=yes", google: "" },
        { id: 5, name: "Hotel Vila Inglesa", category: "hotel", lat: -22.723, lng: -45.58, address: "Av. Macedo Soares, 235 - Vila Inglesa", phone: "(12) 3662-1332", hours: "Check-in: 14h, Check-out: 12h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72300000%2C-45.58000000&navigate=yes", google: "" },
        { id: 6, name: "Pousada Villa D'Biagy Premium", category: "hotel", lat: -22.7265, lng: -45.583, address: "R. Dr. José Pinto de Almeida, 160 - Jaguaribe", phone: "(12) 3662-5500", hours: "Check-in: 14h, Check-out: 12h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72650000%2C-45.58300000&navigate=yes", google: "" },

        { id: 101, name: "Choperia Baden Baden", category: "restaurant", lat: -22.72842, lng: -45.57215, address: "Av. Matheus Costa Pinto, 1653 - Vila Santa Cruz", phone: "(12) 3664-2004", hours: "Seg-Dom: 10h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72842000%2C-45.57215000&navigate=yes", google: "" },
        { id: 102, name: "Caras de Malte - Microcervejaria", category: "restaurant", lat: -22.726, lng: -45.584, address: "Av. Pedro Paulo, 1455 - Jardim Embaixador", phone: "(12) 3662-3207", hours: "Qua-Seg: 10h-17h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72600000%2C-45.58400000&navigate=yes", google: "" },
        { id: 103, name: "Ludwig Restaurant", category: "restaurant", lat: -22.738, lng: -45.5765, address: "Av. Dr. Jan Antonin Bata, 1400 - Capivari", phone: "(12) 3662-1010", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73800000%2C-45.57650000&navigate=yes", google: "" },
        { id: 104, name: "Restaurante Cantinho Suíço", category: "restaurant", lat: -22.739, lng: -45.5755, address: "R. Eng. Diogo José de Carvalho, 1690 - Capivari", phone: "(12) 3662-2525", hours: "Seg-Dom: 11h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73900000%2C-45.57550000&navigate=yes", google: "" },
        { id: 105, name: "Dona Chica Capivari", category: "restaurant", lat: -22.7378, lng: -45.5768, address: "R. Eng. Diogo José de Carvalho, 1376 - Capivari", phone: "(12) 3663-1518", hours: "Seg-Dom: 11h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73780000%2C-45.57680000&navigate=yes", google: "" },

        { id: 201, name: "Palácio da Boa Vista", category: "attraction", lat: -22.736889, lng: -45.58794, address: "Av. Adhemar de Barros, 3001 - Alto da Boa Vista", phone: "(12) 3668-9739", hours: "Qua-Dom: 10h-17h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73688900%2C-45.58794000&navigate=yes", google: "" },
        { id: 202, name: "Auditório Claudio Santoro", category: "attraction", lat: -22.73913, lng: -45.59324, address: "Av. Dr. Luis Arrobas Martins, 1880 - Alto Boa Vista", phone: "(12) 3662-6000", hours: "Varia conforme programação", image: "", waze: "https://ul.waze.com/ul?ll=-22.73913000%2C-45.59324000&navigate=yes", google: "" },
        { id: 203, name: "Parque Capivari", category: "attraction", lat: -22.73822, lng: -45.57633, address: "R. Eng. Diogo José de Carvalho, 1291 - Capivari", phone: "(12) 3663-2225", hours: "Seg-Dom: 9h-22h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73822000%2C-45.57633000&navigate=yes", google: "" },
        { id: 204, name: "Parque Estadual Campos do Jordão (Horto Florestal)", category: "attraction", lat: -22.72652, lng: -45.58432, address: "Av. Pedro Paulo, s/n - Horto Florestal", phone: "(12) 3663-3762", hours: "Seg-Dom: 9h-18h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72652000%2C-45.58432000&navigate=yes", google: "" },
        { id: 205, name: "Museu Felícia Leirner", category: "attraction", lat: -22.7395, lng: -45.5935, address: "Av. Dr. Luis Arrobas Martins, 1880 - Alto Boa Vista", phone: "(12) 3662-6000", hours: "Ter-Dom: 9h-18h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73950000%2C-45.59350000&navigate=yes", google: "" },
        { id: 206, name: "Centro de Lazer Tarundu", category: "attraction", lat: -22.71532, lng: -45.55623, address: "Av. José Antonio Manso, 1515", phone: "(12) 3800-0150", hours: "Seg-Dom: 9h-18h", image: "", waze: "https://ul.waze.com/ul?ll=-22.71532000%2C-45.55623000&navigate=yes", google: "" },
        { id: 207, name: "Fábrica da Baden Baden", category: "attraction", lat: -22.72842, lng: -45.57215, address: "Av. Matheus Costa Pinto, 1653 - Vila Santa Cruz", phone: "(12) 3664-2004", hours: "Tours: 10h-15h (com agendamento)", image: "", waze: "https://ul.waze.com/ul?ll=-22.72842000%2C-45.57215000&navigate=yes", google: "" },
        { id: 208, name: "Parque Amantikir", category: "attraction", lat: -22.72212, lng: -45.52843, address: "Estrada Municipal do Amantikir, KM 4", phone: "(12) 3662-5000", hours: "Seg-Dom: 9h-17h", image: "", waze: "https://ul.waze.com/ul?ll=-22.72212000%2C-45.52843000&navigate=yes", google: "" },
        { id: 301, name: "Mantiqueira Turismo", category: "service", lat: -22.737, lng: -45.577, address: "R. Eng. Diogo José de Carvalho, 1200 - Capivari", phone: "(12) 3662-1234", hours: "Seg-Sex: 9h-18h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73700000%2C-45.57700000&navigate=yes", google: "" },
        { id: 302, name: "Turismo na Montanha", category: "service", lat: -22.736, lng: -45.578, address: "Av. Dr. Jan Antonin Bata, 1000 - Capivari", phone: "(12) 3663-5678", hours: "Seg-Sab: 8h-20h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73600000%2C-45.57800000&navigate=yes", google: "" },
        { id: 303, name: "Brasil Eventos (UTI Móvel)", category: "service", lat: -22.735, lng: -45.579, address: "Av. Macedo Soares, 500 - Vila Inglesa", phone: "(12) 3664-9012", hours: "24 horas", image: "", waze: "https://ul.waze.com/ul?ll=-22.73500000%2C-45.57900000&navigate=yes", google: "" },
        { id: 304, name: "Vinho até Você", category: "service", lat: -22.734, lng: -45.58, address: "R. Dr. José Pinto de Almeida, 200 - Jaguaribe", phone: "(12) 3665-3456", hours: "Seg-Sex: 10h-19h, Sab: 10h-16h", image: "", waze: "https://ul.waze.com/ul?ll=-22.73400000%2C-45.58000000&navigate=yes", google: "" }
      ];

      // prefer images from TOURS or SITE_CONTENT when available
      function findImageFor(loc: any) {
        const name = (loc.name || '').toLowerCase();
        // check TOURS
        const tourMatch = TOURS.find(t => (t.title || '').toLowerCase().includes(name) || name.includes((t.title || '').toLowerCase()));
        if (tourMatch && (tourMatch as any).imageUrl) return (tourMatch as any).imageUrl;
        // check SITE_CONTENT attractions
        const attr = (SITE_CONTENT.attractions || []).find((a: any) => (a.title || '').toLowerCase().includes(name) || name.includes((a.title || '').toLowerCase()));
        if (attr && (attr as any).imageUrl) return (attr as any).imageUrl;
        // check SITE_CONTENT restaurants
        const resto = (SITE_CONTENT.restaurants || []).find((r: any) => (r.name || '').toLowerCase().includes(name) || name.includes((r.name || '').toLowerCase()));
        if (resto && (resto as any).image) return (resto as any).image;
        // fallback to provided image or a generic local image
        return loc.image || '/images/default-location.jpg';
      }

      const locations = rawLocations.map(l => ({ ...l, image: findImageFor(l) }));

      const categoryConfig: any = { hotel: { color: '#3498db', icon: 'bed', name: 'Hotel/Pousada' }, restaurant: { color: '#e74c3c', icon: 'utensils', name: 'Restaurante/Bar' }, attraction: { color: '#2ecc71', icon: 'mountain', name: 'Atração Turística' }, service: { color: '#9b59b6', icon: 'concierge-bell', name: 'Serviço' } };

      let map: any; let markers: any[] = []; let selectedLocation: any = null; let currentCategory: any = 'all'; let currentSearch: any = '';

      function initMap() {
        map = L.map('main-map', { minZoom: 12, maxBounds: CAMPOS_BOUNDS, maxBoundsViscosity: 1.0 }).setView([-22.735, -45.58], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors', maxZoom: 19 }).addTo(map);
        map.setMaxBounds(CAMPOS_BOUNDS);
        addMarkers(); loadLocationsList(); setupEventListeners(); updateInterface(); rebuildListItems(); (window as any).map = map;
      }

      function addMarkers() {
        locations.forEach((location: any) => {
          if (!location.lat || !location.lng) return; // skip locations without coordinates
          const config = categoryConfig[location.category];
          const icon = L.divIcon({ html: `<div style="background-color: ${config.color}; width:32px; height:32px; border-radius:50%; border:3px solid white; box-shadow:0 2px 5px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; cursor:pointer;"><i class=\"fas fa-${config.icon}\" style=\"color:white; font-size:14px;\"></i></div>`, className: 'custom-marker', iconSize: [32,32], iconAnchor: [16,16] });
          const marker = L.marker([location.lat, location.lng], { icon: icon, title: location.name }).addTo(map);
          marker.bindPopup(`<div style="min-width:200px;"><div class="popup-title">${location.name}</div><div class="popup-category" style="background-color:${config.color}">${config.name}</div><div style="font-size:12px;color:#666;margin-bottom:10px;">${location.address}</div><div class="popup-actions"><button onclick=\"window.selectLocationById(${location.id})\" class=\"popup-btn\"><i class=\"fas fa-info-circle\"></i> Detalhes</button><button onclick=\"window.navigateToLocation(${location.id})\" class=\"popup-btn\"><i class=\"fas fa-directions\"></i> Navegar</button></div></div>`);
          (marker as any).location = location; markers.push(marker); marker.on('click', () => selectLocation(location));
        });
      }

      function loadLocationsList() {
        const listContainer = document.getElementById('locations-list'); if (!listContainer) return; listContainer.innerHTML = '';
        const filteredLocations = locations.filter((location: any) => { const matchesCategory = currentCategory === 'all' || location.category === currentCategory; const matchesSearch = location.name.toLowerCase().includes(currentSearch.toLowerCase()) || location.address.toLowerCase().includes(currentSearch.toLowerCase()); return matchesCategory && matchesSearch; });
        if (filteredLocations.length === 0) { listContainer.innerHTML = `<div style=\"text-align:center;padding:40px 20px;color:#666;\"><i class=\"fas fa-search\" style=\"font-size:2rem;margin-bottom:10px;\"></i><p>Nenhum local encontrado</p></div>`; return; }
        filteredLocations.forEach((location: any) => { const config = categoryConfig[location.category]; const item = document.createElement('div'); item.className = 'location-item'; if (selectedLocation && selectedLocation.id === location.id) item.classList.add('active'); item.innerHTML = `<div class=\"location-header\"><div class=\"location-name\">${location.name}</div><div class=\"location-category ${location.category}-category\">${config.name}</div></div><div style=\"font-size:0.85rem;color:#666;margin-bottom:5px;\"><i class=\"fas fa-map-marker-alt\"></i> ${location.address}</div><div class=\"location-actions\"><button class=\"action-btn\" onclick=\"window.selectLocationById(${location.id})\"><i class=\"fas fa-eye\"></i> Ver</button><button class=\"action-btn\" onclick=\"window.navigateToLocation(${location.id})\"><i class=\"fas fa-directions\"></i> Navegar</button></div>`; item.addEventListener('click', () => selectLocation(location)); listContainer.appendChild(item); });
      }

      // rebuild list items to include thumbnails and improved layout (used when list is generated by loadLocationsList)
      function rebuildListItems() {
        const listContainer = document.getElementById('locations-list');
        if (!listContainer) return;
        const items = Array.from(listContainer.children) as HTMLElement[];
        items.forEach(item => {
          const text = item.textContent || '';
          const nameCandidate = (text.split('\n')[0] || text).trim();
          const loc = locations.find((l: any) => {
            const lname = (l.name || '').toLowerCase();
            const cand = (nameCandidate || '').toLowerCase();
            return lname === cand || lname.includes(cand) || cand.includes(lname);
          });
          if (!loc) return;
          const config = categoryConfig[loc.category];
          const thumb = loc.image || '/images/default-location.jpg';
          item.className = 'location-item';
          if (selectedLocation && selectedLocation.id === loc.id) item.classList.add('active');
          item.innerHTML = `
            <div class="location-row">
              <img class="location-thumb" src="${thumb}" onerror="this.src='/images/default-location.jpg'" alt="${loc.name}" />
              <div class="location-body">
                <div class="location-header">
                  <div class="location-name">${loc.name}</div>
                  <div class="location-category ${loc.category}-category">${config.name}</div>
                </div>
                <div class="location-address"><i class=\"fas fa-map-marker-alt\"></i> ${loc.address}</div>
                <div class="location-actions">
                  <button class=\"action-btn\" onclick=\"window.selectLocationById(${loc.id})\"><i class=\"fas fa-eye\"></i> Ver</button>
                  <button class=\"action-btn\" onclick=\"window.navigateToLocation(${loc.id})\"><i class=\"fas fa-directions\"></i> Navegar</button>
                </div>
              </div>
            </div>
          `;
          item.addEventListener('click', () => selectLocation(loc));
        });
      }

      function selectLocation(location: any) { selectedLocation = location; updateInfoPanel(); map.setView([location.lat, location.lng], 16); markers.forEach(marker => { if (marker.location.id === location.id) { marker.openPopup(); const el = marker.getElement(); if (el) { el.classList.add('pulse-marker'); (el as any).style.zIndex = '1000'; setTimeout(() => { el.classList.remove('pulse-marker'); (el as any).style.zIndex = '100'; }, 3000); } } }); loadLocationsList(); }

      (window as any).selectLocationById = function(id: number) { const location = locations.find((loc: any) => loc.id === id); if (location) selectLocation(location); };
      (window as any).navigateToLocation = function(id: number) { const location = locations.find((loc: any) => loc.id === id); if (!location) return; window.open(location.waze, '_blank'); };

      function updateInfoPanel() { if (!selectedLocation) return; const config = categoryConfig[selectedLocation.category]; const nameEl = document.getElementById('info-name'); if (nameEl) nameEl.textContent = selectedLocation.name; const catEl = document.getElementById('info-category'); if (catEl) catEl.textContent = config.name; const addrEl = document.getElementById('info-address'); if (addrEl) addrEl.textContent = selectedLocation.address; const phoneEl = document.getElementById('info-phone'); if (phoneEl) phoneEl.textContent = selectedLocation.phone || 'Não informado'; const hoursEl = document.getElementById('info-hours'); if (hoursEl) hoursEl.textContent = selectedLocation.hours || ''; const img = document.getElementById('info-image') as HTMLImageElement | null; if (img) { img.src = selectedLocation.image; img.alt = selectedLocation.name; } const wazeBtn = document.getElementById('navigate-waze'); if (wazeBtn) (wazeBtn as HTMLButtonElement).onclick = () => window.open(selectedLocation.waze, '_blank'); const googleBtn = document.getElementById('navigate-google'); if (googleBtn) (googleBtn as HTMLButtonElement).onclick = () => window.open(selectedLocation.google, '_blank'); const infoPanel = document.getElementById('info-panel'); if (infoPanel) infoPanel.classList.add('active'); }

      function updateInterface() { loadLocationsList(); markers.forEach(marker => { const matchesCategory = currentCategory === 'all' || marker.location.category === currentCategory; const matchesSearch = marker.location.name.toLowerCase().includes(currentSearch.toLowerCase()) || marker.location.address.toLowerCase().includes(currentSearch.toLowerCase()); if (matchesCategory && matchesSearch) map.addLayer(marker); else map.removeLayer(marker); }); }

      function setupEventListeners() {
        document.querySelectorAll('.category-btn').forEach(btn => { btn.addEventListener('click', () => { document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentCategory = (btn as HTMLElement).dataset.category || 'all'; updateInterface(); }); });
        const searchInput = document.getElementById('search-input') as HTMLInputElement | null; if (searchInput) searchInput.addEventListener('input', (e: any) => { currentSearch = e.target.value; updateInterface(); rebuildListItems(); });
        const zoomIn = document.getElementById('zoom-in'); if (zoomIn) zoomIn.addEventListener('click', () => map.zoomIn()); const zoomOut = document.getElementById('zoom-out'); if (zoomOut) zoomOut.addEventListener('click', () => map.zoomOut()); const locate = document.getElementById('locate-me'); if (locate) locate.addEventListener('click', () => { if (navigator.geolocation) navigator.geolocation.getCurrentPosition(pos => { const lat = pos.coords.latitude; const lng = pos.coords.longitude; if (CAMPOS_BOUNDS.contains([lat, lng])) map.setView([lat, lng], 16); else alert('Você está fora da área de Campos do Jordão'); }, () => alert('Não foi possível obter sua localização')); });
        const resetBtn = document.getElementById('reset-map'); if (resetBtn) resetBtn.addEventListener('click', () => map.setView([-22.735, -45.58], 14)); const closeInfo = document.getElementById('close-info'); if (closeInfo) closeInfo.addEventListener('click', () => document.getElementById('info-panel')?.classList.remove('active')); const closeRoute = document.getElementById('close-route'); if (closeRoute) closeRoute.addEventListener('click', () => document.getElementById('route-panel')?.classList.remove('active')); const showRoute = document.getElementById('show-route'); if (showRoute) showRoute.addEventListener('click', () => document.getElementById('route-panel')?.classList.toggle('active'));
        document.querySelectorAll('.route-option').forEach(option => { option.addEventListener('click', () => { document.querySelectorAll('.route-option').forEach(opt => opt.classList.remove('active')); option.classList.add('active'); setupRouteNavigation((option as HTMLElement).dataset.route || 'cultural'); }); });
        const openWaze = document.getElementById('open-waze-route'); if (openWaze) openWaze.addEventListener('click', () => { const routeUrl = (openWaze as HTMLElement).dataset.route; if (routeUrl) window.open(routeUrl, '_blank'); }); const openGoogle = document.getElementById('open-google-route'); if (openGoogle) openGoogle.addEventListener('click', () => { const routeUrl = (openGoogle as HTMLElement).dataset.route; if (routeUrl) window.open(routeUrl, '_blank'); });
      }

      function setupRouteNavigation(routeType: string) { const wazeRoutes: any = { cultural: 'https://ul.waze.com/ul?ll=-22.73688900%2C-45.58794000&navigate=yes&to=1.%20Pal%C3%A1cio%20Boa%20Vista%20%3E%202.%20Audit%C3%B3rio%20Santoro%20%3E%203.%20Museu%20Fel%C3%ADcia%20Leirner', gastronomic: 'https://ul.waze.com/ul?ll=-22.72842000%2C-45.57215000&navigate=yes&to=1.%20Baden%20Baden%20%3E%202.%20Caras%20de%20Malte%20%3E%203.%20Ludwig%20Restaurant', nature: 'https://ul.waze.com/ul?ll=-22.72652000%2C-45.58432000&navigate=yes&to=1.%20Horto%20Florestal%20%3E%202.%20Parque%20Capivari%20%3E%203.%20Morro%20do%20Elefante', adventure: 'https://ul.waze.com/ul?ll=-22.71532000%2C-45.55623000&navigate=yes&to=1.%20Tarundu%20%3E%202.%20Prana%20Park%20%3E%203.%20Iceland' }; const googleRoutes: any = { cultural: 'https://www.google.com/maps/dir/Pal%C3%A1cio+Boa+Vista,+Av.+Adhemar+de+Barros,+3001+-+Alto+da+Boa+Vista,+Campos+do+Jord%C3%A3o+-+SP/Audit%C3%B3rio+Claudio+Santoro,+Av.+Dr.+Luis+Arrobas+Martins,+1880+-+Alto+Boa+Vista,+Campos+do+Jord%C3%A3o+-+SP/Museu+Fel%C3%ADcia+Leirner,+Av.+Dr.+Luis+Arrobas+Martins,+1880+-+Alto+Boa+Vista,+Campos+do+Jord%C3%A3o+-+SP', gastronomic: 'https://www.google.com/maps/dir/Cervejaria+Baden+Baden,+Av.+Matheus+Costa+Pinto,+1653+-+Vila+Santa+Cruz,+Campos+do+Jord%C3%A3o+-+SP/Caras+de+Malte,+Av.+Pedro+Paulo,+1455+-+Jardim+Embaixador,+Campos+do+Jord%C3%A3o+-+SP/Ludwig+Restaurant,+Av.+Dr.+Jan+Antonin+Bata,+1400+-+Capivari,+Campos+do+Jord%C3%A3o+-+SP', nature: 'https://www.google.com/maps/dir/Horto+Florestal,+Av.+Pedro+Paulo+-+Horto+Florestal,+Campos+do+Jord%C3%A3o+-+SP/Parque+Capivari,+R.+Eng.+Diogo+Jos%C3%A9+de+Carvalho,+1291+-+Capivari,+Campos+do+Jord%C3%A3o+-+SP/Morro+do+Elefante,+Av.+Em%C3%ADlio+Lang+J%C3%BAnior+-+Campos+do+Jord%C3%A3o+-+SP', adventure: 'https://www.google.com/maps/dir/Centro+de+Lazer+Tarundu,+Av.+Jos%C3%A9+Antonio+Manso,+1515+-+Campos+do+Jord%C3%A3o+-+SP/Prana+Park,+Estrada+do+Pico+do+Itapeva+-+Campos+do+Jord%C3%A3o+-+SP/Iceland+Aventura+no+Gelo,+R.+Eng.+Diogo+Jos%C3%A9+de+Carvalho,+190+-+Capivari,+Campos+do+Jord%C3%A3o+-+SP' }; const openWaze = document.getElementById('open-waze-route'); if (openWaze) (openWaze as HTMLElement).dataset.route = wazeRoutes[routeType]; const openGoogle = document.getElementById('open-google-route'); if (openGoogle) (openGoogle as HTMLElement).dataset.route = googleRoutes[routeType]; }

      initMap();
      (window as any).__roteiros_cleanup = () => { try { if (map && map.remove) map.remove(); } catch (e) {} markers = []; delete (window as any).selectLocationById; delete (window as any).navigateToLocation; delete (window as any).map; };
    })();

    return () => { destroyed = true; if ((window as any).__roteiros_cleanup) try { (window as any).__roteiros_cleanup(); } catch (e) {} };
  }, []);

  return (
    <div className="roteiros-root" style={{ minHeight: '100vh' }}>
      <style>{`
        :root { --primary: #1a5f2a; --accent: #d4af37; }
        .main-container { display: flex; height: calc(100vh - 70px); }
        .sidebar { width: 380px; background: white; border-right: 1px solid #e0e0e0; display: flex; flex-direction: column; overflow: hidden; }
        .map-container { flex: 1; position: relative; }
        #main-map { height: 100%; width: 100%; }
        .map-controls { position: absolute; top: 20px; right: 20px; z-index: 1000; display: flex; flex-direction: column; gap: 10px; }
        .map-control-btn { width: 40px; height: 40px; background: white; border-radius: 8px; border: none; box-shadow: 0 4px 20px rgba(0,0,0,0.15); cursor: pointer }
        .info-panel { position: absolute; bottom: 20px; left: 20px; right: 20px; max-width: 500px; background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); z-index: 1000; display: none; }
        .info-panel.active { display: block; }

        /* Locations list styles */
        #locations-list { padding: 12px 0; }
        .location-item { display: block; padding: 10px 12px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background .12s, transform .08s; }
        .location-item:hover { background: #fbfdff; transform: translateY(-1px); }
        .location-row { display: flex; gap: 12px; align-items: flex-start; }
        .location-thumb { width: 72px; height: 56px; object-fit: cover; border-radius: 8px; flex-shrink: 0; background: #eee; }
        .location-body { flex: 1; min-width: 0; }
        .location-header { display:flex; align-items:center; gap:8px; justify-content:space-between }
        .location-name { font-weight:700; font-size:0.95rem; color:#1f2937 }
        .location-category { font-size:0.72rem; padding:4px 8px; border-radius:999px; background:#f3f4f6; color:#374151; }
        .location-address { font-size:0.82rem; color:#6b7280; margin-top:6px }
        .location-actions { margin-top:8px; display:flex; gap:8px }
        .action-btn { background:#fff; border:1px solid #e6e7ea; padding:6px 8px; border-radius:6px; font-size:0.82rem; cursor:pointer }
        .location-item.active { background: linear-gradient(90deg, rgba(26,95,42,0.06), rgba(214,175,55,0.02)); border-left:4px solid var(--primary); }
        .pulse-marker { animation: pulse 1s ease-in-out; }
        @keyframes pulse { 0% { transform: scale(1) } 50% { transform: scale(1.12) } 100% { transform: scale(1) } }
      `}</style>

      <header style={{ background: 'linear-gradient(135deg, rgba(13,44,20,0.95), rgba(26,95,42,0.9))', color: 'white', padding: '1.2rem 0' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <i className="fas fa-map-marked-alt" style={{ fontSize: 24, color: 'var(--accent)' }} />
            <div>
              <h1 style={{ fontSize: 20, margin: 0 }}>Mapa Turístico de Campos do Jordão</h1>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Hotéis, Restaurantes, Atrações e Serviços com Localização Real</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button id="show-route" className="btn btn-secondary" style={{ padding: '8px 16px' }}><i className="fas fa-route" /> Roteiros</button>
            <button id="reset-map" className="btn btn-primary" style={{ padding: '8px 16px' }}><i className="fas fa-home" /> Centralizar</button>
          </div>
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <div style={{ padding: 20, borderBottom: '1px solid #e0e0e0', background: 'linear-gradient(to right, var(--primary), #2a6e3f)', color: 'white' }}>
            <h2 style={{ marginBottom: 5 }}>Locais em Campos do Jordão</h2>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Clique em um local para ver detalhes e navegar</p>
          </div>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input id="search-input" placeholder="Buscar locais..." style={{ width: '100%', padding: '10px 10px 10px 40px', border: '1px solid #ddd', borderRadius: 6 }} />
            </div>
          </div>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="category-btn active" data-category="all">Todos</button>
              <button className="category-btn" data-category="hotel">Hotéis</button>
              <button className="category-btn" data-category="restaurant">Restaurantes</button>
              <button className="category-btn" data-category="attraction">Atrações</button>
              <button className="category-btn" data-category="service">Serviços</button>
            </div>
          </div>
          <div id="locations-list" style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <div style={{ border: '3px solid rgba(0,0,0,0.1)', borderRadius: '50%', borderTopColor: 'var(--primary)', width: 30, height: 30, animation: 'spin 1s linear infinite' }} />
            </div>
          </div>
        </aside>

        <main className="map-container">
          <div id="main-map" style={{ height: '100%', width: '100%' }} />
          <div className="map-boundary" />

          <div className="map-controls">
            <button id="zoom-in" className="map-control-btn" title="Aumentar Zoom"><i className="fas fa-plus" /></button>
            <button id="zoom-out" className="map-control-btn" title="Diminuir Zoom"><i className="fas fa-minus" /></button>
            <button id="locate-me" className="map-control-btn" title="Minha Localização"><i className="fas fa-location-crosshairs" /></button>
          </div>

          <div id="info-panel" className="info-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
              <div>
                <h3 id="info-name">Nome do Local</h3>
              </div>
              <button id="close-info" className="close-btn"><i className="fas fa-times" /></button>
            </div>

            <div className="location-image" style={{ width: '100%', height: 200, borderRadius: 8, overflow: 'hidden', marginBottom: 15 }}>
              <img id="info-image" src="" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="info-details">
              <div style={{ display: 'flex', marginBottom: 8 }}>
                <div style={{ width: 100, fontWeight: 600, color: '#666' }}>Categoria:</div>
                <div id="info-category">-</div>
              </div>
              <div style={{ display: 'flex', marginBottom: 8 }}>
                <div style={{ width: 100, fontWeight: 600, color: '#666' }}>Endereço:</div>
                <div id="info-address">-</div>
              </div>
              <div style={{ display: 'flex', marginBottom: 8 }}>
                <div style={{ width: 100, fontWeight: 600, color: '#666' }}>Telefone:</div>
                <div id="info-phone">-</div>
              </div>
              <div style={{ display: 'flex', marginBottom: 8 }}>
                <div style={{ width: 100, fontWeight: 600, color: '#666' }}>Horário:</div>
                <div id="info-hours">-</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button id="navigate-waze" className="action-btn"><i className="fab fa-waze" /> Navegar com Waze</button>
              <button id="navigate-google" className="action-btn"><i className="fab fa-google" /> Google Maps</button>
            </div>
          </div>

          <div id="route-panel" className="route-panel" style={{ display: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <h3>Roteiros Sugeridos</h3>
              <button id="close-route" className="close-btn"><i className="fas fa-times" /></button>
            </div>
            <div style={{ display: 'grid', gap: 10, marginBottom: 15 }}>
              <div className="route-option active" data-route="cultural"><strong>Roteiro Cultural:</strong> Palácio Boa Vista → Auditório Santoro → Museu Felícia Leirner</div>
              <div className="route-option" data-route="gastronomic"><strong>Roteiro Gastronômico:</strong> Baden Baden → Caras de Malte → Ludwig Restaurant</div>
              <div className="route-option" data-route="nature"><strong>Roteiro Natureza:</strong> Horto Florestal → Parque Capivari → Morro do Elefante</div>
              <div className="route-option" data-route="adventure"><strong>Roteiro Aventura:</strong> Tarundu → Prana Park → Iceland Aventura no Gelo</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button id="open-waze-route" className="route-btn waze"> <i className="fab fa-waze" /> Ver no Waze</button>
              <button id="open-google-route" className="route-btn google"> <i className="fab fa-google" /> Ver no Maps</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Roteiros;
