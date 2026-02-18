import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,

  // Check out prerending. May need that for client rendered apps for faster initial page load
  // https://reactrouter.com/start/framework/rendering#static-pre-rendering
  //
  // IF using prerendering, would need a static data loader
  // https://reactrouter.com/start/framework/data-loading#static-data-loading
  // This would fetch the data at build time. Interesting.
} satisfies Config;
