import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
