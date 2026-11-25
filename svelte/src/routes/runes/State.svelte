<script lang="ts">
  import { SvelteMap } from 'svelte/reactivity';
  import { Item } from './Item.svelte';
  interface Todo {
    name: string;
    done: boolean;
  }

  let count = $state(0);

  let todos: Todo[] = $state([
    { name: 'buy groceries', done: true },
    { name: 'clean home', done: false },
  ]);

  let name = $state('');
  function addTodo() {
    todos.push({ name, done: false });
  }

  let items = $state([new Item('Megablood', 42), new Item('Headhunter')]);

  let map: SvelteMap<String, number> = new SvelteMap([
    ['baz', 4],
    ['qux', 8],
  ]);
  map.set('foo', 42);
  map.set('bar', 15);
  function logMap() {
    console.log($state.snapshot(map));
  }

  let duplexCount = $state(0);
  function instantInc() {
    duplexCount++;
  }
  async function delayedInc() {
    duplexCount++;
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
</script>

<p>{duplexCount}</p>
<button onclick={async () => await delayedInc()}>Slow</button>
<button onclick={instantInc}>Fast</button>

<section>
  <button onclick={() => count++}>
    clicks: {count}
  </button>
</section>

<ul>
  {#each todos as todo}
    <li class={['todo', todo.done && 'done']}>
      <span>{todo.name}</span>
      <button onclick={() => (todo.done = !todo.done)}>
        {todo.done ? 'Undo' : 'Done'}
      </button>
    </li>
  {/each}
</ul>
<section>
  <input type="text" bind:value={name} />
  <button onclick={addTodo}>Add</button>
</section>

<ul>
  {#each items as item}
    <li>
      <span>{item.name}</span>
      <span>({item.level})</span>
      <button onclick={item.upgrade}>Upgrade</button>
    </li>
  {/each}
</ul>

<ul>
  {#each map.entries() as [key, value]}
    <li>
      <p>key: {key}</p>
      <p>value: {value}</p>
    </li>
  {/each}
</ul>
<button onclick={logMap}>Log</button>

<style>
  .todo.done {
    text-decoration: line-through;
  }
</style>
