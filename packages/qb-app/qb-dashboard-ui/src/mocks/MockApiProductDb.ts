
import type { BaseProductT, ProductT, ProductTranslatedValuesT } from '@qb/models';

export const baseSonyTvProduct: BaseProductT = {
  productId: 'SNY-XR65A80L',
  price: {
    currencyCode: 'USD',
    rate: 1699.99,
  },
  imageUrls: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb0gTcZ7jD86zf7ifkLxNbfuP7vwW80pdRsw&s',
    'https://i.ytimg.com/vi/6_8NrGyDWXQ/maxresdefault.jpg',
    'https://m.media-amazon.com/images/I/81fOE1WzPAL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/718w5MDpAzL._AC_SL1500_.jpg',
  ],
  category: 'electronics',
  stock: 12,
  reorderLevel: 5,
  popularity: 94,
  reviews: {
    count: 1250,
    rating: 4.8,
  },
  createdAtTs: 1712750400000, // Example timestamp for April 2024
  stockHistoryItems: [],
};

export const en_sonyTvProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Sony BRAVIA XR 65" Class A80L OLED 4K HDR Google TV',
  description: 'Experience pure black and natural colors with the Cognitive Processor XR.',
  fullDescription: 'The Sony A80L BRAVIA XR OLED TV delivers extraordinary contrast with deep blacks and high peak brightness. Powered by the Cognitive Processor XR, it understands how humans see and hear to deliver an experience that feels completely real. Features include Acoustic Surface Audio+, XR 4K Upscaling, and seamless integration with PlayStation 5.',
  specifications: {
    displayType: {
      specificationText: 'Display Type',
      specificationValue: 'OLED',
    },
    resolution: {
      specificationText: 'Resolution',
      specificationValue: '4K (3840 x 2160)',
    },
  },
};

export const fr_sonyTvProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Sony BRAVIA XR 65" Classe A80L OLED 4K HDR Google TV',
  description: 'Découvrez des noirs profonds et des couleurs naturelles grâce au processeur Cognitive Processor XR.',
  fullDescription: 'Le téléviseur OLED Sony A80L BRAVIA XR offre un contraste exceptionnel avec des noirs profonds et une luminosité maximale élevée. Alimenté par le Cognitive Processor XR, il comprend la façon dont les humains voient et entendent afin de fournir une expérience incroyablement réaliste. Les fonctionnalités incluent Acoustic Surface Audio+, la mise à l’échelle XR 4K et une intégration transparente avec la PlayStation 5.',
  specifications: {
    displayType: {
      specificationText: 'Type d’écran',
      specificationValue: 'OLED',
    },
    resolution: {
      specificationText: 'Résolution',
      specificationValue: '4K (3840 x 2160)',
    },
  },
};

export const en_sonyTvProduct: ProductT = {
  ...baseSonyTvProduct,
  ...en_sonyTvProductTranslations,
}

export const fr_sonyTvProduct: ProductT = {
  ...baseSonyTvProduct,
  ...fr_sonyTvProductTranslations,
}

export const baseSonyHeadphonesProduct: BaseProductT = {
  productId: 'SNY-WH1000XM5B',
  price: {
    currencyCode: 'USD',
    rate: 398.00,
  },
  imageUrls: [
    'https://www.worldwidestereo.com/cdn/shop/files/5_0d6ac1d2-3b9f-4534-b3cd-90858055904e_1946x.jpg?v=1762447793',
    'https://m.media-amazon.com/images/I/81BGoGOh8IL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61EZ0Dhw0fL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61UsE-M71NL._AC_SL1500_.jpg',
  ],
  category: 'electronics',
  stock: 45,
  reorderLevel: 15,
  popularity: 98,
  reviews: {
    count: 15420,
    rating: 4.7,
  },
  createdAtTs: 1715263200000, // May 2024
  stockHistoryItems: [],
};

export const en_sonyHeadphonesProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
  description: 'The industry-leading noise canceling headphones with 30 hours of battery life.',
  fullDescription: 'Experience the new standard in noise cancellation with the Sony WH-1000XM5. Featuring two processors controlling eight microphones, Auto NC Optimizer for automatically optimizing noise canceling based on your wearing conditions and environment, and the specially designed 30mm driver unit. Includes crystal-clear hands-free calling and speak-to-chat features.',
  specifications: {
    type: {
      specificationText: 'Type',
      specificationValue: 'Over-ear',
    },
    connection: {
      specificationText: 'Connection',
      specificationValue: 'Bluetooth 5.2 / Wired',
    },
  },
};

