/** @format */

import React, { useState, useEffect, useContext } from "react";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import LoadingPage from "./LoadingPage";
import { ReactSession } from "react-client-session";
import { verifyUserSession } from "./services/User";
import Cookies from "js-cookie";

import "./MainPage.css";
import { PlayerContainer } from "./components/PlayerContainer";
import { UserContext } from "./UserContext";
import { Box } from "@mui/material";

function MainPage() {
	const [loading, setLoading] = useState(true);
	const { user, setUser } = useContext(UserContext);

	async function updateData() {
		// Check user session
		if (user === null) {
			let sessionUser = null;
			if (Cookies.get("id")) {
				sessionUser = { id: Cookies.get("id"), name: Cookies.get("name") };
			}
			if (sessionUser !== null) {
				let isAValidSession = await verifyUserSession(sessionUser);
				console.log(isAValidSession);

				if (isAValidSession) {
					console.log("uesrIsAlive");
					setUser(sessionUser);
				} else {
					setUser(null);
					ReactSession.set("user", null);
				}
			}
		}
		setLoading(false);
	}

	useEffect(() => {
		updateData();
	}, []);

	return (
		<>
			{loading ? (
				<LoadingPage />
			) : user === null ? (
				<LoginPage />
			) : user.id === "player" ? (
				<Box
					display="flex"
					flexDirection="column"
					alignItems={"center"}
					justifyContent={"center"}
				>
					<PlayerContainer />
					<HomePage user={user} />
				</Box>
			) : (
				<HomePage user={user} />
			)}
		</>
	);
}

export default MainPage;
