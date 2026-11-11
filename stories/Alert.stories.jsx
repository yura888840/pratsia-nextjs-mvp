import { Alert } from '../components/ui/index.jsx';
export default { title: 'UI/Alert', component: Alert, args: { children: 'Чернетку збережено в цьому браузері.' }, argTypes: { tone: { control: 'select', options: ['info', 'danger'] } } };
export const Info = {};
export const Error = { args: { tone: 'danger', role: 'alert', children: 'Не вдалося зберегти. Спробуйте ще раз.' } };
