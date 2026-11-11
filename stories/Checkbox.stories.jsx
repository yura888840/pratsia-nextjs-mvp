import { Checkbox } from '../components/ui/index.jsx';
import { expect, userEvent, within } from 'storybook/test';
export default { title: 'UI/Checkbox', component: Checkbox, args: { label: 'Відгук лише з резюме' } };
export const Default = { play: async ({ canvasElement }) => { const checkbox = within(canvasElement).getByRole('checkbox'); await userEvent.click(checkbox); await expect(checkbox).toBeChecked(); await userEvent.keyboard(' '); await expect(checkbox).not.toBeChecked(); } };
export const Checked = { args: { defaultChecked: true } };
export const Disabled = { args: { disabled: true } };
