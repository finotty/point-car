# DS Point Car Oliveira

Site institucional estático (HTML + CSS + JavaScript puro). Não tem build, dependências nem servidor. Pronto para a Vercel.

**Serviços:** lanternagem (funilaria) e pintura de veículos automotores, além de martelinho de ouro (que aparece na placa da fachada).

## Estrutura
```
index.html          Página principal (todas as seções)
styles.css          Visual / layout responsivo
script.js           Menu mobile, animações, galeria e formulário → WhatsApp
404.html            Página de erro personalizada (a Vercel usa sozinha)
vercel.json         URLs limpas, headers de segurança e cache
site.webmanifest    Ícone ao "adicionar à tela inicial" no celular
robots.txt          Libera indexação no Google
assets/
  logo.png          Logo recortado (sem a moldura do print de celular)
  icon-*.png        Favicons / ícones
  og-image.png      Imagem de pré-visualização ao compartilhar o link
  imagem1-3.webp    Fotos da empresa
  logo-original.jpg Arquivo original (não é publicado, ver .vercelignore)
```

## Publicar na Vercel
**Pelo GitHub (recomendado)**
1. Crie um repositório no GitHub e envie o conteúdo desta pasta para a raiz.
2. Na Vercel: **Add New → Project** e importe o repositório.
3. Framework Preset: **Other**. Build Command e Output Directory: deixe em branco.
4. Clique em **Deploy**. Depois é possível conectar um domínio próprio em *Settings → Domains*.

**Pela CLI**
```
npm i -g vercel
vercel        # pré-visualização
vercel --prod # produção
```

## Testar localmente
```
npx serve .
```
Depois abra http://localhost:3000. Abrir o `index.html` direto também funciona, mas o mapa e as fontes precisam de internet.

## Depois de ter o domínio
- Em `index.html`, troque `content="/assets/og-image.png"` pelo endereço completo (ex.: `https://seudominio.com.br/assets/og-image.png`) para a pré-visualização funcionar no WhatsApp/Facebook.
- Opcional: crie um `sitemap.xml` e cadastre o site no Google Search Console.

## Antes do lançamento
Confirme com o proprietário: endereço (grafia de "Jardim Wiliam"), telefone, e-mail e serviços. Não foram inventados horários, preços, avaliações ou garantias. Se tiverem fotos de serviços (antes/depois), vale incluir na galeria.

## Editar
- Telefone do WhatsApp: constante `PHONE` em `script.js` e links `wa.me`/`tel:` no `index.html`.
- Mensagens automáticas dos botões: atributo `data-wa` de cada botão no `index.html`.
- Cores: variáveis no topo do `styles.css` (`--red`, `--bg` etc.).
