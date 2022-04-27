export interface User {
	_id: string;

	username: string;

	followersId: string[];

	followingIds: string[];

	isVerified: boolean;

	bio?: string;

	website?: string;

	birth?: Date;

	joinDate: Date;

	location?: string;

	displayName?: string;

	avatarUri?: string;

	chirpsCount: number;

	followersCount: number;

	followingCount: number;
}
