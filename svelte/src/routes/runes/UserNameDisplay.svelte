<script lang="ts">
  let firstName: string = $state('John');
  let lastName: string = $state('Doe');
  let showFull: boolean = $state(true);
  let displayName: string = $derived(
    showFull ? firstName + ' ' + lastName : firstName,
  );
</script>

<input type="text" bind:value={firstName} />
<input type="text" bind:value={lastName} />
<label>
  <span>Show full?</span>
  <input type="checkbox" bind:checked={showFull} />
</label>
<p>{displayName}</p>
