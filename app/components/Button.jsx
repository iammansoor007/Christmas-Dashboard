'use client'
const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  as: Component = href ? 'a' : 'button',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95'
  
  const variants = {
    primary: 'bg-gradient-to-r from-holiday-red to-holiday-gold text-white hover:shadow-lg hover:shadow-holiday-red/40',
    secondary: 'bg-transparent border-2 border-holiday-gold text-holiday-gold hover:bg-holiday-gold/10',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }
  
  const variantStyles = variants[variant] || variants.primary
  const sizeStyles = sizes[size] || sizes.md
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button