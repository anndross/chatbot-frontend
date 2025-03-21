export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Inclui apenas os componentes React do Web Component
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Evita reset de estilos globais (importante para não afetar o site externo)
  },
};
