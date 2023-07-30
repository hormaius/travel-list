import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  // NOTE Handler to add new items, will be passed down to the Form component to be able to push the new item into the packingList component where items array resides
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // NOTE Handler to delete items: in this function, we let every item that is not the selected item id through the filter into the new array, so the selected item is DELETED
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // NOTE Handle checkbox: in this function, we loop through the items array once again, lazily forcing code to update the status of "packed" property in the object to the contrary of the CURRENT status - this means if the item.packed = true at the time we click it, it becomes false with the code execution, and for failsafe, we return "item" if it doesn't meet criteria
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // NOTE Handle clearing list: we just need to set the items array to its initial empty value, by doing in the code block below
  function handleClearList() {
    const confirmation = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmation) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        /* NOTE We lift up the onDeleteItem and onToggleItem states here since they need to be passed down as props to child components of the "App", ie: Item and PackingList */
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
