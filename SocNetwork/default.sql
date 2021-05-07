﻿INSERT INTO Accounts(Id, Email, Password, CreationDate, AccountType)
VALUES 
(NEWID(), 'bogdan@mail.com', HASHBYTES('SHA2_256', CONVERT(NVARCHAR(32),'123456')), CONVERT(DATETIME, '2021-03-27 08:48:32'), 0)
--(NEWID(), 'ilya@mail.com', '123456', convert(datetime, '2021-03-27 08:48:32'), 0),
--(NEWID(), 'anna@mail.com', '123456', convert(datetime, '2021-03-27 08:48:32'), 0),
--(NEWID(), 'nina@mail.com', '123456', convert(datetime, '2021-03-27 08:48:32'), 0),
--(NEWID(), 'bohdan@mail.com', '123456', convert(datetime, '2021-03-27 08:48:32'), 0),
--(NEWID(), 'pasha@mail.com', '123456', convert(datetime, '2021-03-27 08:48:32'), 0),
--(NEWID(), 'inna@mail.com', '123456', convert(datetime, '2021-03-27 08:48:32'), 0)

--INSERT INTO Users(Id, Name, Username)
--VALUES 
--(1, null), 
--(2, null)

--INSERT INTO Books(Author, Title, Price, PromotionalPrice, FirstPosted, NumberOfPages, SellerId, About, Language, NumOfViews)
--VALUES 
--(N'Федір Достоевський', N'Ідіот', 100, 0, 1869, 640, 2, N'«Ідіот» — п’ятий роман Федора Михайловича Достоєвського. Роман уперше було опубліковано з січня 1868 по лютий 1869 у журналі «Російський вісник»', N'Українська', 0),
--(N'Федір Достоевський', N'Злочин і кара', 120, 0, 1866, 520, 2, N'«Злочин і кара» — розповідь про душевні муки й етичні дилеми Родіона Романовича Раскольнікова, бідного колишнього санкт-петербурзького студента, який виносив і здійснив задум убити стару жінку лихварницю з метою пограбування. Йому здавалося, що з грошима він зможе здійснити добрі справи, чим спокутує свій злочин, водночас світ позбудеться нікчемного паразита. Раскольніков бажає також переконатися в тому, що деякі вибрані люди можуть і навіть мають моральне право на вбивство. Він порівнює себе із Наполеоном Бонапартом і вірить, що злочин, здійснений із шляхетними мотивами, простимий. Але йому довелося довідатися, що він … «не Наполеон»."Злочин і кара" — не лише вражаючи трагічне відтворення життя. Це й звернення до людського сумління та розуму. Достоєвський захищає ідею моральної людини, яка не хоче залишитися «вошею», усією своєю сутністю повстає проти суспільної несправедливості.', N'Українська', 0),
--(N'Айн Ренд', N'Атлант розправив плечі', 600, 0, 1957, 2250, 2, N'Атла́нт розпра́вив пле́чі — роман американської письменниці Айн Ренд, уперше надрукований в 1957 році в Сполучених Штатах Америки. Це четвертий, найдовший, та останній роман Айн Ренд, який вона вважала своїм magnum opus в художній літературі.', N'Українська', 0),
--(N'Джеймс Борг', N'Мистецтво говорити', 200, 0, 2016, 304, 2, N'Бізнес-тренер Джеймс Борґ, відомий своїми відкриттями в галузях спілкування, особистісного розвитку, мови тіла та «контролю мислення», пропонує прості і дієві поради для кожної людини. Його методика допоможе змінити спосіб мислення і поведінку в особистому житті й на роботі, зробить життя цікавішим, насиченішим і позбавить зайвого стресу, а ваші навички спілкування сягнуть геть нового рівня.', N'Українська', 0),
--(N'Елізабет Ґілберт', N'Місто дівчат', 100, 0, 1969, 320, 2, N'«Місто дівчат» — новий бестселер Елізабет Ґілберт, яка підкорила світ романами «Їсти, молитися, кохати» та «Природа всіх речей».', N'Українська', 0),
--(N'Луїза Мей Олкотт', N'Маленькие женщины', 55, 0, 1868, 384, 2, N'"Маленькі жінки" Луїзи Мей Олкотт - це роман, на якому виховувалося не одне покоління читачів по всьому світу. Вперше опублікований у 1868 році в США, цей твір було перекладено більш ніж на 50 мов і покладено в основу шести фільмів, чотирьох телесеріалів, кількох опер і вистав. Історія сімейства Марч, в якому підростають чотири дружні, але несхожі одна на одну сестри, укладає в собі пізнавані перипетії юності, дорослішання, дружби і любві.', N'Російська', 0),
--(N'Джордж Орвелл', N'1984', 130, 0, 1949, 312, 2, N'Незважаючи на художню вигадку, книга настільки реалістична, що перевертає свідомість, причому так, що хочеться перевернути її назад. Сам письменник стверджував, що «найкращі книги говорять тобі те, що ти вже сам знаєш».', N'Українська', 0),
--(N'Патрік Зюскін', N'Парфюмер', 160, 0, 1985, 304, 2, N'Блискучий і загадковий "Парфумер" Патріка Зюскінда був вперше надрукований в Швейцарії в 1985 році. Сьогодні він визнаний найзнаменитішим романом, що написаний німецькою мовою з часів "На Західному фронті без змін" Ремарка, виданий накладом понад 12 мільйонів примірників, включаючи латину, і, нарешті, екранізований. Фільм, що вийшов у світовий прокат в 2006 році, мав величезний успіх, а його творці отримали шість нагород Німецької кіноакадемії.', N'Українська', 0),
--(N'Оскар Уайльд', N'Портрет Дориана Грея', 55, 0, 1890, 320, 2, N'Перед вами - найкраще з творчого доробку великого Оскара Уайльда, твір, що дає найбільш повне уявлення про його яскравий багатогранний талант. Перлина уайльдівської прози - інтелектуальний, заворожуючий досконалістю стилю і непідвладний часу роман «Портрет Доріана Грея»!', N'Російська', 0),

