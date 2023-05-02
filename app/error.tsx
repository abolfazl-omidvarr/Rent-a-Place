"use client";

import React, { useEffect } from "react";
import { ClientOnly, EmptyState } from "./components";

interface ErrorStateProps {
	error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<ClientOnly>
			<EmptyState title="Uh oh" subtitle="something went wrong" />
		</ClientOnly>
	);
};

export default ErrorState;
