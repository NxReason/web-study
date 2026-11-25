<script lang="ts">
  import { untrack } from 'svelte';
  import EffectPending from './EffectPending.svelte';
  import EffectTimer from './EffectTimer.svelte';

  let canvas: HTMLCanvasElement;

  let size = $state(50);
  let offset = $state(0);
  let color = $state('#ff3e00');

  $effect(() => {
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const s = untrack(() => size);
    ctx.fillStyle = color;
    ctx.fillRect(offset, offset, s, s);

    return () => {
      console.log(`Previous size: ${s}`);
    };
  });

  function randomize() {
    size = Math.round(Math.random() * 80 + 20);
    offset = Math.round(Math.random() * 40);
  }
</script>

<div>
  <EffectTimer />
</div>

<div>
  <EffectPending />
</div>

<canvas bind:this={canvas} width="300" height="150"></canvas>
<div>
  <span>Size</span>
  <input type="text" bind:value={size} />
</div>
<div>
  <span>Offset</span>
  <input type="text" bind:value={offset} />
</div>
<div>
  <button onclick={randomize}>Randomize</button>
</div>

<style>
  canvas {
    border: 1px solid black;
    border-radius: 4px;
  }
</style>
