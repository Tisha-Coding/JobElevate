// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://6819ee4daefa0f375cccd22df54aa436@o4509043206455296.ingest.us.sentry.io/4509043213860864",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongoIntegration()
  ],

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});


Sentry.profiler.startProfiler();

Sentry.startSpan({
    name: "My First Transaction",
}, () =>
{

});

Sentry.profiler.stopProfiler();