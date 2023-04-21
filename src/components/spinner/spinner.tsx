import React, { useEffect, useState } from "react";

// Delay after spinner is visible in ms
const DEFAULT_DELAY = 100;

interface Props {
  /** Delay in ms after which to show the spinner */
  delay?: number;
}

const Spinner = ({ delay }: Props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay === undefined ? DEFAULT_DELAY : delay);

    return () => clearTimeout(timeout);
  }, [setVisible]);

  return (
    <>
      <div className={`d-flex spinner-container${visible ? " visible" : ""}`}>
        <div className="spinner-border text-primary spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <style jsx>{`
        .spinner-container {
          min-height: 120px;
          opacity: 0;
        }
        .spinner-container.visible {
          opacity: 1;
        }
        .spinner {
          margin: auto;
        }
      `}</style>
    </>
  );
};

export default Spinner;
