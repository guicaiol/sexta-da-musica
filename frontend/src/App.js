/** @format */

import React, { useState, useEffect } from "react";
import MainPage from "./MainPage.js";
import { NavbarContainer } from "./components/Navbar/NavbarContainer";
import { FooterContainer } from "./components/Footer/FooterContainer";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { UserProvider } from "./UserContext.jsx";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<Box
					height={"100vh"}
					width={"100vw"}
					display="flex"
					alignItems="strech"
					justifyContent={"space-between"}
					flexDirection={"column"}
				>
					<NavbarContainer></NavbarContainer>
					<Box
						flexGrow={1}
						alignSelf={"stretch"}
						display="flex"
						alignItems="center"
						justifyContent={"center"}
						bgcolor={"secondary.main"}
					>
						<MainPage />
					</Box>
					<FooterContainer></FooterContainer>
				</Box>
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;
