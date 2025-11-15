"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>{children}</SessionProvider>
				<Toaster />
				<NextTopLoader />
			</QueryClientProvider>
		</>
	);
};
