/* Menu + signature data — Rose Friendly */
const MENU_DATA = [
  {
    id:'veg-snacks', label:'Veg Snacks', type:'veg', panelNum:'01',
    img:'https://images.unsplash.com/photo-1567337710282-00832b415979?w=380&auto=format&fit=crop&q=60',
    desc:'Bold crispy bites and street-food classics that spark the appetite.',
    items:[
      {n:'Paneer 65',p:230,img:'https://images.unsplash.com/photo-1567337710282-00832b415979?w=320&auto=format&fit=crop&q=60'},
      {n:'Dahi Kabab',p:220,img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=320&auto=format&fit=crop&q=60'},
      {n:'Spring Roll',p:100},{n:'Mushroom Duplex',p:230},{n:'Mushroom Curry',p:260},
      {n:'Chilli Paneer',p:250,img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=320&auto=format&fit=crop&q=60'},
      {n:'Paneer Finger',p:220},{n:'Chilli Potato',p:120},{n:'Honey Chilli Potato',p:150},
      {n:'Crispy Corn',p:200},{n:'Corn Chaat',p:200},{n:'Chana Chaat',p:170},
      {n:'Vegetable Saute (Gym Diet)',p:240},{n:'Kurkure Palak Patta Chaat',p:140},
      {n:'French Fries',p:120},{n:'Masala French',p:150},{n:'Cheese French',p:220},
      {n:'Veg Manchurian',p:180},{n:'Veg Lollipop',p:120},{n:'Chinese Bhel',p:180},
      {n:'Peanut Masala',p:80},{n:'Masala Papad',p:80},
    ]
  },
  {
    id:'momos', label:'Momos', type:'veg', panelNum:'02',
    img:'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=380&auto=format&fit=crop&q=60',
    desc:"Steam-cooked, fried, tandoori and more — Haryana's street-side favourite.",
    items:[
      {n:'Veg Steam Momos',p:80},{n:'Veg Fry Momos',p:90},
      {n:'Veg Chilli Momos',p:150},{n:'Veg Kurkure Momos',p:140},
      {n:'Schezwan Momos',p:140},{n:'Veg Bhutani Momos',p:160},
      {n:'Veg Malai Momos',p:170},{n:'Paneer Steam Momos',p:140},
      {n:'Paneer Fry Momos',p:150},{n:'Paneer Kurkure Momos',p:180},
      {n:'Paneer Bhutani Momos',p:190},{n:'Paneer Malai Momos',p:200},
      {n:'Paneer Chilli Momos',p:140},{n:'Tandoori Paneer Momos',p:150},
      {n:'Lemon Momos',p:90},{n:'Tandoori Momos',p:120},
    ]
  },
  {
    id:'chicken-momos', label:'Chicken Momos', type:'nonveg', panelNum:'03',
    img:'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=380&auto=format&fit=crop&q=60',
    desc:'Juicy chicken-filled momos in every style — steam, fry, tandoori and more.',
    items:[
      {n:'Chicken Steam Momos',p:120},{n:'Chicken Fry Momos',p:120},
      {n:'Chicken Chilli Momos',p:150},{n:'Chicken Kurkure Momos',p:180},
      {n:'Chicken Shezwan Momos',p:170},{n:'Chicken Bhutani Momos',p:190},
      {n:'Chicken Malai Momos',p:200},
    ]
  },
  {
    id:'chowmein', label:'Chowmein', type:'both', panelNum:'04',
    img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=380&auto=format&fit=crop&q=60',
    desc:'Wok-tossed noodles with the fire and crunch of authentic street cooking.',
    items:[
      {n:'Veg Chowmein',p:80},{n:'Hakka Noodles',p:140},
      {n:'Schezwan Noodles',p:160},{n:'Chilli Noodles',p:150},
      {n:'Singapuri Noodles',p:170},{n:'Triple Noodles',p:180},{n:'Chilli Garlic Noodles',p:170},
    ]
  },
  {
    id:'tandoori-veg', label:'Tandoori (Veg)', type:'veg', panelNum:'05',
    img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=380&auto=format&fit=crop&q=60',
    desc:'Clay-oven perfection — smoky, charred, aromatic vegetarian kebabs.',
    items:[
      {n:'Veg Burasi Kabab',p:230},{n:'Hara Bhara Kabab',p:250},
      {n:'Mushroom Tikka',p:240},{n:'Mushroom Malai Tikka',p:260},
      {n:'Paneer Tikka',p:230},{n:'Paneer Malai Tikka',p:260},{n:'Lemon Paneer Tikka',p:270},
    ]
  },
  {
    id:'sandwich', label:'Sandwich', type:'veg', panelNum:'06',
    img:'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=380&auto=format&fit=crop&q=60',
    desc:'Layered, grilled, pressed — freshly made sandwiches for every palate.',
    items:[
      {n:'Veg Sandwich',p:100},{n:'Triple Layer Sandwich',p:130},
      {n:'Sweet Corn Sandwich',p:150},{n:'Mexican Sandwich',p:190},{n:'Paneer Sandwich',p:180},
    ]
  },
  {
    id:'pasta', label:'Pasta', type:'both', panelNum:'07',
    img:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=380&auto=format&fit=crop&q=60',
    desc:'Italian-inspired dishes crafted with an Indian touch.',
    items:[
      {n:'White Sauce Pasta',p:160},{n:'Red Sauce Pasta',p:140},
      {n:'Mix Sauce Pasta',p:150},{n:'Aglio Olio Pasta',p:130},
    ]
  },
  {
    id:'wraps', label:'Wraps & Rolls', type:'both', panelNum:'08',
    img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=380&auto=format&fit=crop&q=60',
    desc:'Handheld favourites — spiced fillings wrapped in fresh-rolled flatbread.',
    items:[
      {n:'Spicy Veg Wrap',p:120},{n:'Paneer Wrap',p:150},
      {n:'Veg Roll',p:80},{n:'Spring Roll',p:90},
      {n:'Egg Roll',p:100,type:'nonveg'},{n:'Egg Chicken Roll',p:170,type:'nonveg'},
      {n:'Finger Chips',p:120},{n:'Pari Pari Finger',p:150},
    ]
  },
  {
    id:'pizza', label:'Pizza', type:'veg', panelNum:'09',
    img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=380&auto=format&fit=crop&q=60',
    desc:'Hand-tossed pizzas in three sizes — loaded with the freshest toppings.',
    items:[
      {n:'Cheese Onion Pizza',p:140,note:'S: ₹100 | L: ₹170'},
      {n:'Cheese Onion Capsicum Pizza',p:180,note:'S: ₹140 | L: ₹200'},
      {n:'Sweet Corn Pizza',p:190,note:'S: ₹150 | L: ₹210'},
      {n:'Cheese Tomato Pizza',p:190,note:'S: ₹150 | L: ₹210'},
      {n:'Paneer Pizza',p:200,note:'S: ₹160 | L: ₹220'},
      {n:'Margherita Pizza',p:220,note:'S: ₹180 | L: ₹240'},
      {n:'Jalapeno Pizza',p:210,note:'S: ₹170 | L: ₹230'},
      {n:'Mushroom Olive Pizza',p:230,note:'S: ₹190 | L: ₹250'},
      {n:'Tandoori Paneer Pizza',p:280,note:'S: ₹240 | L: ₹300'},
      {n:'Makhani Pizza',p:280,note:'S: ₹240 | L: ₹300'},
    ]
  },
  {
    id:'rice', label:'Fried Rice', type:'both', panelNum:'10',
    img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=380&auto=format&fit=crop&q=60',
    desc:'Fragrant and smoky wok-tossed rice in every style imaginable.',
    items:[
      {n:'Plain Rice',p:90},{n:'Jeera Rice',p:110},{n:'Veg Fried Rice',p:160},
      {n:'Schezwan Rice',p:180},{n:'Soya Fried Rice',p:150},
      {n:'Chilli Fried Rice',p:170},{n:'Triple Rice',p:210},{n:'Garlic Fried Rice',p:190},
      {n:'Veg Pulao',p:220},{n:'Onion Rice',p:200},{n:'Steam Rice',p:80},
      {n:'Aloo Mutter Pulao',p:230},{n:'Cheese Fried Rice',p:180},
    ]
  },
  {
    id:'dal', label:'Dal & Curries', type:'veg', panelNum:'11',
    img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=380&auto=format&fit=crop&q=60',
    desc:'Slow-simmered lentils and legumes — the heartbeat of North Indian cooking.',
    items:[
      {n:'Dal Fry',p:110},{n:'Dal Tadka',p:130},{n:'Dal Makhani',p:170},
      {n:'Butter Dal Fry',p:140},{n:'Rajma Masala',p:160},{n:'Palak Dal',p:170},
      {n:'Rajasthani Chana Dal',p:140},{n:'Nizami Dal Tadka',p:190},
      {n:'Chana Masala',p:140},{n:'Black Chana Masala',p:130},{n:'Panch Ratan Dal',p:190},
    ]
  },
  {
    id:'paneer-mains', label:'Paneer Mains', type:'veg', panelNum:'12',
    img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=380&auto=format&fit=crop&q=60',
    desc:'Rich, indulgent paneer preparations — full and half portion available.',
    halfFull:true,
    items:[
      {n:'Masala Paneer',p:230,ph:130},{n:'Kadahi Paneer',p:250,ph:140},
      {n:'Shahi Paneer',p:250,ph:140},{n:'Rara Paneer',p:260,ph:150},
      {n:'Lemon Paneer',p:260,ph:150},{n:'Paneer Do Pyaja',p:260,ph:150},
      {n:'Paneer Pasanda',p:280,ph:160},{n:'Paneer Butter Masala',p:280,ph:160},
      {n:'Hyderabadi Paneer',p:290,ph:170},{n:'Paneer Lababdar',p:310,ph:180},
      {n:'Cheese Tomato',p:230},{n:'Paneer Bhurji',p:220},
    ]
  },
  {
    id:'veg-mains', label:'Veg Mains', type:'veg', panelNum:'13',
    img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=380&auto=format&fit=crop&q=60',
    desc:'Farm-fresh seasonal vegetables cooked with masterful North Indian technique.',
    items:[
      {n:'Mix Veg',p:170},{n:'Jeera Aloo',p:120},{n:'Aloo Matar',p:150},
      {n:'Aloo Do Pyaja',p:150},{n:'Veg Jalfrezi',p:130},{n:'Kadahi Vegetable',p:150},
      {n:'Bhindi Masala',p:160},{n:'Aloo Bhuna',p:140},{n:'Veg Kolhapuri',p:190},
      {n:'Mix Veg Handi',p:220},{n:'Adrak Aloo Gobhi',p:220},{n:'Dam Aloo',p:230},
      {n:'Kaju Masala',p:280},{n:'Palak Paneer',p:280},{n:'Mutter Paneer',p:300},
    ]
  },
  {
    id:'chaap', label:'Chaap', type:'veg', panelNum:'14',
    img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=380&auto=format&fit=crop&q=60',
    desc:"Haryana's beloved soya chaap — marinated, grilled, and utterly addictive.",
    items:[
      {n:'Masala Chaap Dry',p:170},{n:'Malai Chaap Dry',p:220},
      {n:'Crispy Chaap',p:200},{n:'Butter Chaap',p:220},{n:'Kadahi Chaap',p:230},
      {n:'Masala Chaap',p:250},{n:'Lemon Chaap',p:240},
      {n:'Spl. Lemon Chaap',p:270},{n:'Chilli Chaap',p:260},
    ]
  },
  {
    id:'raita', label:'Raita & Breads', type:'veg', panelNum:'15',
    img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=380&auto=format&fit=crop&q=60',
    desc:'Cooling accompaniments and fresh breads to balance every spiced dish.',
    items:[
      {n:'Boondi Raita',p:90},{n:'Plain Dahi',p:70},{n:'Aloo Raita',p:100},{n:'Mix Raita',p:110},
      {n:'Tawa Roti',p:10},{n:'Butter Roti',p:15},{n:'Plain Naan',p:35},{n:'Butter Naan',p:45},
      {n:'Garlic Naan',p:80},{n:'Cheese Naan',p:90},{n:'Stuffed Naan',p:55},
      {n:'Lachha Parantha',p:40},{n:'Aloo Parantha',p:60},{n:'Paneer Parantha',p:100},
    ]
  },
  {
    id:'egg', label:'Egg', type:'nonveg', panelNum:'16',
    img:'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=380&auto=format&fit=crop&q=60',
    desc:'Fresh egg preparations — quick, wholesome, and satisfying.',
    items:[
      {n:'2 Egg Omelette',p:50},{n:'Sunset Omelette',p:70},
      {n:'2 Egg Bhurji',p:60},{n:'5 Egg Bhurji',p:130},
      {n:'Egg Noodle',p:150},{n:'Egg Chilli Noodle',p:160},
      {n:'Singapuri Egg Noodle',p:180},{n:'Egg Chilli Garlic Noodle',p:160},{n:'Egg Gravy',p:150},
    ]
  },
  {
    id:'chicken-mains', label:'Chicken Mains', type:'nonveg', panelNum:'17',
    img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=380&auto=format&fit=crop&q=60',
    desc:'Slow-cooked gravies and robust chicken preparations — Full and Half portions.',
    halfFull:true,
    items:[
      {n:'Kadahi Chicken',p:580,ph:350},{n:'Butter Chicken Masala',p:600,ph:360},
      {n:'Lemon Chicken',p:590,ph:350},{n:'Home Made Chicken',p:590,ph:350},
      {n:'Chicken Do Pyaja',p:600,ph:360},{n:'Chicken Masala',p:590,ph:350},
      {n:'Rara Chicken',p:600,ph:380},{n:'Malai Chicken',p:600,ph:360},
      {n:'Dahi Chicken',p:600,ph:360},{n:'Lemon Kali Mirch Chicken',p:650,ph:380},
      {n:'Butter Garlic Chicken',p:630,ph:380},{n:'Makhni Chicken Gravy Shahi',p:630,ph:380},
      {n:'Chicken Tikka Masala Gravy',p:630,ph:380},{n:'Chicken Angara',p:630,ph:380},
      {n:'Hyderabadi Chicken',p:690,ph:400},{n:'Afgani Chicken Gravy',p:360,note:'Half only'},
    ]
  },
  {
    id:'chicken-tandoor', label:'Chicken Tandoor', type:'nonveg', panelNum:'18',
    img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=380&auto=format&fit=crop&q=60',
    desc:'Clay-oven specialities — smoky, charred, and deeply marinated.',
    items:[
      {n:'Chicken 65',p:600},{n:'Chicken Lollypop',p:350},
      {n:'Chicken Tikka',p:300},{n:'Malai Tikka',p:330},{n:'Lemon Chicken Tikka',p:320},
      {n:'Kalmi Kabab (4 Pc.)',p:300},{n:'Schezwan Chicken',p:350},
      {n:'Tangdi Kabab Stuffed',p:320},{n:'Chilli Tangdi Kabab',p:330},
      {n:'Tandoori Chicken (H)',p:250,note:'Full: ₹430'},
      {n:'Malai Tandoori Chicken (H)',p:300,note:'Full: ₹500'},
      {n:'Afgani Chicken Dry (H)',p:290,note:'Full: ₹490'},
      {n:'Lemon Tandoori Chicken (H)',p:290,note:'Full: ₹490'},
      {n:'Chicken Pakoda (H)',p:250,note:'Full: ₹490'},
      {n:'Lemon Chicken Dry (H)',p:330,note:'Full: ₹550'},
    ]
  },
];

const SIGS = [
  {name:'Butter Chicken Masala',cat:'Chicken Mains',price:'₹600',badge:'nonveg',img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=380&auto=format&fit=crop&q=60'},
  {name:'Shahi Paneer',cat:'Paneer Mains',price:'₹250',badge:'veg',img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=380&auto=format&fit=crop&q=60'},
  {name:'Chicken Angara',cat:'Chicken Mains',price:'₹630',badge:'nonveg',img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=380&auto=format&fit=crop&q=60'},
  {name:'Malai Chaap Dry',cat:'Chaap',price:'₹220',badge:'veg',img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=380&auto=format&fit=crop&q=60'},
  {name:'Dal Makhani',cat:'Dal & Curries',price:'₹170',badge:'veg',img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=380&auto=format&fit=crop&q=60'},
  {name:'Paneer Tikka',cat:'Tandoori Veg',price:'₹230',badge:'veg',img:'https://images.unsplash.com/photo-1567337710282-00832b415979?w=380&auto=format&fit=crop&q=60'},
  {name:'Rara Chicken',cat:'Chicken Mains',price:'₹600',badge:'nonveg',img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=380&auto=format&fit=crop&q=60'},
  {name:'Paneer Lababdar',cat:'Paneer Mains',price:'₹310',badge:'veg',img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=380&auto=format&fit=crop&q=60'},
  {name:'Chilli Chaap',cat:'Chaap',price:'₹260',badge:'veg',img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=380&auto=format&fit=crop&q=60'},
  {name:'Tandoori Chicken',cat:'Chicken Tandoor',price:'₹430',badge:'nonveg',img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=380&auto=format&fit=crop&q=60'},
];
