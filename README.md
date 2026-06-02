# 🏠 Ghar Kharch — Household Budget App

Ghar ke saare kharch ka hisab — budget, categories aur daily entries.
Ek installable **PWA app** jo iPhone aur Desktop dono par chalti hai,
offline bhi, aur (cloud sync ke saath) dono devices par same data.

## Files
| File | Kaam |
|------|------|
| `index.html` | Poori app (ek hi file) |
| `manifest.json`, `sw.js` | PWA (installable + offline) |
| `icon-*.png`, `apple-touch-icon.png` | App icons |
| `SETUP_SYNC.txt` | Cloud sync (Firebase) setup guide |
| `HOST_GITHUB.txt` | App ko online karne ki guide (GitHub Pages) |
| `build-icons.js` | Icons banane wala script (dobara zarurat nahi) |

## Jaldi chalana (sirf is computer par)
`index.html` par double-click → browser mein khul jayegi. Data isi
device par save rehta hai (dobara kholne par mojood).

## Asli app ki tarah (online + install) — FREE
1. **Online karein** → `HOST_GITHUB.txt` follow karein (GitHub Pages).
   - iPhone: Safari mein link → Share → **Add to Home Screen**
   - Desktop: Chrome/Edge → address bar ka **Install** icon
2. **Dono devices par same data** → `SETUP_SYNC.txt` follow karein
   (free Firebase, ek baar ~5 min). Dono par wahi "Ghar sync code" daalein.

## Features
- 🏠 Pure ghar ka total budget + har category ka alag budget
- ➕ Bottom-sheet se aasan entry, live "kitna baqi raha"
- 📊 Dashboard: bach gaya, sab se zyada kis par, alerts, roz ka kharch
- 🧾 Entries din ke hisaab se, 📈 Reports
- ↕️ Categories upar/neeche (apni tarteeb), 🎨 har category ka color
- ☁️ Cloud sync (iPhone ⇄ Desktop), offline support
- 💾 Export/Import backup

## Categories (default)
💡 Bijli · 🔥 Gas · 🌐 Internet · 🍎 Fruits · 🥦 Sabzi · 🍖 Ghosht ·
📦 Parcels · ⛽ Petrol · 🍔 Fast Food · 🍼 Pampers/Doodh · 🛒 Rashan · 🧾 Other
