<script module lang="ts">
  // svelte-ignore non_reactive_update
  let total: number = 0;
  console.log('First init');
</script>

<script lang="ts">
  total += 1;
  console.log(`instantiated ${total} times`);
</script>

<h3>Static value component #{total}</h3>
