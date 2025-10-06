// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AppSidebar } from "./components/AppSidebar";

// import { Poppins } from 'next/font/google';

// const poppins = Poppins({
//   weight: ['400', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

// const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

// export const metadata = {
//   title: "Perplexity Clone",
//   description: "A clone of Perplexity built with Next.js",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex h-screen bg-gray-100">
//          <AppSidebar />
//           <div className="flex-1 overflow-y-auto">
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }


import { Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "./components/AppSidebar";
import { Poppins } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Query AI",
  description: "QueryAI for your Queries",
};

export default function RootLayout({ children }) {
  return (
   
    <html lang="en">
      <body className={`${inter.className} ${poppins.className} bg-gray-100`}>
         <AuthProvider>
        <div className="flex h-screen">
          <AppSidebar />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
        </AuthProvider>
      </body>
    </html>
    
  );
}
