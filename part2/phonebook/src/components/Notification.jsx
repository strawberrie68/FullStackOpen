import { useEffect } from "react";
import { useState } from "react";

const Notification = ({ errorMessage, successfulMessage }) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (errorMessage === null && successfulMessage === null) {
      setColor("hidden");
    } else if (errorMessage !== null) {
      setColor("error");
    } else if (successfulMessage !== null) {
      setColor("successful");
    } else {
      setColor("");
    }
  }, [errorMessage, successfulMessage]);

  return (
    <div className={`notification ${color} `}>
      {errorMessage}
      {successfulMessage}
    </div>
  );
};

export default Notification;
