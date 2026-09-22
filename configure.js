const fs = require("fs");
const path = require("path");
const readline = require("readline");

const CONFIG_PATH = path.join(__dirname, "src", "config", "wedding.ts");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));

function extractString(key, content, multiline = false) {
  if (multiline) {
    const re = new RegExp(`${key}:\\s*\\n\\s*"([^"]*(?:\\\\.[^"]*)*)"`, "s");
    const m = content.match(re);
    return m ? m[1].replace(/\\n/g, "\n") : null;
  }
  const re = new RegExp(`${key}:\\s*"([^"]*)"`);
  const m = content.match(re);
  return m ? m[1] : null;
}

function replaceString(key, value, content, multiline = false) {
  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  if (multiline) {
    const re = new RegExp(`(${key}:\\s*\\n\\s*")([^"]*(?:\\\\.[^"]*)*)(")`, "s");
    return content.replace(re, `$1${escaped}$3`);
  }
  const re = new RegExp(`(${key}:\\s*")([^"]*)(")`);
  return content.replace(re, `$1${escaped}$3`);
}

function extractGallery(content) {
  const block = content.match(/gallery:\s*\[([\s\S]*?)\],\s*\n\s*groomFamily/);
  if (!block) return [];
  const items = [...block[1].matchAll(/src:\s*"([^"]*)"/g)].map((m) => m[1]);
  const captions = [...block[1].matchAll(/caption:\s*"([^"]*)"/g)].map((m) => m[1]);
  return items.map((src, i) => ({ src, caption: captions[i] || "" }));
}

