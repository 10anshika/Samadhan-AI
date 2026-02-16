import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  disabled, 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 
      bg-[length:200%_auto] hover:bg-[position:right_center] 
      text-white 
      shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)]
      border border-transparent
      disabled:opacity-70 disabled:shadow-none disabled:grayscale disabled:hover:translate-y-0
    `,
    secondary: "bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
};