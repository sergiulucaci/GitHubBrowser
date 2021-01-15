type SendCrashReportProps = {
  error: string | Error,
  context?: string,
  componentStack?: string,
}

class ErrorService {
  sendCrashReport = ({ error, context, componentStack }: SendCrashReportProps) => {
    if (__DEV__) {
      console.log('=== Error crash report: ', {
        error,
        context,
        componentStack,
      });
    } else {
      // TODO: bind to an error service like Bugsnag / Sentry
    }
  }
}

export default new ErrorService();