export const fr_sonyHeadphonesProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Sony WH-1000XM5 Casque sans fil à réduction de bruit',
  description: 'Le casque à réduction de bruit leader du marché avec 30 heures d’autonomie.',
  fullDescription: 'Découvrez la nouvelle référence en matière de réduction de bruit avec le Sony WH-1000XM5. Équipé de deux processeurs contrôlant huit microphones, de l’Auto NC Optimizer qui optimise automatiquement la réduction de bruit en fonction des conditions de port et de l’environnement, ainsi que d’un transducteur spécialement conçu de 30 mm. Inclut des appels mains libres d’une grande clarté et la fonction Speak-to-Chat.',
  specifications: {
    type: {
      specificationText: 'Type',
      specificationValue: 'Circum-aural',
    },
    connection: {
      specificationText: 'Connexion',
      specificationValue: 'Bluetooth 5.2 / Filiaire',
    },
  },
};

export const en_sonyHeadphonesProduct: ProductT = {
  ...baseSonyHeadphonesProduct,
  ...en_sonyHeadphonesProductTranslations,
}

export const fr_sonyHeadphonesProduct: ProductT = {
  ...baseSonyHeadphonesProduct,
  ...fr_sonyHeadphonesProductTranslations,
}

export const baseIphone17ProProduct: BaseProductT = {
  productId: 'APL-IP17PRO256',
  price: {
    currencyCode: 'USD',
    rate: 1199.00,
  },
  imageUrls: [
    'https://www.apple.com/la/iphone-17-pro/images/overview/highlights/highlights_design_endframe__eu8gj0kqlmoi_large.jpg',
    'https://m.media-amazon.com/images/I/71XWj4T9nzL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71YBR7rf6sL._AC_SL1500_.jpg',
  ],
  category: 'electronics',
  stock: 120,
  reorderLevel: 40,
  popularity: 100,
  reviews: {
    count: 8940,
    rating: 4.8,
  },
  createdAtTs: 1757808000000, // September 2025
  stockHistoryItems: [],
};

export const en_iphone17ProProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Apple iPhone 17 Pro',
  description: 'The latest iPhone with advanced performance, camera system, and ProMotion display.',
  fullDescription: 'The iPhone 17 Pro features Apple’s newest A19 Pro chip for exceptional performance and efficiency. Its advanced triple-camera system enables stunning photos and professional-quality video recording. The Super Retina XDR display with ProMotion technology delivers ultra-smooth scrolling and vibrant colors. Built with premium materials and designed for durability, the iPhone 17 Pro offers powerful features including Face ID, all-day battery life, and seamless integration with the Apple ecosystem.',
  specifications: {
    display: {
      specificationText: 'Display',
      specificationValue: '6.3" Super Retina XDR OLED',
    },
    processor: {
      specificationText: 'Processor',
      specificationValue: 'Apple A19 Pro',
    },
    storage: {
      specificationText: 'Storage',
      specificationValue: '256 GB',
    },
  },
};

export const fr_iphone17ProProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Apple iPhone 17 Pro',
  description: 'Le dernier iPhone avec des performances avancées, un système photo professionnel et un écran ProMotion.',
  fullDescription: 'L’iPhone 17 Pro est équipé de la nouvelle puce A19 Pro d’Apple offrant des performances et une efficacité exceptionnelles. Son système avancé à triple caméra permet de capturer des photos impressionnantes et des vidéos de qualité professionnelle. L’écran Super Retina XDR avec technologie ProMotion offre un défilement ultra fluide et des couleurs éclatantes. Conçu avec des matériaux haut de gamme et une grande durabilité, l’iPhone 17 Pro propose Face ID, une autonomie d’une journée et une intégration parfaite avec l’écosystème Apple.',
  specifications: {
    display: {
      specificationText: 'Écran',
      specificationValue: '6,3" Super Retina XDR OLED',
    },
    processor: {
      specificationText: 'Processeur',
      specificationValue: 'Apple A19 Pro',
    },
    storage: {
      specificationText: 'Stockage',
      specificationValue: '256 Go',
    },
  },
};

export const en_iphone17ProProduct: ProductT = {
  ...baseIphone17ProProduct,
  ...en_iphone17ProProductTranslations,
};

export const fr_iphone17ProProduct: ProductT = {
  ...baseIphone17ProProduct,
  ...fr_iphone17ProProductTranslations,
};
export const baseEaSportsFc26Product: BaseProductT = {
  productId: 'EA-FC26-XBXOX',
  price: {
    currencyCode: 'USD',
    rate: 69.99,
  },
  imageUrls: [
    'https://store-images.s-microsoft.com/image/apps.47830.14143997528953872.6dedfcb1-25c9-4700-a587-b5e8d2190c68.a0503a9e-d3d5-467f-9cd5-51ee04f36641?q=90&w=320&h=180',
    'https://m.media-amazon.com/images/I/81v9BZ9ATFL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/61UsMD62LlL._AC_SL1080_.jpg',
  ],
  category: 'entertainment',
  stock: 500,
  reorderLevel: 100,
  popularity: 95,
  reviews: {
    count: 4200,
    rating: 4.7,
  },
  createdAtTs: 1767225600000, // October 1, 2025
  stockHistoryItems: [],
};

