# Site — Luzitana Ar Condicionado

Site institucional pronto, em HTML/CSS/JS puro (sem build, sem npm). Basta abrir `index.html` no
navegador para ver funcionando, ou publicar em qualquer um dos jeitos abaixo.

## Como publicar (escolha um)

1. **Netlify Drop** (mais fácil): acesse `app.netlify.com/drop` e arraste a pasta inteira
   `site-luzitana-ar` pra dentro da página. Ganha um link público na hora, sem precisar criar conta.
2. **GitHub Pages**: suba esta pasta pra um repositório com `index.html` na raiz e ative em
   Settings → Pages. Fica em `usuario.github.io/repositorio`.
3. **Hospedagem existente**: já que o domínio `luzitanaar.com.br` existe, é só enviar todos os
   arquivos desta pasta (via FTP/painel de hospedagem) para a raiz do site atual, substituindo os
   arquivos antigos.

## O que trocar antes de publicar (checklist)

- [ ] **Fotos**: as imagens em `img/` são reais (Pexels, uso comercial liberado) mas são temporárias.
      Troque pelas fotos reais da Luzitana quando tiver — mesmo nome de arquivo, mesma pasta `img/`,
      e o layout já está com o tamanho certo (não quebra).
- [ ] **Horário de funcionamento**: procure `<!-- TROCAR -->` no `index.html` (seção Contato e rodapé)
      e adicione o horário real.
- [ ] **Razão social e CNPJ**: aparecem marcados no rodapé — procure `<!-- TROCAR -->`.
- [ ] **E-mail de contato**: se a Luzitana tiver um e-mail, adicione no rodapé (procure o comentário
      `<!-- TROCAR: adicionar e-mail -->`).
- [ ] **Instagram/redes sociais**: não havia nenhum link no site antigo — se a empresa tiver, é só
      pedir que eu adicione.

## Estrutura

```
index.html                     página única (site completo)
404.html                        página de erro
politica-de-privacidade.html    base de política de privacidade (LGPD)
assets/css/styles.css           todo o visual
assets/js/main.js               menu, scroll, formulário, cookies
img/                            fotos (temporárias, ver checklist acima)
robots.txt, sitemap.xml, site.webmanifest   SEO técnico
```

## Re-rodar a skill

Se quiser trocar a paleta de cores, adicionar uma página nova, ou atualizar quando o negócio mudar
(novo endereço, nova marca atendida, etc.), é só rodar `/site-institucional` de novo pedindo o ajuste.