--(N'Володимир Набоков', N'Лоліта', 160, 0, 1955, 416, 1, N'У 1955 році побачила світ ЛОЛІТА - третій американський роман Володимира Набокова, творця "Захисту Лужина", "Відчаю" та "Запрошення на страту". Викликавши скандал по обидві сторони океану, ця книга піднесла автора на вершину літературного Олімпу і стала одним з найвідоміших і, без сумніву, найвизначніших творів XX століття. Сьогодні, коли полемічні пристрасті навколо "Лоліти" вже давно вляглися, можна впевнено сказати, що це - книга про велике кохання, яке подолало хворобу, смерть і час, кохання, розімкнуте в нескінченність, "кохання з першого погляду, з останнього погляду, з одвічного погляду".', N'Російська', 0),
--(N'Е. М. Ремарк', N'Жизнь взаймы', 225, 0, 1959, 384, 1, N'Це життя герої відвойовують у смерті! Коли втрачати вже нічого, коли один стоїть на краю загибелі, так і не дізнавшись життя, а іншому воно стала нестерпним. І як завжди у Ремарка, тільки любов і дружба залишаються непорушними. Тільки в них можна знайти точку опори...', N'Російська', 0),
--(N'Роберт Ґалбрейт', N'Зов кукушки', 75, 0, 1869, 256, 1, N'Коли скандально відома топ-модель, впавши з засніженого балкону свого пентхауса, розбивається на смерть, всі вирішують, що це самогубство. Але брат дівчини не може змиритися з таким висновком і звертається до послуг приватного детектива на ім’я Корморан Страйк.', N'Російська', 0),
--(N'Олдос Хакслі', N'О дивный новый мир', 123, 0, 1932, 352, 1, N'"О дивний новий світ" - вишукана і дотепна антиутопія про генетично програмоване "суспільство споживання", в якому розгортається трагічна історія Дикуна - "Гамлета" цього світу.', N'Російська', 0),
--(N'Рояльд Дал', N'Чарлі і шоколадна фабрика', 140, 0, 1964, 220, 1, N'Всем поклонникам творчества суперпопулярной Джоан Роулинг, без сомнения, будет интересно познакомиться с этой книгой, автора которой, Роальда Дала, принято считать «литературным отцом» знаменитой писательницы. Хотя, возможно, этот сюжет вам уже знаком, ведь «Чарли и шоколадная фабрика» - самая популярная книга Дала.', N'Українська', 0)