export const en_eaSportsFc26ProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'EA SPORTS FC 26 Standard Edition',
  description: 'The latest EA SPORTS FC game delivering immersive football gameplay on Xbox Series X and Xbox One.',
  fullDescription: 'EA SPORTS FC 26 Standard Edition offers next-level football experience with realistic player animations, updated team rosters, and enhanced game modes. Play online or offline with friends, participate in competitive leagues, and enjoy the thrill of football on your console. Compatible with both Xbox Series X and Xbox One, it delivers smooth performance and stunning graphics.',
  specifications: {
    platform: {
      specificationText: 'Platform',
      specificationValue: 'Xbox Series X / Xbox One',
    },
    genre: {
      specificationText: 'Genre',
      specificationValue: 'Sports / Football',
    },
    edition: {
      specificationText: 'Edition',
      specificationValue: 'Standard Edition',
    },
  },
};

export const fr_eaSportsFc26ProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'EA SPORTS FC 26 Édition Standard',
  description: 'Le dernier jeu EA SPORTS FC offrant un gameplay de football immersif sur Xbox Series X et Xbox One.',
  fullDescription: 'L’Édition Standard d’EA SPORTS FC 26 propose une expérience de football de nouvelle génération avec des animations de joueurs réalistes, des équipes mises à jour et des modes de jeu améliorés. Jouez en ligne ou hors ligne avec vos amis, participez à des ligues compétitives et profitez de l’adrénaline du football sur votre console. Compatible avec Xbox Series X et Xbox One, il offre des performances fluides et des graphismes époustouflants.',
  specifications: {
    platform: {
      specificationText: 'Plateforme',
      specificationValue: 'Xbox Series X / Xbox One',
    },
    genre: {
      specificationText: 'Genre',
      specificationValue: 'Sports / Football',
    },
    edition: {
      specificationText: 'Édition',
      specificationValue: 'Édition Standard',
    },
  },
};

export const en_eaSportsFc26Product: ProductT = {
  ...baseEaSportsFc26Product,
  ...en_eaSportsFc26ProductTranslations,
};

export const fr_eaSportsFc26Product: ProductT = {
  ...baseEaSportsFc26Product,
  ...fr_eaSportsFc26ProductTranslations,
};

export const baseBiodanceSerumProduct: BaseProductT = {
  productId: 'BD-RVNS30',
  price: {
    currencyCode: 'USD',
    rate: 29.99,
  },
  imageUrls: [
    'https://www.koreanbeauty.es/cdn/shop/files/RadiantVitaNiacinamideSerum_1.png?v=1770996182&width=1080',
    'https://www.koreanbeauty.es/cdn/shop/files/RadiantVitaNiacinamideSerum.png?v=1770996182&width=900',
    'https://biodance.com/cdn/shop/files/VitaSerum8_Ver.jpg?v=1760324070&width=1280',
  ],
  category: 'beauty',
  stock: 250,
  reorderLevel: 50,
  popularity: 90,
  reviews: {
    count: 620,
    rating: 4.6,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_biodanceSerumProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'BIODANCE Radiant Vita Niacinamide Serum',
  description: 'A brightening facial serum enriched with niacinamide for radiant, healthy-looking skin.',
  fullDescription: 'BIODANCE Radiant Vita Niacinamide Serum is formulated to improve skin texture, reduce the appearance of pores, and enhance natural radiance. Suitable for all skin types, this lightweight serum delivers essential vitamins and hydration while helping to maintain a balanced complexion. Apply daily to clean skin for best results.',
  specifications: {
    volume: {
      specificationText: 'Volume',
      specificationValue: '30 ml',
    },
    keyIngredient: {
      specificationText: 'Key Ingredient',
      specificationValue: 'Niacinamide',
    },
    skinType: {
      specificationText: 'Skin Type',
      specificationValue: 'All skin types',
    },
  },
};

export const fr_biodanceSerumProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'BIODANCE Radiant Vita Sérum Niacinamide',
  description: 'Un sérum facial illuminant enrichi en niacinamide pour une peau éclatante et saine.',
  fullDescription: 'Le sérum BIODANCE Radiant Vita Niacinamide est formulé pour améliorer la texture de la peau, réduire l’apparence des pores et augmenter l’éclat naturel. Convient à tous les types de peau, ce sérum léger apporte des vitamines essentielles et de l’hydratation tout en aidant à maintenir un teint équilibré. Appliquer quotidiennement sur une peau propre pour de meilleurs résultats.',
  specifications: {
    volume: {
      specificationText: 'Volume',
      specificationValue: '30 ml',
    },
    keyIngredient: {
      specificationText: 'Ingrédient Clé',
      specificationValue: 'Niacinamide',
    },
    skinType: {
      specificationText: 'Type de Peau',
      specificationValue: 'Tous types de peau',
    },
  },
};

