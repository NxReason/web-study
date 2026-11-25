<script lang="ts">
  import { untrack } from 'svelte';

  let count = $state(0);
  let doubled = $derived(count * 2);

  let values = $state([4, 8, 15, 16]);
  let total = $derived.by(() => {
    let total = 0;
    for (const val of values) total += val;
    return total;
  });
  function addRandomValue() {
    values.push(Math.round(Math.random() * 100));
  }

  let large = $derived(doubled > 10);

  let multiplier = $state(5);
  let result = $derived(count * untrack(() => multiplier));
</script>

<p>
  <span>Result: {result}</span>
  <button onclick={() => multiplier++}>Multiplier: {multiplier}</button>
</p>

<p>{large}</p>

<div>Total: {total}</div>
<div>Values: [{values.join(', ')}]</div>
<button onclick={addRandomValue}>Add random</button>

<div>Count: {count}</div>
<div>Doubled: {doubled}</div>
<button onclick={() => count++}>Inc</button>
