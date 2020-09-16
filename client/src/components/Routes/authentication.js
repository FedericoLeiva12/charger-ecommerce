import { getUser } from "../../store/actions";


export const isAuthenticated = () => getUser().logged ? true : false;

//*tengo que hacer que esa function este true cuando esté logueado