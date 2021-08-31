const withPWA = require('next-pwa')
// import withPWA from 'next-pwa'

module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
    },
    env: {
        API_URL: process.env.API_URL
    }
})
