import { JSX, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

export default function HeaderText({
  children,
  level = 1,
  className = '',
}: Props) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes = {
    1: 'text-3xl',
    2: 'text-2xl',
    3: 'text-xl',
  };

  return (
    <div className={`${sizes[level]} font-bold text-primary ${className}`}>
      {children}
    </div>
  );
}
