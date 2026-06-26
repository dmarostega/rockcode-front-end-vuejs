<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
import { RouterLink } from 'vue-router'

const hubTools = [
  {
    name: 'Gerador de UUID',
    icon: 'ID',
    status: 'Disponível',
    description:
      'Ferramenta gratuita para gerar identificadores UUID de forma rápida, simples e sem cadastro.',
    details:
      'Gere UUIDs v4 direto no navegador, copie com um clique e use em testes, protótipos ou chaves temporárias.',
    route: '/ferramentas/gerador-uuid',
  },
  {
    name: 'Conversor Base64',
    icon: '64',
    status: 'Disponível',
    description: 'Converta texto para Base64 e decodifique Base64 para texto direto no navegador.',
    details:
      'Use para testar payloads, exemplos de APIs, tokens de desenvolvimento e pequenos trechos de texto sem enviar dados para servidores.',
    route: '/ferramentas/base64',
  },
  {
    name: 'Formatador JSON',
    icon: '{}',
    status: 'Disponível',
    description:
      'Formate, valide e minifique JSON com mensagens claras quando houver erro de sintaxe.',
    details:
      'Cole um objeto JSON, organize a leitura, gere uma versão minificada e copie o resultado sem depender de backend.',
    route: '/ferramentas/formatador-json',
  },
  {
    name: 'Gerador de Slug',
    icon: 'SL',
    status: 'Disponível',
    description:
      'Transforme títulos e frases em slugs amigáveis para URLs, com remoção de acentos e pontuação.',
    details:
      'Digite um texto, gere uma versão em letras minúsculas separada por hífens e copie o resultado sem enviar dados para servidores.',
    route: '/ferramentas/gerador-slug',
  },
  {
    name: 'Contador de Caracteres e Palavras',
    icon: 'Aa',
    status: 'Disponível',
    description: 'Conte caracteres, palavras e linhas em tempo real diretamente no navegador.',
    details:
      'Cole ou digite um texto para revisar tamanho, estrutura e quebras de linha sem login, backend, histórico ou envio para API externa.',
    route: '/ferramentas/contador-caracteres-palavras',
  },
  {
    name: 'URL Encode/Decode',
    icon: '%',
    status: 'Disponível',
    description: 'Codifique e decodifique URLs, parâmetros e textos direto no navegador.',
    details:
      'Use para converter espaços, acentos, query strings e caracteres especiais sem backend, login, API externa ou histórico.',
    route: '/ferramentas/url-encode-decode',
  },
  {
    name: 'Conversor Timestamp',
    icon: 'TS',
    status: 'Disponível',
    description: 'Converta timestamp Unix em data legível e data em timestamp direto no navegador.',
    details:
      'Use segundos ou milissegundos para conferir datas, exemplos de APIs, logs e payloads sem backend, login, API externa ou histórico.',
    route: '/ferramentas/conversor-timestamp',
  },
  {
    name: 'Gerador de Hash',
    icon: '#',
    status: 'Disponível',
    description: 'Gere SHA-256 e SHA-512 localmente para testes, exemplos e uso didático/dev.',
    details:
      'Digite um texto, escolha o algoritmo e copie o hash sem enviar dados para servidores ou salvar histórico.',
    route: '/ferramentas/gerador-hash',
  },
  {
    name: 'Calculadora de Desconto',
    icon: '%',
    status: 'Disponível',
    description: 'Calcule valor economizado e preço final a partir de um desconto percentual.',
    details:
      'Informe o preço original e o percentual de desconto para conferir ofertas direto no navegador, sem login, backend ou histórico.',
    route: '/ferramentas/calculadora-desconto',
  },
]

const relatedProjects = [
  {
    name: 'QRCodeFlow',
    status: 'MVP publicado',
    description:
      'Gerador gratuito de QR Code para links, com fluxo simples para criar, visualizar e baixar códigos rapidamente.',
    url: 'https://qrcodeflow.rockcodelabs.com.br',
  },
]
</script>

