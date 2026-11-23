const nameInput = document.getElementById('item-name');
const levelInput = document.getElementById('item-level');

const button = document.getElementById('item-create-btn');

button.addEventListener('click', async () => {
  const name = nameInput.value;
  const level = parseInt(levelInput.value);

  try {
    const res = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, level, foo: 'bar' }),
    });

    if (!res.ok) {
      console.log(res.status);
      return;
    }

    console.log(res.status);
    console.log(res.statusText);
    console.log(await res.text());
    addItem({ name, level });
  } catch (err) {
    console.log(err);
  }
});

const list = document.getElementById('item-list');
window.addEventListener('load', async () => {
  try {
    const res = await fetch('http://localhost:3000/items');
    const data = await res.json();
    console.log(data);
    fillList(data);
  } catch (err) {
    console.error(err);
  }
});

function fillList(items) {
  for (const item of items) {
    addItem(item);
  }
}

function addItem(item) {
  const li = document.createElement('li');
  li.textContent = `${item.name} (${item.level})`;
  list.appendChild(li);
}
