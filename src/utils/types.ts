import { createUploadthing, type FileRouter } from "uploadthing/server";

type Video = {
	id: number;
	name: string;
	description: string;
	category: string;
	thumbnailURL: string;
	videoURL: string;
	date: string;
	rating: string;
	ratingInfo: string;
	urlName: string;
};

const f = createUploadthing();

export const uploadRouter = {
	video: f(
		{
			video: {
				maxFileSize: "16GB",
				maxFileCount: 1,
			},
		},
		{
			awaitServerData: true,
		},
	).onUploadComplete(async ({}) => {
		return {};
	}),
	thumbnail: f(
		{
			image: {
				maxFileSize: "4MB",
				maxFileCount: 1,
			},
		},
		{
			awaitServerData: true,
		},
	).onUploadComplete(async ({}) => {
		return {};
	}),
} satisfies FileRouter;

type OurFileRouter = typeof uploadRouter;

export type { Video, OurFileRouter };
