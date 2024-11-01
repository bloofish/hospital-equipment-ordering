import React, { useState } from "react";

function SignIn({ setWardId }) {
  const [selectedWard, setSelectedWard] = useState(1);

  const handleOptionChange = (event) => {
    setSelectedWard(event.target.value);
    const ward = event.target.value;
    setWardId(ward); //send ward_id to App.js

  };

  return (
    <div>
      <form>
        <label>
          <input
            type="radio"
            name="ward"
            value="1"
            checked={selectedWard == "1"}
            onChange={handleOptionChange}
          />
            Ward 1
        </label>
        <label>
          <input
            type="radio"
            name="ward"
            value="2"
            checked={selectedWard == "2"}
            onChange={handleOptionChange}
          />
            Ward 2
        </label>
      </form>
    </div>
  );
}
export default SignIn;
