# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## QOTD — Question of the Day UI (TechLearn Solutions)

This workspace contains a minimal, production-ready frontend for a "Question of the Day" experience built with React + Vite.

Styling uses component-scoped external CSS files (one CSS file per component) rather than Tailwind. Each component lives under `src/components` with its own `.css` file to keep styles local and easy to reason about.

### Quick start ✅

1. Install dependencies:

   npm install

2. Start dev server:

   npm run dev

The app is ready to deploy to Netlify or Vercel — static build is available at `npm run build`.

### Monaco Editor (optional)

This project uses a lightweight wrapper component `CodeEditor` which integrates `@monaco-editor/react` for a powerful, theme-aware editor. If you want the full Monaco experience (recommended), install the packages:

```
npm install @monaco-editor/react monaco-editor
```

Notes:
- `CodeEditor` falls back to a plain textarea if the packages are not installed.
- For advanced Vite setups you may need to configure Monaco web workers; the wrapper works out-of-the-box for most cases.

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
