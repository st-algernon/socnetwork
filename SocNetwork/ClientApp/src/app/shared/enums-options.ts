import { NotificType, SubjectType } from "./enums"
import { NotifOptions as NotificsOptions, Options } from "./interfaces"

export const GenderOptions: Options[] = [
    { key: '0', value: 'Unspecified' },
    { key: '1', value: 'Male' },
    { key: '2', value: 'Female' },
    { key: '3', value: 'Non-binary' },
    { key: '4', value: 'Transgender' },
    { key: '5', value: 'Intersex' }
]

export const MaritalStatusOptions: Options[] = [
    { key: '0', value: 'Unspecified' },
    { key: '1', value: 'Engaged' },
    { key: '2', value: 'In a relatioship' },
    { key: '3', value: 'In single' },
    { key: '4', value: "In a complicated" },
    { key: '5', value: "Married" }
]

export const TranslatorNotifics: NotificsOptions[] = [
    { key: NotificType.Followed, subject: SubjectType.None, value: 'починає стежити за Вами' },
    { key: NotificType.Liked, subject: SubjectType.Post, value: 'вподобав(ла) Вашу публікацію' },
    { key: NotificType.Commented, subject: SubjectType.Post, value: 'прокоментував(ла) Вашу публікацію' },
    { key: NotificType.Reposted, subject: SubjectType.Post, value: 'поширив(ла) Вашу публікацію' },
    { key: NotificType.Liked, subject: SubjectType.Comment, value: 'вподобав(ла) Ваш коментар' },
    { key: NotificType.Commented, subject: SubjectType.Comment, value: 'відповів(ла) на Ваш коментар' },
]