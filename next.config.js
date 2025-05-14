/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/app/styles'],
    prependData: `@import "variables.scss"; @import "mixins.scss";`,
  },
};

module.exports = nextConfig;
