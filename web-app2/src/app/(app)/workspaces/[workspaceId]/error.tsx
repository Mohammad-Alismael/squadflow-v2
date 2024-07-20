"use client";
export default function ErrorBoundary({ error }: { error: Error }) {
  return <div>error accorded while fetching workspace, {error.message}</div>;
}
