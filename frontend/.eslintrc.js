module.exports = {
  parser: '@typescript-eslint/parser', // Use the appropriate parser for your project
  plugins: ['react', 'react-hooks', 'import', 'node'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Add or modify rules as needed
    'no-unused-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