export const en_biodanceSerumProduct: ProductT = {
  ...baseBiodanceSerumProduct,
  ...en_biodanceSerumProductTranslations,
};

export const fr_biodanceSerumProduct: ProductT = {
  ...baseBiodanceSerumProduct,
  ...fr_biodanceSerumProductTranslations,
};
export const baseSkincareKitProduct: BaseProductT = {
  productId: 'SK-KITFRUIT5',
  price: {
    currencyCode: 'USD',
    rate: 49.99,
  },
  imageUrls: [
    'https://m.media-amazon.com/images/I/71fgLz0ouFL._AC_UF894,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/S/aplus-media-library-service-media/5b259504-1a5e-4242-a1ba-3b3d8fe2273c.__CR0,0,600,450_PT0_SX600_V1___.jpg',
  ],
  category: 'beauty',
  stock: 300,
  reorderLevel: 60,
  popularity: 85,
  reviews: {
    count: 310,
    rating: 4.5,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_skincareKitProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Fruit Extract Skincare Kit – 5-Piece Gift Set',
  description: 'A gentle and nourishing skincare gift set with fruit extracts, suitable for all skin types.',
  fullDescription: 'This 5-piece skincare kit includes cleansers, serums, and moisturizers enriched with natural fruit extracts to hydrate, brighten, and revitalize the skin. Designed for women and teens, each product is gentle, safe, and suitable for all skin types. Perfect as a gift or for daily self-care routines.',
  specifications: {
    pieces: {
      specificationText: 'Number of Pieces',
      specificationValue: '5',
    },
    targetAudience: {
      specificationText: 'Target Audience',
      specificationValue: 'Women and Teens',
    },
    skinType: {
      specificationText: 'Skin Type',
      specificationValue: 'All skin types',
    },
  },
};

export const fr_skincareKitProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Kit Facial Skincare aux Extraits de Fruits – Ensemble Cadeau 5 Pièces',
  description: 'Un ensemble de soins doux et nourrissant aux extraits de fruits, adapté à tous les types de peau.',
  fullDescription: 'Ce kit de soins de 5 pièces comprend des nettoyants, sérums et crèmes hydratantes enrichis en extraits naturels de fruits pour hydrater, illuminer et revitaliser la peau. Conçu pour les femmes et les adolescents, chaque produit est doux, sûr et adapté à tous les types de peau. Idéal comme cadeau ou pour une routine quotidienne de soins.',
  specifications: {
    pieces: {
      specificationText: 'Nombre de Pièces',
      specificationValue: '5',
    },
    targetAudience: {
      specificationText: 'Public Cible',
      specificationValue: 'Femmes et Adolescents',
    },
    skinType: {
      specificationText: 'Type de Peau',
      specificationValue: 'Tous types de peau',
    },
  },
};

export const en_skincareKitProduct: ProductT = {
  ...baseSkincareKitProduct,
  ...en_skincareKitProductTranslations,
};

export const fr_skincareKitProduct: ProductT = {
  ...baseSkincareKitProduct,
  ...fr_skincareKitProductTranslations,
};

export const baseCosrxSnailCreamProduct: BaseProductT = {
  productId: 'COSRX-SNAIL92-100G',
  price: {
    currencyCode: 'USD',
    rate: 24.99,
  },
  imageUrls: [
    'https://m.media-amazon.com/images/I/71c7IvdJSCL.jpg',
    'https://m.media-amazon.com/images/I/718aGa8YcIL._AC_UF350,350_QL80_.jpg',
    'https://m.media-amazon.com/images/S/aplus-media-library-service-media/055caad9-0b96-44f6-85b7-98f19035a27b.__CR25,0,600,450_PT0_SX600_V1___.jpg',
    'https://m.media-amazon.com/images/I/61Oabk3c4+L._AC_UF894,1000_QL80_.jpg',
  ],
  category: 'beauty',
  stock: 200,
  reorderLevel: 50,
  popularity: 92,
  reviews: {
    count: 870,
    rating: 4.7,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_cosrxSnailCreamProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'COSRX Advanced Snail 92 All in One Cream',
  description: 'A hydrating day and night cream enriched with snail mucin, targeting dark spots and wrinkles.',
  fullDescription: 'COSRX Advanced Snail 92 All in One Cream delivers intensive hydration and skin repair with 92% snail secretion filtrate. Its lightweight, non-greasy formula helps reduce the appearance of fine lines, wrinkles, and dark spots while improving overall skin texture. Suitable for daily use both morning and night, this cream nourishes and strengthens the skin barrier for a healthy, radiant complexion.',
  specifications: {
    weight: {
      specificationText: 'Weight',
      specificationValue: '100 g',
    },
    benefits: {
      specificationText: 'Benefits',
      specificationValue: 'Anti-Dark Spots, Anti-Wrinkles, Hydration',
    },
    usage: {
      specificationText: 'Usage',
      specificationValue: 'Day & Night',
    },
  },
};

export const fr_cosrxSnailCreamProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'COSRX Advanced Snail 92 Crème Tout-en-Un',
  description: 'Crème hydratante de jour et de nuit enrichie en mucine d’escargot, ciblant les taches et les rides.',
  fullDescription: 'La COSRX Advanced Snail 92 Crème Tout-en-Un procure une hydratation intense et favorise la réparation de la peau grâce à 92% de filtrat de sécrétion d’escargot. Sa formule légère et non grasse aide à réduire l’apparence des ridules, rides et taches sombres tout en améliorant la texture globale de la peau. Convient à une utilisation quotidienne matin et soir, cette crème nourrit et renforce la barrière cutanée pour un teint sain et éclatant.',
  specifications: {
    weight: {
      specificationText: 'Poids',
      specificationValue: '100 g',
    },
    benefits: {
      specificationText: 'Bienfaits',
      specificationValue: 'Anti-Taches, Anti-Rides, Hydratation',
    },
    usage: {
      specificationText: 'Utilisation',
      specificationValue: 'Jour & Nuit',
    },
  },
};

