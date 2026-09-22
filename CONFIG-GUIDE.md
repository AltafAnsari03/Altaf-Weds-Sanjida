# Website settings — aasaan guide (Hindi + English)

## Dulha / Dulhan naam (ek jagah — poori site + WhatsApp)

File `src/config/wedding.ts` — **sabse upar**:

```ts
export const COUPLE_NAMES = {
  groom: "Asef Shaikh",
  bride: "Humera Khatib",
} as const;
```

Sirf yeh 2 naam badlo → hero, doors, RSVP WhatsApp, page title sab update.

---

## Photos kaise badlein

### Step 1 — Files rakho (aasaan)
```
public/photos/1.jpg
public/photos/2.jpg
```

### Step 2 — `wedding.ts` mein path likho

| Section | Kahan |
|--------|--------|
| Gallery (grid) | `gallery: [ { src: "/photos/1.jpg", caption: "..." }, ... ]` |
| Story timeline | `story: [ { image: "/photos/story1.jpg" }, ... ]` |
| Mehndi/Nikah/Walima card | `events: [ { image: "/photos/nikah.jpg" }, ... ]` |
| WhatsApp link preview | `ogImage: "/photos/couple.jpg"` ya URL |

### Step 3 — Wizard (optional)
```bash
npm run configure
```
Question 14: kitni gallery photos update karni hain → path `/photos/1.jpg` paste karo.

### Online photo URL
Imgur / Google Drive se **direct image link** → `src: "https://..."`  
Phone se: photo WhatsApp Web par bhejo, save karke `public/photos/` use karna zyada easy hai.

---

## Sabse tez tareeka: Wizard

Project folder mein terminal kholo:

```bash
node configure.js
```

Sawalon ke jawab do — **Enter** = purani value same rahegi.

Wizard badalta hai:
- Naam, date, WhatsApp
- **Music** (`musicUrl`)
- **Bada map** (`mapsEmbedUrl`)
- Mehndi / Nikah / Walima **Maps links**
- Nikah **venue + address**
- **Gallery** photos (kitni chaho utni)
- Social **preview image** (`ogImage`)

---

## Apni files computer par (recommended)

```
wedd website/
  public/
    music/
      wedding-song.mp3    →  musicUrl: "/music/wedding-song.mp3"
    photos/
      1.jpg
      2.jpg               →  gallery: src: "/photos/1.jpg"
```

`public` folder ka naam URL mein **nahi** aata.

---

## Manual edit (sab kuch ek file)

File: **`src/config/wedding.ts`**

Upar file mein Hindi/English comments hain — kya kahan change hota hai.

| Badalna hai | Config mein |
|------------|-------------|
| Music | `musicUrl` |
| Bada map (Venue page) | `mapsEmbedUrl` |
| Event Directions button | `events[].mapsLink` |
| Event naam / address | `events[].venue`, `address` |
| Gallery grid | `gallery[]` → `src`, `caption` |
| Story photos | `story[].image` |
| Event card photos | `events[].image` |
| WhatsApp preview image | `ogImage` |

---

## Google Maps link kaise lo

**Directions button (chota link):**  
Maps → venue → **Share** → **Copy link** → `mapsLink`

**Bada embedded map (`mapsEmbedUrl`):**  
❌ `maps.app.goo.gl/...` iframe mein **kaam nahi karta** (sirf Navigate button ke liye OK)  
✅ Option A: Google Maps → **Share** → **Embed a map** → `src="..."` copy  
✅ Option B: Coordinates — `https://maps.google.com/maps?q=LAT,LNG&hl=en&z=16&output=embed`

**Chota link (`mapsLink`):** Share → Copy link → `https://maps.app.goo.gl/...` ✅

---

## Browser mein dekho

```bash
npm run dev
```

http://localhost:3000 — save ke baad refresh (Ctrl+F5).
