import React, { useEffect, useRef } from 'react';

const ondeComerHTML = `
<article class="post_item_single">
  <div class="post_content entry-content">
    <div class="wpb-content-wrapper">
      <h2 class="has-text-align-center wp-block-heading">Bares e Restaurantes</h2>
      <p class="has-text-align-center lead">Campos do Jordão oferece dezenas de opções gastronômicas  de fondues e trutas a cervejarias artesanais. Selecionamos os principais locais para você explorar.</p>

      <style>
        .post_content{max-width:1180px;margin:0 auto;padding:20px}
        .restaurant-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(420px,1fr));gap:48px;margin-top:40px;padding:8px}
        .restaurant{background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(250,250,250,0.55));backdrop-filter:blur(10px);border-radius:16px;overflow:hidden;box-shadow:0 14px 40px rgba(7,13,20,0.12);display:flex;flex-direction:column;transition:transform .28s ease,box-shadow .28s ease}
        .restaurant figure{margin:0;height:320px;overflow:hidden}
        .restaurant img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}
        .restaurant .info{padding:24px;flex:1;display:flex;flex-direction:column;gap:10px}
        .restaurant h3{margin:0 0 6px;font-size:1.16rem}
        .restaurant p{margin:0 0 12px;color:#333;line-height:1.4}
        .restaurant ul{margin:0;padding-left:18px;color:#333;font-size:0.98rem}
        .restaurant a{color:#1e60ff;text-decoration:none}
        .restaurant:hover{transform:translateY(-8px) scale(1.025);box-shadow:0 24px 60px rgba(7,13,20,0.22)}
        .restaurant:hover img{transform:scale(1.07)}
        .restaurant{opacity:0;transform-origin:top left}
        .restaurant.show{opacity:1;transform:none;transition:opacity .45s ease,transform .45s ease}
        @keyframes cardIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @media (max-width:520px){.restaurant figure{height:200px}.restaurant-grid{gap:20px;padding:0}}
      </style>

      <section class="restaurant-grid">

        <article class="restaurant">
          <figure><img src="/images/gastronomia/nonna_mimi.jpg" alt="Cantina Nonna Mimi"/></figure>
          <div class="info">
            <h3><a href="http://www.nonnamimi.com.br">Cantina Nonna Mimi</a></h3>
            <p>Cantina italiana: massas, pães e mesa de antepastos. Ambiente acolhedor.</p>
            <ul>
              <li>Avenida Doutor Januário Miráglia, 2438  Vila Telma</li>
              <li>Tel.: (12) 3662-3522</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/caras_malte.jpg" alt="Caras de Malte"/></figure>
          <div class="info">
            <h3><a href="#">Caras de Malte  Microcervejaria</a></h3>
            <p>Microcervejaria com rótulos próprios, grelhados e petiscos para harmonizar.</p>
            <ul>
              <li>Av. Pedro Paulo, 1500  Descansópolis</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/baden.jpg" alt="Choperia Baden Baden"/></figure>
          <div class="info">
            <h3><a href="https://www.obadenbaden.com.br/">Choperia Baden Baden</a></h3>
            <p>Clássicos alemães e chopes premiados num ambiente animado.</p>
            <ul>
              <li>Rua Djalma Forfaz, 93, loja 10  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/tapiti.jpg" alt="Tapiti Confeitaria & Brunch"/></figure>
          <div class="info">
            <h3><a href="#">Tapiti Confeitaria & Brunch</a></h3>
            <p>Café e brunch com produtos artesanais e foco na experiência regional.</p>
            <ul>
              <li>Est. Municipal Aurora Nogueira Barros Vasconcellos, 100</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/iceland.jpg" alt="Iceland"/></figure>
          <div class="info">
            <h3><a href="#">Iceland</a></h3>
            <p>Bar temático 100% gelo  experiência única com drinques em copos de gelo.</p>
            <ul>
              <li>R. Eng. Diogo José de Carvalho, 190  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/villa_montese.jpg" alt="Villa Montese"/></figure>
          <div class="info">
            <h3><a href="#">Villa Montese Bar & Ristorante</a></h3>
            <p>Fondues, trutas e pratos internacionais em ambiente aconchegante.</p>
            <ul>
              <li>Av. Macedo Soares, 508  Vila Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/ludwig.jpg" alt="Ludwig Restaurant"/></figure>
          <div class="info">
            <h3><a href="#">Ludwig Restaurant</a></h3>
            <p>Alta gastronomia: sopas, foundues e pratos de caça.</p>
            <ul>
              <li>Rua Aristides de Souza Mello, 50  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/matterhorn.jpg" alt="Matterhorn"/></figure>
          <div class="info">
            <h3><a href="#">Matterhorn Empório e Restaurante</a></h3>
            <p>Menu de trutas, ambiente romântico e música ao vivo em datas específicas.</p>
            <ul>
              <li>Rua Djalma Forfaz, 93  Loja 20  Praça do Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/le_foyer.jpg" alt="Le Foyer"/></figure>
          <div class="info">
            <h3><a href="#">Le Foyer  Chateau La Villette</a></h3>
            <p>Gastronomia franco-suíça com influências de montanha, perfeito para ocasiões especiais.</p>
            <ul>
              <li>Rua Cantídio Pereira de Castro, 100  Vila Everest</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/mana.jpg" alt="Maná"/></figure>
          <div class="info">
            <h3><a href="#">Restaurante Maná</a></h3>
            <p>Antepastos, truta, picanha e rodízio de fondue com ampla carta de bebidas.</p>
            <ul>
              <li>Av. Macedo Soares, 187  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/mercearia.jpg" alt="Mercearia Campos"/></figure>
          <div class="info">
            <h3><a href="#">Restaurante Mercearia Campos</a></h3>
            <p>Opção charmosa no centrinho do Capivari para refeições descontraídas.</p>
            <ul>
              <li>Rua Vitor Godinho, 25  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/tainakan.jpg" alt="Tainakan - Tarundu"/></figure>
          <div class="info">
            <h3><a href="#">Tainakan  Tarundu</a></h3>
            <p>Localizado no Parque Tarundu, com buffet, pizzas e cafés especiais.</p>
            <ul>
              <li>Av. José Antônio Manso, 1515  Parque Tarundu</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/vilacha.jpg" alt="Vila Chã"/></figure>
          <div class="info">
            <h3><a href="#">Vila Chã</a></h3>
            <p>Gastronomia lusitana com tábuas, pescados e doces tradicionais.</p>
            <ul>
              <li>Av. Pedro Paulo, 7545  Descansópolis</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/villa_gourmet.jpg" alt="Villa Gourmet"/></figure>
          <div class="info">
            <h3><a href="#">Villa Gourmet</a></h3>
            <p>Cozinha contemporânea valorizando ingredientes regionais.</p>
            <ul>
              <li>Av. Macedo Soares, 203  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/sans_souci.jpg" alt="Sans Souci"/></figure>
          <div class="info">
            <h3><a href="#">Sans Souci Confeitaria & Café</a></h3>
            <p>Café e confeitaria com estilo europeu e foco em produtos locais.</p>
            <ul>
              <li>Av. Dr. Januário Miraglia, 3.260  Jaguaribe</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/trattoria.jpg" alt="Trattoria Salvador"/></figure>
          <div class="info">
            <h3><a href="#">Trattoria Salvador</a></h3>
            <p>Massas artesanais e fondues em ambiente intimista.</p>
            <ul>
              <li>Av. Macedo Soares, 489  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/churrasco.jpg" alt="Churrasco ao Vivo"/></figure>
          <div class="info">
            <h3><a href="#">Churrasco ao Vivo</a></h3>
            <p>Especialidade em carnes argentinas assadas na grelha pelo mestre assador.</p>
            <ul>
              <li>Rua Doutor Heitor Penteado, 82  Campos do Jordão</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/cantinho_suico.jpg" alt="Cantinho Suíço"/></figure>
          <div class="info">
            <h3><a href="#">Cantinho Suíço</a></h3>
            <p>Sequências de fondue, trutas e culinária franco-suíça.</p>
            <ul>
              <li>Av. Macedo Soares, 457  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/cantinho_serra.jpg" alt="Cantinho da Serra Grill"/></figure>
          <div class="info">
            <h3><a href="#">Cantinho da Serra Grill</a></h3>
            <p>Cozinha mineira, cortes Angus e rodízio de fondues.</p>
            <ul>
              <li>Av. Macedo Soares, 457  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/bella_vista.jpg" alt="Bella Vista"/></figure>
          <div class="info">
            <h3><a href="#">Bella Vista Restaurante</a></h3>
            <p>Experiência sofisticada com vista panorâmica e carta de vinhos.</p>
            <ul>
              <li>Alameda Pérolas, 182  Morro do Elefante</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/art_bbq.jpg" alt="Art BBQ"/></figure>
          <div class="info">
            <h3><a href="#">Restaurante Art BBQ</a></h3>
            <p>Gastronomia rústica com grelhados e vista privilegiada.</p>
            <ul>
              <li>Rua 5, 308 Vila Floresta</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/dona_chica.jpg" alt="Dona Chica"/></figure>
          <div class="info">
            <h3><a href="#">Dona Chica Capivari</a></h3>
            <p>Gastronomia afetiva em ambiente rústico com áreas ao ar livre.</p>
            <ul>
              <li>Parque Capivari  R. Eng. Diogo José de Carvalho, 1291</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/bam_bam.jpg" alt="Bam Bam Café"/></figure>
          <div class="info">
            <h3><a href="#">Bam Bam Café</a></h3>
            <p>Café acolhedor com opções de fondue e bolos artesanais.</p>
            <ul>
              <li>Rua Djalma Forfaz, 103  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/emporio.jpg" alt="Empório dos Mellos"/></figure>
          <div class="info">
            <h3><a href="#">Empório dos Mellos</a></h3>
            <p>Foco em ingredientes locais e produtos artesanais da região.</p>
            <ul>
              <li>R. Elídio Gonçalves da Silva, 1800</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/sabor_chocolate.jpg" alt="Sabor Chocolate"/></figure>
          <div class="info">
            <h3><a href="#">Sabor Chocolate</a></h3>
            <p>Chocolateria tradicional com criações regionais, como bombons de pinhão.</p>
            <ul>
              <li>Rua Djalma Forfaz, 103  Capivari</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/luss.jpg" alt="Cervejaria Luss"/></figure>
          <div class="info">
            <h3><a href="#">Cervejaria Luss</a></h3>
            <p>Biergarten em casarão histórico com rótulos e petiscos.</p>
            <ul>
              <li>Av. Sen. Roberto Simonsen, 1724  Vila Inglesa</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/alto_brasa.jpg" alt="Alto da Brasa"/></figure>
          <div class="info">
            <h3><a href="#">Alto da Brasa Brew Kitchen</a></h3>
            <p>Beer & Grill com grelhados que harmonizam com cervejas locais.</p>
            <ul>
              <li>Parque da Cerveja  Estr Mun Paulo Costa Lenz Cesar, 2150</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/paris_station.jpg" alt="Paris Station"/></figure>
          <div class="info">
            <h3><a href="#">Restaurante Paris Station</a></h3>
            <p>Ambiente aconchegante com boa música e gastronomia de qualidade.</p>
            <ul>
              <li>Rua Djalma Forfaz, 263</li>
            </ul>
          </div>
        </article>

        <article class="restaurant">
          <figure><img src="/images/gastronomia/nevada.jpg" alt="Restaurante Nevada"/></figure>
          <div class="info">
            <h3><a href="#">Restaurante Nevada</a></h3>
            <p>Tradição desde 1965: fondues, sopas no pão e pratos clássicos da serra.</p>
            <ul>
              <li>Avenida Macedo Soares, 159  Capivari</li>
            </ul>
          </div>
        </article>

      </section>

      <!-- script removed: replaced by React effect to ensure execution after mount -->

      <p class="lead" style="margin-top:28px;">Deseja ser associado do CJRC &amp; VB - Campos? <a href="/associe">Associe-se agora</a></p>

    </div>
  </div>
</article>
`;

export default function Gastronomia(){
  const rootRef = useRef<HTMLElement|null>(null);

  useEffect(()=>{
    const root = rootRef.current;
    if(!root) return;
    const placeholder = '/images/gastronomia/placeholder.svg';
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('.restaurant-grid img'));
    imgs.forEach(img=>{
      try{ img.loading = 'lazy'; }catch(e){}
      img.onerror = ()=>{ if(img.src !== placeholder) img.src = placeholder };
      if(img.complete && !img.naturalWidth){ img.src = placeholder; }
    });
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.restaurant'));
    cards.forEach((c,i)=>{ setTimeout(()=>{ c.classList.add('show'); }, i*55); });
    return ()=>{ imgs.forEach(img=>{ img.onerror = null as any }); };
  }, []);

  return (
    <main className="page gastronomy">
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: ondeComerHTML }} />
    </main>
  );
}
