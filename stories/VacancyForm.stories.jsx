import { useState } from 'react';
import { Button, Card, Field, Input, Select, Checkbox, Alert } from '../components/ui/index.jsx';
import { expect, userEvent, within } from 'storybook/test';
function VacancyForm() {
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  return <Card className="story-stack"><h2>Нова вакансія</h2><form className="story-stack" onSubmit={event => { event.preventDefault(); setError(title.trim() ? '' : 'Заповніть назву'); setSubmitted(Boolean(title.trim())); }} noValidate>
    <Field id="pattern-title" label="Назва вакансії" required error={error}><Input value={title} onChange={event => setTitle(event.target.value)} /></Field>
    <Field id="pattern-format" label="Формат роботи"><Select><option>Дистанційно</option><option>На місці</option></Select></Field>
    <Checkbox label="Відгук лише з резюме" defaultChecked />
    <div className="story-row"><Button type="submit">Зберегти</Button><Button variant="secondary" onClick={() => { setTitle(''); setError(''); setSubmitted(false); }}>Очистити</Button></div>
    {submitted && <Alert>Чернетку збережено (демо)</Alert>}
  </form></Card>;
}
export default { title: 'Patterns/Vacancy form', component: VacancyForm };
export const Default = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole('button', {name:'Зберегти'})); await expect(canvas.getByRole('textbox')).toHaveAttribute('aria-invalid','true'); await userEvent.type(canvas.getByRole('textbox'), 'Юрист'); await userEvent.click(canvas.getByRole('button',{name:'Зберегти'})); await expect(canvas.getByRole('status')).toHaveTextContent('Чернетку збережено'); } };
export const Mobile = { globals: { viewport: { value: 'mobile1', isRotated: false } } };
