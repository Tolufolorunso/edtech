import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function CustomButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}: Props) {
  const base = 'px-4 py-2 rounded font-semibold transition duration-200';
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-800',
    secondary: 'bg-secondary text-white hover:bg-blue-600',
    outline:
      'border border-primary text-primary hover:bg-primary hover:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
