
interface Window {
  storage: {
    mode: "browser" | "local" | "unknown";
    get: (key: string) => Promise<{ value: string } | null>;
    set: (key: string, value: string) => Promise<void>;
    delete: (key: string) => Promise<void>;
  };
}

interface ImportMeta {
  env: Record<string, string>;
}
