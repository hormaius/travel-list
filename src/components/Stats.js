export default function Stats({ items }) {
  // EARLY RETURN
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list.</em>
      </p>
    );

  //////////
  // NOTE In this code block wrapped by dashes, we're using a derived state - numItems depends on the items-setItems state way up in the App component, passed down as a prop here. This lets us avoid creating new pieces of state, see the theory slides for more info
  // NOTE In addition, the reason we write them here is to avoid crowding the parent element/component(the App function) since their use is only here
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((numPacked / numItems) * 100);
  //////////
  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You got everything! Ready to go!"
          : `You have ${numItems} items on your list, you already packed ${numPacked} (
          ${percentagePacked}%).`}
      </em>
    </footer>
  );
}
