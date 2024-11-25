import { useState, useEffect } from "react";

export const useHash = () => {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const onHashChange = () => {
      if (typeof window === "undefined") return;
      setHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash;
};
