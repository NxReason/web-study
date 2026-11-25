<script lang="ts">
  import Static from '#lib/components/Static.svelte';
  import { rangeLimits } from './state.svelte';

  const { min, max } = rangeLimits;
  function range(from: number, to: number) {
    const r = new Array(to - from);
    for (let i = from; i < to; i++) {
      r[i - from] = i;
    }
    return r;
  }
</script>

<h1>Introduction</h1>
{#each range(min, max) as _val}
  <Static />
{/each}

<style>
  :root {
    background-color: magenta;
    color: white;
  }
  h1 {
    font-family: 'Host Grotesk', monospace;
  }
</style>
