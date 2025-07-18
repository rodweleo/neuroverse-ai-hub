export type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  type: "free" | "premium" | "token-gated";
  price: number;
  currency: string | null;
  icon: string;
  function_name?: string;
};
