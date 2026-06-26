<script setup>
import AppProjectPage from '@/components/apps/AppProjectPage.vue'

const features = [
  'Geração de QR Code para links.',
  'Pré-visualização antes de baixar.',
  'Fluxo direto para criar, revisar e usar o código rapidamente.',
  'Página pública separada para validar demanda e evolução do produto.',
]

const audience = [
  'Criadores, freelancers e pequenos negócios que precisam compartilhar links em materiais digitais ou impressos.',
  'Usuários que querem gerar um QR Code sem instalar aplicativo e sem passar por um fluxo complexo.',
  'Projetos da Rock Code Labs que precisam de uma ferramenta pública simples para campanhas, páginas e testes.',
]

const relatedLinks = [
  {
    label: 'Hub de ferramentas',
    description: 'Veja outras ferramentas gratuitas da Rock Code Labs para tarefas rápidas.',
    to: '/ferramentas',
  },
  {
    label: 'URL Encode/Decode',
    description: 'Prepare ou confira links e parâmetros antes de gerar um QR Code.',
    to: '/ferramentas/url-encode-decode',
  },
]
</script>

<template>
  <AppProjectPage
    eyebrow="App piloto"
    title="QRCodeFlow"
    description="Gerador público de QR Code para links, criado para transformar uma URL em código escaneável com um fluxo simples, direto e sem etapas desnecessárias."
    :primary-cta="{
      label: 'Acessar QRCodeFlow',
      href: 'https://qrcodeflow.rockcodelabs.com.br',
    }"
    :secondary-cta="{
      label: 'Ver ferramentas relacionadas',
      to: '/ferramentas',
    }"
    :problem="{
      title: 'Links precisam circular fora da tela.',
      description:
        'Em materiais impressos, apresentações, balcões e redes sociais, digitar uma URL longa cria atrito. O QRCodeFlow reduz esse caminho ao transformar links em QR Codes prontos para compartilhar.',
    }"
    :status="{
      title: 'MVP publicado em subdomínio próprio.',
      prefix: 'O produto continua separado em',
      code: 'qrcodeflow.rockcodelabs.com.br',
      suffix: '. Esta página explica o projeto dentro do domínio principal sem migrar a aplicação.',
    }"
    :audience="audience"
    audience-title="Para quem precisa gerar QR Codes sem complicar o processo."
    :features="features"
    features-title="O escopo atual é enxuto e focado no uso rápido."
    :stack="['Laravel 13', 'Vue', 'Inertia', 'MySQL', 'Codex']"
    stack-title="Projeto Laravel/Vue em evolução controlada."
    stack-description="A stack reflete o padrão de projetos recentes da Rock Code Labs, com foco em entrega incremental, páginas públicas úteis e validação real de uso."
    :related-links="relatedLinks"
    related-title="Continue por caminhos úteis e existentes."
  />
</template>
