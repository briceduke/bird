export interface Chirp {
    userId: string;

	content: string;

	subChirpCount: number;

	subChirpIds: string[];

	likeCount: number;

	likedUserIds: string[];

	reChirpCount: number;

	reChirpUserIds: string[];

	postDate: Date;

	isSubChirp: boolean;
}