import { ReactNode } from "react";
import BrandPanel from "./brand-panel";

interface AuthFormShellProps {
  eyebrow: string;
  headline: string;
  body: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthFormShell({
  eyebrow,
  headline,
  body,
  title,
  subtitle,
  children,
  footer,
}: AuthFormShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5f0] p-4 sm:p-6 lg:p-8">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-sm border border-gray-100">
        {/* Form Container */}
        <div className="flex w-full flex-1 flex-col justify-center px-8 py-10 sm:px-12 lg:w-1/2">
          <div className="mx-auto w-full max-w-xs">
            <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight text-gray-900">
              {title}
            </h1>

            {children}

            {footer && <div className="mt-6 text-center">{footer}</div>}
          </div>
        </div>

        {/* Brand Panel Container */}
        <BrandPanel eyebrow={eyebrow} headline={headline} body={body} />
      </div>
    </main>
  );
}