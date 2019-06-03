type Fetcher = typeof fetch;

interface VqlClientOptions {
  uri: string;
  fetch?: Fetcher
};

interface ClientQueryOptions {
  query: string;
  variables?: { [k: string]: any };
}

interface ClientMutationOptions {
  mutation: string;
  variables?: { [k: string]: any };
}

function resolveGlobalFetch (): Fetcher | undefined {
  // tslint:disable-next-line
  if (typeof window !== 'undefined' && 'fetch' in window) {
    return window.fetch;
  }

  // tslint:disable-next-line
  if (typeof global !== 'undefined' && 'fetch' in global) {
    return (global as any).fetch;
  }

  return undefined;
};

class VqlClient {
  uri: string;
  fetch: Fetcher;

  constructor (uri: string, fetch: Fetcher) {
    this.uri = uri;
    this.fetch = fetch;
  }

  query({ query, variables }: ClientQueryOptions) {
    return this.fetch(this.uri, {
      method: 'post',
      body: JSON.stringify({ query, variables }),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  mutate({ mutation, variables }: ClientMutationOptions) {
    return this.fetch(this.uri, {
      method: 'post',
      body: JSON.stringify({ mutation, variables }),
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}

export function createClient({ uri, fetch = resolveGlobalFetch() }: VqlClientOptions) {
  if (!fetch) {
    throw new Error('Could not resolve a fetch() method, you should provide one.');
  }

  return new VqlClient(uri, fetch);
};
