"use client";
export default function ErrorBoundary({ error }: { error: Error }) {
  return <div>error accorded {error.message}</div>;
}
