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

      // Bounds expandidos para incluir TODOS os pontos de interesse
      // - Sul: Parque Amantikir (-22.7835)
      // - Norte: Horto Florestal (-22.6898)
      // - Oeste: Museu Felícia Leirner (-45.6337)
      // - Leste: Horto Florestal (-45.4811)
      const CAMPOS_BOUNDS = L.latLngBounds([[-22.80, -45.65], [-22.68, -45.47]]);

      const rawLocations = [
        // ========== HOTÉIS E POUSADAS ==========
        { id: 1, name: "Bendito Cacao Resort & SPA", category: "hotel", lat: -22.6975059, lng: -45.5599906, address: "R. Dr. José Mestres, 2145 - Jardim do Embaixador", phone: "(12) 3669-0777", hours: "Check-in: 15h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/Design-sem-nome.png", waze: "https://ul.waze.com/ul?ll=-22.6975059,-45.5599906&navigate=yes", google: "" },
        { id: 2, name: "Hotel Frontenac", category: "hotel", lat: -22.7212556, lng: -45.5669461, address: "Av. Paulo Ribas, 295 - Capivari", phone: "(12) 3669-1009", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_hotel_800.jpg", waze: "https://ul.waze.com/ul?ll=-22.7212556,-45.5669461&navigate=yes", google: "" },
        { id: 3, name: "Champet Boutique Hotel", category: "hotel", lat: -22.725427, lng: -45.561286, address: "R. Eng. Diogo José de Carvalho, 801 - Capivari", phone: "(12) 3662-8000", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/1.png", waze: "https://ul.waze.com/ul?ll=-22.725427,-45.561286&navigate=yes", google: "" },
        { id: 4, name: "Hotel Serra da Estrela", category: "hotel", lat: -22.7208659, lng: -45.567849, address: "Av. Dr. Mário O. Rezende, 160 - Capivari", phone: "(12) 3669-8000", hours: "Check-in: 15h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/chris_park_800.jpg", waze: "https://ul.waze.com/ul?ll=-22.7208659,-45.567849&navigate=yes", google: "" },
        { id: 5, name: "Flat Hotel Home Green Home", category: "hotel", lat: -22.7487335, lng: -45.5566101, address: "Av. Macedo Soares - Vila Capivari", phone: "(12) 3662-5500", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/home_green.jpg", waze: "https://ul.waze.com/ul?ll=-22.7487335,-45.5566101&navigate=yes", google: "" },
        { id: 6, name: "Flat Hotel Palazzo Reale", category: "hotel", lat: -22.7200274, lng: -45.5721005, address: "R. Dr. José Pinto de Almeida - Jaguaribe", phone: "(12) 3662-4455", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/palazzo_reale.jpg", waze: "https://ul.waze.com/ul?ll=-22.7200274,-45.5721005&navigate=yes", google: "" },
        { id: 7, name: "Hotel Ascona", category: "hotel", lat: -22.7216083, lng: -45.5649166, address: "Av. Macedo Soares, 325 - Vila Capivari", phone: "(12) 3662-2233", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/ascona.png", waze: "https://ul.waze.com/ul?ll=-22.7216083,-45.5649166&navigate=yes", google: "" },
        { id: 8, name: "Hotel Boutique Quebra-Noz", category: "hotel", lat: -22.7148951, lng: -45.5629256, address: "R. Eng. Diogo José de Carvalho - Capivari", phone: "(12) 3663-1234", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2024/02/Externa-Quebra-Noz-6-scaled.jpg", waze: "https://ul.waze.com/ul?ll=-22.7148951,-45.5629256&navigate=yes", google: "" },
        { id: 9, name: "Hotel Dan Inn Premium", category: "hotel", lat: -22.7281063, lng: -45.5804054, address: "Av. Sen. Roberto Simonsen - Vila Inglesa", phone: "(12) 3662-8899", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/dan_inn.jpg", waze: "https://ul.waze.com/ul?ll=-22.7281063,-45.5804054&navigate=yes", google: "" },
        { id: 10, name: "Hotel Estoril", category: "hotel", lat: -22.7198091, lng: -45.5671705, address: "Av. Macedo Soares, 400 - Capivari", phone: "(12) 3662-1100", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/hotel-estoril-800x450.png", waze: "https://ul.waze.com/ul?ll=-22.7198091,-45.5671705&navigate=yes", google: "" },
        { id: 11, name: "Hotel Le Renard", category: "hotel", lat: -22.7194257, lng: -45.5611975, address: "R. Eng. Souza Campos Junior, 50 - Capivari", phone: "(12) 3669-2220", hours: "Check-in: 15h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/le_renard.jpg", waze: "https://ul.waze.com/ul?ll=-22.7194257,-45.5611975&navigate=yes", google: "" },
        { id: 12, name: "Hotel Leão da Montanha", category: "hotel", lat: -22.7241963, lng: -45.5655824, address: "Av. Pedro Paulo - Descansópolis", phone: "(12) 3662-3456", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/leao_montanha.jpg", waze: "https://ul.waze.com/ul?ll=-22.7241963,-45.5655824&navigate=yes", google: "" },
        { id: 13, name: "Hotel Plátanus", category: "hotel", lat: -22.7432498, lng: -45.6035308, address: "R. Eng. Diogo José de Carvalho - Capivari", phone: "(12) 3663-4567", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/2.png", waze: "https://ul.waze.com/ul?ll=-22.7432498,-45.6035308&navigate=yes", google: "" },
        { id: 14, name: "Hotel Recanto São Cristovão", category: "hotel", lat: -22.7650143, lng: -45.6120818, address: "Alto da Boa Vista", phone: "(12) 3662-5678", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/sao_cristovao.jpg", waze: "https://ul.waze.com/ul?ll=-22.7650143,-45.6120818&navigate=yes", google: "" },
        { id: 15, name: "Hotel Solar D'Izabel", category: "hotel", lat: -22.7200426, lng: -45.5636769, address: "Av. Macedo Soares - Capivari", phone: "(12) 3662-6789", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/04/SOLAR-IZABEL-800x450.png", waze: "https://ul.waze.com/ul?ll=-22.7200426,-45.5636769&navigate=yes", google: "" },
        { id: 16, name: "Hotel Toriba", category: "hotel", lat: -22.7304785, lng: -45.5553019, address: "Av. Ernesto Diederichsen, 2962 - Vila Matilde", phone: "(12) 3668-5000", hours: "Check-in: 17h, Check-out: 14h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/10/hotel-toriba.png", waze: "https://ul.waze.com/ul?ll=-22.7304785,-45.5553019&navigate=yes", google: "" },
        { id: 17, name: "Hotel Vila Inglesa", category: "hotel", lat: -22.7388542, lng: -45.5821875, address: "Av. Mariane Baungart, 3400 - Vila Inglesa", phone: "(12) 3669-5000", hours: "Check-in: 16h, Check-out: 14h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/vila_inglesa.jpg", waze: "https://ul.waze.com/ul?ll=-22.7388542,-45.5821875&navigate=yes", google: "" },
        { id: 18, name: "Le Suisse Elegance Hotel", category: "hotel", lat: -22.7217267, lng: -45.5663686, address: "R. Eng. Diogo José de Carvalho - Capivari", phone: "(12) 3663-7890", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/08/le-suisse.png", waze: "https://ul.waze.com/ul?ll=-22.7217267,-45.5663686&navigate=yes", google: "" },
        { id: 19, name: "Parador Campos do Jordão", category: "hotel", lat: -22.7221371, lng: -45.5740993, address: "Alto da Boa Vista", phone: "(12) 3668-8901", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/10/parador-760x428.png", waze: "https://ul.waze.com/ul?ll=-22.7221371,-45.5740993&navigate=yes", google: "" },
        { id: 20, name: "Pousada Alto da Boa Vista", category: "hotel", lat: -22.7306344, lng: -45.6243382, address: "Av. Adhemar de Barros - Alto da Boa Vista", phone: "(12) 3668-9012", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/05/alto-da-boa-vista-760x428.png", waze: "https://ul.waze.com/ul?ll=-22.7306344,-45.6243382&navigate=yes", google: "" },
        { id: 21, name: "Pousada Annecy", category: "hotel", lat: -22.7241976, lng: -45.5675486, address: "Vila Inglesa", phone: "(12) 3662-0123", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/annecy.jpg", waze: "https://ul.waze.com/ul?ll=-22.7241976,-45.5675486&navigate=yes", google: "" },
        { id: 22, name: "Pousada Campos de Provence", category: "hotel", lat: -22.7211, lng: -45.5594, address: "Descansópolis", phone: "(12) 3662-1234", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/campos_provence.jpg", waze: "https://ul.waze.com/ul?ll=-22.7211,-45.5594&navigate=yes", google: "" },
        { id: 23, name: "Pousada Campos dos Holandeses", category: "hotel", lat: -22.7465401, lng: -45.5707016, address: "R Orivaldo Albino Rodrigues, 595 - Estr. Mun. do Salto", phone: "(12) 3663-6579", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/campos_holandeses.jpg", waze: "https://ul.waze.com/ul?ll=-22.7465401,-45.5707016&navigate=yes", google: "" },
        { id: 24, name: "Pousada Cantinho da Serra", category: "hotel", lat: -22.7221686, lng: -45.5592851, address: "Capivari", phone: "(12) 3662-3456", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/04/cantinh.jpg", waze: "https://ul.waze.com/ul?ll=-22.7221686,-45.5592851&navigate=yes", google: "" },
        { id: 25, name: "Pousada Casa Sabor Chocolate", category: "hotel", lat: -22.713048, lng: -45.560389, address: "R. Djalma Forfaz - Capivari", phone: "(12) 3663-4567", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/05/casa-chocolate-760x428.png", waze: "https://ul.waze.com/ul?ll=-22.713048,-45.560389&navigate=yes", google: "" },
        { id: 26, name: "Pousada Chateau La Villette", category: "hotel", lat: -22.729296, lng: -45.5760139, address: "R. Cantídio Pereira de Castro - Vila Everest", phone: "(12) 3662-5678", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/la_villette.jpg", waze: "https://ul.waze.com/ul?ll=-22.729296,-45.5760139&navigate=yes", google: "" },
        { id: 27, name: "Pousada da Pedra", category: "hotel", lat: -22.7104799, lng: -45.553344, address: "Vila Inglesa", phone: "(12) 3662-6789", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/pousada_pedra.jpg", waze: "https://ul.waze.com/ul?ll=-22.7104799,-45.553344&navigate=yes", google: "" },
        { id: 28, name: "Pousada das Hortênsias", category: "hotel", lat: -22.7185804, lng: -45.5600627, address: "Capivari", phone: "(12) 3663-7890", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/pousada_hortensias.jpg", waze: "https://ul.waze.com/ul?ll=-22.7185804,-45.5600627&navigate=yes", google: "" },
        { id: 29, name: "Pousada das Lavandas", category: "hotel", lat: -22.7271726, lng: -45.575785, address: "Descansópolis", phone: "(12) 3662-8901", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/05/Design-sem-nome-1-760x570.png", waze: "https://ul.waze.com/ul?ll=-22.7271726,-45.575785&navigate=yes", google: "" },
        { id: 30, name: "Pousada do Conde", category: "hotel", lat: -22.7201, lng: -45.5689, address: "Capivari", phone: "(12) 3663-9012", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/pousada_conde.jpg", waze: "https://ul.waze.com/ul?ll=-22.7201,-45.5689&navigate=yes", google: "" },
        { id: 31, name: "Pousada Figueira da Serra", category: "hotel", lat: -22.7090689, lng: -45.5575011, address: "Capivari", phone: "(12) 3662-0123", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2024/02/Figueira-da-Serra-Geral-056-760x570.jpg", waze: "https://ul.waze.com/ul?ll=-22.7090689,-45.5575011&navigate=yes", google: "" },
        { id: 32, name: "Pousada Kaliman", category: "hotel", lat: -22.7238341, lng: -45.5738278, address: "Vila Inglesa", phone: "(12) 3662-1234", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/kaliman.jpg", waze: "https://ul.waze.com/ul?ll=-22.7238341,-45.5738278&navigate=yes", google: "" },
        { id: 33, name: "Pousada La Toscana", category: "hotel", lat: -22.7216878, lng: -45.563841, address: "Capivari", phone: "(12) 3662-2345", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/latoscana.jpg", waze: "https://ul.waze.com/ul?ll=-22.7216878,-45.563841&navigate=yes", google: "" },
        { id: 34, name: "Pousada Luis XV", category: "hotel", lat: -22.7199875, lng: -45.5667752, address: "Capivari", phone: "(12) 3663-3456", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/luis_xv.jpg", waze: "https://ul.waze.com/ul?ll=-22.7199875,-45.5667752&navigate=yes", google: "" },
        { id: 35, name: "Pousada Murano", category: "hotel", lat: -22.716324, lng: -45.5627589, address: "Capivari", phone: "(12) 3662-4567", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/05/murata-760x428.png", waze: "https://ul.waze.com/ul?ll=-22.716324,-45.5627589&navigate=yes", google: "" },
        { id: 36, name: "Pousada Primavera", category: "hotel", lat: -22.7159, lng: -45.5602, address: "Vila Inglesa", phone: "(12) 3662-5678", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/04/Relatorio-frequencia-custo.png", waze: "https://ul.waze.com/ul?ll=-22.7159,-45.5602&navigate=yes", google: "" },
        { id: 37, name: "Pousada Recanto Almeida", category: "hotel", lat: -22.7306246, lng: -45.5606791, address: "Jaguaribe", phone: "(12) 3662-6789", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/recantoalmeida.jpg", waze: "https://ul.waze.com/ul?ll=-22.7306246,-45.5606791&navigate=yes", google: "" },
        { id: 38, name: "Pousada Vila das Cores", category: "hotel", lat: -22.7258123, lng: -45.570718, address: "Alto da Boa Vista", phone: "(12) 3668-7890", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/05/vila-das-cores-760x428.png", waze: "https://ul.waze.com/ul?ll=-22.7258123,-45.570718&navigate=yes", google: "" },
        { id: 39, name: "Pousada Villa D'Biagy Raízes", category: "hotel", lat: -22.7220999, lng: -45.5712318, address: "R. Dr. José Pinto de Almeida - Jaguaribe", phone: "(12) 3662-8901", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/villa_dbiagy.jpg", waze: "https://ul.waze.com/ul?ll=-22.7220999,-45.5712318&navigate=yes", google: "" },
        { id: 40, name: "Pousada Villa D'Biagy Premium", category: "hotel", lat: -22.7219847, lng: -45.5708747, address: "R. Dr. José Pinto de Almeida, 160 - Jaguaribe", phone: "(12) 3662-5500", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/villa_dbiagy_premium.jpg", waze: "https://ul.waze.com/ul?ll=-22.7219847,-45.5708747&navigate=yes", google: "" },
        { id: 41, name: "Pousada Villaggio Itália", category: "hotel", lat: -22.7196696, lng: -45.5681546, address: "Descansópolis", phone: "(12) 3662-9012", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2020/11/villagio_italia.jpg", waze: "https://ul.waze.com/ul?ll=-22.7196696,-45.5681546&navigate=yes", google: "" },
        { id: 42, name: "Surya-Pan Hotel", category: "hotel", lat: -22.7365494, lng: -45.6184143, address: "Estrada do Horto Florestal", phone: "(12) 3662-0123", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/10/Surya-pan-760x428.png", waze: "https://ul.waze.com/ul?ll=-22.7365494,-45.6184143&navigate=yes", google: "" },
        { id: 43, name: "Zur Campos do Jordão", category: "hotel", lat: -22.7240, lng: -45.5808, address: "Alto da Boa Vista", phone: "(12) 3668-1234", hours: "Check-in: 14h, Check-out: 12h", image: "https://visitecamposdojordão.org.br/wp-content/uploads/2025/10/zur-760x428.png", waze: "https://ul.waze.com/ul?ll=-22.7240,-45.5808&navigate=yes", google: "" },

        // ========== BARES E RESTAURANTES ==========
        { id: 101, name: "Alto da Brasa Brew Kitchen", category: "restaurant", lat: -22.7816065, lng: -45.6044761, address: "Parque da Cerveja - Estr Mun Paulo Costa Lenz Cesar, 2150", phone: "(12) 3662-1111", hours: "Seg-Dom: 12h-22h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7816065,-45.6044761&navigate=yes", google: "" },
        { id: 102, name: "Bam Bam Café", category: "restaurant", lat: -22.7196, lng: -45.5665, address: "R. Djalma Forfaz, 103 - Capivari", phone: "(12) 3663-2222", hours: "Seg-Dom: 9h-20h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7196,-45.5665&navigate=yes", google: "" },
        { id: 103, name: "Bella Vista Restaurante", category: "restaurant", lat: -22.7123697, lng: -45.5648598, address: "Alameda Pérolas, 182 - Morro do Elefante", phone: "(12) 3663-3333", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7123697,-45.5648598&navigate=yes", google: "" },
        { id: 104, name: "Cervejaria Luss", category: "restaurant", lat: -22.7338349, lng: -45.5716047, address: "Av. Sen. Roberto Simonsen, 1724 - Vila Inglesa", phone: "(12) 3662-4444", hours: "Qua-Dom: 12h-22h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7338349,-45.5716047&navigate=yes", google: "" },
        { id: 105, name: "Caras de Malte - Microcervejaria", category: "restaurant", lat: -22.7098724, lng: -45.5478377, address: "Av. Pedro Paulo, 1500 - Descansópolis", phone: "(12) 3662-3207", hours: "Qua-Seg: 10h-17h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7098724,-45.5478377&navigate=yes", google: "" },
        { id: 106, name: "Choperia Baden Baden", category: "restaurant", lat: -22.7189693, lng: -45.5671882, address: "R. Djalma Forjaz, 93 - Capivari (Boulevard Geneve)", phone: "(12) 99176-4680", hours: "Seg-Dom: 10h-00h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/fabrica_baden.jpg", waze: "https://ul.waze.com/ul?ll=-22.7189693,-45.5671882&navigate=yes", google: "" },
        { id: 107, name: "Churrasco ao Vivo", category: "restaurant", lat: -22.7199, lng: -45.5690, address: "R. Dr. Heitor Penteado, 82 - Capivari", phone: "(12) 3663-5555", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7199,-45.5690&navigate=yes", google: "" },
        { id: 108, name: "Dona Chica Capivari", category: "restaurant", lat: -22.7172973, lng: -45.5665238, address: "Parque Capivari - R. Eng. Diogo José de Carvalho, 1291", phone: "(12) 3663-1518", hours: "Seg-Dom: 11h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7172973,-45.5665238&navigate=yes", google: "" },
        { id: 109, name: "Empório dos Mellos", category: "restaurant", lat: -22.7601, lng: -45.6004, address: "R. Elídio Gonçalves da Silva, 1800", phone: "(12) 3662-6666", hours: "Seg-Dom: 9h-19h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7601,-45.6004&navigate=yes", google: "" },
        { id: 110, name: "Le Foyer Restaurante", category: "restaurant", lat: -22.7293081, lng: -45.5759574, address: "R. Cantídio Pereira de Castro, 100 - Vila Everest", phone: "(12) 3662-7777", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7293081,-45.5759574&navigate=yes", google: "" },
        { id: 111, name: "Ludwig Restaurant", category: "restaurant", lat: -22.7156924, lng: -45.5668123, address: "R. Aristides de Souza Mello, 50 - Capivari", phone: "(12) 3662-1010", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7156924,-45.5668123&navigate=yes", google: "" },
        { id: 112, name: "Maná Restaurante e Pizzaria", category: "restaurant", lat: -22.7195, lng: -45.5670, address: "Av. Macedo Soares, 187 - Capivari", phone: "(12) 3662-8888", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7195,-45.5670&navigate=yes", google: "" },
        { id: 113, name: "Matterhorn Empório e Restaurante", category: "restaurant", lat: -22.7193421, lng: -45.5669542, address: "R. Djalma Forfaz, 93 - Praça do Capivari", phone: "(12) 3663-9999", hours: "Seg-Dom: 11h-22h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7193421,-45.5669542&navigate=yes", google: "" },
        { id: 114, name: "Mercearia Campos", category: "restaurant", lat: -22.7195, lng: -45.5665, address: "R. Vitor Godinho, 25 - Capivari", phone: "(12) 3663-0000", hours: "Seg-Dom: 10h-20h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7195,-45.5665&navigate=yes", google: "" },
        { id: 115, name: "Paris Station Restaurante", category: "restaurant", lat: -22.7199815, lng: -45.5664831, address: "R. Djalma Forfaz, 263 - Capivari", phone: "(12) 3663-1111", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7199815,-45.5664831&navigate=yes", google: "" },
        { id: 116, name: "Restaurante Art BBQ", category: "restaurant", lat: -22.7100, lng: -45.5567, address: "R. 5, 308 - Vila Floresta", phone: "(12) 3662-2222", hours: "Seg-Dom: 12h-22h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7100,-45.5567&navigate=yes", google: "" },
        { id: 117, name: "Restaurante Cantinho da Serra Grill", category: "restaurant", lat: -22.7200, lng: -45.5680, address: "Av. Macedo Soares, 457 - Capivari", phone: "(12) 3662-3333", hours: "Seg-Dom: 11h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7200,-45.5680&navigate=yes", google: "" },
        { id: 118, name: "Restaurante Cantinho Suíço", category: "restaurant", lat: -22.7202, lng: -45.5682, address: "Av. Macedo Soares, 457 - Capivari", phone: "(12) 3662-2525", hours: "Seg-Dom: 11h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7202,-45.5682&navigate=yes", google: "" },
        { id: 119, name: "Restaurante Nevada", category: "restaurant", lat: -22.7192748, lng: -45.5666532, address: "Av. Macedo Soares, 159 - Capivari", phone: "(12) 3662-4444", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7192748,-45.5666532&navigate=yes", google: "" },
        { id: 120, name: "Restaurante Vila Chã", category: "restaurant", lat: -22.6940156, lng: -45.5181143, address: "Av. Pedro Paulo, 7545 - Descansópolis", phone: "(12) 3662-5555", hours: "Seg-Dom: 12h-22h", image: "", waze: "https://ul.waze.com/ul?ll=-22.6940156,-45.5181143&navigate=yes", google: "" },
        { id: 121, name: "Sabor Chocolate", category: "restaurant", lat: -22.7196, lng: -45.5665, address: "R. Djalma Forfaz, 103 - Capivari", phone: "(12) 3663-6666", hours: "Seg-Dom: 10h-20h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7196,-45.5665&navigate=yes", google: "" },
        { id: 122, name: "Sans Souci Confeitaria & Café", category: "restaurant", lat: -22.7212318, lng: -45.5614738, address: "Av. Dr. Januário Miraglia, 3.260 - Jaguaribe", phone: "(12) 3662-7777", hours: "Seg-Dom: 9h-19h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7212318,-45.5614738&navigate=yes", google: "" },
        { id: 123, name: "Tainakan Gourmet", category: "restaurant", lat: -22.7600, lng: -45.6080, address: "Av. José Antônio Manso, 1515 - Parque Tarundu", phone: "(12) 3800-0150", hours: "Seg-Dom: 12h-17h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7600,-45.6080&navigate=yes", google: "" },
        { id: 124, name: "Tapiti Confeitaria & Brunch", category: "restaurant", lat: -22.7822256, lng: -45.6067511, address: "Est. Municipal Aurora Nogueira Barros Vasconcellos, 100", phone: "(12) 3662-8888", hours: "Qua-Dom: 9h-18h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7822256,-45.6067511&navigate=yes", google: "" },
        { id: 125, name: "Trattoria Salvador", category: "restaurant", lat: -22.7195, lng: -45.5682, address: "Av. Macedo Soares, 489 - Capivari", phone: "(12) 3662-9999", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7195,-45.5682&navigate=yes", google: "" },
        { id: 126, name: "Villa Gourmet", category: "restaurant", lat: -22.7197146, lng: -45.5669546, address: "Av. Macedo Soares, 203 - Capivari", phone: "(12) 3662-0000", hours: "Seg-Dom: 12h-22h", image: "", waze: "https://ul.waze.com/ul?ll=-22.7197146,-45.5669546&navigate=yes", google: "" },
        { id: 127, name: "Villa Montese Bar & Ristorante", category: "restaurant", lat: -22.720914, lng: -45.5697519, address: "Av. Macedo Soares, 508 - Vila Capivari", phone: "(12) 3662-1111", hours: "Seg-Dom: 12h-23h", image: "", waze: "https://ul.waze.com/ul?ll=-22.720914,-45.5697519&navigate=yes", google: "" },

        // ========== ATRAÇÕES ==========
        { id: 201, name: "Auditório Claudio Santoro", category: "attraction", lat: -22.7427005, lng: -45.6336612, address: "Av. Dr. Luis Arrobas Martins, 1800 - Alto Boa Vista", phone: "(12) 3662-6000", hours: "Varia conforme programação", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/auditorio_claudio_santoro.jpg", waze: "https://ul.waze.com/ul?ll=-22.7427005,-45.6336612&navigate=yes", google: "" },
        { id: 202, name: "Parque Tarundu", category: "attraction", lat: -22.7656875, lng: -45.6003542, address: "Av. José A. Manso, 1515 - Toriba", phone: "(12) 3668-9595", hours: "Sáb-Dom: 9h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/tarundu.jpg", waze: "https://ul.waze.com/ul?ll=-22.7656875,-45.6003542&navigate=yes", google: "" },
        { id: 203, name: "Dreams House Park", category: "attraction", lat: -22.7206525, lng: -45.5729856, address: "R. Roberto Jeffery, 30 - Capivari", phone: "(12) 99600-5577", hours: "Dom-Sex: 10h-18h, Sáb: 10h-20h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/dreamhouse.png", waze: "https://ul.waze.com/ul?ll=-22.7206525,-45.5729856&navigate=yes", google: "" },
        { id: 204, name: "Estrada de Ferro Campos do Jordão", category: "attraction", lat: -22.7180701, lng: -45.5674556, address: "Av. Emílio Ribas, s/n - Capivari", phone: "(12) 3663-1531", hours: "Sáb-Dom: 9h-17h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/efcj.jpg", waze: "https://ul.waze.com/ul?ll=-22.7180701,-45.5674556&navigate=yes", google: "" },
        { id: 205, name: "Cervejaria Baden Baden", category: "attraction", lat: -22.7479278, lng: -45.6202276, address: "Av. Matheus da Costa Pinto, 1653", phone: "(12) 3664-2004", hours: "Sáb-Dom: 10h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/fabrica_baden.jpg", waze: "https://ul.waze.com/ul?ll=-22.7479278,-45.6202276&navigate=yes", google: "" },
        { id: 206, name: "Iceland - Bar de Gelo", category: "attraction", lat: -22.7181058, lng: -45.5667373, address: "Av. Macedo Soares, 123 - Capivari", phone: "(12) 99782-5874", hours: "Seg-Dom: 10h-21h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/iceland-800x450.png", waze: "https://ul.waze.com/ul?ll=-22.7181058,-45.5667373&navigate=yes", google: "" },
        { id: 207, name: "Ducha de Prata", category: "attraction", lat: -22.7381029, lng: -45.569105, address: "Av. Mariane Baungart, 2485 - Vila Izabel", phone: "", hours: "Sáb-Dom: 8h30-17h30", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/ducha_prata.jpg", waze: "https://ul.waze.com/ul?ll=-22.7381029,-45.569105&navigate=yes", google: "" },
        { id: 208, name: "Museu Casa da Xilogravura", category: "attraction", lat: -22.7278268, lng: -45.585423, address: "Av. Eduardo Moreira da Cruz, 295 - Jardim Jaguaribe", phone: "(12) 3662-1832", hours: "Ter-Dom: 9h-17h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/museu_xilogravura.jpg", waze: "https://ul.waze.com/ul?ll=-22.7278268,-45.585423&navigate=yes", google: "" },
        { id: 209, name: "Museu Felícia Leirner", category: "attraction", lat: -22.7348917, lng: -45.6121861, address: "Av. Dr. Luis Arrobas Martins, 1880 - Alto Boa Vista", phone: "(12) 3512-2508", hours: "Ter-Dom: 9h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/museu_felicia_leirner.jpg", waze: "https://ul.waze.com/ul?ll=-22.7348917,-45.6121861&navigate=yes", google: "" },
        { id: 210, name: "Palácio da Boa Vista", category: "attraction", lat: -22.7359333, lng: -45.6127636, address: "Av. Adhemar Pereira de Barros, 3001 - Jardim Dirce", phone: "(12) 3668-9700", hours: "Sáb-Dom: 10h-17h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/palacio_boa_vista.jpg", waze: "https://ul.waze.com/ul?ll=-22.7359333,-45.6127636&navigate=yes", google: "" },
        { id: 211, name: "Parque Amantikir", category: "attraction", lat: -22.7835819, lng: -45.6028104, address: "R. Simplício Ribeiro de Toledo Neto, 2200 - Gavião Gonzaga", phone: "(12) 99634-6784", hours: "Sáb-Dom: 9h-16h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/2-800x450.png", waze: "https://ul.waze.com/ul?ll=-22.7835819,-45.6028104&navigate=yes", google: "" },
        { id: 212, name: "Bosque do Silêncio", category: "attraction", lat: -22.7335427, lng: -45.5714982, address: "Av. Sen. Roberto Simonsen, 1724 - Jardim Alpestre", phone: "(12) 99260-7027", hours: "Sáb-Dom: 9h-17h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/bosque_silencio.jpg", waze: "https://ul.waze.com/ul?ll=-22.7335427,-45.5714982&navigate=yes", google: "" },
        { id: 213, name: "Parque Capivari", category: "attraction", lat: -22.7177723, lng: -45.5661137, address: "R. Eng. Diogo José de Carvalho, 1291 - Capivari", phone: "(12) 3663-6463", hours: "Seg-Dom: 9h-22h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7177723,-45.5661137&navigate=yes", google: "" },
        { id: 214, name: "Parque da Cerveja", category: "attraction", lat: -22.781498, lng: -45.6040617, address: "Estr. Mun. Paulo Costa Lenz Cesar, 2150 - Alto Lajeado", phone: "(12) 99790-6955", hours: "Sáb-Dom: 10h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/1-800x450.png", waze: "https://ul.waze.com/ul?ll=-22.781498,-45.6040617&navigate=yes", google: "" },
        { id: 215, name: "Parque da Lagoinha", category: "attraction", lat: -22.7094417, lng: -45.5479686, address: "Av. Pedro Paulo, 1455 - Lot. Veu da Noiva", phone: "(12) 3662-6677", hours: "Sáb-Dom: 9h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2025/03/paruqe-da-lagoinha-800x464.jpg", waze: "https://ul.waze.com/ul?ll=-22.7094417,-45.5479686&navigate=yes", google: "" },
        { id: 216, name: "Parque Estadual Campos do Jordão", category: "attraction", lat: -22.6924167, lng: -45.4554167, address: "Av. Pedro Paulo, s/n - Horto Florestal", phone: "(12) 99607-0501", hours: "Seg-Dom: 9h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2026/01/Untitled-design.png", waze: "https://ul.waze.com/ul?ll=-22.6924167,-45.4554167&navigate=yes", google: "" },
        { id: 217, name: "Pico do Itapeva", category: "attraction", lat: -22.7648196, lng: -45.5292868, address: "Estrada do Pico do Itapeva", phone: "", hours: "Aberto 24h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pico_itapeva.jpg", waze: "https://ul.waze.com/ul?ll=-22.7648196,-45.5292868&navigate=yes", google: "" },
        { id: 218, name: "Morro do Elefante", category: "attraction", lat: -22.7135276, lng: -45.5665424, address: "Av. da Vila Médica - Jardim Belvedere", phone: "", hours: "Seg-Dom: 9h-22h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/morro_elefante.jpg", waze: "https://ul.waze.com/ul?ll=-22.7135276,-45.5665424&navigate=yes", google: "" },
        { id: 219, name: "Pedra do Baú", category: "attraction", lat: -22.688889, lng: -45.661389, address: "Parque Pedra do Baú - São Bento do Sapucaí", phone: "", hours: "Aberto 24h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pedra_do_bau.jpg", waze: "https://ul.waze.com/ul?ll=-22.688889,-45.661389&navigate=yes", google: "" },
        { id: 220, name: "Teleférico de Campos do Jordão", category: "attraction", lat: -22.7134274, lng: -45.5659753, address: "R. Eng. Diogo José de Carvalho - Capivari", phone: "(12) 3664-1418", hours: "Seg-Dom: 9h-17h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/morro_elefante.jpg", waze: "https://ul.waze.com/ul?ll=-22.7134274,-45.5659753&navigate=yes", google: "" },

        // ========== PRESTADORES DE SERVIÇOS ==========
        { id: 301, name: "Amarelinha Tintas", category: "service", lat: -22.7334, lng: -45.5789, address: "Capivari", phone: "(12) 3662-1111", hours: "Seg-Sex: 8h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7334,-45.5789&navigate=yes", google: "" },
        { id: 302, name: "Aroma dos Deuses", category: "service", lat: -22.7356, lng: -45.5801, address: "Capivari", phone: "(12) 3662-2222", hours: "Seg-Sab: 9h-19h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7356,-45.5801&navigate=yes", google: "" },
        { id: 303, name: "AR Solutions", category: "service", lat: -22.7312, lng: -45.5823, address: "Vila Inglesa", phone: "(12) 3662-3333", hours: "Seg-Sex: 8h-18h", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.7312,-45.5823&navigate=yes", google: "" },
        { id: 304, name: "Arte Vision", category: "service", lat: -22.7378, lng: -45.5756, address: "Capivari", phone: "(12) 3663-4444", hours: "Seg-Sex: 9h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7378,-45.5756&navigate=yes", google: "" },
        { id: 305, name: "Altezze", category: "service", lat: -22.7345, lng: -45.5812, address: "Capivari", phone: "(12) 3662-5555", hours: "Seg-Sab: 10h-20h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7345,-45.5812&navigate=yes", google: "" },
        { id: 306, name: "Boulevard Geneve", category: "service", lat: -22.7367, lng: -45.5778, address: "Capivari", phone: "(12) 3663-6666", hours: "Seg-Dom: 10h-22h", image: "https://static.wixstatic.com/media/91d627_0e8048ae9ed044b582a20b9061aaac7b~mv2.jpg/v1/fill/w_1152,h_799,fp_0.50_0.50,q_85,enc_avif,quality_auto/91d627_0e8048ae9ed044b582a20b9061aaac7b~mv2.jpg", waze: "https://ul.waze.com/ul?ll=-22.7367,-45.5778&navigate=yes", google: "" },
        { id: 307, name: "Brasil Eventos (UTI Móvel)", category: "service", lat: -22.735, lng: -45.579, address: "Av. Macedo Soares, 500 - Vila Inglesa", phone: "(12) 3664-9012", hours: "24 horas", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.735,-45.579&navigate=yes", google: "" },
        { id: 308, name: "Buffet Cintra", category: "service", lat: -22.7289, lng: -45.5845, address: "Jaguaribe", phone: "(12) 3662-7777", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7289,-45.5845&navigate=yes", google: "" },
        { id: 309, name: "Campos Hall", category: "service", lat: -22.7312, lng: -45.5867, address: "Vila Inglesa", phone: "(12) 3662-8888", hours: "Sob consulta", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.7312,-45.5867&navigate=yes", google: "" },
        { id: 310, name: "CCMAC", category: "service", lat: -22.7334, lng: -45.5834, address: "Capivari", phone: "(12) 3662-9999", hours: "Seg-Sex: 9h-17h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7334,-45.5834&navigate=yes", google: "" },
        { id: 311, name: "Campos di Aromas", category: "service", lat: -22.7378, lng: -45.5763, address: "R. Djalma Forfaz - Capivari", phone: "(12) 3663-0000", hours: "Seg-Dom: 10h-20h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7378,-45.5763&navigate=yes", google: "" },
        { id: 312, name: "Carmola Cândido Eventos", category: "service", lat: -22.7301, lng: -45.5801, address: "Jaguaribe", phone: "(12) 3662-1111", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7301,-45.5801&navigate=yes", google: "" },
        { id: 313, name: "CGM Promoeventos", category: "service", lat: -22.7356, lng: -45.5823, address: "Capivari", phone: "(12) 3662-2222", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7356,-45.5823&navigate=yes", google: "" },
        { id: 314, name: "Comida dos Dinossauros", category: "service", lat: -22.7267, lng: -45.5789, address: "Vila Inglesa", phone: "(12) 3662-3333", hours: "Sob consulta", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.7267,-45.5789&navigate=yes", google: "" },
        { id: 315, name: "Da Vivere - Espaço de eventos", category: "service", lat: -22.7389, lng: -45.5867, address: "Alto da Boa Vista", phone: "(12) 3668-4444", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/pedra_do_bau.jpg", waze: "https://ul.waze.com/ul?ll=-22.7389,-45.5867&navigate=yes", google: "" },
        { id: 316, name: "DF Studio", category: "service", lat: -22.7345, lng: -45.5778, address: "Capivari", phone: "(12) 3662-5555", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7345,-45.5778&navigate=yes", google: "" },
        { id: 317, name: "Enfoc Promoções e Eventos", category: "service", lat: -22.7312, lng: -45.5801, address: "Vila Inglesa", phone: "(12) 3662-6666", hours: "Sob consulta", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.7312,-45.5801&navigate=yes", google: "" },
        { id: 318, name: "Engepark", category: "service", lat: -22.7378, lng: -45.5845, address: "Capivari", phone: "(12) 3663-7777", hours: "Seg-Sex: 8h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7378,-45.5845&navigate=yes", google: "" },
        { id: 319, name: "Flávia Torres Decoração", category: "service", lat: -22.7334, lng: -45.5867, address: "Jaguaribe", phone: "(12) 3662-8888", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7334,-45.5867&navigate=yes", google: "" },
        { id: 320, name: "Gourmet Campos do Jordão", category: "service", lat: -22.7356, lng: -45.5756, address: "Av. Macedo Soares - Capivari", phone: "(12) 3662-9999", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7356,-45.5756&navigate=yes", google: "" },
        { id: 321, name: "Grupo S1", category: "service", lat: -22.7289, lng: -45.5812, address: "Vila Inglesa", phone: "(12) 3662-0000", hours: "Sob consulta", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.7289,-45.5812&navigate=yes", google: "" },
        { id: 322, name: "Life Corp Ambulâncias", category: "service", lat: -22.7312, lng: -45.5834, address: "Jaguaribe", phone: "(12) 3662-1111", hours: "24 horas", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7312,-45.5834&navigate=yes", google: "" },
        { id: 323, name: "Limoeiro", category: "service", lat: -22.7267, lng: -45.5823, address: "Vila Inglesa", phone: "(12) 3662-2222", hours: "Sob consulta", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.7267,-45.5823&navigate=yes", google: "" },
        { id: 324, name: "Manoel Costa Cerimonial", category: "service", lat: -22.7378, lng: -45.5801, address: "Capivari", phone: "(12) 3663-3333", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7378,-45.5801&navigate=yes", google: "" },
        { id: 325, name: "Mantiqueira Turismo", category: "service", lat: -22.737, lng: -45.577, address: "R. Eng. Diogo José de Carvalho, 1200 - Capivari", phone: "(12) 3662-1234", hours: "Seg-Sex: 9h-18h", image: "https://www.mantiqueiraturismo.com.br/images/carousel/background.webp", waze: "https://ul.waze.com/ul?ll=-22.737,-45.577&navigate=yes", google: "" },
        { id: 326, name: "Mountain Rescue - Bombeiros", category: "service", lat: -22.7301, lng: -45.5856, address: "Centro", phone: "193", hours: "24 horas", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/pedra_do_bau.jpg", waze: "https://ul.waze.com/ul?ll=-22.7301,-45.5856&navigate=yes", google: "" },
        { id: 327, name: "Movie Tour", category: "service", lat: -22.7345, lng: -45.5812, address: "Capivari", phone: "(12) 3662-4444", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7345,-45.5812&navigate=yes", google: "" },
        { id: 328, name: "Musicampos - Eric Lujan", category: "service", lat: -22.7367, lng: -45.5789, address: "Capivari", phone: "(12) 3663-5555", hours: "Sob consulta", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/auditorio_claudio_santoro.jpg", waze: "https://ul.waze.com/ul?ll=-22.7367,-45.5789&navigate=yes", google: "" },
        { id: 329, name: "Nova Opção Locadora", category: "service", lat: -22.7289, lng: -45.5867, address: "Jaguaribe", phone: "(12) 3662-6666", hours: "Seg-Sab: 8h-18h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7289,-45.5867&navigate=yes", google: "" },
        { id: 330, name: "Recreação Ninja", category: "service", lat: -22.7312, lng: -45.5778, address: "Vila Inglesa", phone: "(12) 3662-7777", hours: "Sob consulta", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg", waze: "https://ul.waze.com/ul?ll=-22.7312,-45.5778&navigate=yes", google: "" },
        { id: 331, name: "Terra Campos Ambiental", category: "service", lat: -22.7256, lng: -45.5845, address: "Jaguaribe", phone: "(12) 3662-8888", hours: "Seg-Sex: 8h-17h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/parque_capivari.jpg", waze: "https://ul.waze.com/ul?ll=-22.7256,-45.5845&navigate=yes", google: "" },
        { id: 332, name: "Turismo na Montanha", category: "service", lat: -22.736, lng: -45.578, address: "Av. Dr. Jan Antonin Bata, 1000 - Capivari", phone: "(12) 3663-5678", hours: "Seg-Sab: 8h-20h", image: "https://www.turismonamontanha.com.br/assets/images/me.jpg", waze: "https://ul.waze.com/ul?ll=-22.736,-45.578&navigate=yes", google: "" },
        { id: 333, name: "Vinho até Você", category: "service", lat: -22.734, lng: -45.58, address: "R. Dr. José Pinto de Almeida, 200 - Jaguaribe", phone: "(12) 3665-3456", hours: "Seg-Sex: 10h-19h", image: "https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/fabrica_baden.jpg", waze: "https://ul.waze.com/ul?ll=-22.734,-45.58&navigate=yes", google: "" },
      ];

      // Mapeamento direto de imagens por ID do local (usando imagens do site)
      const imageMapById: Record<number, string> = {
        // Hotéis - usando imagens reais do site visitecamposdojordao.org.br
        1: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/Design-sem-nome.png',
        2: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_hotel_800.jpg',
        3: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/1.png',
        4: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/chris_park_800.jpg',
        5: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/home_green.jpg',
        6: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/palazzo_reale.jpg',
        7: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/ascona.png',
        8: 'https://visitecamposdojordao.org.br/wp-content/uploads/2024/02/Externa-Quebra-Noz-6-scaled.jpg',
        9: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/dan_inn.jpg',
        10: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/hotel-estoril-800x450.png',
        11: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/le_renard.jpg',
        12: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/leao_montanha.jpg',
        13: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/2.png',
        14: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/sao_cristovao.jpg',
        15: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/SOLAR-IZABEL-800x450.png',
        16: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/hotel-toriba.png',
        17: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/vila_inglesa.jpg',
        18: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/le-suisse.png',
        // Pousadas com imagens reais do site
        19: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/parador-760x428.png',
        20: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/alto-da-boa-vista-760x428.png',
        21: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/annecy.jpg',
        22: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/campos_provence.jpg',
        23: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/campos_holandeses.jpg',
        24: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/cantinh.jpg',
        25: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/casa-chocolate-760x428.png',
        26: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/la_villette.jpg',
        27: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pousada_pedra.jpg',
        28: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pousada_hortensias.jpg',
        29: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/Design-sem-nome-1-760x570.png',
        30: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pousada_conde.jpg',
        31: 'https://visitecamposdojordao.org.br/wp-content/uploads/2024/02/Figueira-da-Serra-Geral-056-760x570.jpg',
        32: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/kaliman.jpg',
        33: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/latoscana.jpg',
        34: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/luis_xv.jpg',
        35: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/murata-760x428.png',
        36: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/Relatorio-frequencia-custo.png',
        37: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/recantoalmeida.jpg',
        38: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/vila-das-cores-760x428.png',
        39: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/villa_dbiagy.jpg',
        40: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/villa_dbiagy_premium.jpg',
        41: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/villagio_italia.jpg',
        42: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/Surya-pan-760x428.png',
        43: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/zur-760x428.png',
        // Restaurantes - usando imagens locais de Onde Comer
        101: '/images/gastronomia/alto_brasa.jpg',
        102: '/images/gastronomia/bam_bam.jpg',
        103: '/images/gastronomia/bella_vista.jpg',
        104: '/images/gastronomia/luss.jpg',
        105: '/images/gastronomia/caras_malte.jpg',
        106: '/images/gastronomia/baden.jpg',
        107: '/images/gastronomia/churrasco.jpg',
        108: '/images/gastronomia/dona_chica.jpg',
        109: '/images/gastronomia/emporio.jpg',
        110: '/images/gastronomia/le_foyer.jpg',
        111: '/images/gastronomia/ludwig.jpg',
        112: '/images/gastronomia/mana.jpg',
        113: '/images/gastronomia/matterhorn.jpg',
        114: '/images/gastronomia/mercearia.jpg',
        115: '/images/gastronomia/paris_station.jpg',
        116: '/images/gastronomia/art_bbq.jpg',
        117: '/images/gastronomia/cantinho_serra.jpg',
        118: '/images/gastronomia/cantinho_suico.jpg',
        119: '/images/gastronomia/nevada.jpg',
        120: '/images/gastronomia/vilacha.jpg',
        121: '/images/gastronomia/sabor_chocolate.jpg',
        122: '/images/gastronomia/sans_souci.jpg',
        123: '/images/gastronomia/tainakan.jpg',
        124: '/images/gastronomia/tapiti.jpg',
        125: '/images/gastronomia/trattoria.jpg',
        126: '/images/gastronomia/villa_gourmet.jpg',
        127: '/images/gastronomia/villa_montese.jpg',
        // Atrações - usando imagens reais do site visitecamposdojordao.org.br
        201: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/auditorio_claudio_santoro.jpg',
        202: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/tarundu.jpg',
        203: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/dreamhouse.png',
        204: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/efcj.jpg',
        205: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/fabrica_baden.jpg',
        206: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/iceland-800x450.png',
        207: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/maostiqueira.jpg',
        208: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/museu_xilogravura.jpg',
        209: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/museu_felicia_leirner.jpg',
        210: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/palacio_boa_vista.jpg',
        211: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/2-800x450.png',
        212: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/bosque_silencio.jpg',
        213: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg',
        214: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/1-800x450.png',
        215: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/03/paruqe-da-lagoinha-800x464.jpg',
        216: 'https://visitecamposdojordao.org.br/wp-content/uploads/2026/01/Untitled-design.png',
        217: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pico_itapeva.jpg',
        218: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/morro_elefante.jpg',
        219: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pedra_do_bau.jpg',
        // Serviços - URLs reais de Campos do Jordão
        301: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Amarelinha Tintas - Capivari
        302: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Aroma dos Deuses - Capivari
        303: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // AR Solutions - Vila Inglesa
        304: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // Arte Vision - Capivari
        305: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Altezze - Capivari
        306: 'https://static.wixstatic.com/media/91d627_0e8048ae9ed044b582a20b9061aaac7b~mv2.jpg/v1/fill/w_1152,h_799,fp_0.50_0.50,q_85,enc_avif,quality_auto/91d627_0e8048ae9ed044b582a20b9061aaac7b~mv2.jpg', // Boulevard Geneve
        307: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Brasil Eventos - Vila Inglesa
        308: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Buffet Cintra - Jaguaribe
        309: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // Campos Hall - Vila Inglesa
        310: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // CCMAC - Capivari
        311: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Campos di Aromas - Capivari
        312: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Carmola Cândido Eventos - Jaguaribe
        313: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // CGM Promoeventos - Capivari
        314: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // Comida dos Dinossauros - Vila Inglesa
        315: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Da Vivere - Alto da Boa Vista
        316: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // DF Studio - Capivari
        317: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // Enfoc Promoções - Vila Inglesa
        318: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Engepark - Capivari
        319: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Flávia Torres Decoração - Jaguaribe
        320: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Gourmet Campos do Jordão - Capivari
        321: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // Grupo S1 - Vila Inglesa
        322: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Life Corp Ambulâncias - Jaguaribe
        323: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // Limoeiro - Vila Inglesa
        324: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Manoel Costa Cerimonial - Capivari
        325: 'https://www.mantiqueiraturismo.com.br/images/carousel/background.webp', // Mantiqueira Turismo
        326: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Mountain Rescue - Centro
        327: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Movie Tour - Capivari
        328: 'https://visitecamposdojordao.org.br/wp-content/uploads/2023/07/auditorio_claudio_santoro.jpg', // Musicampos - Capivari
        329: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Nova Opção Locadora - Jaguaribe
        330: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg/800px-Boulevard_Geneve%2C_Campos_do_Jord%C3%AÃ£o.jpg', // Recreação Ninja - Vila Inglesa
        331: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg', // Terra Campos Ambiental - Jaguaribe
        332: 'https://www.turismonamontanha.com.br/assets/images/me.jpg', // Turismo na Montanha
        333: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/fabrica_baden.jpg', // Vinho até Você - Jaguaribe
      };

      function findImageFor(loc: any) {
        // 1. Busca por ID (mais preciso)
        if (loc.id && imageMapById[loc.id]) {
          return imageMapById[loc.id];
        }
        
        const name = (loc.name || '').toLowerCase();
        
        // 2. Busca em TOURS
        const tourMatch = TOURS.find(t => {
          const tTitle = (t.title || '').toLowerCase();
          return tTitle.includes(name) || name.includes(tTitle) || 
                 name.split(' ').some(word => word.length > 4 && tTitle.includes(word));
        });
        if (tourMatch && tourMatch.imageUrl) return tourMatch.imageUrl;
        
        // 3. Busca em SITE_CONTENT.restaurants (imagens locais)
        const resto = (SITE_CONTENT.restaurants || []).find((r: any) => {
          const rName = (r.name || '').toLowerCase();
          return rName.includes(name) || name.includes(rName) ||
                 name.split(' ').some((word: string) => word.length > 4 && rName.includes(word));
        });
        if (resto && resto.image) return resto.image;
        
        // 4. Fallback para placeholder confiável
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';
      }

      const locations = rawLocations.map(l => ({ ...l, image: findImageFor(l) }));

      const categoryConfig: any = { hotel: { color: '#3498db', icon: 'bed', name: 'Hotel/Pousada' }, restaurant: { color: '#e74c3c', icon: 'utensils', name: 'Restaurante/Bar' }, attraction: { color: '#2ecc71', icon: 'mountain', name: 'Atração Turística' }, service: { color: '#9b59b6', icon: 'concierge-bell', name: 'Serviço' } };

      let map: any; let markers: any[] = []; let selectedLocation: any = null; let currentCategory: any = 'all'; let currentSearch: any = '';

      function initMap() {
          // Centro no Parque Capivari - coração turístico de Campos do Jordão
          map = L.map('main-map', { minZoom: 12, maxZoom: 19, maxBounds: CAMPOS_BOUNDS, maxBoundsViscosity: 0.9 }).setView([-22.7177, -45.5661], 14);
        
        // Tile layer estilo Google Maps (CartoDB Voyager - visual limpo e moderno)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);
        
        addMarkers(); loadLocationsList(); setupEventListeners(); updateInterface(); (window as any).map = map;
      }

      function addMarkers() {
        // Limpar marcadores existentes
        markers.forEach(m => map.removeLayer(m));
        markers = [];
        
        // Filtrar locais com base na categoria atual
        const filteredLocations = locations.filter((location: any) => {
          const matchesCategory = currentCategory === 'all' || location.category === currentCategory;
          const matchesSearch = location.name.toLowerCase().includes(currentSearch.toLowerCase()) || location.address.toLowerCase().includes(currentSearch.toLowerCase());
          return matchesCategory && matchesSearch;
        });
        
        filteredLocations.forEach((location: any) => {
          if (!location.lat || !location.lng) return;
          const config = categoryConfig[location.category];
          let iconHtml = '';
          
          // Se estiver em "Todos", mostra apenas ícones por categoria
          // Se estiver filtrado por categoria específica, mostra miniaturas com imagens
          if (currentCategory === 'all') {
            // Ícone circular colorido por categoria
            iconHtml = `<div style="background-color: ${config.color}; width:36px; height:36px; border-radius:50%; border:3px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.35); display:flex; align-items:center; justify-content:center; cursor:pointer; transition: transform 0.2s;">
              <i class="fas fa-${config.icon}" style="color:white; font-size:16px;"></i>
            </div>`;
          } else {
            // Miniatura com imagem do local
            const imgUrl = location.image;
            if (imgUrl && !imgUrl.includes('unsplash.com')) {
              iconHtml = `<div style="width:42px;height:42px;border-radius:8px;overflow:hidden;border:3px solid ${config.color};box-shadow:0 2px 6px rgba(0,0,0,0.35);cursor:pointer;background:${config.color};">
                <img src="${imgUrl}" onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%\\'><i class=\\'fas fa-${config.icon}\\' style=\\'color:white;font-size:16px\\'></i></div>'" style="width:100%;height:100%;object-fit:cover;display:block" alt="${location.name}"/>
              </div>`;
            } else {
              iconHtml = `<div style="background-color: ${config.color}; width:42px; height:42px; border-radius:8px; border:3px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.35); display:flex; align-items:center; justify-content:center; cursor:pointer;">
                <i class="fas fa-${config.icon}" style="color:white; font-size:18px;"></i>
              </div>`;
            }
          }
          
          const icon = L.divIcon({ html: iconHtml, className: 'custom-marker', iconSize: [42,42], iconAnchor: [21,21] });
          const marker = L.marker([location.lat, location.lng], { icon: icon, title: location.name }).addTo(map);
          marker.bindPopup(`<div style="min-width:200px;"><div class="popup-title">${location.name}</div><div class="popup-category" style="background-color:${config.color}">${config.name}</div><div style="font-size:12px;color:#666;margin-bottom:10px;">${location.address}</div><div class="popup-actions"><button onclick=\"event.stopPropagation(); window.selectLocationById(${location.id})\" class=\"popup-btn\"><i class=\"fas fa-info-circle\"></i> Detalhes</button><button onclick=\"event.stopPropagation(); window.navigateToLocation(${location.id})\" class=\"popup-btn\"><i class=\"fas fa-directions\"></i> Navegar</button></div></div>`);
          (marker as any).location = location; markers.push(marker); marker.on('click', () => selectLocation(location));
        });
      }

      function loadLocationsList() {
        const listContainer = document.getElementById('locations-list'); if (!listContainer) return; listContainer.innerHTML = '';
        const filteredLocations = locations.filter((location: any) => { const matchesCategory = currentCategory === 'all' || location.category === currentCategory; const matchesSearch = location.name.toLowerCase().includes(currentSearch.toLowerCase()) || location.address.toLowerCase().includes(currentSearch.toLowerCase()); return matchesCategory && matchesSearch; });
        if (filteredLocations.length === 0) { listContainer.innerHTML = `<div style=\"text-align:center;padding:40px 20px;color:#666;\"><i class=\"fas fa-search\" style=\"font-size:2rem;margin-bottom:10px;\"></i><p>Nenhum local encontrado</p></div>`; return; }
        filteredLocations.forEach((location: any) => {
          const config = categoryConfig[location.category];
          const thumb = location.image || '/images/gastronomia/placeholder.svg';
          const item = document.createElement('div');
          item.className = 'location-item';
          if (selectedLocation && selectedLocation.id === location.id) item.classList.add('active');
          item.innerHTML = `
            <div class="location-row">
              <img class="location-thumb" src="${thumb}" onerror="this.src='/images/gastronomia/placeholder.svg'" alt="${location.name}" />
              <div class="location-body">
                <div class="location-header">
                  <div class="location-name">${location.name}</div>
                  <div class="location-category ${location.category}-category">${config.name}</div>
                </div>
                <div class="location-address"><i class="fas fa-map-marker-alt"></i> ${location.address}</div>
                <div class="location-actions">
                  <button class="action-btn" onclick="event.stopPropagation(); window.selectLocationById(${location.id})"><i class="fas fa-eye"></i> Ver</button>
                  <button class="action-btn" onclick="event.stopPropagation(); window.navigateToLocation(${location.id})"><i class="fas fa-directions"></i> Navegar</button>
                </div>
              </div>
            </div>
          `;
          item.addEventListener('click', () => selectLocation(location));
          listContainer.appendChild(item);
        });
      }

      function selectLocation(location: any) { selectedLocation = location; updateInfoPanel(); map.setView([location.lat, location.lng], 16); markers.forEach(marker => { if (marker.location.id === location.id) { marker.openPopup(); const el = marker.getElement(); if (el) { el.classList.add('pulse-marker'); (el as any).style.zIndex = '1000'; setTimeout(() => { el.classList.remove('pulse-marker'); (el as any).style.zIndex = '100'; }, 3000); } } }); loadLocationsList(); }

      (window as any).selectLocationById = function(id: number) { const location = locations.find((loc: any) => loc.id === id); if (location) selectLocation(location); };
      (window as any).navigateToLocation = function(id: number) { const location = locations.find((loc: any) => loc.id === id); if (!location) return; window.open(location.waze, '_blank'); };

      function updateInfoPanel() { if (!selectedLocation) return; const config = categoryConfig[selectedLocation.category]; const nameEl = document.getElementById('info-name'); if (nameEl) nameEl.textContent = selectedLocation.name; const catEl = document.getElementById('info-category'); if (catEl) catEl.textContent = config.name; const addrEl = document.getElementById('info-address'); if (addrEl) addrEl.textContent = selectedLocation.address; const phoneEl = document.getElementById('info-phone'); if (phoneEl) phoneEl.textContent = selectedLocation.phone || 'Não informado'; const hoursEl = document.getElementById('info-hours'); if (hoursEl) hoursEl.textContent = selectedLocation.hours || ''; const img = document.getElementById('info-image') as HTMLImageElement | null; if (img) { img.src = selectedLocation.image; img.alt = selectedLocation.name; } const wazeBtn = document.getElementById('navigate-waze'); if (wazeBtn) (wazeBtn as HTMLButtonElement).onclick = () => window.open(selectedLocation.waze, '_blank'); const googleBtn = document.getElementById('navigate-google'); if (googleBtn) (googleBtn as HTMLButtonElement).onclick = () => window.open(selectedLocation.google, '_blank'); const infoPanel = document.getElementById('info-panel'); if (infoPanel) infoPanel.classList.add('active'); }

      function updateInterface() { 
        // Recriar marcadores com o estilo correto (ícones em "Todos", miniaturas em filtro específico)
        addMarkers(); 
        loadLocationsList(); 
      }

      function setupEventListeners() {
        document.querySelectorAll('.category-btn').forEach(btn => { btn.addEventListener('click', () => { document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentCategory = (btn as HTMLElement).dataset.category || 'all'; updateInterface(); }); });
        const searchInput = document.getElementById('search-input') as HTMLInputElement | null; if (searchInput) searchInput.addEventListener('input', (e: any) => { currentSearch = e.target.value; updateInterface(); });
        const zoomIn = document.getElementById('zoom-in'); if (zoomIn) zoomIn.addEventListener('click', () => map.zoomIn()); const zoomOut = document.getElementById('zoom-out'); if (zoomOut) zoomOut.addEventListener('click', () => map.zoomOut()); const locate = document.getElementById('locate-me'); if (locate) locate.addEventListener('click', () => { if (navigator.geolocation) navigator.geolocation.getCurrentPosition(pos => { const lat = pos.coords.latitude; const lng = pos.coords.longitude; if (CAMPOS_BOUNDS.contains([lat, lng])) map.setView([lat, lng], 16); else alert('Você está fora da área de Campos do Jordão'); }, () => alert('Não foi possível obter sua localização')); });
        const resetBtn = document.getElementById('reset-map'); if (resetBtn) resetBtn.addEventListener('click', () => map.setView([-22.735, -45.58], 14)); const closeInfo = document.getElementById('close-info'); if (closeInfo) closeInfo.addEventListener('click', () => document.getElementById('info-panel')?.classList.remove('active')); const closeRoute = document.getElementById('close-route'); if (closeRoute) closeRoute.addEventListener('click', () => document.getElementById('route-panel')?.classList.remove('active')); const showRoute = document.getElementById('show-route'); if (showRoute) showRoute.addEventListener('click', () => document.getElementById('route-panel')?.classList.toggle('active'));
        document.querySelectorAll('.route-option').forEach(option => { option.addEventListener('click', () => { document.querySelectorAll('.route-option').forEach(opt => opt.classList.remove('active')); option.classList.add('active'); setupRouteNavigation((option as HTMLElement).dataset.route || 'cultural'); }); });
        const openWaze = document.getElementById('open-waze-route'); if (openWaze) openWaze.addEventListener('click', () => { const routeUrl = (openWaze as HTMLElement).dataset.route; if (routeUrl) window.open(routeUrl, '_blank'); }); const openGoogle = document.getElementById('open-google-route'); if (openGoogle) openGoogle.addEventListener('click', () => { const routeUrl = (openGoogle as HTMLElement).dataset.route; if (routeUrl) window.open(routeUrl, '_blank'); });
      }

      function setupRouteNavigation(routeType: string) { const wazeRoutes: any = { cultural: 'https://ul.waze.com/ul?ll=-22.73688900%2C-45.58794000&navigate=yes&to=1.%20Pal%C3%A1cio%20Boa%20Vista%20%3E%202.%20Audit%C3%B3rio%20Santoro%20%3E%203.%20Museu%20Felícia%20Leirner', gastronomic: 'https://ul.waze.com/ul?ll=-22.72842000%2C-45.57215000&navigate=yes&to=1.%20Baden%20Baden%20%3E%202.%20Caras%20de%20Malte%20%3E%203.%20Ludwig%20Restaurant', nature: 'https://ul.waze.com/ul?ll=-22.72652000%2C-45.58432000&navigate=yes&to=1.%20Horto%20Florestal%20%3E%202.%20Parque%20Capivari%20%3E%203.%20Morro%20do%20Elefante', adventure: 'https://ul.waze.com/ul?ll=-22.71532000%2C-45.55623000&navigate=yes&to=1.%20Tarundu%20%3E%202.%20Prana%20Park%20%3E%203.%20Iceland' }; const googleRoutes: any = { cultural: 'https://www.google.com/maps/dir/Pal%C3%A1cio+Boa+Vista,+Av.+Adhemar+de+Barros,+3001+-+Alto+da+Boa+Vista,+Campos+do+Jord%C3%AÃ£o+-+SP/Audit%C3%Bório+Claudio+Santoro,+Av.+Dr.+Luis+Arrobas+Martins,+1880+-+Alto+Boa+Vista,+Campos+do+Jord%C3%AÃ£o+-+SP/Museu+Felícia+Leirner,+Av.+Dr.+Luis+Arrobas+Martins,+1880+-+Alto+Boa+Vista,+Campos+do+Jord%C3%AÃ£o+-+SP', gastronomic: 'https://www.google.com/maps/dir/Cervejaria+Baden+Baden,+Av.+Matheus+Costa+Pinto,+1653+-+Vila+Santa+Cruz,+Campos+do+Jord%C3%AÃ£o+-+SP/Caras+de+Malte,+Av.+Pedro+Paulo,+1455+-+Jardim+Embaixador,+Campos+do+Jord%C3%AÃ£o+-+SP/Ludwig+Restaurant,+Av.+Dr.+Jan+Antonin+Bata,+1400+-+Capivari,+Campos+do+Jord%C3%AÃ£o+-+SP', nature: 'https://www.google.com/maps/dir/Horto+Florestal,+Av.+Pedro+Paulo+-+Horto+Florestal,+Campos+do+Jord%C3%AÃ£o+-+SP/Parque+Capivari,+R.+Eng.+Diogo+Jos%C3%A9+de+Carvalho,+1291+-+Capivari,+Campos+do+Jord%C3%AÃ£o+-+SP/Morro+do+Elefante,+Av.+Em%C3%IMe+Lang+J%C3%BAnior+-+Campos+do+Jord%C3%AÃ£o+-+SP', adventure: 'https://www.google.com/maps/dir/Centro+de+Lazer+Tarundu,+Av.+Jos%C3%AÉ+Antonio+Manso,+1515+-+Campos+do+Jord%C3%AÃ£o+-+SP/Prana+Park,+Estrada+do+Pico+do+Itapeva+-+Campos+do+Jord%C3%AÃ£o+-+SP/Iceland+Aventura+no+Gelo,+R.+Eng.+Diogo+Jos%C3%AÉ+de+Carvalho,+190+-+Capivari,+Campos+do+Jord%C3%AÃ£o+-+SP' }; const openWaze = document.getElementById('open-waze-route'); if (openWaze) (openWaze as HTMLElement).dataset.route = wazeRoutes[routeType]; const openGoogle = document.getElementById('open-google-route'); if (openGoogle) (openGoogle as HTMLElement).dataset.route = googleRoutes[routeType]; }

      initMap();
      try { document.body.classList.add('roteiros-no-scroll'); } catch (e) {}
      (window as any).__roteiros_cleanup = () => { 
        try { 
          if (map && map.remove) map.remove(); 
          // Limpar container do mapa
          const mapContainer = document.getElementById('main-map');
          if (mapContainer) mapContainer.innerHTML = '';
        } catch (e) {} 
        markers = []; 
        delete (window as any).selectLocationById; 
        delete (window as any).navigateToLocation; 
        delete (window as any).map;
        delete (window as any).__roteiros_cleanup;
      };
    })();

    return () => { 
      destroyed = true; 
      if ((window as any).__roteiros_cleanup) {
        try { (window as any).__roteiros_cleanup(); } catch (e) {} 
      }
      try { document.body.classList.remove('roteiros-no-scroll'); } catch (e) {}
    };
  }, []);

  return (
    <div className="roteiros-root">
      <style>{`
        :root { 
          --primary: #6366f1; 
          --primary-dark: #4f46e5;
          --accent: #3b82f6; 
          --accent-light: #60a5fa;
          --bg-dark: #0f172a;
          --bg-darker: #020617;
          --bg-card: rgba(30, 41, 59, 0.8);
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --border-color: rgba(255, 255, 255, 0.1);
          --shadow-glow: 0 0 60px rgba(99, 102, 241, 0.15);
          --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.2);
          --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.3), 0 4px 6px -4px rgba(0,0,0,0.2);
          --shadow-xl: 0 30px 80px rgba(2,6,23,0.6);
        }
        
        * { box-sizing: border-box; }

        /* While this view is mounted we lock body scrolling; the sidebar scrolls internally */
        body.roteiros-no-scroll { overflow: hidden; height: 100%; }
        
        .roteiros-root { 
          position: relative; 
          z-index: 1; 
          overflow: hidden; 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, var(--bg-darker) 0%, var(--bg-dark) 50%, #1e1b4b 100%);
        }
        
        /* .roteiros-header removed: header bar no longer used */
        
        .main-container { 
          display: flex; 
          height: 100vh; 
          overflow: hidden;
          padding-top: 0;
        }
        
        .sidebar { 
          width: 400px; 
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid var(--border-color); 
          display: flex; 
          flex-direction: column; 
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          padding-top: 12px; /* reduzido para puxar busca e abas para cima */
        }
        
        .sidebar-header {
          display: none;
        }
        
        .search-container {
          padding: 8px 12px; /* mais compacta */
          border-bottom: 1px solid var(--border-color);
          background: none;
        }
        
        .search-wrapper {
          position: relative;
        }
        
        .search-wrapper i {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          font-size: 13px;
        }
        
        .search-input {
          width: 100%;
          padding: 8px 12px 8px 38px; /* menor altura e padding lateral */
          border: 1px solid var(--border-color);
          border-radius: 9999px;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          background: rgba(51, 65, 85, 0.5);
          color: var(--text-primary);
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
          background: rgba(51, 65, 85, 0.8);
        }
        
        .search-input::placeholder {
          color: var(--text-secondary);
        }
        
        .categories-container {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(30, 41, 59, 0.3);
        }
        
        .category-btn {
          padding: 8px 16px;
          border: 1px solid var(--border-color);
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .category-btn:hover {
          border-color: rgba(99, 102, 241, 0.5);
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .category-btn.active {
          background: linear-gradient(to right, #4f46e5, #6366f1);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        
        .map-container { 
          flex: 1; 
          position: relative; 
          overflow: hidden;
        }
        
        #main-map { 
          height: 100%; 
          width: 100%; 
          position: relative; 
          z-index: 1;
        }
        
        .map-controls { 
          position: absolute; 
          top: 20px; 
          right: 20px; 
          z-index: 10; 
          display: flex; 
          flex-direction: column; 
          gap: 8px;
        }
        
        .map-control-btn { 
          width: 44px; 
          height: 44px; 
          background: rgba(15, 23, 42, 0.9); 
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px; 
          border: 1px solid var(--border-color); 
          box-shadow: var(--shadow-lg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          color: var(--text-primary);
        }
        
        .map-control-btn:hover {
          background: linear-gradient(to right, #4f46e5, #6366f1);
          border-color: transparent;
          color: white;
          transform: scale(1.05);
        }
        
        .info-panel { 
          position: absolute; 
          bottom: 20px; 
          left: 20px; 
          right: 20px; 
          max-width: 480px; 
          background: rgba(15, 23, 42, 0.95); 
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px; 
          padding: 24px; 
          box-shadow: var(--shadow-xl);
          z-index: 10; 
          display: none;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        
        .info-panel.active { display: block; animation: slideUp 0.3s ease; }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .route-panel { 
          position: absolute; 
          top: 80px; 
          right: 20px; 
          width: 380px; 
          background: rgba(15, 23, 42, 0.95); 
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px; 
          padding: 24px; 
          box-shadow: var(--shadow-xl);
          z-index: 10; 
          display: none !important;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        
        .route-panel.active { display: block !important; animation: slideIn 0.3s ease; }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Locations list styles */
        #locations-list { 
          padding: 16px 0;
        }
        
        .location-item { 
          display: block; 
          padding: 16px 20px; 
          margin: 0 12px 12px 12px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          cursor: pointer; 
          transition: all 0.2s ease;
          color: var(--text-primary);
        }
        
        .location-item:hover { 
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }
        
        .location-row { 
          display: flex; 
          gap: 14px; 
          align-items: flex-start;
        }
        
        .location-thumb { 
          width: 80px; 
          height: 64px; 
          object-fit: cover; 
          border-radius: 12px; 
          flex-shrink: 0; 
          background: linear-gradient(135deg, #334155, #1e293b);
        }
        
        .location-body { 
          flex: 1; 
          min-width: 0;
        }
        
        .location-header { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          justify-content: space-between;
          margin-bottom: 6px;
        }
        
        .location-name { 
          font-weight: 600; 
          font-size: 0.95rem; 
          color: var(--text-primary);
          line-height: 1.3;
        }
        
        .location-category { 
          font-size: 0.65rem; 
          padding: 4px 10px; 
          border-radius: 9999px; 
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        
        .hotel-category { background: linear-gradient(to right, #3b82f6, #6366f1); color: white; }
        .restaurant-category { background: linear-gradient(to right, #f43f5e, #ec4899); color: white; }
        .attraction-category { background: linear-gradient(to right, #10b981, #14b8a6); color: white; }
        .service-category { background: linear-gradient(to right, #8b5cf6, #a855f7); color: white; }
        
        .location-address { 
          font-size: 0.82rem; 
          color: var(--text-secondary); 
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .location-address i {
          color: var(--accent);
          font-size: 0.75rem;
        }
        
        .location-actions { 
          margin-top: 12px; 
          display: flex; 
          gap: 8px;
        }
        
        .action-btn { 
          background: rgba(255, 255, 255, 0.1); 
          border: 1px solid var(--border-color); 
          padding: 8px 14px; 
          border-radius: 9999px; 
          font-size: 0.82rem; 
          cursor: pointer;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .action-btn:hover {
          background: linear-gradient(to right, #4f46e5, #6366f1);
          border-color: transparent;
          color: white;
        }
        
        .action-btn i {
          font-size: 0.9rem;
        }
        
        .location-item.active { 
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.1));
          border-color: var(--primary);
        }
        
        .pulse-marker { animation: pulse 1s ease-in-out; }
        
        @keyframes pulse { 
          0% { transform: scale(1); } 
          50% { transform: scale(1.15); } 
          100% { transform: scale(1); } 
        }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          color: var(--text-secondary);
        }
        
        .close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #f87171;
        }
        
        .btn {
          padding: 10px 20px;
          border-radius: 9999px;
          border: none;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-primary {
          background: linear-gradient(to right, #4f46e5, #6366f1);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
        }
        
        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .route-option {
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .route-option:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
        }
        
        .route-option.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.1));
          border-color: var(--primary);
        }
        
        .route-option strong {
          color: var(--accent-light);
        }
        
        .route-btn {
          flex: 1;
          padding: 12px 16px;
          border-radius: 9999px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        
        .route-btn.waze {
          background: linear-gradient(to right, #33ccff, #00b8e6);
          color: white;
        }
        
        .route-btn.google {
          background: linear-gradient(to right, #4285f4, #6366f1);
          color: white;
        }
        
        .route-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        /* Popup styles */
        .popup-title {
          font-weight: 700;
          font-size: 1rem;
          color: #1e293b;
          margin-bottom: 6px;
        }
        
        .popup-category {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 600;
          color: white;
          margin-bottom: 10px;
        }
        
        .popup-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }
        
        .popup-btn {
          flex: 1;
          padding: 8px 12px;
          border-radius: 9999px;
          border: none;
          background: #f1f5f9;
          color: #1e293b;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        
        .popup-btn:hover {
          background: linear-gradient(to right, #4f46e5, #6366f1);
          color: white;
        }
        
        /* Leaflet custom styles */
        .leaflet-popup-content-wrapper {
          border-radius: 20px !important;
          box-shadow: var(--shadow-xl) !important;
          border: none !important;
        }
        
        .leaflet-popup-content {
          margin: 16px !important;
        }
        
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        /* Scrollbar styles */
        #locations-list::-webkit-scrollbar {
          width: 6px;
        }
        
        #locations-list::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 3px;
        }
        
        #locations-list::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        
        #locations-list::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
      `}</style>

      {/* Remove the header bar, keep only floating buttons */}
      <div style={{ position: 'absolute', top: 12, right: 80, zIndex: 120, display: 'flex', gap: 8 }}>
        <button id="show-route" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><i className="fas fa-route" /> Roteiros</button>
        <button id="reset-map" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}><i className="fas fa-compass" /> Centralizar</button>
      </div>

      <div className="main-container">
        <aside className="sidebar">
          <div className="search-container">
            <div className="search-wrapper">
              <i className="fas fa-search" />
              <input id="search-input" className="search-input" placeholder="Buscar hotéis, restaurantes, atrações..." />
            </div>
          </div>
          <div className="categories-container">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="category-btn active" data-category="all"><i className="fas fa-layer-group" style={{ marginRight: 6 }} />Todos</button>
              <button className="category-btn" data-category="hotel"><i className="fas fa-bed" style={{ marginRight: 6 }} />Hotéis</button>
              <button className="category-btn" data-category="restaurant"><i className="fas fa-utensils" style={{ marginRight: 6 }} />Restaurantes</button>
              <button className="category-btn" data-category="attraction"><i className="fas fa-mountain" style={{ marginRight: 6 }} />Atrações</button>
              <button className="category-btn" data-category="service"><i className="fas fa-concierge-bell" style={{ marginRight: 6 }} />Serviços</button>
            </div>
          </div>
          <div id="locations-list" style={{ flex: 1, overflowY: 'auto', background: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <div style={{ border: '3px solid var(--border-color)', borderRadius: '50%', borderTopColor: 'var(--primary)', width: 36, height: 36, animation: 'spin 1s linear infinite' }} />
            </div>
          </div>
        </aside>

        <main className="map-container">
          <div id="main-map" style={{ height: '100%', width: '100%' }} />

          <div className="map-controls">
            <button id="zoom-in" className="map-control-btn" title="Aumentar Zoom"><i className="fas fa-plus" /></button>
            <button id="zoom-out" className="map-control-btn" title="Diminuir Zoom"><i className="fas fa-minus" /></button>
            <button id="locate-me" className="map-control-btn" title="Minha Localização"><i className="fas fa-location-crosshairs" /></button>
          </div>

          <div id="info-panel" className="info-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 id="info-name" style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Nome do Local</h3>
              </div>
              <button id="close-info" className="close-btn"><i className="fas fa-times" /></button>
            </div>

            <div style={{ width: '100%', height: 160, borderRadius: 16, overflow: 'hidden', marginBottom: 16, background: 'linear-gradient(135deg, #334155, #1e293b)' }}>
              <img id="info-image" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                <i className="fas fa-tag" style={{ color: 'var(--accent)', width: 18 }} />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categoria</div>
                  <div id="info-category" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>-</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)', width: 18 }} />
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Endereço</div>
                  <div id="info-address" style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-primary)' }}>-</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                  <i className="fas fa-phone" style={{ color: 'var(--accent)', width: 18 }} />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Telefone</div>
                    <div id="info-phone" style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-primary)' }}>-</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                  <i className="fas fa-clock" style={{ color: 'var(--accent)', width: 18 }} />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Horário</div>
                    <div id="info-hours" style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-primary)' }}>-</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button id="navigate-waze" className="route-btn waze" style={{ flex: 1 }}><i className="fab fa-waze" /> Waze</button>
              <button id="navigate-google" className="route-btn google" style={{ flex: 1 }}><i className="fab fa-google" /> Maps</button>
            </div>
          </div>

          <div id="route-panel" className="route-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}><i className="fas fa-route" style={{ color: 'var(--accent)', marginRight: 10 }} />Roteiros Sugeridos</h3>
              <button id="close-route" className="close-btn"><i className="fas fa-times" /></button>
            </div>
            <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
              <div className="route-option active" data-route="cultural"><strong>🏛️ Cultural:</strong> Palácio Boa Vista → Auditório Santoro → Museu Felícia Leirner</div>
              <div className="route-option" data-route="gastronomic"><strong>🍺 Gastronômico:</strong> Baden Baden → Caras de Malte → Ludwig Restaurant</div>
              <div className="route-option" data-route="nature"><strong>🌲 Natureza:</strong> Horto Florestal → Parque Capivari → Morro do Elefante</div>
              <div className="route-option" data-route="adventure"><strong>🎢 Aventura:</strong> Tarundu → Prana Park → Iceland Aventura no Gelo</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button id="open-waze-route" className="route-btn waze"><i className="fab fa-waze" /> Abrir no Waze</button>
              <button id="open-google-route" className="route-btn google"><i className="fab fa-google" /> Abrir no Maps</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Roteiros;
