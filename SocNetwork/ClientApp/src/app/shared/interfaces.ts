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

export interface ProfilesResponse
{
    result: string,
    profiles: Profile[],
    errors: string[]
}

export interface ProfileMediaResponse {
    result: string,
    media: ProfileMedia[],
    errors: string[]
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
    mediaDTO: ProfileMedia[],
    currentAvatarPath?: string
    currentCoverPath?: string
}

export interface UserRelationship {
    id: string,
    fromUserId: string,
    toUserId: string,
    userRelationshipType: UserRelationshipType,
    creationDate: Date,
}

export interface Media {
    id: string,
    mimeType: string,
    path: string,
    size: number,
    creationDate: Date,
}

export interface Message {
    id?: string,
    authorId: string,
    author?: Profile,
    conversationId: string,
    text: string,
    creationDate: string,
    messageMediaDTO: Media[],
    messageStatus: MessageStatus,
    messageState: MessageState
}

export interface Chat {
    id: string,
    messagesDTO: Message[],
    creationDate: string,
    membersDTO: Profile[],
    withUser?: Profile,
    isDeleted: boolean
}

export interface ChatsResponse {
    result: string,
    chats: Chat[],
    errors: string[]
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
