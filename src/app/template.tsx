'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>Loading...</title>
      <main className="flex-1">{children}</main>
    </>
  );
}
