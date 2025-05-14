import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/app/styles'],
    prependData: `@import "variables.scss"; @import "mixins.scss";`,
  },
};

export default nextConfig;
