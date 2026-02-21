"use client"; // Error components must be Client Components

import GlobalError from "./global-error";

// The Error page that displays the error message.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalError error={error} reset={reset} />;
}
