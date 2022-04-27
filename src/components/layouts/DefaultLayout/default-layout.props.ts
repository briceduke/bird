import React from 'react';

export interface DefaultLayoutProps {
	title: string;
	children: React.ReactChild;
	protectedRoute?: boolean;
}
