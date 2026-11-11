import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import '../styles/tokens.css';
import '../components/ui/ui.css';
import './preview.css';

export default {
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'padded',
    viewport: { options: MINIMAL_VIEWPORTS },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    options: { storySort: { order: ['Foundations', 'UI', 'Patterns'] } },
  },
  tags: ['autodocs'],
};
