import AppRouter from "../AppRouter";
import SubDomainRouter from "../routes/SubDomainRouter";

export const subDomainList = [
  {
    subDomain: "www",
    app: AppRouter,
    main: true,
  },
  {
    subDomain: "url",
    app: SubDomainRouter,
    main: false,
  },
];
