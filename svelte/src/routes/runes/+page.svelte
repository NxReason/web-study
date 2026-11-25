<script lang="ts">
  import Derived from './Derived.svelte';
  import State from './State.svelte';
  import UserNameDisplay from './UserNameDisplay.svelte';
  import Effect from './Effect.svelte';

  const title = 'Hello runes';
</script>

<h1>{title}</h1>

<h2 class="subtitle">Effect</h2>
<Effect />

<h2 class="subtitle">User Name Display</h2>
<UserNameDisplay />

<h2 class="subtitle">Derived</h2>
<Derived />

<h2 class="subtitle">State</h2>
<State />

<style>
  h1,
  h2 {
    font-family: 'Host Grotesk', monospace;
  }
  .subtitle {
    text-align: center;
  }
  .subtitle::before,
  .subtitle::after {
    content: '';
    display: inline-block;
    width: 150px;
    margin: 0 8px 8px;
    border-bottom: 2px solid black;
  }
</style>
