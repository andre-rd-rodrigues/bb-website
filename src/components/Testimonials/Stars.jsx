import React from "react";
import { Icon } from "@iconify/react";

const Stars = () => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <Icon icon="material-symbols:star" color="#B19460" key={index} />
      ))}
    </div>
  );
};

export default Stars;
