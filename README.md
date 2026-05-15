# SkyShine Website

A modern, customer-facing landing website for **SkyShine** (autonomous high-rise facade-cleaning robotics), built with React + Vite + Tailwind CSS + Three.js.

---

## 1) What you need before starting

Install these two things first:

1. **Node.js (LTS version)**  
   Download: [https://nodejs.org](https://nodejs.org)
2. **Git** (optional, but recommended)  
   Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)

After installing Node.js, confirm it works:

```bash
node -v
npm -v
```

If both commands show version numbers, you are ready.

---

## 2) Open the project folder

If you already have the folder on your PC, open terminal in that folder.

### Windows (PowerShell)
```powershell
cd "C:\Polimi\High_Tech_Entreprenurship"
```

### Mac/Linux (Terminal)
```bash
cd "/path/to/High_Tech_Entreprenurship"
```

---

## 3) Install project dependencies

Run this once:

```bash
npm install
```

Wait until it finishes.

---

## 4) Run the website locally

Start development server:

```bash
npm run dev
```

You will see a local URL, usually:

- `http://localhost:5173/`

Open it in your browser.

To stop the server, press:

- `Ctrl + C` (Windows/Linux)
- `Control + C` (Mac)

---

## 5) Build test (recommended before sharing)

This checks if the site compiles correctly:

```bash
npm run build
```

If this completes without errors, the project is healthy.

---

## 6) Optional: Preview production build

After `npm run build`, run:

```bash
npm run preview
```

Open the shown local URL to preview the production version.

---

## 7) Main project structure (simple view)

```text
High_Tech_Entreprenurship/
  Images and 3d Model/     ← optional: your original uploads (not required to run the site)
  public/
    media/                 ← PNG images served to the browser
    models/                ← skyshine-robot.glb (compressed) + skyshine-robot.usdz
  src/
    App.tsx
    main.tsx
    index.css
    components/
      Animated.tsx
      InteractiveModelViewer.tsx
  index.html
  tailwind.config.js
  vite.config.ts
  package.json
```

---

## 8) 3D model and images (already integrated)

The site loads assets from `public/` (this is the standard Vite way).

### 3D model (Web)

- **File used:** `public/models/skyshine-robot.glb` (replace this file when you update the robot; source in repo: `Images and 3d Model/3DModel1-compressed.glb`)
- **Loader code:** `src/components/InteractiveModelViewer.tsx` (`useGLTF` from `@react-three/drei`)
- **To replace the robot later:** overwrite `public/models/skyshine-robot.glb` with your new file (keep the same filename), or change `SKYSHINE_ROBOT_GLB_URL` in that file.

### AR on iPhone / iPad (optional)

- **File used:** `public/models/skyshine-robot.usdz` (copied from `Images and 3d Model/3DModel3.usdz`)
- The viewer shows a **View in AR (iOS)** link (Apple Quick Look).

### Marketing / UI images

These are copied into `public/media/` and referenced in `src/App.tsx`:

- `image-no-bg.png`, `image-hd.png`, `map.png`, `image-ny.png`, `image-unicredit.png`, `image-no-bg-copia.png`

### If you add new files to `Images and 3d Model/` later

Re-copy them into `public/media/` or `public/models/` (same filenames as above), or update the paths in `src/App.tsx` / `InteractiveModelViewer.tsx`.

**Windows (PowerShell) example — refresh assets from your upload folder:**

```powershell
cd "C:\Polimi\High_Tech_Entreprenurship"
New-Item -ItemType Directory -Force -Path "public\models","public\media" | Out-Null
Copy-Item "Images and 3d Model\3DModel1-compressed.glb" "public\models\skyshine-robot.glb" -Force
Copy-Item "Images and 3d Model\3DModel3.usdz" "public\models\skyshine-robot.usdz" -Force
Copy-Item "Images and 3d Model\image_hd.png" "public\media\image-hd.png" -Force
Copy-Item "Images and 3d Model\image_no_bg.png" "public\media\image-no-bg.png" -Force
Copy-Item "Images and 3d Model\map.png" "public\media\map.png" -Force
Copy-Item "Images and 3d Model\Image_ny.png" "public\media\image-ny.png" -Force
Copy-Item "Images and 3d Model\Image_unicredit.png" "public\media\image-unicredit.png" -Force
```

Note: the `.glb` can be large; the first load in the browser may take a few seconds on slower connections.

Supported formats in the viewer:

- `.glb` / `.gltf` for the Three.js viewer
- `.usdz` is only for iOS AR (not rendered inside the Three.js canvas)

---

## 9) Troubleshooting (very common)

### Problem: `npm` command not found
Node.js is not installed (or terminal needs restart).  
Install Node.js LTS, close terminal, open again.

### Problem: Port already in use
If `5173` is busy, Vite will usually auto-pick another port and show it in terminal.

### Problem: dependency errors
Try:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## 10) Quick start (copy-paste all at once)

### Windows PowerShell
```powershell
cd "C:\Polimi\High_Tech_Entreprenurship"
npm install
npm run dev
```

### Mac/Linux
```bash
cd "/path/to/High_Tech_Entreprenurship"
npm install
npm run dev
```

---

If you are non-technical: do not worry about the code files.  
For testing, you only need:

1. `npm install` (once)
2. `npm run dev` (every time you want to run it)
