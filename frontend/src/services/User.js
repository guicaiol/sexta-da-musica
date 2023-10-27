/** @format */
import Cookies from "js-cookie";

export async function verifyUserSession(user) {
	// Check user session
	if (user !== null && user !== undefined) {
		// Check user exists
		return await fetch("/api/users/" + user.id)
			.then(async (response) => {
				const isJson = response.headers
					.get("content-type")
					.includes("application/json");
				const data = isJson && (await response.json());
				if (!response.ok) {
					const error = (data && data.message) || response.status;
					alert(
						"GET /api/users/" + user.id + " error: " + error + "\nData: " + data
					);
					return false;
				} else {
					return true;
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	}
	return false;
}

export async function login(id, name, endCallback) {
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id, name }),
	};
	let result = await fetch("/api/users", options)
		.then(async (response) => {
			const isJson = response.headers
				.get("content-type")
				.includes("application/json");
			const data = isJson && (await response.json());

			if (!response.ok) {
				// get error message from body or default to response status
				const error =
					(data && data.message) ||
					response.status + " - " + response.statusText;
				return {
					text: "POST /api/users error:<br />" + error,
					color: "error.main",
				};
			} else {
				return {
					text: "Usuário cadastrado!",
					color: "success.main",
					user: {
						id,
						name,
					},
				};
			}
		})
		.catch((error) => {
			console.error("There was an error!", error);
			return {
				text: "There was an error!" + error,
				color: "error.main",
			};
		});

	if (result.user) {
		Cookies.set("id", result.user.id);
		Cookies.set("name", result.user.name);
	}

	endCallback();
	return result;
}

export async function addMusic(user, url) {
	if (user !== null && user !== undefined) {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		};
		return await fetch(
			"/api/users/" + user.id + "/musics",
			options
		)
			.then(async (response) => {
				console.log(await response.json());
				if (response.ok) {
					return { success: true };
				}
				return { success: false };
			})
			.catch((error) => {
				console.error("There was an error!", error);
				return { success: false };
			});
	}
	return { success: false };
}

export async function logout(user) {
	if (user !== null && user !== undefined) {
		const options = {
			method: "DELETE",
		};
		return await fetch("/api/users/" + user.id, options)
			.then(async (response) => {
				Cookies.remove("id")
				Cookies.remove("name")
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	}
}
