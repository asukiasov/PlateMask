# PlateMask

Lightweight, zero-dependency Vanilla JS mask library engineered specifically for international license plates. Auto-formats, normalizes casing, strips accents, and handles custom delimiters with precise caret management.

> 🚧 Pre-alpha: design phase. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/ROADMAP.md](docs/ROADMAP.md).

```js
import { PlateMask } from 'plate-mask';
import { FR } from 'plate-mask/presets/fr';

const pm = new PlateMask('#plate', { preset: FR });
pm.value; // "AB-123-CD"
pm.raw;   // "AB123CD"
```

- **< 2 KB** gzipped, zero dependencies
- Per-position letter/digit rules, restricted alphabets, variable-length groups (e.g. German plates)
- Caret-stable editing on desktop *and* mobile keyboards
- Uppercases input, strips diacritics, maps Cyrillic look-alikes, optionally corrects O/0 and I/1 mix-ups

## License
MIT
