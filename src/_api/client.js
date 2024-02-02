import { create } from 'apisauce';
import UserService from '../services/UserServices';
import config from '../config.json';

const URL = config.local.API_URL;

// API pour l'API "api_blog"
const apiBlog = create({
    baseURL: `${URL}/api_blog`,
});

// API pour l' API "api_academy"
const apiAcademy = create({
    baseURL: `${URL}/api_academy`,
});

// Add a request interceptor to attach the Bearer token to every request
apiBlog.addRequestTransform((request) => {
    const authenticated = UserService.isLoggedIn();

    if (!authenticated) {
        // Handle not authenticated scenario, maybe redirect to login page
        console.log('User is not authenticated');
        return null; // Or handle in some way based on your app's logic
    }

    const token = UserService.getToken();
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
});

// Add a request interceptor to attach the Bearer token to every request
apiAcademy.addRequestTransform((request) => {
    const authenticated = UserService.isLoggedIn();

    if (!authenticated) {
        // Handle not authenticated scenario, maybe redirect to login page
        console.log('User is not authenticated');
        return null; // Or handle in some way based on your app's logic
    }

    const token = UserService.getToken();
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
});


export {
    apiBlog,
    apiAcademy,
};
