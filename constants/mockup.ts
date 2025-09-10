export type MockupShop = {
  id: string;
  name: string;
  description: string;
  address: string;
  imgUri?: string;
  distance: number;
  lon: string;
  lat: string;
};

export const shopsMockup: MockupShop[] = [
  {
    id: "shop_9b7a1c72",
    name: "Capelli e Chic",
    description:
      "Contemporary hairstylist specializing in precision cuts, balayage, and keratin treatments.",
    address: "Via del Corso 221, 00186 Roma RM, Italy",
    imgUri:
      "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?_gl=1*u2bgki*_ga*MjQwNzAzNTU4LjE3NTUxNTU5MTE.*_ga_8JE65Q40S6*czE3NTUxNTU5MTAkbzEkZzEkdDE3NTUxNTU5MjgkajQyJGwwJGgw",
    distance: 100,
    lon: "12.4801203",
    lat: "41.9017254",
  },
  {
    id: "shop_41f0e3d9",
    name: "Milano Glow Studio",
    description:
      "Boutique beauty salon offering color services, blowouts, and event styling.",
    address: "Corso Buenos Aires 15, 20124 Milano MI, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i8678659.w1280.h800.xCC676F87/", // Immagine 2
    distance: 350,
    lon: "9.2133503",
    lat: "45.4827768",
  },
  {
    id: "shop_c3fae5a1",
    name: "Firenze Bellezza",
    description:
      "Wellness salon with facials, aromatherapy massages, and natural skincare.",
    address: "Via de' Tornabuoni 9, 50123 Firenze FI, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i7342405.w1280.h800.xB4013D10/", // Immagine 3
    distance: 400,
    lon: "11.2512874",
    lat: "43.7710577",
  },
  {
    id: "shop_7e62b8f0",
    name: "Napoli Hair Lounge",
    description:
      "Trendy hair lounge known for curls, highlights, and restorative treatments.",
    address: "Via Toledo 178, 80134 Napoli NA, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i10995512.w1280.h800.x86C53E0B/", // Immagine 4
    distance: 1028,
    lon: "14.2488138",
    lat: "40.8405580",
  },
  {
    id: "shop_2a1d6c44",
    name: "Torino Wellness House",
    description:
      "Spa e beauty studio with manicure/pedicure, lash lift, and body scrubs.",
    address: "Via Roma 81, 10121 Torino TO, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i14688988.w1280.h800.x0BF81AB9/", // Reuse Immagine 1
    distance: 11,
    lon: "7.6808536",
    lat: "45.0653286",
  },
  {
    id: "shop_f8d3a917",
    name: "Bologna Silk Spa",
    description:
      "Calming day spa offering deep-tissue massage, hot stones, and sauna access.",
    address: "Via dell'Indipendenza 32, 40121 Bologna BO, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i8352906.w1280.h800.x5C261C7F/", // Reuse Immagine 2
    distance: 5.7,
    lon: "11.4017734",
    lat: "44.7039230",
  },
  {
    id: "shop_6c9be2aa",
    name: "Palermo Belle Époque",
    description:
      "Classic hairstyling and makeup bar for weddings and special events.",
    address: "Via Maqueda 210, 90133 Palermo PA, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i7420210.w1280.h800.xB1F76E0F/", // Reuse Immagine 3
    distance: 6.3,
    lon: "13.3597085",
    lat: "38.1183937",
  },
  {
    id: "shop_b2e0d5c6",
    name: "Genova Sea Breeze Salon",
    description:
      "Color correction experts; offers scalp care and nourishing hair rituals.",
    address: "Via XX Settembre 120, 16121 Genova GE, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i7350773.w1280.h800.x8A0562A3/", // Reuse Immagine 4
    distance: 1.9,
    lon: "8.9408044",
    lat: "44.4056064",
  },
  {
    id: "shop_54a1f0e2",
    name: "Verona Lumière Beauty",
    description:
      "Skin clinic vibes: LED facials, microdermabrasion, and brow design.",
    address: "Via Mazzini 45, 37121 Verona VR, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i7421913.w1280.h800.x241CD619/", // Reuse Immagine 1
    distance: 7.8,
    lon: "10.7910391",
    lat: "45.3294070",
  },
  {
    id: "shop_a7d94c33",
    name: "Bari Serenity Studio",
    description:
      "Holistic wellness salon with Ayurvedic massage and organic hair care.",
    address: "Via Sparano da Bari 67, 70121 Bari BA, Italy",
    imgUri:
      "https://cdn1.treatwell.net/images/view/v2.i7281168.w1280.h800.x03956A24/", // Reuse Immagine 2
    distance: 2.2,
    lon: "16.8694220",
    lat: "41.1232044",
  },
  {
    id: "shop_a7d94c43",
    name: "Acconciature per uomo",
    description: "Il meglio di sanremo.",
    address: "Via Gioberti 11, 18038 Sanremo IM, Italy",
    imgUri:
      "https://lh3.googleusercontent.com/p/AF1QipM7XNXdgQRc4gBYgu2RGKrmkG0qbIzRCroHmqzH=s1360-w1360-h1020-rw", // Reuse Immagine 2
    distance: 22,
    lon: "7.7773481",
    lat: "43.8158906",
  },
];

export type MockupTreatment = {
  id: string;
  name: string;
  description: string;
  price: number;
  time: number;
};

export const treatmentsMockup = [
  {
    id: "treatment_1",
    name: "Taglio Donna",
    description: "Taglio per donna (Shampoo incluso)",
    price: 20,
    time: 30,
  },
  {
    id: "treatment_2",
    name: "Piega Donna",
    description: "Piega per donna",
    price: 30,
    time: 15,
  },
  {
    id: "treatment_3",
    name: "Colore Donna",
    description: "Colorazione dei capelli tramite prodotti biologici",
    price: 25,
    time: 30,
  },
  {
    id: "treatment_4",
    name: "Taglio Uomo",
    description: "Taglio semplice uomo, (no shampoo)",
    price: 15,
    time: 20,
  },
  {
    id: "treatment_5",
    name: "Taglio Uomo con Shampoo",
    description: "Taglio uomo (Shampoo incluso)",
    price: 20,
    time: 30,
  },
];

export type MockupReview = {
  id: string;
  author: string;
  title: string;
  comment: string;
  rating: number;
  date: string;
};

export const reviewsMockup = [
  {
    id: "review_1",
    author: "Maria",
    title: "Ottimo!",
    comment:
      "Il salone è molto buono e curato. Personale qualificato e disponibile. Ci tornerò sicuramente!",
    rating: 4,
    date: "2023-06-01",
  },
  {
    id: "review_2",
    title: "Ci ritorneremo!",
    author: "Giuseppe",
    comment: "Ottimo",
    rating: 5,
    date: "2023-06-01",
  },
  {
    id: "review_3",
    author: "Francesca",
    title: "Poca igiene",
    comment:
      "Il prezzo vale quel che costa. Strumenti lasciati in giro e poca pulizia del locale.",
    rating: 2,
    date: "2023-06-01",
  },
];

export const timesMockup = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];