export const en_cosrxSnailCreamProduct: ProductT = {
  ...baseCosrxSnailCreamProduct,
  ...en_cosrxSnailCreamProductTranslations,
};

export const fr_cosrxSnailCreamProduct: ProductT = {
  ...baseCosrxSnailCreamProduct,
  ...fr_cosrxSnailCreamProductTranslations,
};

export const baseAmazonGranolaProduct: BaseProductT = {
  productId: 'AMZ-GRANOLA500',
  price: {
    currencyCode: 'USD',
    rate: 7.99,
  },
  imageUrls: [
    'https://m.media-amazon.com/images/I/61jGYZ+6KFL._AC_UF894,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/71X3HvMCqKL._AC_SL1500_.jpg',
  ],
  category: 'food',
  stock: 400,
  reorderLevel: 80,
  popularity: 88,
  reviews: {
    count: 540,
    rating: 4.5,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_amazonGranolaProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Amazon Granola with Two Chocolates, 500g',
  description: 'Delicious crunchy granola with a double chocolate blend, perfect for breakfast or snacking.',
  fullDescription: 'Amazon Granola with Two Chocolates is a tasty and nutritious blend of oats, nuts, and chocolate pieces. Ideal for breakfast, yogurt toppings, or healthy snacking. This 500g pack offers a convenient way to enjoy the rich flavor of chocolate while keeping a balanced diet.',
  specifications: {
    weight: {
      specificationText: 'Weight',
      specificationValue: '500 g',
    },
    flavor: {
      specificationText: 'Flavor',
      specificationValue: 'Double Chocolate',
    },
    ingredients: {
      specificationText: 'Ingredients',
      specificationValue: 'Oats, Nuts, Cocoa, Sugar, Chocolate Chips',
    },
  },
};

export const fr_amazonGranolaProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Granola Amazon aux Deux Chocolats, 500 g',
  description: 'Délicieux granola croquant avec un mélange de double chocolat, parfait pour le petit-déjeuner ou le goûter.',
  fullDescription: 'Le Granola Amazon aux Deux Chocolats est un mélange savoureux et nutritif d’avoine, de noix et de morceaux de chocolat. Idéal pour le petit-déjeuner, en topping sur du yaourt ou comme snack sain. Ce pack de 500 g offre un moyen pratique de savourer le goût riche du chocolat tout en maintenant une alimentation équilibrée.',
  specifications: {
    weight: {
      specificationText: 'Poids',
      specificationValue: '500 g',
    },
    flavor: {
      specificationText: 'Saveur',
      specificationValue: 'Double Chocolat',
    },
    ingredients: {
      specificationText: 'Ingrédients',
      specificationValue: 'Avoine, Noix, Cacao, Sucre, Pépites de Chocolat',
    },
  },
};

export const en_amazonGranolaProduct: ProductT = {
  ...baseAmazonGranolaProduct,
  ...en_amazonGranolaProductTranslations,
};

export const fr_amazonGranolaProduct: ProductT = {
  ...baseAmazonGranolaProduct,
  ...fr_amazonGranolaProductTranslations,
};

