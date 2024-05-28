export const products = [
  {
    id: "1",
    name: "Чурчхела з волоським горіхом гранат + білий виноград",
    description: "Волоський горіх,натуральний концентрований сік білого винограду, натуральний концентрований сік гранату, вода, кукурудзяне борошно, фруктоза /Україна",
    category: "Натуральні солодощі",
    inStock: true,
    images: [
      {
        price: 162,
        weight: "50 г",
        image:
          "https://cdn.sz.lviv.ua/media/sz_47fb58b4.jpg?w=1536&h=1488&uid=7166935072786895",
      },
    ],
    reviews: [],
  },
  {
    id: "2",
    name: "Шоко дропси чорні L мальтитол",
    description:
      "Какао терте, підсолоджувач мальтитол, какао-масло, соєвий лецитин, полігліцерин, натуральний ароматизатор / Іспанія",
    category: "Натуральні солодощі",
    inStock: true,
    images: [
      {
        price: 195,
        weight: "120 г",
        image:
          "https://cdn.sz.lviv.ua/media/sz_5f539615.jpg?w=440",
      },
    ],
    reviews: [
      {
        id: "1",
        userId: "1",
        productId: "2",
        rating: 3,
        comment: "Жахливі дропси",
        createdDate: "2024-25-02T07:09:23.067Z",
        user: {
          id: "1",
          name: "Богдан",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2024-25-020T08:08:53.979Z",
          updatedAt: "2024-25-02T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Сухе кокосове молоко (веганське)",
    description:
      "100% м'якоть кокоса (подрібнена в пудру)/Україна.",
    category: "Напої",
    inStock: true,
    images: [
      {
        price: 257,
        weight: "250 г",
        image:
          "https://cdn.sz.lviv.ua/media/sz_e11bd605.jpg?w=440",
      },
      {
        price: 144,
        weight: "50 г",
        image:
          "https://cdn.sz.lviv.ua/media/94fd7d04.jpg?w=440",
      },
    ],
    reviews: [
      {
        id: "2",
        userId: "2",
        productId: "3",
        rating: 4,
        comment:
          "Вскусно",
        createdDate: "2024-25-02T15:53:44.483Z",
        user: {
          id: "2",
          name: "Віктор",
          email: "example1@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
          hashedPassword: null,
          createdAt: "2024-25-02T15:40:52.558Z",
          updatedAt: "2024-25-02T15:40:52.558Z",
          role: "USER",
        },
      },
      {
        id: "1",
        userId: "1",
        productId: "3",
        rating: 5,
        comment: "I really liked it!!",
        createdDate: "2024-25-02T14:30:40.998Z",
        user: {
          id: "1",
          name: "Богдан",
          email: "example@gmail.com",
          emailVerified: null,
          image:
            "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
          hashedPassword: null,
          createdAt: "2024-25-02T08:08:53.979Z",
          updatedAt: "2024-25-02T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
];