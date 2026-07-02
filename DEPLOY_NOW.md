# 🚀 Deploy Siggy Chess ke Vercel

## ✅ Deployment Ready!

Semua file sudah siap di `/root/siggy-chess-app/`

---

## 🎯 **3 Cara Deploy (Pilih salah satu)**

### **Method 1: Vercel CLI** ⚡ (Tercepat)

```bash
# 1. Login ke Vercel
cd /root/siggy-chess-app
vercel login

# 2. Deploy
vercel --prod
```

**Follow prompts:**
- Set up and deploy: **Yes**
- Which scope?: **[Your account]**
- Link to existing project?: **No**
- Project name: **siggy-chess** (atau nama lain)
- Directory: **./** (default)
- Override settings?: **No**

✅ **Done!** App akan live dalam 2-3 menit!

---

### **Method 2: GitHub + Vercel** 🌐 (Recommended)

```bash
# 1. Create GitHub repo
cd /root/siggy-chess-app

# Jika punya gh CLI:
gh repo create siggy-chess --public --source=. --remote=origin --push

# Atau manual:
# - Buat repo baru di github.com/new
# - Nama: siggy-chess
# - Public
# - Jangan init dengan README
```

```bash
# 2. Push code
git remote add origin https://github.com/YOUR_USERNAME/siggy-chess.git
git branch -M main
git push -u origin main
```

```bash
# 3. Import di Vercel
# - Go to: https://vercel.com/new
# - Select "Import Git Repository"
# - Choose: siggy-chess
# - Framework: Next.js (auto-detected)
# - Environment Variables: sudah dikonfigurasi di vercel.json
# - Click: Deploy
```

✅ **Auto-deploy on git push!**

---

### **Method 3: Vercel Dashboard** 🖱️ (Manual)

**Option A: From Local**

1. Zip project:
```bash
cd /root
tar -czf siggy-chess.tar.gz siggy-chess-app/
```

2. Go to https://vercel.com/new
3. Click "Upload .tar.gz"
4. Upload `siggy-chess.tar.gz`
5. Deploy!

**Option B: Import from Git**

1. Push to GitHub (lihat Method 2)
2. Go to https://vercel.com/new
3. Import repo
4. Deploy!

---

## 🔐 **Environment Variables**

Sudah dikonfigurasi otomatis di `vercel.json`:

```json
{
  "NEXT_PUBLIC_RITUAL_RPC": "https://rpc.ritualfoundation.org",
  "NEXT_PUBLIC_CONTRACT_ADDRESS": "0x3a3A628a416A564ba1D968526C2b6889c1B92d4e",
  "NEXT_PUBLIC_RITUAL_AGENT": "0x759249105579A9C2286998E9C207eA059BB3cA1d"
}
```

Jika perlu edit manual di Vercel Dashboard:
- Settings → Environment Variables → Add

---

## 🤖 **Jalankan Ritual Agent (Wajib!)**

Setelah frontend deployed, agent harus running untuk AI moves:

```bash
# Install dependencies
pip install web3 python-chess

# Run agent
cd /root/siggy-chess-app
python ritual-agent.py
```

**Atau run as background service:**

```bash
# Using screen
screen -dmS ritual-agent python ritual-agent.py

# Check logs
screen -r ritual-agent

# Detach: Ctrl+A, D
```

**Atau PM2:**

```bash
npm install -g pm2
pm2 start ritual-agent.py --name siggy-chess-agent
pm2 logs siggy-chess-agent
pm2 save
```

---

## 📝 **Quick Deploy Commands**

### **One-liner Vercel CLI:**
```bash
cd /root/siggy-chess-app && vercel login && vercel --prod
```

### **One-liner GitHub + Manual Vercel:**
```bash
cd /root/siggy-chess-app && \
gh repo create siggy-chess --public --source=. --remote=origin --push && \
echo "✅ Pushed to GitHub! Now import at https://vercel.com/new"
```

---

## 🎯 **Expected Output**

Setelah deploy sukses, kamu akan dapat:

```
✅ Deployment Complete!
🌐 Preview: https://siggy-chess-xyz.vercel.app
🚀 Production: https://siggy-chess.vercel.app
```

---

## 🧪 **Test Deployment**

1. **Visit URL:** https://your-app.vercel.app
2. **Connect Wallet:**
   - Add Ritual Chain to MetaMask
   - RPC: https://rpc.ritualfoundation.org
   - Chain ID: 1979
3. **Create Game:**
   - Select difficulty
   - Click "New Game"
   - Approve transaction
4. **Make Move:**
   - Drag piece
   - Wait for AI response (~3-5s)
5. **Play!** ♟️

---

## 🐛 **Troubleshooting**

### **Build fails:**
```bash
cd /root/siggy-chess-app
rm -rf node_modules .next
npm install
npm run build
```

### **Deploy stuck:**
- Check Vercel logs: https://vercel.com/[your-project]/deployments
- Timeout di build? Upgrade Vercel plan atau optimize build

### **Environment variables not working:**
- Check Vercel Dashboard → Settings → Environment Variables
- Must start with `NEXT_PUBLIC_` for client-side

### **Agent not responding:**
- Pastikan `ritual-agent.py` running
- Check logs: `python ritual-agent.py`
- Verify agent address authorized on contract

---

## 📊 **Deployment Checklist**

- [ ] Code committed to git
- [ ] Environment variables configured
- [ ] Vercel CLI installed (`npm i -g vercel`)
- [ ] Logged in to Vercel (`vercel login`)
- [ ] Deployed (`vercel --prod`)
- [ ] Ritual agent running (`python ritual-agent.py`)
- [ ] Tested on production URL
- [ ] Wallet configured with Ritual Chain
- [ ] Game created successfully
- [ ] AI responding to moves

---

## 🎉 **You're Ready!**

Pilih method di atas dan deploy sekarang! 🚀

**Recommended: Method 1 (Vercel CLI)** - paling cepat!

```bash
cd /root/siggy-chess-app
vercel login
vercel --prod
```

Butuh bantuan? Read full docs: `DEPLOYMENT.md`
