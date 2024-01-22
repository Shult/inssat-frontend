import { create } from 'apisauce';
import UserService from '../services/UserServices';
import config from '../config.json';

const URL = config.test.API_URL;
const apiClientUser = create({
    baseURL: `${URL}/api_user`,
});

// Add a request interceptor to attach the Bearer token to every request
apiClientUser.addRequestTransform((request) => {
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



export default apiClientUser;