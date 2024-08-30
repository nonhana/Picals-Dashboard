'use client';

import { CSSProperties } from 'react';
import _toast, { Toaster as DefaultToaster } from 'react-hot-toast';

const logoStyle: CSSProperties = {
  marginRight: '6px',
  display: 'inline-flex',
  width: '20px',
  height: '20px',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
};

const srOnly: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
};

const successIcon = () => {
  return (
    <div style={{ ...logoStyle, backgroundColor: '#d1fae5', color: '#10b981' }}>
      <svg
        aria-hidden="true"
        style={{ width: '16px', height: '16px' }}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span style={srOnly}>Check icon</span>
    </div>
  );
};

const errorIcon = () => {
  return (
    <div style={{ ...logoStyle, backgroundColor: '#fee2e2', color: '#ef4444' }}>
      <svg
        aria-hidden="true"
        style={{ width: '16px', height: '16px' }}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span style={srOnly}>Error icon</span>
    </div>
  );
};

const warningIcon = () => {
  return (
    <div style={{ ...logoStyle, backgroundColor: '#ffedd5', color: '#f97316' }}>
      <svg
        aria-hidden="true"
        style={{ width: '16px', height: '16px' }}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span style={srOnly}>Warning icon</span>
    </div>
  );
};

const toast = _toast;

type ToastHandler = typeof toast.success;

type Toast = typeof toast & {
  error: ToastHandler;
  warning: ToastHandler;
  success: ToastHandler;
};

(toast as Toast).error = (...args: Parameters<ToastHandler>) => {
  const [message, options] = args;
  return toast(message, {
    position: 'top-center',
    icon: errorIcon(),
    ...options,
  });
};

(toast as Toast).success = (...args: Parameters<ToastHandler>) => {
  const [message, options] = args;
  return toast(message, {
    position: 'top-center',
    icon: successIcon(),
    ...options,
  });
};

(toast as Toast).warning = (...args: Parameters<ToastHandler>) => {
  const [message, options] = args;
  return toast(message, {
    position: 'top-center',
    icon: warningIcon(),
    ...options,
  });
};

export const Toaster = () => {
  return (
    <DefaultToaster
      position="top-center"
      toastOptions={
        {
          style: {
            fontSize: '14px',
            padding: '5px 10px',
            borderRadius: '10px',
          },
          success: {
            icon: successIcon(),
          },
          error: {
            icon: errorIcon(),
          },
          warning: warningIcon(),
        } as any
      }
    />
  );
};

export default toast as Toast;
