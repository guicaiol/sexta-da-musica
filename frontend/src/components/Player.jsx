/** @format */

// js
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import YouTube from "react-youtube";
import SkipNextIcon from '@mui/icons-material/SkipNext';


export function Player({ url, onEnd, onNext, songOwner}) {
	const opts = {
		height: "390",
		width: "640",
		playerVars: {
			autoplay: 1,
			mute: 1,
		},
	};

	function getVideoId(newUrl) {
		console.log(newUrl);
		var match = newUrl.match(/[?&]v=([^&]+)/);

		// Verifique se houve correspondência
		if (match) {
			// O valor estará em match[1]
			return match[1];
		} else {
			console.log("Não foi possível encontrar o valor.");
		}
	}
	// getVideoId()
	return (
		<Box
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			flexDirection={"column"}
		>
			<YouTube
				videoId={getVideoId(url)}
				opts={opts}
				onReady={(e) => {
					e.target.playVideo();
					setTimeout(() => {
						e.target.unMute();
					}, 1000);
					setTimeout(() => {
						e.target.playVideo();
						// e.target.click()
					}, 3000);
				}} // defaults -> noop
				onEnd={onEnd} // defaults -> noop
				onError={(e) => {
					console.log("Error");
				}}
			/>
			<IconButton onClick={onNext}>
				{" "}
				<SkipNextIcon
					color="primary"
					fontSize="large"
				/>
			</IconButton>
            <Typography>Escolhida por: {songOwner.name}</Typography>
		</Box>
	);
}
