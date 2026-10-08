# Valverde & Fernandes Advogados Associados

Site institucional (HTML, CSS e JavaScript puro, sem build) do escritório Valverde & Fernandes — Direito Civil, Previdenciário e Trabalhista.

## Estrutura

```
index.html          Página única do site
styles.css          Estilos
script.js           Interações (menu, simuladores, FAQ, etc.)
assets/images/      Fotos do escritório e da equipe
```

## Rodar localmente

Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
npx serve .
```

## Publicar no GitHub Pages

1. Envie os arquivos para um repositório no GitHub.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. O site ficará em `https://<usuario>.github.io/<repositorio>/`.