export const baseNacionalCookiesProduct: BaseProductT = {
  productId: 'NC-Z-300G',
  price: {
    currencyCode: 'USD',
    rate: 5.49,
  },
  imageUrls: [
    'https://m.media-amazon.com/images/I/81ZT3aAYvbL._AC_SX679_.jpg',
    'https://m.media-amazon.com/images/I/71ytA6GVphS._AC_SL1000_.jpg',
  ],
  category: 'food',
  stock: 350,
  reorderLevel: 70,
  popularity: 80,
  reviews: {
    count: 290,
    rating: 4.4,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_nacionalCookiesProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Nacional Desde 1849 Cookies Z, Chocolate, 300g',
  description: 'Classic chocolate cookies with a rich flavor, perfect for snacks or dessert.',
  fullDescription: 'Nacional Desde 1849 Cookies Z are delicious chocolate cookies made with quality ingredients. Each 300g pack offers a perfect treat for family or personal enjoyment. Crispy on the outside and soft on the inside, these cookies are ideal for snacking, dessert, or sharing with friends.',
  specifications: {
    weight: {
      specificationText: 'Weight',
      specificationValue: '300 g',
    },
    flavor: {
      specificationText: 'Flavor',
      specificationValue: 'Chocolate',
    },
    packaging: {
      specificationText: 'Packaging',
      specificationValue: 'Pack',
    },
  },
};

export const fr_nacionalCookiesProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Cookies Z Nacional Depuis 1849, Chocolat, 300 g',
  description: 'Cookies au chocolat classiques avec une saveur riche, parfaits pour le goûter ou le dessert.',
  fullDescription: 'Les Cookies Z Nacional Depuis 1849 sont de délicieux cookies au chocolat fabriqués avec des ingrédients de qualité. Chaque pack de 300 g offre une gourmandise parfaite pour la famille ou pour soi. Croquants à l’extérieur et moelleux à l’intérieur, ces cookies sont idéaux pour le goûter, le dessert ou à partager entre amis.',
  specifications: {
    weight: {
      specificationText: 'Poids',
      specificationValue: '300 g',
    },
    flavor: {
      specificationText: 'Saveur',
      specificationValue: 'Chocolat',
    },
    packaging: {
      specificationText: 'Emballage',
      specificationValue: 'Pack',
    },
  },
};

export const en_nacionalCookiesProduct: ProductT = {
  ...baseNacionalCookiesProduct,
  ...en_nacionalCookiesProductTranslations,
};

export const fr_nacionalCookiesProduct: ProductT = {
  ...baseNacionalCookiesProduct,
  ...fr_nacionalCookiesProductTranslations,
};

export const baseNestleKitKatDarkProduct: BaseProductT = {
  productId: 'KK-D-70-8X24X415G',
  price: {
    currencyCode: 'USD',
    rate: 23.21,
  },
  imageUrls: [
    'https://iamishop.com/cdn/shop/files/71nhZq_swJL.jpg?v=1754563344',
  ],
  category: 'food',
  stock: 150,
  reorderLevel: 40,
  popularity: 90,
  reviews: {
    count: 16,
    rating: 4.7,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_nestleKitKatDarkProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Nestlé KitKat Dark Chocolate 70% – 8x24x41.5g',
  description: 'Dark chocolate KitKat bars with 70% cocoa, ideal for snacking or sharing.',
  fullDescription: 'Nestlé KitKat Dark Chocolate 70% features crispy wafer fingers covered in rich, intense dark chocolate. Each pack contains 8 boxes of 24 individual 41.5 g bars, perfect for personal enjoyment, sharing, or as a premium snack.',
  specifications: {
    weight: {
      specificationText: 'Weight',
      specificationValue: '41.5 g per bar',
    },
    flavor: {
      specificationText: 'Flavor',
      specificationValue: 'Dark Chocolate 70%',
    },
    packaging: {
      specificationText: 'Packaging',
      specificationValue: '8 boxes of 24 bars each',
    },
  },
};

export const fr_nestleKitKatDarkProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Nestlé KitKat Chocolat Noir 70% – 8x24x41,5 g',
  description: 'Barres KitKat au chocolat noir 70%, idéales pour le goûter ou à partager.',
  fullDescription: 'Les KitKat Chocolat Noir 70% de Nestlé sont composés de doigts de gaufrette croustillants recouverts d’un chocolat noir intense. Chaque pack contient 8 boîtes de 24 barres individuelles de 41,5 g, parfait pour un plaisir personnel, le partage ou comme snack premium.',
  specifications: {
    weight: {
      specificationText: 'Poids',
      specificationValue: '41,5 g par barre',
    },
    flavor: {
      specificationText: 'Saveur',
      specificationValue: 'Chocolat noir 70%',
    },
    packaging: {
      specificationText: 'Emballage',
      specificationValue: '8 boîtes de 24 barres chacune',
    },
  },
};

export const en_nestleKitKatDarkProduct: ProductT = {
  ...baseNestleKitKatDarkProduct,
  ...en_nestleKitKatDarkProductTranslations,
};

export const fr_nestleKitKatDarkProduct: ProductT = {
  ...baseNestleKitKatDarkProduct,
  ...fr_nestleKitKatDarkProductTranslations,
};

