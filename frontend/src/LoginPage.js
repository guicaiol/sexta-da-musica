/** @format */

import React, { useState, useContext } from "react";
import "./LoginPage.css";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { login } from "./services/User";
import { UserContext } from "./UserContext";
import { ReactSession } from "react-client-session";

function LoginPage() {
	const [inputs, setInputs] = useState({});
	const [loginMessage, setLoginMessage] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { setUser } = useContext(UserContext);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	async function tryLogin(id, name) {
		let result = await login(id, name, () => {
			setIsLoading(false);
		});
		if (result.user) {
			setUser(result.user);
			ReactSession.set("user", result.user);
		}
		setLoginMessage({ text: result.text, color: result.color });
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		tryLogin(inputs.user_login, inputs.user_name, () => {
			setIsLoading(false);
		});
	};

	return (
		<Box
			minWidth={"30%"}
			minHeight={"40%"}
			borderRadius={2}
			display="flex"
			alignItems={"center"}
			justifyContent={"center"}
			sx={{ boxShadow: 3 }}
			bgcolor={"secondary.light"}
			margin={"20px"}
		>
			<Box
				display="flex"
				flexDirection="column"
				alignItems={"center"}
				margin={"50px"}
				width={"400px"}
			>
				<h2>Bem-vindo!</h2>
				<h3>Digite seu login para começar.</h3>
				<FormControl
					component={"form"}
					onSubmit={handleSubmit}
					sx={{
						display: "flex",
						justifyContent: "stretch",
						flexDirection: "column",
						alignItems: "center",
						gap: 3,
						maxWidth: "400px",
						width: "100%",
					}}
				>
					<TextField
						required
						type="text"
						name="user_login"
						label="Login"
						value={inputs.user_login || ""}
						onChange={handleChange}
						variant="standard"
						sx={{ width: "100%" }}
					/>

					<TextField
						required
						type="text"
						name="user_name"
						label="Nome"
						value={inputs.user_name || ""}
						onChange={handleChange}
						variant="standard"
						sx={{ width: "100%" }}
					/>
					<Button
						type="submit"
						name="user_submit"
						variant="contained"
						sx={{ width: "100%" }}
						size="large"
					>
						{" "}
						Entrar
					</Button>
					{!isLoading && loginMessage.text !== undefined && (
						<Typography
							component={"p"}
							sx={{ width: "100%" }}
							marginTop={"10px"}
							color={loginMessage.color}
							textAlign={"center"}
						>
							{loginMessage.text}
						</Typography>
					)}
					{isLoading && (
						<Typography
							component={"p"}
							sx={{ width: "100%" }}
							marginTop={"10px"}
							color={"primary.dark"}
							textAlign={"center"}
						>
							Carregando...
						</Typography>
					)}
				</FormControl>
			</Box>
		</Box>
	);
}

export default LoginPage;
