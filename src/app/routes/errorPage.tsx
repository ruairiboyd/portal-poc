import { useRouteError } from 'react-router-dom';

export default function ErrorPage(): React.ReactNode {
  const error: unknown = useRouteError();
  console.error(error);
  function getErrorMessage(error: unknown): string {
    if (typeof error === 'string') {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    } else if (error && typeof error === 'object') {
      const err = error as { statusText?: string; message?: string };
      return err.statusText || err.message || 'An unknown error occurred';
    }
    return 'An unknown error occurred';
  }

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{getErrorMessage(error)}</i>
      </p>
    </div>
  );
}
