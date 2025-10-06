/** @type {import('next').NextConfig} */


const nextConfig = {

     images: {
     domains: ["serpapi.com", "encrypted-tbn0.gstatic.com", 'openweathermap.org'], 
      remotePatterns: [
      { protocol: "https", hostname: "**" } // allows all HTTPS images (not always recommended)
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
