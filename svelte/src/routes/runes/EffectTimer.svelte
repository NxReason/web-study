<script lang="ts">
  let interval = $state(5000); // ms
  let isRunning = $state(false);

  let timeLeft = $state(5000);

  $effect(() => {
    timeLeft = interval;

    const intervalId = setInterval(() => {
      timeLeft -= 10;
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        isRunning = false;
      }
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  });
</script>

<div>
  {#if isRunning}
    <p>Time left: {timeLeft / 1000}</p>
  {:else}
    <p>{interval / 1000}</p>
  {/if}
  <button onclick={() => (isRunning = true)}>Start</button>
  <button onclick={() => (isRunning = false)}>Stop</button>
</div>
