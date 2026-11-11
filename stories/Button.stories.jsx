import { Button, LinkButton } from '../components/ui/index.jsx';
import { expect, fn, userEvent, within } from 'storybook/test';
export default {
  title: 'UI/Button', component: Button,
  args: { children: 'Зберегти чернетку', onClick: fn() },
  argTypes: { variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] }, size: { control: 'select', options: ['medium', 'small'] } },
};
export const Primary = { play: async ({ canvasElement, args }) => { await userEvent.click(within(canvasElement).getByRole('button')); await expect(args.onClick).toHaveBeenCalledOnce(); } };
export const Secondary = { args: { variant: 'secondary' } };
export const Ghost = { args: { variant: 'ghost', children: 'Скасувати' } };
export const Small = { args: { size: 'small' } };
export const Disabled = { args: { disabled: true }, play: async ({ canvasElement, args }) => { const button = within(canvasElement).getByRole('button'); await expect(button).toBeDisabled(); await userEvent.click(button); await expect(args.onClick).not.toHaveBeenCalled(); } };
export const Busy = { args: { busy: true, children: 'Зберігаємо…' } };
export const Navigation = { render: () => <LinkButton href="/employers">До кабінету</LinkButton> };
