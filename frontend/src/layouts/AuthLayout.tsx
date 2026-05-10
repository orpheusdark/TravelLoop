import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-[40px] border border-slate-200/80 bg-white/95 px-8 py-10 shadow-soft">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
