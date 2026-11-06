// Set PRATSIA_STANDALONE=1 when building a standalone deployment.
export default {
  output: process.env.PRATSIA_STANDALONE === "1" ? "standalone" : undefined,
};
