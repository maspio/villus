import { createApp } from 'vue';

export function mount(component: Record<string, any>) {
  const app = createApp(component);
  app.config.warnHandler = () => {
    // Do nothing
  };
  app.config.errorHandler = (err: Error) => {
    if ((err as Error).message === 'data is not defined') {
      return;
    }

    if (/Cannot detect villus Client/.test(err.message)) {
      return;
    }

    if (/No subscription forwarder was set/.test(err.message)) {
      return;
    }

    // eslint-disable-next-line no-console
    console.error(err);
  };
  document.body.innerHTML = `<div id="app"></div>`;
  return app.mount('#app');
}
