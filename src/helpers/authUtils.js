import { Cookies } from 'react-cookie';

const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    
    if (!user) {
        return false;
    }

    return true;
};

const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

export { isUserAuthenticated, getLoggedInUser };
