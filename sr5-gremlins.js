/* SR5 Gremlins Quality
 * Applies Gremlins only to the owning actor's glitch decisions.
 */

const SR5_GREMLINS_MODULE_ID = 'sr5-gremlins';

Hooks.once('init', () => {
  if (!game.system?.id?.startsWith('shadowrun5e')) return;

  Hooks.on('sr5_testPrepareBaseValues', applyGremlinsGlitchAdjustment);
  console.log(`${SR5_GREMLINS_MODULE_ID} | Gremlins quality rule enabled`);
});

function getGremlinsLevel(actor) {
  return (actor?.items ?? [])
    .filter((item) => item.type === 'quality'
      && item.name?.trim().toLowerCase() === 'gremlins'
      && item.system?.type === 'negative')
    .reduce((level, item) => level + Math.max(Number(item.system?.rating) || 0, 0), 0);
}

function applyGremlinsGlitchAdjustment(test) {
  const level = getGremlinsLevel(test.actor);
  if (!level) return;

  let prototype = test;
  let descriptor;
  while (prototype && !descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(prototype, 'glitched');
    prototype = Object.getPrototypeOf(prototype);
  }
  if (!descriptor?.get || Object.prototype.hasOwnProperty.call(test, 'glitched')) return;

  Object.defineProperty(test, 'glitched', {
    configurable: true,
    get() {
      const countedGlitches = this.glitches.value + level;
      return countedGlitches > Math.floor(this.pool.value / 2);
    }
  });
}
