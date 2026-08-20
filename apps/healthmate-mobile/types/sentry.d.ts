declare module '@sentry/react' {
  const Sentry: {
    captureException: (error: unknown, options?: { extra?: Record<string, unknown> }) => unknown;
  };

  export default Sentry;
}
