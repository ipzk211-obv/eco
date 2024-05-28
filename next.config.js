/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: [
            'firebasestorage.googleapis.com',
            'lh3.googleusercontent.com',
            'cdn.sz.lviv.ua'
        ],
    }
}

module.exports = nextConfig;
