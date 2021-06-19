export enum AccountStatus
{
    IsActivated,
    IsReported,
    IsDeleted
}

export enum UserRelationshipType
{
    UnFollowed,
    Followed,
    Blocked
}

export enum Gender
{
    Unspecified,
    Male,
    Female,
    NonBinary,
    Transgender,
    Intersex
}

export enum MaritalStatus
{
    Unspecified,
    Engaged,
    InARelationship,
    InSingle,
    ItsComplicated,
    Married
}

export enum MediaFor {
    Avatar,
    Cover
}

export enum MessageState
{
    IsSent,
    IsRead
}

export enum MessageStatus {
    IsInitial,
    IsEdited,
    IsDeleted
}

export enum PostStatus {
    IsInitial,
    IsEdited,
    IsReported,
    IsDeleted
}

export enum CommentStatus {
    IsInitial,
    IsEdited,
    IsReported,
    IsDeleted
}

export enum NotificType
{
    Followed,
    Liked,
    Reposted,
    Commented
}

export enum SubjectType
{
    None,
    Post,
    Comment
}