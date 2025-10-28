import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const CardGalerySkeleton = (props: IContentLoaderProps) => (
	<ContentLoader
		speed={2}
		width={420}
		height={250}
		viewBox="0 0 460 250"
		backgroundColor="#a0a0a0" // более тёмный фон
		foregroundColor="#c0c0c0"
		{...props}
	>
		{/* Основная картинка */}
		<rect x="0" y="0" rx="14" ry="14" width="460" height="250" />
	</ContentLoader>
);

export default CardGalerySkeleton;
