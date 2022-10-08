import fetch from 'node-fetch';
import fs from 'fs';
require('dotenv').config();

const { TOKEN, COOKIE, MARKER_RES_2, MARKER_RES_3 } = process.env;
(async () => {

	// First 100 users
	const response1 = await fetch('https://edgeapi.slack.com/cache/T02P3HQD6/users/list?fp=b2', {
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9',
			'content-type': 'text/plain;charset=UTF-8',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'sec-gpc': '1',
			cookie: COOKIE,
		},
		referrerPolicy: 'no-referrer',
		body: `{"token": ${TOKEN},"include_profile_only_users":true,"count":279,"channels":["G36F53F7G"],"filter":"people","index":"users_by_realname","locale":"en-US","present_first":false,"fuzz":1}`,
		method: 'POST',
	});

	// Second 100 users
	const response2 = await fetch('https://edgeapi.slack.com/cache/T02P3HQD6/users/list?fp=b2', {
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9',
			'content-type': 'text/plain;charset=UTF-8',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'sec-gpc': '1',
			cookie: COOKIE,
		},
		referrerPolicy: 'no-referrer',
		body: `{"token": ${TOKEN},"include_profile_only_users":true,"count":279,"channels":["G36F53F7G"],"filter":"people","index":"users_by_realname","locale":"en-US","present_first":false,"fuzz":1,"marker": ${MARKER_RES_2}}`,
		method: 'POST',
	});

	// remaining users
	const response3 = await fetch('https://edgeapi.slack.com/cache/T02P3HQD6/users/list?fp=b2', {
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9',
			'content-type': 'text/plain;charset=UTF-8',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'sec-gpc': '1',
			cookie: COOKIE,
		},
		referrerPolicy: 'no-referrer',
		body: `{"token": ${TOKEN},"include_profile_only_users":true,"count":279,"channels":["G36F53F7G"],"filter":"people","index":"users_by_realname","locale":"en-US","present_first":false,"fuzz":1,"marker": ${MARKER_RES_3}}`,
		method: 'POST',
	});

	const { results: results1 } = await response1.json();
	const { results: results2 } = await response2.json();
	const { results: results3 } = await response3.json();
	const results = [...results1, ...results2, ...results3];

	const users = results.map(user => {
		const { name, real_name, profile, is_admin, is_owner, is_primary_owner, id } = user;
		const { email, display_name, first_name, last_name, display_name_normalized } = profile;
		return {
			id,
			is_admin,
			is_owner,
			is_primary_owner,
			name,
			real_name,
			email,
			display_name,
			display_name_normalized,
			first_name,
			last_name,
		};
	});

	const numberOfUsers = users.length;
	console.log({ numberOfUsers });

	await fs.promises.writeFile('users.json', JSON.stringify(users, null, 2));
})();
