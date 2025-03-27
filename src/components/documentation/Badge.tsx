import React from 'react';
import { Circle } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'beta' | 'stable' | 'deprecated';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-800',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-rose-50 text-rose-700',
    info: 'bg-sky-50 text-sky-700',
    beta: 'bg-violet-50 text-violet-700',
    stable: 'bg-emerald-50 text-emerald-700',
    deprecated: 'bg-rose-50 text-rose-700',
  };

  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-xs py-1 px-2.5'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {variant === 'beta' && <Circle className="w-2 h-2 mr-1 fill-violet-500 stroke-none" />}
      {variant === 'stable' && <Circle className="w-2 h-2 mr-1 fill-emerald-500 stroke-none" />}
      {variant === 'deprecated' && <Circle className="w-2 h-2 mr-1 fill-rose-500 stroke-none" />}
      {children}
    </span>
  );
}