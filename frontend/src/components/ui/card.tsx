import { ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className={clsx('rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-xl', className)}
    >
      {children}
    </motion.div>
  );
};

export default Card;
