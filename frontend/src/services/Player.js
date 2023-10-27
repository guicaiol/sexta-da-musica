/** @format */

export async function getNextSong() {
	return await fetch("http://localhost:8080/api/player/next-music")
		.then(async (response) => {
			const isJson = response.headers
				.get("content-type")
				.includes("application/json");
			const data = isJson && (await response.json());
			if (!response.ok) {
				const error = (data && data.message) || response.status;
				alert(" error: " + error + "\nData: " + data);
				return false;
			} else {
				console.log(data);
				if (data.error === "music-not-ready") return null;

				return data;
			}
		})
		.catch((error) => {
			console.error("There was an error!", error);
		});
}

export async function getCurrentSong() {
	return await fetch("http://localhost:8080/api/player/status")
		.then(async (response) => {
			const isJson = response.headers
				.get("content-type")
				.includes("application/json");
			const data = isJson && (await response.json());
			if (!response.ok) {
				const error = (data && data.message) || response.status;
				alert(" error: " + error + "\nData: " + data);
				return false;
			} else {
				if (data.playing) {
					return { music: data["current-music"], user: data["current-user"] };
				}
				return null
			}
		})
		.catch((error) => {
			console.error("There was an error!", error);
		});
}
