import { createContext, type Context } from 'react';

const PagePathContext: Context<null | string> = createContext(null);

export default PagePathContext;