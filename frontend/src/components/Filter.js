import React from "react";

const Filter = (props) => (
  <form>
    <div>
      filter shown with{" "}
      <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  </form>
);

export default Filter;
