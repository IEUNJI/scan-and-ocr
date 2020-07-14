const openConsole = () => {
  const params = new URLSearchParams(location.search);
  if (!params.has('debug')) return;

  if (document.querySelector('#utils-console')) return;

  const script = document.createElement('script');
  script.id = 'utils-console';
  script.src = '//cdn.bootcss.com/eruda/1.5.2/eruda.min.js';
  script.setAttribute('onload', 'eruda.init();');

  document.body.append(script);
};

export default openConsole;