--INSERT INTO Customers(Id, Phone, DeliveryDepartment)
--VALUES 
--(3, N'0508216869', N'м. Житомир, НП №1'), 
--(4, N'0508216868', N'м. Київ, НП №17'),
--(5, N'0508216867', N'м. Львів, УкрПошта №1'),
--(6, N'0508216866', N'м. Вінниця, НП №8'),
--(7, N'0508216865', N'м. Харків, УкрПошта №7')

--INSERT INTO Transactions(CustomerId, BookId, Quantity, OrderTime, Status)
--VALUES
--(3, 13, 1, convert(datetime, '2021-03-27 08:48:32'), 0),
--(4, 11, 2, convert(datetime, '2021-03-26 15:28:30'), 1),
--(5, 12, 3, convert(datetime, '2021-03-26 08:40:02'), 1),
--(6, 1, 1, convert(datetime, '2021-03-26 13:48:32'), 0),
--(7, 7, 7, convert(datetime, '2021-03-26 10:28:32'), 1),
--(3, 3, 3, convert(datetime, '2021-03-26 18:48:32'), 0),
--(4, 6, 6, convert(datetime, '2021-03-26 08:48:12'), 1),
--(5, 2, 5, convert(datetime, '2021-03-26 13:48:32'), 2),
--(6, 1, 10, convert(datetime, '2021-02-26 13:48:32'), 2),
--(7, 3, 15, convert(datetime, '2021-01-26 13:48:32'), 2),
--(3, 4, 2, convert(datetime, '2020-12-26 13:48:32'), 2),
--(4, 5, 5, convert(datetime, '2020-11-26 13:48:32'), 2),
--(5, 6, 10, convert(datetime, '2020-10-26 13:48:32'), 2),
--(6, 7, 15, convert(datetime, '2020-09-26 13:48:32'), 2),
--(7, 8, 4, convert(datetime, '2021-03-26 13:48:32'), 2),
--(3, 9, 25, convert(datetime, '2021-01-26 13:48:32'), 2),
--(4, 1, 28, convert(datetime, '2020-12-26 13:48:32'), 2),
--(5, 2, 5, convert(datetime, '2020-11-26 13:48:32'), 2),
--(6, 3, 7, convert(datetime, '2020-10-26 13:48:32'), 2),
--(7, 4, 8, convert(datetime, '2021-03-26 13:48:32'), 2),
--(3, 5, 3, convert(datetime, '2021-02-26 13:48:32'), 2),
--(4, 6, 17, convert(datetime, '2021-01-26 13:48:32'), 2),
--(5, 7, 12, convert(datetime, '2020-12-26 13:48:32'), 2),
--(6, 8, 8, convert(datetime, '2020-11-26 13:48:32'), 2),
--(5, 9, 4, convert(datetime, '2020-10-26 13:48:32'), 2),
--(6, 10, 5, convert(datetime, '2021-02-26 13:48:32'), 2),
--(4, 11, 2, convert(datetime, '2021-01-26 13:48:32'), 2),
--(4, 12, 1, convert(datetime, '2021-03-26 13:48:32'), 2),
--(4, 13, 2, convert(datetime, '2021-02-26 13:48:32'), 2),
--(4, 14, 3, convert(datetime, '2020-12-26 13:48:32'), 2)