<template>
  <LayoutDefault>
    <main class="tools-page">
      <section class="tools-hero">
        <span class="eyebrow">Ferramentas gratuitas</span>

        <h1>Utilitários simples da Rock Code Labs para resolver tarefas rápidas.</h1>

        <p>
          Um hub público para reunir pequenas ferramentas gratuitas, focadas em uso direto, páginas
          leves e evolução gradual dentro do site institucional.
        </p>
      </section>

      <section class="hub-intro" aria-label="Proposta do hub">
        <div>
          <span class="section-label">Hub inicial</span>
          <h2>Ferramentas pequenas, acessíveis e sem fricção.</h2>
        </div>

        <p>
          A estrutura começa enxuta para validar demanda e organizar futuras entregas. Cada
          ferramenta deve ter objetivo claro, interface responsiva e conteúdo suficiente para ser
          encontrada por quem precisa resolver uma tarefa específica.
        </p>
      </section>

      <section class="tools-grid" aria-labelledby="tools-title">
        <div class="section-heading">
          <span class="section-label">Ferramentas disponíveis</span>
          <h2 id="tools-title">Utilitários client-side para tarefas rápidas de desenvolvimento.</h2>
        </div>

        <RouterLink v-for="tool in hubTools" :key="tool.name" :to="tool.route" class="tool-card">
          <div class="card-top">
            <span class="tool-icon" aria-hidden="true">{{ tool.icon }}</span>
            <span class="status-badge">{{ tool.status }}</span>
          </div>

          <h3>{{ tool.name }}</h3>

          <p>{{ tool.description }}</p>
          <p class="card-details">{{ tool.details }}</p>
          <strong>Acessar ferramenta -></strong>
        </RouterLink>
      </section>

      <section class="related-section" aria-labelledby="related-title">
        <div class="section-heading">
          <span class="section-label">Projeto relacionado</span>
          <h2 id="related-title">QRCodeFlow continua como produto separado.</h2>
        </div>

        <a
          v-for="project in relatedProjects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="related-card"
        >
          <div>
            <span class="status-badge">{{ project.status }}</span>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
          </div>

          <strong>Acessar QRCodeFlow -></strong>
        </a>
      </section>

      <section class="future-ad-space" aria-label="Espaço reservado para anúncio futuro">
        <span>Espaço institucional reservado</span>
        <p>
          Área visual desativada para avaliação futura de monetização. Sem script de anúncio, sem
          chamada para clique e afastada dos links principais.
        </p>
      </section>
    </main>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.tools-page {
  min-height: 100vh;
  padding: 3rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.tools-hero,
.hub-intro,
.tools-grid,
.related-section,
.future-ad-space {
  max-width: 1100px;
  margin: 0 auto;
}

.tools-hero {
  padding: 2rem 0 3rem;
  text-align: center;
}

.eyebrow,
.section-label,
.status-badge {
  display: inline-flex;
  width: fit-content;
  border-radius: 999px;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.eyebrow {
  padding: 0.42rem 0.8rem;
  border: 1px solid rgba(56, 189, 248, 0.35);
  background: rgba(15, 23, 42, 0.75);
  color: #7dd3fc;
  font-size: 0.78rem;
}

.tools-hero h1 {
  max-width: 880px;
  margin: 1.3rem auto 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
}

.tools-hero p {
  max-width: 760px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.hub-intro,
.tool-card,
.related-card,
.future-ad-space {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.hub-intro {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 2rem;
  padding: 2rem;
}

.section-label {
  margin-bottom: 1rem;
  padding: 0.32rem 0.7rem;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-size: 0.72rem;
}

.hub-intro h2,
.section-heading h2,
.tool-card h3,
.related-card h3 {
  margin: 0;
  color: #ffffff;
}

.hub-intro p,
.tool-card p,
.related-card p,
.future-ad-space p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

.tools-grid,
.related-section {
  margin-top: 2rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.section-heading {
  grid-column: 1 / -1;
  margin-bottom: 1rem;
}

.tool-card,
.related-card {
  padding: 1.7rem;
}

.tool-card {
  display: block;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.tool-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.88);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.4rem;
}

.tool-icon {
  display: inline-flex;
  flex: 0 0 3rem;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 16px;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1;
  text-align: center;
}

.status-badge {
  padding: 0.32rem 0.7rem;
  background: rgba(34, 197, 94, 0.12);
  color: #86efac;
  font-size: 0.72rem;
}

.tool-card h3,
.related-card h3 {
  margin-bottom: 0.8rem;
  font-size: 1.55rem;
}

.card-details {
  margin-top: 0.85rem;
  color: #cbd5e1;
}

.related-card {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.related-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.88);
}

.related-card strong {
  flex: 0 0 auto;
  color: #38bdf8;
}

.tool-card strong {
  display: inline-block;
  margin-top: 1rem;
  color: #38bdf8;
}

.future-ad-space {
  margin-top: 3rem;
  padding: 1.4rem;
  text-align: center;
}

.future-ad-space span {
  display: block;
  color: #cbd5e1;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.future-ad-space p {
  max-width: 720px;
  margin: 0.6rem auto 0;
  font-size: 0.9rem;
}

@media (max-width: 820px) {
  .hub-intro,
  .related-card,
  .tools-grid {
    grid-template-columns: 1fr;
  }

  .hub-intro {
    gap: 1rem;
  }

  .related-card {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
