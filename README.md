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
  src/
    App.tsx
    main.tsx
    index.css
    components/
      Animated.tsx
      InteractiveModelViewer.tsx
  public/
  index.html
  tailwind.config.js
  vite.config.ts
  package.json
```

---

## 8) 3D robot model integration (when model is ready)

Current viewer is a safe placeholder (no broken loader).

When final model is available:

1. Put model file here:
   - `public/models/skyshine-robot.glb`
2. Open:
   - `src/components/InteractiveModelViewer.tsx`
3. Follow the in-file comments under **FUTURE MODEL INTEGRATION** to switch from placeholder to real model loading.

Supported planned formats:

- `.glb`
- `.gltf`

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
