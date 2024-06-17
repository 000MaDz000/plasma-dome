import { createContext } from "react";

const OpenCloseContext = createContext({ open: false, setOpen(val: boolean) { } });


export default OpenCloseContext;