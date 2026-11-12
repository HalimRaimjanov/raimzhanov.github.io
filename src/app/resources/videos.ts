export type VideoProject = {
  title: string;
  description: string;
  youtubeUrl: string;
  sourceUrl?: string;
};

// Editorial titles and summaries based on the video descriptions.
// Display order is the reverse of the links originally supplied.
export const videoProjects: VideoProject[] = [
  {
    "title": "Как работает VPN",
    "description": "Как VPN перенаправляет трафик и где заканчивается защита приватности.",
    "youtubeUrl": "https://youtu.be/PnQC3cD7DJ0"
  },
  {
    "title": "Где остаются удалённые фотографии",
    "description": "Почему копии остаются в облаке, корзине и мессенджерах.",
    "youtubeUrl": "https://youtu.be/o18fbtLc0UY"
  },
  {
    "title": "Как сайты узнают посетителей",
    "description": "Как cookie, учётные записи и цифровые отпечатки браузера помогают узнавать посетителей.",
    "youtubeUrl": "https://youtu.be/E6_PB6vRx9I"
  },
  {
    "title": "Как работает ретаргетинг",
    "description": "Как история посещений влияет на рекламу, которую мы видим.",
    "youtubeUrl": "https://youtu.be/wyMBd-CjXWQ"
  },
  {
    "title": "Как распознать фишинговый сайт",
    "description": "Признаки поддельных сайтов и действия при утечке данных для входа.",
    "youtubeUrl": "https://youtu.be/dnHSfrF5Ips"
  },
  {
    "title": "Что о вас рассказывает номер телефона",
    "description": "Как номер связан с личными данными и как уменьшить цифровой след.",
    "youtubeUrl": "https://youtu.be/JrMenq9GFD4"
  },
  {
    "title": "Разрешения приложений и личные данные",
    "description": "К каким данным получают доступ приложения и как управлять разрешениями.",
    "youtubeUrl": "https://youtu.be/GXAmO749Nzk"
  },
  {
    "title": "Как работает Face ID",
    "description": "Как распознавание лица защищает биометрические данные и какие у него ограничения.",
    "youtubeUrl": "https://youtu.be/akEQFrr2oKk"
  },
  {
    "title": "Определение местоположения без GPS",
    "description": "Как Wi-Fi, мобильные сети, Bluetooth и IP-адрес раскрывают местоположение.",
    "youtubeUrl": "https://youtu.be/-ejJzDIYqrQ"
  },
  {
    "title": "Подделка голоса с помощью ИИ",
    "description": "Как распознать поддельный голос и защититься от телефонного мошенничества.",
    "youtubeUrl": "https://youtu.be/8vF5l9XkBdc"
  },
  {
    "title": "Как поисковики и ИИ выбирают ответы",
    "description": "Как поисковые системы отбирают информацию, а ИИ формирует ответы.",
    "youtubeUrl": "https://youtu.be/qucXVq6B6Ao"
  }
];
