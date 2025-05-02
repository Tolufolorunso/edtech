import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'light' | 'normal' | 'semibold' | 'bold';
  className?: string;
}

export default function AppText({
  children,
  size = 'base',
  weight = 'normal',
  className = '',
}: Props) {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <p className={`${sizes[size]} ${weights[weight]} ${className}`}>
      {children}
    </p>
  );
}
