import { Nunito } from "next/font/google";
import "./globals.css";
import { Modal, Navbar, RegisterModal } from "./components";

export const metadata = {
	title: "RentBNB",
	description: "Created by Abolfazl Omidvar",
};

const font = Nunito({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<>
					{/* <Modal actionLabel="submit" title="hello world" isOpen /> */}
					<RegisterModal />
					<Navbar />
				</>
				{children}
			</body>
		</html>
	);
}