export const baseKinderBuenoDarkProduct: BaseProductT = {
  productId: 'KB-D-30X2',
  price: {
    currencyCode: 'USD',
    rate: 45.99,
  },
  imageUrls: [
    'https://m.media-amazon.com/images/I/71VcNBiRXnL.jpg',
    'https://img2.miravia.es/g/fb/kf/E97f041dadc55453bbaf671ad86aeb144n.jpg_360x360q75.jpg',
  ],
  category: 'food',
  stock: 120,
  reorderLevel: 30,
  popularity: 88,
  reviews: {
    count: 58,
    rating: 4.6,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_kinderBuenoDarkProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Kinder Bueno Dark – 30 Pack Box (2 Bars per Pack)',
  description: 'Indulgent dark chocolate Kinder Bueno bars with creamy hazelnut filling, perfect for sharing or snacking.',
  fullDescription: 'Kinder Bueno Dark features a smooth creamy hazelnut filling encased in a crispy wafer and coated in rich dark chocolate. This box contains 30 packs, each with 2 individually wrapped bars, ideal for snacking, gifting, or sharing with friends and family.',
  specifications: {
    weight: {
      specificationText: 'Weight',
      specificationValue: '2 x 43 g per pack',
    },
    flavor: {
      specificationText: 'Flavor',
      specificationValue: 'Dark Chocolate with Hazelnut',
    },
    packaging: {
      specificationText: 'Packaging',
      specificationValue: 'Box of 30 packs',
    },
  },
};

export const fr_kinderBuenoDarkProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Kinder Bueno Dark – Boîte de 30 paquets (2 barres par paquet)',
  description: 'Délicieuses barres Kinder Bueno au chocolat noir avec cœur de noisette crémeux, parfaites pour partager ou grignoter.',
  fullDescription: 'Kinder Bueno Dark contient un cœur crémeux de noisette enveloppé dans une gaufrette croustillante et recouvert d’un chocolat noir riche. Cette boîte contient 30 paquets, chacun avec 2 barres emballées individuellement, idéal pour le goûter, offrir en cadeau ou partager avec famille et amis.',
  specifications: {
    weight: {
      specificationText: 'Poids',
      specificationValue: '2 x 43 g par paquet',
    },
    flavor: {
      specificationText: 'Saveur',
      specificationValue: 'Chocolat noir avec noisette',
    },
    packaging: {
      specificationText: 'Emballage',
      specificationValue: 'Boîte de 30 paquets',
    },
  },
};

export const en_kinderBuenoDarkProduct: ProductT = {
  ...baseKinderBuenoDarkProduct,
  ...en_kinderBuenoDarkProductTranslations,
};

export const fr_kinderBuenoDarkProduct: ProductT = {
  ...baseKinderBuenoDarkProduct,
  ...fr_kinderBuenoDarkProductTranslations,
};

export const baseLindtExcellence85Product: BaseProductT = {
  productId: 'LINDT-EXC-85',
  price: {
    currencyCode: 'USD',
    rate: 4.99,
  },
  imageUrls: [
    'https://m.media-amazon.com/images/I/81qpR4n0weL._AC_UF350,350_QL80_.jpg',
    'https://m.media-amazon.com/images/I/71tCoH3pZjL._AC_UF350,350_QL80_.jpg',
    'https://m.media-amazon.com/images/I/61HM67palmL.jpg',
  ],
  category: 'food',
  stock: 250,
  reorderLevel: 50,
  popularity: 92,
  reviews: {
    count: 134,
    rating: 4.8,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_lindtExcellence85ProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Lindt Excellence 85% Dark Chocolate Bar',
  description: 'Aromatic, extra-fine, intense and balanced dark chocolate with 85% cocoa.',
  fullDescription: 'Lindt Excellence 85% is a premium dark chocolate bar crafted for true chocolate lovers. Its aromatic and extra-fine texture delivers an intense yet balanced flavor. Made with 85% cocoa, it offers a rich and sophisticated chocolate experience, perfect for savoring or gifting.',
  specifications: {
    weight: {
      specificationText: 'Weight',
      specificationValue: '100 g',
    },
    flavor: {
      specificationText: 'Flavor',
      specificationValue: 'Extra-fine Dark Chocolate 85%',
    },
    packaging: {
      specificationText: 'Packaging',
      specificationValue: 'Individual Bar',
    },
  },
};

export const fr_lindtExcellence85ProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Lindt Excellence 85% Chocolat Noir',
  description: 'Chocolat noir aromatique, extra-fin, intense et équilibré avec 85% de cacao.',
  fullDescription: 'Lindt Excellence 85% est une tablette de chocolat noir premium conçue pour les véritables amateurs de chocolat. Sa texture aromatique et extra-fin offre une saveur intense mais équilibrée. Avec 85% de cacao, elle procure une expérience chocolatée riche et sophistiquée, idéale à déguster ou à offrir.',
  specifications: {
    weight: {
      specificationText: 'Poids',
      specificationValue: '100 g',
    },
    flavor: {
      specificationText: 'Saveur',
      specificationValue: 'Chocolat noir extra-fin 85%',
    },
    packaging: {
      specificationText: 'Emballage',
      specificationValue: 'Tablette individuelle',
    },
  },
};

