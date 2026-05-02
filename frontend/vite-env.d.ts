/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.module.css';

declare module '*.module.scss';

declare module '*.module.sass';

declare module '*.module.less';

declare module '*.module.styl';

interface Window {
  Pi: {
    authenticate: (
      scopes: string[],
      onIncompletePaymentFound: (payment: any) => void
    ) => Promise<{
      accessToken: string;
      user: {
        username: string;
        uid: string;
      };
    }>;
  };
}