export interface Chirp {
	_id: string
	
    userId: string;

	userAvatarUri: string;

	userUsername: string;

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