import { useState } from "react";
function TodoInput({ onAdd }) {
  const [state, setState] = useState("");
  return (
    <div>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Add Something"
      />
      <button
        onClick={() => {
          onAdd(state);
          setState("");
        }}
      >
        ADD
      </button>
    </div>
  );
}
export { TodoInput };
