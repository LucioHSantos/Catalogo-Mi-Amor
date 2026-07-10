import { Product } from './types';

export const CATALOG: Product[] = [
  // --- AVAILABLE BOUQUETS ---
  {
    id: 'buque-amor-infinito',
    name: 'Buquê Amor Infinito (18 Rosas)',
    price: 359.90,
    category: 'buques',
    available: true,
    tag: 'Premium',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782481017/Cat%C3%A1logo_de_Buqu%C3%AAs_j4t5qs.png',
    description: 'Um buquê deslumbrante composto por 18 rosas vermelhas selecionadas, envoltas por delicadas flores de gipsofila (mosquetinho). O presente perfeito para expressar um amor eterno e sem limites.',
    details: [
      '18 Rosas vermelhas de haste longa selecionadas',
      'Ramos abundantes de Gipsofila (mosquetinho) importada',
      'Embalagem elegante com papel de seda e acabamento luxuoso',
      'Laço duplo de cetim acetinado vermelho',
      'Cartão de dedicatória personalizado incluído'
    ]
  },
  {
    id: 'buque-apaixonado',
    name: 'Buquê Apaixonado (12 Rosas)',
    price: 199.90,
    category: 'buques',
    available: true,
    tag: 'Mais Vendido',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782480854/WhatsApp_Image_2026-06-08_at_15.09.51_1_wyseqq.jpg',
    description: 'Uma clássica e poderosa declaração de amor com 12 rosas vermelhas de altíssima qualidade, embaladas harmoniosamente em papel decorativo vermelho texturizado e finalizadas com um lindo laço.',
    details: [
      '12 Rosas vermelhas frescas de produtores selecionados',
      'Folhagens nobres de eucalipto',
      'Papel celofane e papel decorativo vermelho coordenado',
      'Lindo laço de cetim volumoso com brilho',
      'Cartão de dedicatória para sua mensagem de amor'
    ]
  },
  {
    id: 'buque-encantado',
    name: 'Buquê Encantado (6 Rosas)',
    price: 159.90,
    category: 'buques',
    available: true,
    tag: 'Clássico',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782481543/Cat%C3%A1logo_de_Buqu%C3%AAs_1_tabpda.png',
    description: 'O encanto e delicadeza da simplicidade em um arranjo com 6 rosas vermelhas frescas e ramos de gipsofila, embalado com extremo requinte em papel celofane cristalino.',
    details: [
      '6 Rosas vermelhas de excelente abertura',
      'Ramos delicados de gipsofila branca',
      'Embalagem refinada transparente',
      'Laço artesanal decorativo vermelho',
      'Acompanha cartão com envelope decorado'
    ]
  },
  {
    id: 'buque-mimo',
    name: 'Buquê Mimo (2 ou 3 Rosas)',
    price: 89.90,
    category: 'buques',
    available: true,
    tag: 'Delicado',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782480853/WhatsApp_Image_2026-06-03_at_10.09.59_2_hl29g6.jpg',
    description: 'Um gesto carinhoso e sutil composto por 2 a 3 rosas vermelhas selecionadas, acompanhadas por folhagens decorativas e gipsofilas brancas. Ideal para alegrar o dia de alguém querido.',
    details: [
      '2 a 3 Rosas vermelhas frescas e vívidas',
      'Raminhos de mini-flores gipsofila',
      'Folhagem verde decorativa fresca',
      'Embalagem delicada com fita de cetim vermelha',
      'Cartãozinho de recado incluído'
    ]
  },
  {
    id: 'ramalhete-de-flores',
    name: 'Ramalhete de Flores (2 Flores)',
    price: 69.90,
    category: 'buques',
    available: true,
    tag: 'Econômico',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482070/ramalhete1_hf0eu9.png',
    images: [
      'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482070/ramalhete1_hf0eu9.png',
      'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482071/ramalhete_tmoltt.png'
    ],
    description: 'Delicadeza pura e minimalista. Duas rosas vermelhas vibrantes com acabamento de folhagens verdes rústicas em um lindo invólucro de papel kraft natural.',
    details: [
      '2 Rosas vermelhas especiais de haste média',
      'Folhas de aspargos verdes para volume',
      'Embalagem artesanal de papel kraft ecológico',
      'Laço de ráfia rústica natural',
      'Cartão pequeno de felicitação'
    ]
  },
  {
    id: 'buque-primavera-verao-m',
    name: 'Buquê Primavera Verão M',
    price: 109.90,
    category: 'buques',
    available: true,
    tag: 'Colorido',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782489939/WhatsApp_Image_2026-06-11_at_10.42.32_iatar7.jpg',
    description: 'Uma maravilhosa explosão de cores e frescor! Mix de flores da estação, crisântemos e margaridas em tons suaves de rosa, branco e lilás com ricas folhagens verdes.',
    details: [
      'Margaridas e Crisântemos selecionados em tons de rosa e lilás',
      'Flores silvestres brancas e folhagem verde brilhante',
      'Embalagem decorativa especial em tom coordenado',
      'Laço de fita de cetim roxo ou rosa',
      'Cartão de dedicatória para sua mensagem especial'
    ]
  },
  {
    id: 'buque-primavera-verao-g',
    name: 'Buquê Primavera Verão G',
    price: 139.90,
    category: 'buques',
    available: true,
    tag: 'Super Volumoso',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782480854/WhatsApp_Image_2026-06-03_at_10.09.58_q8vqlo.jpg',
    description: 'A versão grande, generosa e super volumosa do nosso querido mix de primavera/verão. Seleção nobre de flores coloridas da estação para causar uma impressão inesquecível.',
    details: [
      'Grande seleção de flores silvestres, crisântemos e ásteres',
      'Cores quentes e alegres da estação',
      'Embalagem luxuosa e encorpada de papel especial',
      'Grande laço acetinado multicolorido',
      'Cartão para mensagem longa'
    ]
  },

  // --- UNAVAILABLE/SPECIAL ORDER BOUQUETS (CROSSED OUT IN PDF) ---
  {
    id: 'buque-mi-amoreco',
    name: 'Buquê Mi Amoreco (3x3 Rosas e Girassóis)',
    price: 149.90,
    category: 'buques',
    available: true,
    tag: 'Rosas e Girassóis',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782480853/WhatsApp_Image_2026-06-03_at_10.09.59_1_qybldk.jpg',
    description: 'A harmonia ideal entre a paixão das rosas vermelhas e a energia brilhante dos girassóis. Contém 3 rosas românticas e 3 girassóis radiantes envolvidos por delicadas flores de gipsofila.',
    details: [
      '3 Girassóis bem abertos e vibrantes',
      '3 Rosas vermelhas românticas selecionadas',
      'Florzinhas de gipsofila para acabamento suave',
      'Embalagem decorativa rústica ou clássica',
      'Cartão de mensagem incluído'
    ]
  },
  {
    id: 'buque-mi-amorzao',
    name: 'Buquê Mi Amorzão (6x6 Rosas e Girassóis)',
    price: 199.90,
    category: 'buques',
    available: true,
    tag: 'Rosas e Girassóis',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782480898/WhatsApp_Image_2026-05-22_at_13.06.09_1_qhrpym.jpg',
    description: 'Um arranjo espetacular com 6 belas rosas vermelhas e 6 girassóis grandes abertos e cheios de luz, complementados por raminhos de gipsofila branca e embalagem especial.',
    details: [
      '6 Girassóis grandes de alta qualidade',
      '6 Rosas vermelhas de haste longa',
      'Folhagens ornamentais frescas',
      'Embalagem elegante com papel kraft rústico e celofane',
      'Lindo laço decorativo'
    ]
  },
  {
    id: 'buque-minha-vida',
    name: 'Buquê Minha Vida (12x5 Rosas e Girassóis)',
    price: 299.90,
    category: 'buques',
    available: true,
    tag: 'Luxo',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482506/12x5_hupldw.png',
    description: 'Uma exuberante homenagem para quem é a sua vida inteira. Combina 12 rosas vermelhas de luxo com 5 girassóis gigantes, folhagens nobres e flores gipsofila de acabamento.',
    details: [
      '12 Rosas vermelhas premium selecionadas',
      '5 Girassóis gigantes majestosos',
      'Arranjo super volumoso com gipsofilas',
      'Embalagem luxuosa e laço de cetim duplo',
      'Cartão de presente personalizado'
    ]
  },
  {
    id: 'buque-solar',
    name: 'Buquê Solar (1 Girassol e 3 Rosas)',
    price: 129.90,
    category: 'buques',
    available: true,
    tag: 'Delicado',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782481824/1gira3rosas_srwufy.png',
    description: 'Uma combinação leve e cheia de luz, ideal para transmitir otimismo e carinho. Conta com 1 girassol imponente centralizado e 3 rosas vermelhas selecionadas.',
    details: [
      '1 Girassol centralizado e imponente',
      '3 Rosas vermelhas selecionadas de excelente abertura',
      'Folhagem verde e embalagem artesanal rústica',
      'Laço de ráfia natural',
      'Acompanha cartão com sua mensagem'
    ]
  },
  {
    id: 'buque-solaris-primavera',
    name: 'Buquê Solaris Primavera (3 Girassóis)',
    price: 179.90,
    category: 'buques',
    available: true,
    tag: 'Vibrante',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782488785/3giras_dx74ou.jpg',
    description: 'Três girassóis vibrantes cercados de mini margaridas brancas, flores silvestres coloridas e folhagens de primavera. Traz luz e um delicioso perfume natural para qualquer ambiente.',
    details: [
      '3 Girassóis abertos e vibrantes',
      'Mix de flores da estação coloridas e gipsofilas',
      'Folhagem especial de eucalipto cheiroso',
      'Embalagem protetora em tela e papel craft',
      'Cartão de dedicatória para seu recado'
    ]
  },

  {
    id: 'buque-te-amo',
    name: 'Buquê Te Amo (6 Girassóis)',
    price: 189.90,
    category: 'buques',
    available: true,
    tag: 'Amor e Luz',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782489940/WhatsApp_Image_2026-04-16_at_11.52.07_kzigk2.jpg',
    description: 'Demonstre carinho de forma brilhante e inesquecível. Seis girassóis selecionados de hastes fortes e flores perfeitas, envoltos por raminhos de flores brancas e embalagem decorativa premium.',
    details: [
      '6 Girassóis de altíssima qualidade',
      'Mini margaridas ou flores gipsofila brancas de acabamento',
      'Embalagem impermeável em tons de amarelo e kraft',
      'Lindo laço de cetim',
      'Cartão de felicitação com envelope'
    ]
  },

  {
    id: 'buque-charme-lirios-p',
    name: 'Buquê Charme - Lírios P',
    price: 189.90,
    category: 'buques',
    available: true,
    tag: 'Sofisticado',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782490230/charme_akrkxo.jpg',
    description: 'Toda a elegância escultural e sofisticação dos lírios em tons suaves de rosa e branco. Um buquê compacto, charmoso e de perfume incrivelmente marcante.',
    details: [
      'Hastes selecionadas de lírios nobres rosa e brancos',
      'Botões fechados e flores já abertas para maior durabilidade',
      'Folhagens nobres de murta verde brilhante',
      'Embalagem minimalista delicada',
      'Acompanha cartão com envelope de luxo'
    ]
  },
  {
    id: 'buque-namoradeira-lirios-m',
    name: 'Buquê Namoradeira - Lírios M',
    price: 349.90,
    category: 'buques',
    available: true,
    tag: 'Rebocador de Olhares',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782490230/namora_g36rzk.png',
    description: 'Arranjo requintado e volumoso de lírios abertos e botões selecionados com folhagem verde brilhante. O presente ideal para celebrar bodas, aniversários ou datas memoráveis.',
    details: [
      'Grande quantidade de hastes de lírios rosa e brancos nobres',
      'Folhas de camélia ou murta para acabamento luxuoso',
      'Embalagem elegante com papéis sobrepostos de alta gramatura',
      'Laço monumental de cetim italiano',
      'Cartão de dedicatória com envelope premium'
    ]
  },

  // --- CESTAS DE PRESENTES (ALL COPIED FROM PDF PAGE 3 - ACTIVE) ---
  {
    id: 'cesta-amore-mio',
    name: 'Cesta Amore Mio',
    price: 249.90,
    category: 'cestas',
    available: false,
    tag: 'Com Ursinho',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482594/cestaamoremio_g8qt9u.png',
    description: 'Contém doces e chocolates selecionados de marcas renomadas, um lindo ursinho de pelúcia extremamente macio e rosas vermelhas frescas maravilhosas! Um presente romântico e charmoso demais.',
    details: [
      'Lindo ursinho de pelúcia com mensagem gravada',
      'Rosas vermelhas selecionadas em mini-arranjo',
      '1 Chocolate Kit Kat',
      '1 Chocolate Trento recheado',
      'Bombons sortidos selecionados',
      'Cesta decorada artesanalmente com fita vermelha "Com Amor"',
      'Cartão de dedicatória personalizado'
    ]
  },
  {
    id: 'cesta-amorzinho',
    name: 'Cesta Amorzinho',
    price: 289.90,
    category: 'cestas',
    available: false,
    tag: 'Ferrero Rocher',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482590/cestamorzinho_gjdski.png',
    description: 'Uma cesta maravilhosa contendo doces e chocolates finos selecionados, caixa de Ferrero Rocher e lindas rosas vermelhas que proporcionam o toque final de beleza e sofisticação.',
    details: [
      'Caixa de Ferrero Rocher (pequena/tradicional)',
      'Rosas vermelhas vibrantes e perfumadas',
      '1 Chocolate Kit Kat crocante',
      '1 Chocolate Trento recheado nobre',
      'Chocolates Kinder selecionados',
      'Cesta artesanal elegante de vime ou madeira decorada',
      'Cartão de presente com dedicatória'
    ]
  },
  {
    id: 'cesta-com-carinho',
    name: 'Cesta Com Carinho',
    price: 389.90,
    category: 'cestas',
    available: false,
    tag: 'A Mais Completa',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482712/comcarinho_oaaegj.png',
    description: 'Nossa cesta campeã de vendas, super generosa e luxuosa! Contém doces selecionados, uma grande variedade de chocolates, uma caixa de bombons e um urso de pelúcia fofinho. O presente perfeito para conquistar corações!',
    details: [
      'Caixa grande de chocolates finos Ferrero Rocher',
      'Urso de pelúcia aconchegante tamanho médio',
      'Arranjo decorado com flores brancas e vermelhas frescas',
      '1 Barra de chocolate nobre Nestlé ou Lacta',
      '1 Caixa de Bis tradicional ou Bis Oreo',
      '1 Chocolate Kit Kat e 1 Trento recheado',
      'Chocolates Kinder e bombons sortidos',
      'Cesta grande de madeira nobre rústica com laço monumental',
      'Cartão longo de homenagem personalizada'
    ]
  },
  {
    id: 'cesta-com-amor',
    name: 'Cesta Com Amor',
    price: 359.90,
    category: 'cestas',
    available: false,
    tag: 'Sucesso de Vendas',
    image: 'https://res.cloudinary.com/dvbadeh7n/image/upload/v1782482714/comamor_woytmw.png',
    description: 'Contém doces e chocolates selecionados deliciosos, bombons variados, Ferrero Rocher e um lindo arranjo de rosas incríveis para fechar a sua surpresa com chave de ouro.',
    details: [
      'Caixa de bombons selecionados Ferrero Rocher',
      'Arranjo suntuoso com rosas vermelhas frescas de alta qualidade',
      '1 Chocolate Kit Kat e 1 Trento',
      'Chocolates Kinder selecionados',
      '1 Caixa de Bis recheada',
      'Cesta especial vermelha cartonada premium "Com Amor"',
      'Laço de cetim e cartão para sua dedicatória'
    ]
  }
];
