import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const CoachsSkeleton = (props: IContentLoaderProps) => (
	<ContentLoader
		speed={2}
		width={420}
		height={400}
		viewBox="0 0 320 400"
		backgroundColor="#a0a0a0" // более тёмный фон
		foregroundColor="#c0c0c0"
		{...props}
	>
		{/* Основная картинка */}
		<rect x="0" y="0" rx="14" ry="14" width="320" height="400" />
	</ContentLoader>
);

export default CoachsSkeleton;
