"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslatorNotifics = exports.MaritalStatusOptions = exports.GenderOptions = void 0;
var enums_1 = require("./enums");
exports.GenderOptions = [
    { key: '0', value: 'Не вказано' },
    { key: '1', value: 'Чоловік' },
    { key: '2', value: 'Жінка' },
    { key: '3', value: 'Гендерквір' },
    { key: '4', value: 'Трансгендер' },
    { key: '5', value: 'Інтерсексуальність' }
];
exports.MaritalStatusOptions = [
    { key: '0', value: 'Не вказано' },
    { key: '1', value: 'Заручений(на)' },
    { key: '2', value: 'В стосунках' },
    { key: '3', value: 'Самотній' },
    { key: '4', value: "Все складно" },
    { key: '5', value: "В шлюбі" }
];
exports.TranslatorNotifics = [
    { key: enums_1.NotificType.Followed, subject: enums_1.SubjectType.None, value: 'починає стежити за Вами' },
    { key: enums_1.NotificType.Liked, subject: enums_1.SubjectType.Post, value: 'вподобав(ла) Вашу публікацію' },
    { key: enums_1.NotificType.Commented, subject: enums_1.SubjectType.Post, value: 'прокоментував(ла) Вашу публікацію' },
    { key: enums_1.NotificType.Reposted, subject: enums_1.SubjectType.Post, value: 'поширив(ла) Вашу публікацію' },
    { key: enums_1.NotificType.Liked, subject: enums_1.SubjectType.Comment, value: 'вподобав(ла) Ваш коментар' },
    { key: enums_1.NotificType.Commented, subject: enums_1.SubjectType.Comment, value: 'відповів(ла) на Ваш коментар' },
];
//# sourceMappingURL=enums-options.js.map