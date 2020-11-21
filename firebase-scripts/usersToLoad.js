const uuidv4 = require("uuid/v4");
const uid = require("uid");

exports.usersToLoad = [
  {
    cuponsUsed: [],
    name: "Moee",
    lastName: "Anthony",
    email: "m@mail.com",
    password: "$2a$10$HYlHoO8SptwiEzFF9JlEgefYypeCDmC4KfTTwfWFRew2s2FsmDwOm",
    addresses: [
      {
        type: "primary",
        name: "Casa",
        street: "Calandria",
        externalNumber: "431",
        neighborhood: "Las Lomas",
        municipality: "Garcia",
        polity: "Nuevo León",
        postalCode: "66024",
      },
      {
        type: "secondary",
        name: "Trabajo",
        street: "Condor",
        externalNumber: "564",
        neighborhood: "Los Mangos",
        municipality: "Monterrey",
        polity: "Nuevo León",
        postalCode: "88565",
      },
    ],
    contacts: [
      {
        type: "primary",
        number: "(812) 919-0902",
      },
      {
        type: "secondary",
        number: "(823) 336-5555",
      },
    ],
    cards: [
      {
        type: "primary",
        cardType: "visa",
        cardId: "card_1H276YCw26RIU0uglKHtd5Jg",
        name: "Rafael Quintero",
        lastFourDigit: "4242",
        funding: "credit",
      },
      {
        type: "secondary",
        cardType: "visa",
        cardId: "card_1H27kACw26RIU0ugHxupsqOh",
        name: "Rafael Quintero",
        lastFourDigit: "0341",
        funding: "credit",
      },
      {
        type: "secondary",
        cardType: "american express",
        cardId: "card_1H28qsCw26RIU0ugdV4TUOih",
        name: "Rafael Quintero",
        lastFourDigit: "8431",
        funding: "credit",
      },
    ],
    cusId: "cus_HaygfabEk1RLG5",
    role: "customer",
  },
];

exports.usersPasswords = [
  {
    uid: uid(28),
    email: "raf4.quintero@gmail.com",
    passwordHash: Buffer.from(
      "$2a$10$cSDqkK0sPFXAdPwVg4TxkOjm64UwjWGrKdbBdl3uVmpeDDYZzjimy"
    ),
  },
  {
    uid: uid(28),
    email: "mb.joas@gmail.com",
    passwordHash: Buffer.from(
      "$2a$10$af/HK6orVc1XtJZUxewXfuuQ6Knzt/DFde53P3gG6XwJiUCICtrmy"
    ),
  },
  {
    uid: uid(28),
    email: "elias.unzueta.ancer@hotmail.com",
    passwordHash: Buffer.from(
      "$2a$10$We.00Eb7MgcbS1CYcJSKx.8c9IM4W28gLvuKAguP2V6cCjcrLSJpO"
    ),
  },
  {
    uid: uid(28),
    email: "elias.unzueta.ancer@gmail.com",
    passwordHash: Buffer.from(
      "$2a$10$K3V2nmnBLta7gpYzTQOEtO10GasJpbjhsn2CcYQ7jAY02R2rlxpWG"
    ),
  },
  {
    uid: uid(28),
    email: "gen7arce@hotmail.com",
    passwordHash: Buffer.from(
      "$2a$10$7glGOOYNUnShOs047gRt.uFt8PAlFaKC2sprBsEThYEEtkKobWm0q"
    ),
  },
  {
    uid: uid(28),
    email: "valeriabeltran1516@gmail.com",
    passwordHash: Buffer.from(
      "$2a$10$.wBE4OAEO//8MIGhlNZGEOPWKhPpjSbt656pKWMg2sGBTEy5UWdgm"
    ),
  },
  {
    uid: uid(28),
    email: "Valeria-1516@hotmail.com",
    passwordHash: Buffer.from(
      "$2a$10$XfJ1rysR6NS8OifJGuGBPuEJ4l.vC7t5CBZsOerpvcookIZa9FPm2"
    ),
  },
  {
    uid: uid(28),
    email: "valeria-1516@hotmail.com",
    passwordHash: Buffer.from(
      "$2a$10$RM5UsbuxseMbjuDVFwOKguNRDM3GF9/TUdehHk60N1WLTo9nbnVHe"
    ),
  },
  {
    uid: uid(28),
    email: "valeriabeltranvillarreal@gmail.com",
    passwordHash: Buffer.from(
      "$2a$10$mIWLovd7h.hQaCb72..l8uOd94t.NftEUbgWe6Xv5nQveMfyspDJO"
    ),
  },
  {
    uid: uid(28),
    email: "ami-10@live.com.mx",
    passwordHash: Buffer.from(
      "$2a$10$Zy0h0XB.QU7iFpWjL77iyefiCGdk63N1lm5QuKn..LppGOl1lnx6a"
    ),
  },
  {
    uid: uid(28),
    email: "alvaro_pb@hotmail.com",
    passwordHash: Buffer.from(
      "$2a$10$AsxHAe7m3fKLeo4.ueTpOu3OgQSlgTyJV.KBo6gXCtjEBC8EIVqsK"
    ),
  },
];