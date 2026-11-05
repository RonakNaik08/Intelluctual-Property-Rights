import "./globals.css";
import Provider from "./provider";

// Render pages per request instead of prerendering at build time, so the
// build doesn't need the Clerk keys. They're read at runtime instead.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
