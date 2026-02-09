import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'CubiQo - Intelligence, Reimagined',
  description: 'Private, secure, multi-model AI assistant',
};

export default function CubiQoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cubiqo-site">
      {children}
    </div>
  );
}
