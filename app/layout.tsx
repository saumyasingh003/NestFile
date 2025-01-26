import { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

// Import the Kanit font
const kanit = Kanit({
  subsets: ["latin"], // Use "latin" subset for English characters
  weight: ["100", "200", "400", "500"], // Specify the font weights you want
  style: ["normal", "italic"], // Add styles if needed
  variable: "--font-kanit", // Define a custom CSS variable for this font
});

export const metadata: Metadata = {
  title: "NestFile",
  description: "The ultimate storage solution",
  icons:{
    icon:"/assets/main.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.variable}>
      <body className={`antialiased`}>
        <main>{children}</main>
       
      </body>
    </html>
  );
}
