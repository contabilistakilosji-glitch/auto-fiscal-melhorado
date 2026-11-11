# AutoFiscal RPA — versão desktop Windows

Aplicativo React + API local empacotado em uma janela desktop Electron. Os dados do painel continuam sendo armazenados no perfil local do navegador (localStorage).

## Gerar os executáveis no Windows

1. Instale **Node.js LTS** (https://nodejs.org/).
2. Extraia todo o ZIP para uma pasta gravável.
3. Dê duplo clique em `GERAR-EXE-WINDOWS.bat`.
4. Aguarde a instalação das dependências e a compilação.
5. Na pasta `release`, serão criados o instalador `AutoFiscal-RPA-1.0.0-x64.exe` e a versão portátil `AutoFiscal-RPA-Portable-1.0.0.exe`.

Também é possível executar manualmente:

```bash
npm install
npm run dist:win
```

## Executar sem empacotar

Use `INICIAR-WINDOWS.bat` ou execute `npm install` e `npm run dev`. Para abrir como aplicativo desktop durante o desenvolvimento, use `npm run desktop:dev`.

## Configuração e segurança

- Copie `.env.example` para `.env` e preencha somente as configurações necessárias. Nunca compartilhe certificados A1, senhas ou tokens.
- O backend do desktop escuta somente em `127.0.0.1`.
- O executável não inclui certificado digital nem credenciais.
- Consulte e valide cada rotina no ambiente oficial antes de usar em produção. A automação de portais governamentais pode exigir autenticação manual, procuração válida, certificado compatível e ajustes quando o portal mudar.
- Os dados demonstrativos do painel não substituem dados fiscais oficiais. Faça backup antes de atualizar ou remover o aplicativo.

## Requisitos

Windows 10/11 64 bits para os executáveis. A compilação dos instaladores deve ser feita preferencialmente no Windows com acesso à internet para baixar Electron e dependências.
