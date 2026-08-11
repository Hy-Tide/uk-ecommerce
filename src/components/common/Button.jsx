import React from 'react';
import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading,
  fullWidth,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";
  
  const variants = {
    primary: "bg-[#124827] text-white hover:bg-[#1c6b3b] shadow-md shadow-[#124827]/20 hover:shadow-lg hover:shadow-[#124827]/30 focus:ring-[#124827]",
    secondary: "bg-[#eb5b27] text-white hover:bg-[#ca4313] shadow-md shadow-[#eb5b27]/20 hover:shadow-lg hover:shadow-[#eb5b27]/30 focus:ring-[#eb5b27]",
    outline: "border-2 border-[#124827] text-[#124827] hover:bg-[#124827] hover:text-white focus:ring-[#124827]",
    outlineOrange: "border-2 border-[#eb5b27] text-[#eb5b27] hover:bg-[#eb5b27] hover:text-white focus:ring-[#eb5b27]",
    ghost: "text-slate-700 hover:bg-slate-100 hover:text-[#124827] focus:ring-slate-400",
    glass: "bg-white/80 backdrop-blur-md border border-slate-200 text-[#124827] hover:bg-white hover:border-[#124827] shadow-sm",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs rounded-lg",
    md: "h-11 px-6 text-sm rounded-xl",
    lg: "h-13 px-8 text-base rounded-2xl",
    icon: "h-10 w-10 p-0 rounded-xl",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
