/** @format */

// js
import React, { useEffect, useRef, useState } from "react";
import { Player } from "./Player";
import { getNextSong, getCurrentSong } from "../services/Player";
import { Typography } from "@mui/material";

export function PlayerContainer() {
	const [songs, setSongs] = useState([]);
	const [currentSong, setCurrentSong] = useState(0);
	const timer = useRef(null);

	function addNewSong(newSong) {
		setSongs((oldSongs) => {
			return [...oldSongs, newSong];
		});
	}

	function requestNewSongLoop(forceNext = false) {
		if (timer.current !== null) {
			clearInterval(timer.current);
		}
		timer.current = setInterval(async () => {
			let newSong = await getNextSong();
			if (newSong) {
				console.log(newSong);
				addNewSong(newSong);
				if (forceNext) {
					setCurrentSong((prevState) => {
						return prevState + 1;
					});
				}
				clearInterval(timer.current);
				timer.current = null;
			}
		}, 5000);
	}

	async function verifyInit() {
		let currentSong = await getCurrentSong();
		if (currentSong) {
			addNewSong(currentSong);
		} else {
			requestNewSongLoop(false);
		}
	}
	useEffect(() => {
		console.log(songs.length);
		verifyInit();

		return () => {clearInterval(timer.current);}
	}, []);

	async function next() {
		console.log(currentSong);
		console.log(songs.length - 1);
		console.log(songs);
		if (currentSong === songs.length - 1) {
			let newSong = await getNextSong();
			if (newSong) {
				addNewSong(newSong);
				setCurrentSong((prevState) => {
					return prevState + 1;
				});
			} else {
				requestNewSongLoop(true);
			}
		} else {
			setCurrentSong((prevState) => {
				return prevState + 1;
			});
		}
	}

	console.log(songs);
	console.log(songs.length - 1);
	console.log(currentSong);
	return (
		<>
			{songs.length - 1 >= currentSong ? (
				<Player
					url={songs[currentSong].music.url}
					songOwner={songs[currentSong].user}
					onEnd={next}
					onNext={next}
					key={currentSong}
				/>
			) : (
				<Typography>Nenhuma música encontrada.</Typography>
			)}
		</>
	);
}
