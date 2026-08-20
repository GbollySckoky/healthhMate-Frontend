'use client';

import { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode | ((error: unknown, reset: () => void) => ReactNode);
  onError?: (error: unknown, errorInfo?: unknown) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown  | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static propTypes = {
    children: PropTypes.node,
    fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onError: PropTypes.func,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // send to Sentry / your logging service
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);

    // Attempt to send to Sentry if the SDK is available. Use dynamic import so
    // the app doesn't fail to build if `@sentry/react` isn't installed yet.
    try {
      void import('@sentry/react')
        .then((mod: unknown) => {
          const maybeSentry = (mod as { default?: { captureException?: (error: unknown, options?: { extra?: Record<string, unknown> }) => unknown };
            captureException?: (error: unknown, options?: { extra?: Record<string, unknown> }) => unknown } | null) ?? null;
          const Sentry = maybeSentry?.default ?? maybeSentry;

          if (Sentry && typeof Sentry.captureException === 'function') {
            try {
              Sentry.captureException(error, { extra: { errorInfo } });
            } catch (e) {
              console.error(e);
              // ignore Sentry capture errors
            }
          }
        })
        .catch(() => {
          // SDK not installed or failed to load — ignore silently
        });
    } catch {
      // noop
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? (this.props.fallback as (err: unknown, reset: () => void) => ReactNode)(this.state.error, this.reset)
          : this.props.fallback;
      }
      return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="p-4 border text-center">
            <p className="text-red-600 mb-2 text-sm font-medium">Something went wrong.</p>
            <button onClick={this.reset} className="text-sm underline cursor-pointer text-grey-20">
                Try again
            </button>
            </div>
        </div>
      );
    }
    return this.props.children ?? null;
  }
}

export default ErrorBoundary;