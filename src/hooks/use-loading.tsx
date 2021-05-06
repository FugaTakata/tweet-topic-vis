import { useState } from "react";

export const useLoading = (initalValue?: boolean) => {
  initalValue = !!initalValue;
  const [loading, setLoading] = useState<boolean>(initalValue);
  return { loading, setLoading };
};
