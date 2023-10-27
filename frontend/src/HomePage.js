/** @format */

import {
	Alert,
	Box,
	Button,
	FormControl,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { addMusic } from "./services/User";

function HomePage({ user }) {
	const [youtubeUrl, setYoutubeUrl] = useState("");
	const [message, setMessage] = useState({});

	async function handleSubmit(e) {
		e.preventDefault();
		let result = await addMusic(user, youtubeUrl);
		setMessage(result);
		setYoutubeUrl("");
	}
	function handleChange(e) {
		console.log(e.target.value);
		setYoutubeUrl(e.target.value);
	}

	return (
		<Box
			display="flex"
			alignItems={"center"}
			justifyContent={"center"}
		>
			<div className="HomePage">
				Home Page User: {user != null ? user.id : "null"} /{" "}
				{user != null ? user.name : "null"}
			</div>
			<Box
				display="flex"
				flexDirection="column"
				alignItems={"center"}
				justifyContent={"center"}
				margin={"50px"}
				width={"400px"}
			>
				<h2>Adicionar Música</h2>
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
						name="user_name"
						label="Youtube Url"
						value={youtubeUrl || ""}
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
					{message.success !== undefined &&
						(message.success ? (
							<Alert
								sx={{ width: "100%" }}
								severity="success"
							>
								Música adicionada com sucesso!
							</Alert>
						) : (
							<Alert
								sx={{ width: "100%" }}
								severity="error"
							>
								Não foi possível adicionar a música... tente recarregar a
								página.
							</Alert>
						))}
				</FormControl>
			</Box>
		</Box>
	);
}

export default HomePage;
