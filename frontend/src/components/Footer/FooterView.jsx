/** @format */
import { Box, Link } from "@mui/material";
import React from "react";

export function FooterView() {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
            bgcolor={"primary.main"}
            color={"primary.contrastText"}
		>
			<span>
				<b>Sexta da Música </b> - Contribua com esse projeto:{" "}
				<Link
					href="https://github.com/guicaiol/sexta-da-musica"
					target="_blank"
					rel="noopener noreferrer"
					underline="none"
                    color={"secondary.contrastText"}
				>
					GitHub
				</Link>
			</span>
		</Box>
	);
}
