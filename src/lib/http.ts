export type JsonInit = Omit<RequestInit, "body"> & {
  json?: unknown;
  headers?: HeadersInit;
};

export async function fetchJSON<T = any>(url: string, init: JsonInit = {}): Promise<T> {
  const { json, headers, ...rest } = init;

  const res = await fetch(url, {
    credentials: "include",
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: json !== undefined ? JSON.stringify(json) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || res.statusText;
    throw new Error(msg);
  }
  return data as T;
}
