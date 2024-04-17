export type RoutesType = {
  main: {
    auth: string;
    core: string;
  };
  auth: {
    login: string;
    signup: string;
  };
  core: {
    splash: string;
  };
};

export type RoutesNamesOptions = keyof RoutesType;

export const routes: RoutesType = Object.freeze({
  core: {
    splash: 'Splash',
  },
  main: {
    auth: 'Auth',
    core: 'Core',
  },
  auth: {
    login: 'Login',
    signup: 'Signup',
  },
});
