import { AccountStatus, CommentNotifType, CommentStatus, Gender, MaritalStatus, MediaFor, MessageState, MessageStatus, PostNotifType, PostStatus, UserNotifType, UserRelationshipType } from "./enums";

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

export interface PostNotifRequest {
    recipientId: string,
    postId: string,
    notifType: number
}

export interface CommentNotifRequest {
    recipientId: string,
    commentId: string,
    notifType: number
}

export interface UserNotifRequest {
    recipientId: string,
    notifType: number
}

export interface PostRequest {
    text: string,
    mediaDTOs: Media[]
}

export interface CommentRequest {
    postId: string,
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

export interface MediaResponse {
    result: string,
    media: Media[],
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

export interface PostsResponse {
    result: string,
    posts: Post[],
    errors: string[]
}

export interface CommentsResponse {
    result: string,
    comments: Comment[],
    errors: string[]
}

export interface TagsResponse {
    result: string,
    tags: Tag[],
    errors: string[]
}

export interface RelationshipResponse {
    result: string,
    relationship: Relationship,
    errors: string[]
}

export interface NotificationsResponse {
    result: string,
    postNotifDTOs: PostNotif[],
    userNotifDTOs: Notification[],
    commentNotifDTOs: CommentNotif[],
    errors: string[]
}

export interface Post {
    id: string,
    text: string,
    creationDate: string,
    mediaDTOs: Media[],
    userPostDTOs: UserPost[],
    postStatus: PostStatus,
    bestCommentDTO: Comment,
    likesNumber: number
}

export interface UserPost {
    userDTO: ShortProfile,
    postId: string,
    isLiked: boolean,
    isSaved: boolean,
    isAuthor: boolean
}

export interface Comment {
    id: string,
    postId: string
    text: string,
    creationDate: string,
    mediaDTOs: Media[],
    userCommentDTOs: UserPost[],
    commentStatus: CommentStatus,
    author?: ShortProfile
}

export interface UserComment {
    userDTO: ShortProfile,
    isLiked: boolean,
    isAuthor: boolean
}

export interface Tag {
    id: string,
    content: string,
    amount: string
}

export interface User {
    id: string,
    name: string,
    username: string
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
    mediaDTOs: Media[],
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

export interface Media {
    id: string,
    mimeType: string,
    path: string,
    size: number,
    creationDate: Date,
}

export interface Relationship {
    fromUserDTO: User,
    toUserDTO: User,
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

export interface MessageAlert {
    message: Message,
    messagesNumber: number
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

export interface PageParams {
    number: number,
    size: number
}

export interface Notification {
    senderDTO: ShortProfile,
    creationDate: string,
    notifType: PostNotifType | UserNotifType | CommentNotifType
}

export interface PostNotif extends Notification {
    postId: string
}

export interface CommentNotif extends Notification {
    commentId: string
}