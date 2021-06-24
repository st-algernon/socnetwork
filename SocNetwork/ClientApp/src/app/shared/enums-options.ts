import { NotificType, SubjectType } from "./enums"
import { NotifOptions as NotificsOptions, Options } from "./interfaces"

export const GenderOptions: Options[] = [
    { key: '0', value: 'Не вказано' },
    { key: '1', value: 'Чоловік' },
    { key: '2', value: 'Жінка' },
    { key: '3', value: 'Гендерквір' },
    { key: '4', value: 'Трансгендер' },
    { key: '5', value: 'Інтерсексуальність' }
]

export const MaritalStatusOptions: Options[] = [
    { key: '0', value: 'Не вказано' },
    { key: '1', value: 'Заручений(на)' },
    { key: '2', value: 'В стосунках' },
    { key: '3', value: 'Самотній(на)' },
    { key: '4', value: "Все складно" },
    { key: '5', value: "В шлюбі" }
]

export const TranslatorNotifics: NotificsOptions[] = [
    { key: NotificType.Followed, subject: SubjectType.None, value: 'починає стежити за Вами' },
    { key: NotificType.Liked, subject: SubjectType.Post, value: 'вподобав(ла) Вашу публікацію' },
    { key: NotificType.Commented, subject: SubjectType.Post, value: 'прокоментував(ла) Вашу публікацію' },
    { key: NotificType.Reposted, subject: SubjectType.Post, value: 'поширив(ла) Вашу публікацію' },
    { key: NotificType.Liked, subject: SubjectType.Comment, value: 'вподобав(ла) Ваш коментар' },
    { key: NotificType.Commented, subject: SubjectType.Comment, value: 'відповів(ла) на Ваш коментар' },
]
