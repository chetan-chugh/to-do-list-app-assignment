import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="app-content">{children}</div>
    </div>
  );
}