export const en_lindtExcellence85Product: ProductT = {
  ...baseLindtExcellence85Product,
  ...en_lindtExcellence85ProductTranslations,
};

export const fr_lindtExcellence85Product: ProductT = {
  ...baseLindtExcellence85Product,
  ...fr_lindtExcellence85ProductTranslations,
};

export const baseLindtLindorDark70Product: BaseProductT = {
  productId: 'LINDOR-D70-200G',
  price: {
    currencyCode: 'USD',
    rate: 9.99,
  },
  imageUrls: [
    'https://www.lindt.es/media/catalog/product/n/e/negro_70__200g_cornet_taste.jpg?quality=80&fit=bounds&height=700&width=700&canvas=700:700',
    'https://www.lindt.es/media/catalog/product/l/i/lindor-negro70_-200g_pio.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700',
  ],
  category: 'food',
  stock: 180,
  reorderLevel: 40,
  popularity: 91,
  reviews: {
    count: 102,
    rating: 4.9,
  },
  createdAtTs: 1735689600000, // January 1, 2025
  stockHistoryItems: [],
};

export const en_lindtLindorDark70ProductTranslations: ProductTranslatedValuesT = {
  langCode: 'en',
  name: 'Lindt LINDOR CORNET Dark Chocolate 70% – 200 g (~16 Truffles)',
  description: 'Delicious dark chocolate LINDOR truffles with a creamy chocolate center, individually wrapped.',
  fullDescription: 'Lindt LINDOR CORNET Dark Chocolate 70% offers smooth and creamy chocolate truffles with a rich dark chocolate shell. Each 200 g box contains approximately 16 individually wrapped truffles, perfect for gifting, sharing, or enjoying as a luxurious treat.',
  specifications: {
    weight: {
      specificationText: 'Weight',
      specificationValue: '200 g',
    },
    flavor: {
      specificationText: 'Flavor',
      specificationValue: 'Dark Chocolate 70%',
    },
    packaging: {
      specificationText: 'Packaging',
      specificationValue: 'Box of ~16 truffles',
    },
  },
};

export const fr_lindtLindorDark70ProductTranslations: ProductTranslatedValuesT = {
  langCode: 'fr',
  name: 'Lindt LINDOR CORNET Chocolat Noir 70% – 200 g (~16 Truffes)',
  description: 'Délicieuses truffes LINDOR au chocolat noir avec cœur crémeux, emballées individuellement.',
  fullDescription: 'Lindt LINDOR CORNET Chocolat Noir 70% propose des truffes au chocolat lisse et crémeux avec une coque en chocolat noir riche. Chaque boîte de 200 g contient environ 16 truffes emballées individuellement, parfaites pour offrir, partager ou savourer comme une gourmandise raffinée.',
  specifications: {
    weight: {
      specificationText: 'Poids',
      specificationValue: '200 g',
    },
    flavor: {
      specificationText: 'Saveur',
      specificationValue: 'Chocolat noir 70%',
    },
    packaging: {
      specificationText: 'Emballage',
      specificationValue: 'Boîte de ~16 truffes',
    },
  },
};

export const en_lindtLindorDark70Product: ProductT = {
  ...baseLindtLindorDark70Product,
  ...en_lindtLindorDark70ProductTranslations,
};

export const fr_lindtLindorDark70Product: ProductT = {
  ...baseLindtLindorDark70Product,
  ...fr_lindtLindorDark70ProductTranslations,
};

export const mockProducts: ProductT[] = [
  en_sonyTvProduct,
  fr_sonyTvProduct,
  en_sonyHeadphonesProduct,
  fr_sonyHeadphonesProduct,
  en_iphone17ProProduct,
  fr_iphone17ProProduct,
  en_eaSportsFc26Product,
  fr_eaSportsFc26Product,
  en_biodanceSerumProduct,
  fr_biodanceSerumProduct,
  en_skincareKitProduct,
  fr_skincareKitProduct,
  en_cosrxSnailCreamProduct,
  fr_cosrxSnailCreamProduct,
  en_amazonGranolaProduct,
  fr_amazonGranolaProduct,
  en_nacionalCookiesProduct,
  fr_nacionalCookiesProduct,
  en_nestleKitKatDarkProduct,
  fr_nestleKitKatDarkProduct,
  en_kinderBuenoDarkProduct,
  fr_kinderBuenoDarkProduct,
  en_lindtExcellence85Product,
  fr_lindtExcellence85Product,
  en_lindtLindorDark70Product,
  fr_lindtLindorDark70Product,
];
