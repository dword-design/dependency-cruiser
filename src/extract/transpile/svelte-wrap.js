const tryRequire = require("semver-try-require");
const svelteCompiler = tryRequire(
  "svelte/compiler",
  require("../../../package.json").supportedTranspilers.svelte
);
const preProcess = require("./svelte-preprocess");

function getTranspiler(pTranspilerWrapper) {
  return (pSource, pTranspilerOptions) => {
    const lPreProcessedSource = preProcess(
      pSource,
      pTranspilerWrapper,
      pTranspilerOptions
    );
    return svelteCompiler.compile(lPreProcessedSource).js.code;
  };
}

module.exports = (pTranspilerWrapper) => ({
  isAvailable: () => svelteCompiler !== false,
  transpile: getTranspiler(pTranspilerWrapper),
});
