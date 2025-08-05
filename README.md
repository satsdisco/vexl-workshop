# Vexl Workshop - P2P Bitcoin Without KYC

An interactive workshop platform for running 30-minute Vexl presentations that convert audiences into active P2P Bitcoin traders.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/satsdisco/vexl-workshop)

## 🎯 Workshop Features

### Interactive Demos
- **Web of Trust Builder** - Click to add contacts and watch your network grow exponentially
- **Privacy Architecture** - See how phone numbers are hashed before leaving your device
- **Contact Import Strategy** - Learn why importing all contacts maximizes trading opportunities

### Presenter Tools
- **Presenter Mode** (Cmd+P) - Context-aware notes with objection handlers
- **Timer System** (Shift+Space) - Track section and total presentation time
- **Smooth Navigation** - Click dots or scroll through sections

### Content Sections
1. **Hook** (2 min) - KYC is killing Bitcoin
2. **Pitch** (3 min) - Vexl introduction
3. **Privacy** (5 min) - Interactive privacy demos
4. **Demo** (10 min) - App walkthrough with real screenshots
5. **Vision** (8 min) - Circular economy future
6. **Get Started** (2 min) - QR codes and next steps

## 🛠️ Technical Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **PWA** - Offline capable

## 📱 Key Messages

1. **Privacy First** - Your phone number never leaves your device
2. **Web of Trust** - Trade with friends of friends, not strangers
3. **Nonprofit** - Funded by HRF & OpenSats, no surveillance incentive
4. **Circular Economy** - Building local Bitcoin economies

## 🎨 Customization

### Branding
- Colors defined in `tailwind.config.js`
- Logos in `/public/logos/`
- Screenshots in `/public/screenshots/`

### Content
- Edit sections in `/src/components/sections/`
- Update presenter notes in `/src/components/PresenterMode.tsx`
- Modify interactive demos in `/src/components/`

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy with zero config

### Static Export
```bash
npm run build
npm run export
```
Upload `/out` folder to any static host

## 📄 License

Open source under MIT License

## 🤝 Contributing

Pull requests welcome! Help us improve the workshop and spread P2P Bitcoin adoption.

---

Built with ❤️ by the Vexl community. Let's make Bitcoin P2P again!