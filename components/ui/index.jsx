import { cloneElement } from 'react';
import Link from 'next/link';

const classes = (...values) => values.filter(Boolean).join(' ');

export function Button({ variant = 'primary', size = 'medium', busy = false, disabled = false, className, type = 'button', ...props }) {
  return <button {...props} type={type} disabled={disabled || busy} aria-busy={busy || undefined} className={classes('ui-button', `ui-button--${variant}`, `ui-button--${size}`, className)} />;
}
// Navigation uses a real link; disabled/busy states belong to Button actions.
export function LinkButton({ variant = 'primary', size = 'medium', className, ...props }) {
  return <Link {...props} className={classes('ui-button', `ui-button--${variant}`, `ui-button--${size}`, className)} />;
}
export function Input({ className, ...props }) {
  return <input {...props} className={classes('ui-input', className)} />;
}
export function Select({ className, ...props }) {
  return <select {...props} className={classes('ui-input', className)} />;
}
export function Textarea({ className, ...props }) {
  return <textarea {...props} className={classes('ui-input', className)} />;
}
// One control per field. The caller supplies a stable id, also used for help/error text.
export function Field({ id, label, hint, error, required = false, className, children }) {
  const describedBy = [children.props['aria-describedby'], hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return <div className={classes('ui-field', className)}>
    <label htmlFor={id}>{label}{required && <span aria-hidden="true">{' *'}</span>}</label>
    {cloneElement(children, { id, 'aria-required': required || undefined, 'aria-invalid': Boolean(error) || children.props['aria-invalid'], 'aria-describedby': describedBy })}
    {hint && <small id={`${id}-hint`} className="ui-field-hint">{hint}</small>}
    {error && <small id={`${id}-error`} className="ui-field-error">{error}</small>}
  </div>;
}
export function Checkbox({ label, className, ...props }) {
  return <label className={classes('ui-checkbox', className)}><input {...props} type="checkbox" /><span>{label}</span></label>;
}
export function Card({ as: Element = 'section', className, ...props }) {
  return <Element {...props} className={classes('ui-card', className)} />;
}
export function Badge({ tone = 'neutral', className, ...props }) {
  return <span {...props} className={classes('ui-badge', `ui-badge--${tone}`, className)} />;
}
export function Alert({ tone = 'info', className, role = 'status', ...props }) {
  return <div {...props} role={role} className={classes('ui-alert', `ui-alert--${tone}`, className)} />;
}
