import { loadCookie } from '../utils/cookies';
import { API_BASE_URL } from '../config';

export default function apiService(endpoint, options = {}) {
	options.headers = {
		"Authorization": "Bearer " + loadCookie('token')
	};
	console.log(API_BASE_URL);
	return fetch(`${API_BASE_URL}/${endpoint}`, options);
}

export function linkBuilder(endpoint) {
	let token = loadCookie('token');
	return `http://localhost/financetracker/public/api/${endpoint}?token=${token}`;
}
