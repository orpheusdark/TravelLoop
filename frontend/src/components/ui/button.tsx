import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const MotionButton = motion(forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
));

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <MotionButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} {...props} />
);

Button.displayName = 'Button';
export default Button;
