
//
export const COUPLE_NAMES = {
  groom: "Altaf Ansari",
  bride: "Sanjida Shaikh",
} as const;


export const MAIN_COUPLE_PHOTO = "/Altaf-Weds-Sanjida/photos/couple-family.png";

export function getCoupleLabel() {
  return `${COUPLE_NAMES.groom} & ${COUPLE_NAMES.bride}`;
}


export const WEDDING_CONFIG = {
  // ─── Site title (auto from COUPLE_NAMES upar) ───
  title: `The Wedding of ${COUPLE_NAMES.groom} & ${COUPLE_NAMES.bride}`,
  description: `You are cordially invited to celebrate the union of ${COUPLE_NAMES.groom} & ${COUPLE_NAMES.bride}. Discover event details, schedule, RSVP, and venue directions.`,
  ogImage: MAIN_COUPLE_PHOTO, // WhatsApp / link share preview
  siteUrl: "https://altaf-sanjida-wedding.vercel.app",

  groom: {
    name: COUPLE_NAMES.groom,
    fullname: "Altaf Ansari",
    family: {
      father: "Mr. Ayaz Ahmed Ansari",
      mother: "Mrs. KausarBanu Ansari",
      intro: "Grandson of Asfaque Ahmed & Late nazmabanu Ansari",
    },
  },
  bride: {
    name: COUPLE_NAMES.bride,
    fullname: "Sanjida Shaikh",
    family: {
      father: "Mr. Mo. Salim Shaikh",
      mother: "Mrs. Sufiya Shaikh",
      intro: "Granddaughter of Late Mo. Hussain Shaikh & Late Sabera Shaikh",
    },
  },

  quranicQuote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translation: "And among His signs is that He created for you spouses from among yourselves that you may find tranquility in them; and He placed between you affection and mercy.",
    surah: "Surah Ar-Rum [30:21]",
  },

  // ─── Date (countdown + scratch reveal) ───
  eventDate: "2026-12-11T16:00:00+05:30", // ISO: 2026-12-11T16:00:00+05:30
  eventDateDisplay: "Friday 11 December 2026",

  // ─── 🎵 BACKGROUND MUSIC (Shukran Allah — Dropbox; dl=1 for playback) ───
  musicUrl: "/Altaf-Weds-Sanjida/photos/Aaj-Sajeya.mp3",

  // ─── 🗺️ BIG MAP (iframe) — goo.gl / Share link YAHAN NAHI; embed URL ya query niche ───
  // mapsLink (events) = https://maps.app.goo.gl/... OK for "Navigate" button
  mapsEmbedUrl:
    "https://www.google.com/maps/search/?api=1&query=22.982230,72.656313",



  // ─── 📷 STORY TIMELINE PHOTOS ───
  story: [
    {
      year: "july 2025",
      title: "First Meeting",
      description: "Our families introduced us, and from our very first conversation, we knew there was a special bond. A connection built on mutual respect and shared values.",
      image: "/Altaf-Weds-Sanjida/photos/1.png",
    },
    {
      year: "august 2025",
      title: "The Proposal",
      description: "With the blessings of our parents, we formally agreed to unite our lives. It was a beautiful evening surrounded by close family, marking our path forward.",
      image: "/Altaf-Weds-Sanjida/photos/2.png",
    },
    {
      year: "september 2025",
      title: "The Engagement",
      description: "We celebrated our traditional ring exchange ceremony. A promise to support, care, and build a beautiful home together under Allah's grace.",
      image: "/Altaf-Weds-Sanjida/photos/3.jpeg",
    },
  ],

  // ─── Events + 🗺️ mapsLink per ceremony ───
  events: [
    {
      id: "haldi",
      title: "Haldi Ceremony",
      subtitle: "A Celebration of Turmeric, Blessings & Joy",
      date: "Thursday, December 10, 2026",
      time: "06:00 PM onwards",
      venue: "Mukhi Residency",
      address: "B-204 Mukhi Residency near Ramol Bus Stad ramol, Ahmedabad, Gujarat 382449",
      mapsLink: "https://maps.app.goo.gl/GdLwWATfCWf8UrpGA",
      image: "/Altaf-Weds-Sanjida/photos/haldi.png",
      description:
        "Join us for a joyful Haldi ceremony filled with love, laughter, blessings, and the vibrant traditions that begin our wedding celebrations.",
    },
    {
      id: "nikah",
      title: "Nikah Ceremony",
      subtitle: "The Sacred Covenant",
      date: "Friday, December 11, 2026",
      time: "09:00 AM onwards",
      venue: "Jhulta minar, Bibiji MasJid",
      address: "Jhulta Minar, Bibiji Masjid, Gomtipur, Ahmedabad.",
      mapsLink: "https://maps.app.goo.gl/WA5CuZPKHErBw4Xn6",
      image: "/Altaf-Weds-Sanjida/photos/nikah.png",
      description: "In accordance with Sunnah, we will execute our Nikah contract. We highly request your presence and prayers for our new beginning.",
    },
    {
      id: "walima",
      title: "Walima Banquet",
      subtitle: "The Feast of Blessing",
      date: "Saturday, December 12, 2026",
      time: "07:00 PM onwards",
      venue: "Mukhi Residency Ground",
      address: "B-204 Mukhi Residency near Ramol Bus Stad ramol, Ahmedabad, Gujarat 382449",
      mapsLink: "https://maps.app.goo.gl/GdLwWATfCWf8UrpGA",
      image: "/Altaf-Weds-Sanjida/photos/walima.png",
      description: "The groom's family invites you to join them for a luxury banquet dinner to celebrate the union. May Allah bless our gathering.",
    },
  ],

 

  groomFamily: [
    { relation: "Parents", names: ["Mr. Ayaz Ahmed Ansari", "Mrs. KausarBanu Ansari"] },
    { relation: "Grandparents", names: ["Asfaque Ahmed Ansari", "Late Najmunisha Ansari"] },
    { relation: "Siblings", names: ["mrs. Anjuman Zakir pathan (Sister)"] },
  ],
  brideFamily: [
    { relation: "Parents", names: ["Mr. Mo. Salim Shaikh", "Mrs. Sufiya Shaikh"] },
    { relation: "Grandparents", names: ["Late Mo. Hussain Shaikh", "Late Sabera Shaikh"] },
    { relation: "Siblings", names: ["Mrs. Saeesta Pathan (Sister)", "Soban Shaikh (Brother)"] },
  ],
};
