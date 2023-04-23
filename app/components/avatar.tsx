"use client";

import Image from "next/image";
import React from "react";

interface avatarProps {
	src?: string | null | undefined;
}

const Avatar: React.FC<avatarProps> = ({ src }) => {
	return (
		<Image
			className="rounded-full"
			height={30}
			width={30}
			alt="avatar"
			src={src || "/images/placeholder.jpg"}
		/>
	);
};

export default Avatar;
