import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={clsx('rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-xl', className)}>
      {children}
    </div>
  );
};

export default Card;
