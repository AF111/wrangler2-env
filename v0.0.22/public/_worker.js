// index.js
var renderWithEnvVars = (response, env) => {
  return new HTMLRewriter().on("#data-out", {
    element(el) {
      el.setInnerContent(JSON.stringify(env, null, 2));
    }
  }).transform(response);
};
var v0_0_default = {
  async fetch(request, environment, context) {
    console.log(environment);
    const env = {
      KEYS_EXIST: {
        FOO: "FOO" in environment,
        BAR: "BAR" in environment
      },
      VALUES: {
        FOO: environment.FOO ?? "undefined",
        BAR: environment.BAR ?? "undefined"
      }
    };
    try {
      return renderWithEnvVars(await environment.ASSETS.fetch(request), env);
    } catch (error) {
      console.error(environment.ERROR_URL, error);
      return new Response("Something went wrong!", { status: 500 });
    }
  }
};
export {
  v0_0_default as default
};
