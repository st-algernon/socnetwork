import { AccountStatus, Gender, MaritalStatus, MediaFor, MessageState, MessageStatus, UserRelationshipType } from "./enums";

export interface AccountLoginRequest {
    email: string
    password: string
}

export interface AccountRegistrationRequest {
    email: string
    name: string
    username: string
    password: string
}

export interface EditProfileInfoRequest {
    id: string,
    email: string,
    name: string,
    username: string,
    bio: string,
    birthDate: string,
    location: string,
    gender: string,
    maritalStatus: string
}

export interface MessageRequest {
    authorId: string,
    chatId: string,
    text: string,
    mediaDTOs: Media[]
}

export interface AuthResponse {
    token: string,
    expiresIn: string
    result: string
    errors: string[]
}

export interface ProfileResponse
{
    result: string,
    profile: Profile,
    errors: string[]
}

export interface ShortProfilesResponse
{
    result: string,
    shortProfiles: ShortProfile[],
    errors: string[]
}

export interface ProfileMediaResponse {
    result: string,
    media: ProfileMedia[],
    errors: string[]
}

export interface ChatResponse {
    result: string,
    chat: Chat,
    errors: string[]
}

export interface ShortChatsResponse {
    result: string,
    shortChats: ShortChat[],
    errors: string[]
}

export interface UploadMediaResponse {
    result: string,
    mediaDTOs: Media[],
    errors: string[]
}

export interface Media {
    id: string,
    mimeType: string,
    path: string,
    size: number,
    creationDate: Date,
}

export interface ProfileMedia {
    id: string,
    mimeType: string,
    path: string,
    size: number,
    creationDate: Date,
    profileId: string,
    mediaFor: MediaFor,
    isCurrent: boolean
}

export interface Profile {
    id: string,
    email: string,
    creationDate: Date,
    lastVisited: Date,
    accountStatus: AccountStatus,
    name: string,
    username: string,
    bio: string,
    birthDate: Date,
    location: string,
    gender: Gender,
    maritalStatus: MaritalStatus,
    profileMediaDTOs: ProfileMedia[],
    avatarPath: string
    coverPath: string
}

export interface ShortProfile {
    id: string,
    name: string,
    username: string,
    lastVisited: Date,
    avatarPath: string
}

export interface UserRelationship {
    id: string,
    fromUserId: string,
    toUserId: string,
    userRelationshipType: UserRelationshipType,
    creationDate: Date,
}

export interface Message {
    id: string,
    authorDTO: ShortProfile,
    chatId: string,
    text: string,
    creationDate: string,
    mediaDTOs: Media[],
    messageStatus: MessageStatus,
    messageState: MessageState
}

export interface Chat {
    id: string,
    title: string,
    coverDTO: Media,
    messageDTOs: Message[],
    creationDate: string,
    memberDTOs: ShortProfile[],
}

export interface ShortChat {
    id: string,
    title: string,
    coverPath: string,
    lastMessageDTO: Message,
}

export interface Options {
    key: string,
    value: string
}

export interface SelectConfig {
    label: string,
    options: Options[],
    selected: Options
}

export interface UsersPageParams {
    number: number,
    size: number
}
