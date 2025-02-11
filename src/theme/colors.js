export const theme = {
  colors: {
    primary: '#2b6cb0',      // Royal blue
    primaryLight: '#4299e1', // Bright blue
    primaryLighter: '#ebf8ff', // Very light blue
    secondary: '#718096',    // Vivid sky blue
    accent: '#63b3ed',       // Light sky blue
    background: '#f0f7ff',   // Ice blue background
    surface: '#ffffff',      // Pure white
    surfaceHover: '#f7fafc', // Light gray-blue hover
    text: {
      primary: '#2d3748',    // Deep blue
      secondary: '#4a5568',  // Royal blue
      light: '#4299e1',      // Bright blue
      muted: '#718096'       // Muted blue-gray
    },
    border: {
      light: '#e1eeff',     // Very light blue
      default: '#cbd5e0',    // Medium blue
      hover: '#4299e1'       // Bright blue
    },
    button: {
      primary: {
        background: '#2b6cb0',
        hover: '#4299e1',
        text: '#ffffff'
      },
      secondary: {
        background: '#ebf8ff',
        hover: '#bee3f8',
        text: '#2b6cb0'
      }
    },
    success: '#10B981',      // Emerald green
    error: '#EF4444',        // Red
    warning: '#F59E0B',      // Amber
    divider: '#e1eeff',      // Very light blue
    shadow: 'rgba(59, 130, 246, 0.1)', // Blue-tinted shadow
    overlay: 'rgba(30, 64, 175, 0.05)'  // Deep blue overlay
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2b6cb0 0%, #4299e1 100%)',
    secondary: 'linear-gradient(135deg, #718096 0%, #63b3ed 100%)',
    accent: 'linear-gradient(135deg, #4299e1 0%, #63b3ed 100%)',
    surface: 'linear-gradient(180deg, #ffffff 0%, #f7fafc 100%)'
  },
  shadows: {
    xs: '0 1px 2px rgba(59, 130, 246, 0.05)',
    sm: '0 2px 4px rgba(59, 130, 246, 0.07)',
    md: '0 4px 6px rgba(59, 130, 246, 0.1)',
    lg: '0 8px 12px rgba(59, 130, 246, 0.12)',
    xl: '0 12px 24px rgba(59, 130, 246, 0.15)',
    hover: '0 15px 30px rgba(59, 130, 246, 0.2)',
    inner: 'inset 0 2px 4px rgba(59, 130, 246, 0.05)'
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  }
};
