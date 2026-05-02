## Diagnóstico

O log do Netlify mostra:

```
Plugin "@netlify/plugin-nextjs" failed
Error: The directory "/opt/build/repo/dist" does not contain a Next.js production build.
plugins:
  - origin: ui
    package: "@netlify/plugin-nextjs"
```

Tradução: alguém (ou o Netlify automaticamente, ao detectar o repo no momento da criação do site) instalou o **plugin do Next.js** no painel Netlify deste site. O `origin: ui` confirma isso — o plugin foi adicionado pela interface, não pelo código.

Seu projeto **não é Next.js**, é **Vite SPA puro** (foi exatamente isso que acabamos de migrar). O build do Vite gera `dist/`, mas o plugin Next.js procura `.next/` e aborta a build.

O `netlify.toml` está correto. O problema está 100% no painel do Netlify.

## Solução (passo a passo no painel Netlify)

Você precisa fazer isso — eu não tenho acesso ao painel do Netlify:

1. Acesse seu site em https://app.netlify.com
2. Vá em **Site configuration → Build & deploy → Build plugins** (ou **Integrations → Build plugins**)
3. Encontre **`@netlify/plugin-nextjs`** na lista
4. Clique em **Remove** / **Uninstall**
5. Volte em **Deploys** e clique em **Trigger deploy → Clear cache and deploy site**

Pronto. O build do Vite vai rodar, gerar `dist/`, e o site vai subir.

## Reforço opcional no código (eu faço)

Para evitar que o plugin volte a ser ativado por auto-detecção em deploys futuros, posso adicionar uma variável de ambiente no `netlify.toml` que desativa o runtime do Next.js explicitamente:

**Editar `netlify.toml`** — adicionar:

```toml
[build.environment]
  NETLIFY_NEXT_PLUGIN_SKIP = "true"
```

Isso é mencionado na própria mensagem de erro do Netlify como o "interruptor" oficial para desligar o plugin Next.js quando ele estiver presente mas não for necessário. É um cinto-de-segurança — a remoção pelo painel já resolve.

## Resumo

| Onde | O quê |
|---|---|
| Painel Netlify | **Você** remove o plugin `@netlify/plugin-nextjs` e dispara novo deploy com cache limpo |
| `netlify.toml` | **Eu** adiciono `NETLIFY_NEXT_PLUGIN_SKIP = "true"` como proteção extra |

Aprove o plano e eu faço a edição do `netlify.toml`. Depois é só você remover o plugin no painel e redeploy.