import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={clsx('rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-xl', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
