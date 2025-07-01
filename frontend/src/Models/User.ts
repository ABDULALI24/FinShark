// API response type
export type LoginResponse = {
    email: string;
    userName: string;
    token: string;
}

export type UserProfileToken = {
    email: string;
    username: string;  // API sends lowercase 'username'
    token: string;
}

export type UserProfile = {
    userName: string;  // We use camelCase 'userName' in frontend
    email: string;
}

// Helper function to convert API response to UserProfile
export const mapToUserProfile = (response: UserProfileToken): UserProfile => ({
    userName: response.username,  // Convert from API format to frontend format
    email: response.email
});