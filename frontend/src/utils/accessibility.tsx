/**
 * Accessibility Utilities for TBI-MVP Project
 * Reusable components for WCAG 2.1 AA compliance
 * Screen reader support, keyboard navigation, and a11y helpers
 */

import React from 'react';

/* ============================================
   SCREEN READER ONLY COMPONENT
   Visually hidden but accessible to screen readers
   ============================================ */
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => (
  <span className="sr-only">{children}</span>
);

/* ============================================
   SKIP LINK COMPONENT
   Skip to main content link for keyboard users
   ============================================ */
export const SkipLink: React.FC<{ href: string; children: React.ReactNode }> = ({ 
  href, 
  children 
}) => (
  <a 
    href={href} 
    className="skip-link"
    tabIndex={-1}
    style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
    onFocus={(e) => {
      const target = e.currentTarget;
      target.style.position = 'relative';
      target.style.top = '0';
      target.style.left = 'auto';
    }}
  >
    {children}
  </a>
);

/* ============================================
   FOCUS VISUAL INDICATOR
   Enhanced focus ring for custom components
   ============================================ */
export const FocusIndicator: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <span 
    className={`focus-visible:focus-outline ${className}`}
    style={{
      outline: 'none',
      outlineOffset: '2px'
    }}
  >
    {children}
  </span>
);

/* ============================================
   LOADING STATE COMPONENT
   Accessible loading spinner with status updates
   ============================================ */
export const LoadingSpinner: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  children?: React.ReactNode;
}> = ({ size = 'md', ariaLabel = 'Loading...', children }) => {
  const sizes = {
    sm: { width: '20px', height: '20px' },
    md: { width: '40px', height: '40px' },
    lg: { width: '56px', height: '56px' }
  };

  return (
    <span 
      role="status" 
      aria-label={ariaLabel}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: sizes[size].width,
        height: sizes[size].height,
        border: '3px solid var(--gray-200)',
        borderTopColor: 'var(--color-primary-600)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    >
      {children}
    </span>
  );
};

/* ============================================
   ERROR MESSAGE COMPONENT
   Accessible error display with live region
   ============================================ */
export const ErrorBanner: React.FC<{ 
  message: string;
  onClose?: () => void;
}> = ({ message, onClose }) => (
  <div 
    role="alert"
    aria-live="assertive"
    className="error-banner"
  >
    <span>⚠️ {message}</span>
    {onClose && (
      <button onClick={onClose} aria-label="Dismiss error message">
        ✕
      </button>
    )}
  </div>
);

/* ============================================
   KEYBOARD NAVIGATION HELPER
   Wrapper for custom interactive elements
   ============================================ */
export const KeyboardInteractive: React.FC<{ 
  children: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}> = ({ children, onKeyDown }) => (
  <div
    tabIndex={-1}
    onKeyDown={onKeyDown}
    style={{ outline: 'none' }}
  >
    {children}
  </div>
);

/* ============================================
   TOGGLE SWITCH COMPONENT
   Accessible checkbox replacement with visual toggle
   ============================================ */
export const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}> = ({ checked, onChange, label, disabled }) => (
  <div className="toggle-switch" role="switch" aria-checked={checked} aria-label={label}>
    <input
      type="checkbox"
      className="toggle-input"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      aria-hidden="true"
    />
    <span className={`toggle-slider ${checked ? 'active' : ''}`}></span>
    {label && (
      <label className="toggle-label">{label}</label>
    )}
  </div>
);

/* ============================================
   FORM ERROR INPUT WRAPPER
   Groups input with error message for validation feedback
   ============================================ */
export const FormErrorInput: React.FC<{
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}> = ({ id, label, type = 'text', value, onChange, error, placeholder }) => {
  return (
    <div className="form-input-group" data-field={id}>
      <label 
        htmlFor={id} 
        className={error ? 'error-label' : ''}
      >
        {label}
        <span className="sr-only">({error ? error : placeholder})</span>
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
      />
      
      {error && (
        <span 
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
};

/* ============================================
   NAVIGATION TABS COMPONENT
   Accessible tab interface with keyboard support
   ============================================ */
export const NavigationTabs: React.FC<{
  tabs: { id: string; label: string }[];
  activeTabId?: string;
  onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTabId = '', onTabChange }) => {
  return (
    <div role="tablist" aria-label="Navigation tabs">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          id={`tab-${index}`}
          role="tab"
          aria-selected={activeTabId === tab.id}
          aria-controls={`panel-${tab.id}`}
          onClick={() => onTabChange(tab.id)}
          className={`nav-tab ${activeTabId === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

/* ============================================
   PANEL/TAB CONTENT COMPONENT
   Accessible tab panel content
   ============================================ */
export const TabPanel: React.FC<{
  id: string;
  title?: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => (
  <div
    id={`panel-${id}`}
    role="tabpanel"
    aria-labelledby={`tab-${id}`}
  >
    {title && <h2>{title}</h2>}
    {children}
  </div>
);

/* ============================================
   ANIMATION UTILITIES (Reduced Motion Support)
   ============================================ */
export const ReducedMotion: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <style>{`
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `}</style>
);

/* ============================================
   HIGH CONTRAST MODE SUPPORT
   Styles that adapt to high contrast preferences
   ============================================ */
export const HighContrastStyles: React.FC = () => (
  <style>{`
    @media (prefers-contrast: high) {
      :root {
        --color-primary-600: #0000ee;
        --gray-900: #000000;
        --gray-50: #ffffff;
      }

      button:focus, 
      input:focus, 
      select:focus, 
      a:focus {
        outline: 3px solid currentColor !important;
        box-shadow: none !important;
      }
    }
  `}</style>
);

/* ============================================
   ACCESSIBILITY ALERT HOOK
   Custom hook for managing accessible alerts
   ============================================ */
export const useAccessibilityAlert = () => {
  const [alert, setAlert] = React.useState<{
    message: string;
    type: 'error' | 'success' | 'info';
  } | null>(null);

  const showAlert = (message: string, type: 'error' | 'success' | 'info' = 'info') => {
    setAlert({ message, type });
    // Auto-dismiss after 5 seconds for non-error messages
    if (type !== 'error') {
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return { alert, showAlert, dismissAlert: () => setAlert(null) };
};

/* ============================================
   ACCESSIBILITY ALERT COMPONENT HOOK
   Creates accessible alert with auto-dismiss
   ============================================ */
export const AccessibleAlert: React.FC<{
  message: string;
  type: 'error' | 'success' | 'info';
  onClose: () => void;
}> = ({ message, type, onClose }) => (
  <div 
    role="alert"
    aria-live="polite"
    className={`accessible-alert alert-${type}`}
    onClick={onClose}
    style={{ cursor: 'pointer' }}
  >
    {message}
  </div>
);
