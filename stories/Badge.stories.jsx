import { Badge } from '../components/ui/index.jsx';
export default { title: 'UI/Badge', component: Badge, args: { children: 'Чернетка' }, argTypes: { tone: { control: 'select', options: ['neutral', 'success', 'danger'] } } };
export const Neutral = {};
export const Success = { args: { tone: 'success', children: 'Активна' } };
export const Danger = { args: { tone: 'danger', children: 'Потребує змін' } };
