/** @format */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Input, TextField, styled } from "@mui/material";

// const CssTextField = styled(Input)({
//     backgroundColor:"white",
//     borderRadius:"4px",
//     border: "none"

// })

export function NavbarView({user, logout}) {
	return (
		<Box sx={{ alignSelf: "stretch" }}>
			<AppBar position="static">
				<Toolbar>
					<ShoppingBasketIcon />
					<MusicNoteIcon />
					<Typography
						variant="h4"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Sexta da Música
					</Typography>
					{user !== null ? (
						<Button
							color="inherit"
							onClick={logout}
						>
							Logout
						</Button>
					) : (
						<Button color="inherit">Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
