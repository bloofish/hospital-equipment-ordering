import React, { useState } from "react";
import "./style.css";


function SignIn({ setWardId , setIsAdmin}) {
  const [selectedWard, setSelectedWard] = useState(1);
  const [isAdminSelected, setIsAdminSelected] = useState(0);


  const handleOptionChange = (event) => {
    setSelectedWard(event.target.value);
    const ward = event.target.value;
    setWardId(ward); //send ward_id to App.js
  };
  const handleAdminChange = (event) => {
    setIsAdminSelected(event.target.value);
    const admin = event.target.value;
    setIsAdmin(admin); // send admin to App.js
  };

  return (
    <div className="container">
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
        <label style = {{paddingLeft: "20px"}}>
          <input
            type="radio"
            name="admin"
            value="0"
            checked={isAdminSelected == "0"}
            onChange={handleAdminChange}
          />
            Staff
        </label>
        <label>
          <input
            type="radio"
            name="admin"
            value="1"
            checked={isAdminSelected == "1"}
            onChange={handleAdminChange}
          />
            Admin
        </label>
        
        
      </form>
    </div>
  );
}
export default SignIn;
