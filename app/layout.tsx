import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "SkillSwap Morocco — Exchange Skills, Not Money",
  description:
    "Morocco's first skill-exchange platform. Teach what you know, learn what you love. Connect with talented people across Morocco and exchange skills for free.",
  keywords: ["skill swap", "Morocco", "learn", "teach", "exchange", "platform"],
  openGraph: {
    title: "SkillSwap Morocco",
    description: "Exchange Skills, Not Money",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillSwap Morocco",
    description: "Exchange Skills, Not Money",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-slate-200 antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a2e",
                color: "#e2e8f0",
                border: "1px solid rgba(0, 255, 135, 0.2)",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: { primary: "#00ff87", secondary: "#0a0a0f" },
              },
              error: {
                iconTheme: { primary: "#f87171", secondary: "#0a0a0f" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
