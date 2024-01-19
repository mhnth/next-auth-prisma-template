const do_fetch = async (path: string, init?: RequestInit) => {
  const resp = await fetch(path, init);

  const json = await resp.json();

  if (!resp.ok) {
    throw new Error(json.error.message);
  }

  return json.data;
};

type ReqBody = Record<string, any> | string;
const json_headers = { 'Content-Type': 'application/json' };
const text_headers = { 'Content-Type': 'text/plain' };

export const api = {
  async get(path: string) {
    return do_fetch(path);
  },

  async postForm(path: string, formData: FormData) {
    return do_fetch(path, {
      method: 'POST',
      body: formData,
    });
  },

  async call(path: string, body: ReqBody, method: string = 'POST') {
    const init = { method, body: JSON.stringify(body), headers: json_headers };

    return do_fetch(path, init);
  },
};
