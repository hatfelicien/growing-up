# Deploy PWA to Google Play Store

## Method: Bubblewrap (Google's Official TWA Tool)

### Step 1: Install Bubblewrap
```bash
npm install -g @bubblewrap/cli
```

### Step 2: Initialize TWA Project
```bash
bubblewrap init --manifest https://your-domain.com/manifest.webmanifest
```

**Required Info:**
- App name: Growing Up
- Package name: com.growingup.app
- Host: your-domain.com (must be HTTPS)
- Start URL: https://your-domain.com/

### Step 3: Build APK/AAB
```bash
bubblewrap build
```

This generates:
- `app-release-signed.apk` (for testing)
- `app-release-bundle.aab` (for Play Store)

### Step 4: Upload to Play Store
1. Go to https://play.google.com/console
2. Create new app
3. Upload `app-release-bundle.aab`
4. Fill store listing (screenshots, description)
5. Submit for review

---

## Prerequisites Before Building:

### 1. Deploy Your PWA to HTTPS Domain
Your app must be hosted on a public HTTPS URL. Options:
- **Vercel**: `npm i -g vercel && vercel --prod`
- **Netlify**: `npm i -g netlify-cli && netlify deploy --prod`
- **Firebase**: `npm i -g firebase-tools && firebase deploy`

### 2. Update API Endpoint
Change server proxy to production URL in `vite.config.js`

### 3. Generate Signing Key
```bash
keytool -genkey -v -keystore growing-up.keystore -alias growing-up -keyalg RSA -keysize 2048 -validity 10000
```

---

## Alternative: PWABuilder (No Code)
1. Go to https://www.pwabuilder.com/
2. Enter your PWA URL
3. Click "Build My PWA"
4. Download Android package
5. Upload to Play Store

---

## Digital Asset Links (Required)
Add to your server at `/.well-known/assetlinks.json`:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.growingup.app",
    "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
  }
}]
```

Get fingerprint: `keytool -list -v -keystore growing-up.keystore`