function replaceGalleryItem(content, index, src, caption) {
  const galleryBlock = content.match(/(gallery:\s*\[)([\s\S]*?)(\],\s*\n\s*groomFamily)/);
  if (!galleryBlock) return content;

  const items = [...galleryBlock[2].matchAll(/\{[\s\S]*?\}/g)].map((m) => m[0]);
  if (index >= items.length) return content;

  items[index] = items[index]
    .replace(/src:\s*"[^"]*"/, `src: "${src.replace(/"/g, '\\"')}"`)
    .replace(/caption:\s*"[^"]*"/, `caption: "${caption.replace(/"/g, '\\"')}"`);

  const newGallery = items.join(",\n    ");
  return content.replace(galleryBlock[0], `${galleryBlock[1]}${newGallery}${galleryBlock[3]}`);
}

function extractEventField(content, eventId, field) {
  const re = new RegExp(
    `id:\\s*"${eventId}"[\\s\\S]*?${field}:\\s*"([^"]*)"`,
    "m"
  );
  const m = content.match(re);
  return m ? m[1] : null;
}

function replaceEventField(content, eventId, field, value) {
  const re = new RegExp(
    `(id:\\s*"${eventId}"[\\s\\S]*?${field}:\\s*")([^"]*)(")`,
    "m"
  );
  return content.replace(re, `$1${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}$3`);
}

async function main() {
  console.log("\n================================================");
  console.log("     WEDDING WEBSITE — SETUP WIZARD");
  console.log("     (Music, Photos, Maps, Names, Date)");
  console.log("================================================\n");
  console.log("Har sawal par Enter = purani value rahegi");
  console.log("Local file example: /music/song.mp3  ya  /photos/1.jpg\n");

  try {
    let content = fs.readFileSync(CONFIG_PATH, "utf8");

    const coupleMatch = content.match(
      /export const COUPLE_NAMES = \{[\s\S]*?groom:\s*"([^"]*)"[\s\S]*?bride:\s*"([^"]*)"/
    );

    const current = {
      groom: coupleMatch ? coupleMatch[1] : "Groom",
      bride: coupleMatch ? coupleMatch[2] : "Bride",
      eventDateDisplay: extractString("eventDateDisplay", content),
      eventDate: extractString("eventDate", content),
      rsvp: extractString("rsvpWhatsAppNumber", content),
      musicUrl: extractString("musicUrl", content),
      mapsEmbedUrl: extractString("mapsEmbedUrl", content),
      ogImage: extractString("ogImage", content),
      gallery: extractGallery(content),
    };

    // ─── BASIC INFO ───
    console.log("--- NAAM AUR DATE ---");
    console.log("   Naam badalne par site + WhatsApp RSVP dono update honge.\n");
    const groomName =
      (await question(`1. Dulha ka naam [${current.groom}]: `)).trim() || current.groom;
    const brideName =
      (await question(`2. Dulhan ka naam [${current.bride}]: `)).trim() || current.bride;
    const dateDisplay =
      (await question(`3. Date display [${current.eventDateDisplay}]: `)).trim() ||
      current.eventDateDisplay;
    console.log("\n   Countdown ISO format: 2026-10-15T16:00:00+05:30");
    const eventDate =
      (await question(`4. Countdown date/time [${current.eventDate}]: `)).trim() ||
      current.eventDate;
    const rsvp =
      (await question(`5. WhatsApp RSVP (+91...) [${current.rsvp}]: `)).trim() || current.rsvp;

    // ─── MUSIC ───
    console.log("\n--- MUSIC ---");
    console.log("   Apni MP3: public/music/song.mp3 → likho: /music/song.mp3\n");
    const musicUrl =
      (await question(`6. Music URL [${current.musicUrl}]: `)).trim() || current.musicUrl;

    // ─── MAPS ───
    console.log("\n--- MAPS ---");
    console.log("   Bada map: Google Maps → Share → Embed a map → <iframe src=\"...\"> copy");
    console.log("   Chota link: Share → Copy link\n");
    const mapsEmbed =
      (await question(`7. Embed map URL (bada map) [skip=keep]: `)).trim() ||
      current.mapsEmbedUrl;

    const nikahVenue =
      (await question(
        `8. Nikah venue naam [${extractEventField(content, "nikah", "venue")}]: `
      )).trim() || extractEventField(content, "nikah", "venue");
    const nikahAddress =
      (await question(
        `9. Nikah address [${extractEventField(content, "nikah", "address")}]: `
      )).trim() || extractEventField(content, "nikah", "address");
    const nikahMap =
      (await question(
        `10. Nikah Maps link [${extractEventField(content, "nikah", "mapsLink")}]: `
      )).trim() || extractEventField(content, "nikah", "mapsLink");

    const mehndiMap =
      (await question(
        `11. Mehndi Maps link [${extractEventField(content, "mehndi", "mapsLink")}]: `
      )).trim() || extractEventField(content, "mehndi", "mapsLink");
    const walimaMap =
      (await question(
        `12. Walima Maps link [${extractEventField(content, "walima", "mapsLink")}]: `
      )).trim() || extractEventField(content, "walima", "mapsLink");

    // ─── PHOTOS ───
    console.log("\n--- PHOTOS ---");
    console.log("   Social preview (WhatsApp link image):");
    const ogImage =
      (await question(`13. Preview image URL [${current.ogImage?.slice(0, 50)}...]: `)).trim() ||
      current.ogImage;

    const galleryCount = current.gallery.length;
    console.log(`\n   Gallery: ${galleryCount} photos. Kitni update karni hain? (0-${galleryCount}, 0=skip)`);
    const countInput = await question(`14. Gallery photos to update (number): `);
    const updateCount = Math.min(
      galleryCount,
      Math.max(0, parseInt(countInput.trim(), 10) || 0)
    );

    const galleryUpdates = [];
    for (let i = 0; i < updateCount; i++) {
      const g = current.gallery[i];
      console.log(`\n   --- Gallery photo ${i + 1} ---`);
      const src =
        (await question(`       Image path/URL [${g.src.slice(0, 55)}...]: `)).trim() || g.src;
      const caption =
        (await question(`       Caption [${g.caption}]: `)).trim() || g.caption;
      galleryUpdates.push({ index: i, src, caption });
    }

    // ─── APPLY ───
    let updated = content;

    updated = updated.replace(
      /export const COUPLE_NAMES = \{\s*groom:\s*"[^"]*",\s*bride:\s*"[^"]*",\s*\} as const;/,
      `export const COUPLE_NAMES = {\n  groom: "${groomName}",\n  bride: "${brideName}",\n} as const;`
    );
    updated = replaceString("eventDateDisplay", dateDisplay, updated);
    updated = replaceString("eventDate", eventDate, updated);
    updated = replaceString("rsvpWhatsAppNumber", rsvp, updated);
    updated = replaceString("musicUrl", musicUrl, updated);
    updated = replaceString("mapsEmbedUrl", mapsEmbed, updated);
    updated = replaceString("ogImage", ogImage, updated);

    updated = replaceEventField(updated, "nikah", "venue", nikahVenue);
    updated = replaceEventField(updated, "nikah", "address", nikahAddress);
    updated = replaceEventField(updated, "nikah", "mapsLink", nikahMap);
    updated = replaceEventField(updated, "mehndi", "mapsLink", mehndiMap);
    updated = replaceEventField(updated, "walima", "mapsLink", walimaMap);

    for (const g of galleryUpdates) {
      updated = replaceGalleryItem(updated, g.index, g.src, g.caption);
    }

    fs.writeFileSync(CONFIG_PATH, updated, "utf8");

    console.log("\n================================================");
    console.log("     SAVED!  File: src/config/wedding.ts");
    console.log("================================================");
    console.log(`  Dulha: ${groomName}`);
    console.log(`  Dulhan: ${brideName}`);
    console.log(`  WhatsApp RSVP ab likhega: wedding of ${groomName} & ${brideName}`);
    console.log(`  Music: ${musicUrl}`);
    console.log(`  Gallery updated: ${galleryUpdates.length} photo(s)`);
    console.log("\n  Browser refresh karo (npm run dev chal raha ho to).");
    console.log("  Local files: public/music/  aur  public/photos/\n");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    rl.close();
  }
}

main();
