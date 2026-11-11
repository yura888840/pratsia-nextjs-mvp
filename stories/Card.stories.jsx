import { Card, Badge, LinkButton } from '../components/ui/index.jsx';
export default { title: 'UI/Card', component: Card, args: { children: 'Вміст картки' } };
export const Default = {};
export const Vacancy = { render: () => <Card as="article" className="story-stack"><Badge tone="success">Чернетка</Badge><h2>Юрист із договірного права</h2><p>Київ · Дистанційно · Повна зайнятість</p><strong>30 000 – 45 000 UAH / міс.</strong><div className="story-row"><LinkButton href="/employers/vacancies/new">Редагувати</LinkButton><LinkButton href="/employers" variant="secondary">До списку</LinkButton></div></Card> };
