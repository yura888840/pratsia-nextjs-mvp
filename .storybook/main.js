/** @type {import('@storybook/nextjs-vite').StorybookConfig} */
export default {
  stories: ['../stories/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/nextjs-vite', options: {} },
  staticDirs: ['../public'],
  core: { disableTelemetry: true },
};
