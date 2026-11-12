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
    "title": "How VPNs work",
    "description": "How VPNs route your traffic and where their privacy protection ends.",
    "youtubeUrl": "https://youtu.be/PnQC3cD7DJ0"
  },
  {
    "title": "Where deleted photos remain",
    "description": "Why copies can remain in cloud storage, trash folders, and messaging apps.",
    "youtubeUrl": "https://youtu.be/o18fbtLc0UY"
  },
  {
    "title": "How websites recognize visitors",
    "description": "How cookies, accounts, and browser fingerprints identify returning visitors.",
    "youtubeUrl": "https://youtu.be/E6_PB6vRx9I"
  },
  {
    "title": "How retargeting works",
    "description": "How browsing activity influences the ads you see later.",
    "youtubeUrl": "https://youtu.be/wyMBd-CjXWQ"
  },
  {
    "title": "Recognizing phishing websites",
    "description": "Warning signs of fake websites and what to do if your login details are exposed.",
    "youtubeUrl": "https://youtu.be/dnHSfrF5Ips"
  },
  {
    "title": "What your phone number reveals",
    "description": "How phone numbers connect to personal information and ways to reduce your digital footprint.",
    "youtubeUrl": "https://youtu.be/JrMenq9GFD4"
  },
  {
    "title": "App permissions and personal data",
    "description": "What information apps can access and how to manage their permissions.",
    "youtubeUrl": "https://youtu.be/GXAmO749Nzk"
  },
  {
    "title": "How Face ID works",
    "description": "How facial recognition works, protects biometric data, and handles its limitations.",
    "youtubeUrl": "https://youtu.be/akEQFrr2oKk"
  },
  {
    "title": "Location tracking without GPS",
    "description": "How Wi-Fi, mobile networks, Bluetooth, and IP addresses reveal location.",
    "youtubeUrl": "https://youtu.be/-ejJzDIYqrQ"
  },
  {
    "title": "AI voice impersonation",
    "description": "How to recognize a cloned voice and protect yourself from phone scams.",
    "youtubeUrl": "https://youtu.be/8vF5l9XkBdc"
  },
  {
    "title": "How search engines and AI choose answers",
    "description": "How search engines select information and AI systems generate responses.",
    "youtubeUrl": "https://youtu.be/qucXVq6B6Ao"
  }
];
