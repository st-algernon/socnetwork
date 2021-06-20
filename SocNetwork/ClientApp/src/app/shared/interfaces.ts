import { AccountStatus, CommentStatus, Gender, MaritalStatus, MediaFor, MessageState, MessageStatus, NotificType, PostStatus, SubjectType, UserRelationshipType } from "./enums";

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

export interface TokenRequest {
    token: string,
    refreshToken: string
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

export interface NotificRequest {
    recipientId: string,
    subjectId: string,
    subjectType: number,
    notificType: number
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
    refreshToken: string,
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

export interface MessagesResponse {
    result: string,
    messages: Message[],
    errors: string[]
}

export interface ShortChatsResponse {
    result: string,
    shortChats: ShortChat[],
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

export interface NotifsResponse {
    result: string,
    notificDTOs: Notification[],
    errors: string[]
}

export interface VerificationResponse {
    result: boolean
}

export interface Post {
    id: string,
    text: string,
    creationDate: string,
    mediaDTOs: Media[],
    userPostDTOs: UserPost[],
    postStatus: PostStatus,
    bestCommentDTO: Comment,
    likesNumber: number,
    authorDTO: ShortProfile
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
    userCommentDTOs: UserComment[],
    commentStatus: CommentStatus,
    authorDTO: ShortProfile,
    likesNumber: number
}

export interface UserComment {
    userDTO: ShortProfile,
    commentId: string,
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

export interface NotifOptions {
    key: number,
    subject: number,
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
    id: string,
    senderDTO: ShortProfile,
    subjectId: string,
    subjectType: SubjectType,
    creationDate: string,
    notificType: NotificType
}