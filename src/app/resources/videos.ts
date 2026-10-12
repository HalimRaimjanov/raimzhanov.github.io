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
    "description": "Передача данных через VPN и ограничения анонимности.",
    "youtubeUrl": "https://youtu.be/PnQC3cD7DJ0"
  },
  {
    "title": "Где остаются удалённые фотографии",
    "description": "Копии фотографий в облачных сервисах, корзине и мессенджерах.",
    "youtubeUrl": "https://youtu.be/o18fbtLc0UY"
  },
  {
    "title": "Как сайты узнают посетителей",
    "description": "Идентификация посетителей с помощью cookie, аккаунтов и цифрового отпечатка.",
    "youtubeUrl": "https://youtu.be/E6_PB6vRx9I"
  },
  {
    "title": "Как работает ретаргетинг",
    "description": "Как действия на сайтах используются для повторного показа рекламы.",
    "youtubeUrl": "https://youtu.be/wyMBd-CjXWQ"
  },
  {
    "title": "Как распознать фишинговый сайт",
    "description": "Признаки поддельных сайтов и действия при утечке учётных данных.",
    "youtubeUrl": "https://youtu.be/dnHSfrF5Ips"
  },
  {
    "title": "Какие данные связаны с номером телефона",
    "description": "Связь номера телефона с личной информацией и способы сократить цифровой след.",
    "youtubeUrl": "https://youtu.be/JrMenq9GFD4"
  },
  {
    "title": "Разрешения приложений и личные данные",
    "description": "Какие данные получают приложения и как управлять доступом к ним.",
    "youtubeUrl": "https://youtu.be/GXAmO749Nzk"
  },
  {
    "title": "Как работает Face ID",
    "description": "Распознавание лица, защита данных и ограничения Face ID.",
    "youtubeUrl": "https://youtu.be/akEQFrr2oKk"
  },
  {
    "title": "Как телефон определяет местоположение без GPS",
    "description": "Определение местоположения по Wi-Fi, сотовой сети, Bluetooth и IP-адресу.",
    "youtubeUrl": "https://youtu.be/-ejJzDIYqrQ"
  },
  {
    "title": "Подделка голоса с помощью ИИ",
    "description": "Как распознать звонок с поддельным голосом и защититься от мошенничества.",
    "youtubeUrl": "https://youtu.be/8vF5l9XkBdc"
  },
  {
    "title": "Как интернет и ИИ формируют ответы",
    "description": "Принципы отбора информации поисковыми системами и формирования ответов ИИ.",
    "youtubeUrl": "https://youtu.be/qucXVq6B6Ao"
  }
];
