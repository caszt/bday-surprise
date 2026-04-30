# 🎉 Birthday Experience - Setup Instructions

This is a multi-stage interactive birthday website with Matrix effects, warm transitions, 3D card animations, and customizable elements.

## 📁 Files Included

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - Interactive functionality
- `README.md` - This file

## 🚀 Quick Start

1. **Upload all 3 files** (index.html, styles.css, script.js) to your hosting service:
   - [Netlify Drop](https://app.netlify.com/drop) - Easiest (drag & drop)
   - [GitHub Pages](https://pages.github.com) - Free & permanent
   - [Vercel](https://vercel.com) - Also free

2. **Get your URL** and create a QR code at:
   - [qr-code-generator.com](https://www.qr-code-generator.com)
   - [goqr.me](https://goqr.me)

3. **Print or share** the QR code!

## 🎨 Customization Guide

### 🐾 Adding Your Own Pet Images

In `index.html`, find these sections (around lines 60-90):

**For the CAT:**
```html
<!-- Replace this emoji -->
<span class="pet-emoji" id="cat-emoji">🐱</span>

<!-- With your image -->
<img class="pet-img" src="cat.png" alt="cat" id="cat-img" />
<!-- OR use a URL: src="https://imgur.com/yourcat.jpg" -->
```

**For the DOG:**
```html
<!-- Replace this emoji -->
<span class="pet-emoji" id="dog-emoji">🐶</span>

<!-- With your image -->
<img class="pet-img" src="dog.png" alt="dog" id="dog-img" />
<!-- OR use a URL: src="https://imgur.com/yourdog.jpg" -->
```

**Image Tips:**
- Use square images (1:1 ratio) for best results
- Recommended size: 500x500px or larger
- Formats: PNG, JPG, or WEBP
- Remove or hide the emoji by deleting the `<span class="pet-emoji">` line

### 💬 Moving Chat Bubbles

In `styles.css`, find the `.chat-bubble` section (around line 485).

Each bubble uses two variables:
- `--bx` = horizontal position (negative = left, positive = right)
- `--by` = vertical position (negative = up, positive = down)

**Option 1: Edit in CSS file**
```css
.chat-bubble {
  --bx: -50%;   /* Change this */
  --by: 0px;    /* Change this */
}

.chat-bubble.right {
  --bx: 50%;    /* Change this */
  --by: 0px;    /* Change this */
}
```

**Option 2: Add inline styles in HTML**
```html
<div class="chat-bubble" id="bubble-cat" style="--bx: -60%; --by: -10px;">
  Meow~ Happy Birthday! 🐱
</div>

<div class="chat-bubble right" id="bubble-dog" style="--bx: 60%; --by: 5px;">
  Woof! We love you! 🐶
</div>
```

**Examples:**
- Move bubble 20px left and 10px up: `--bx: -70%; --by: -10px;`
- Move bubble 30px right and 5px down: `--bx: 80%; --by: 5px;`

### 📝 Changing Text Content

**Birthday popup text** (in `index.html`):
```html
<span class="bday-line l1"><span>Happy</span></span>
<span class="bday-line l2"><span>Birthday</span></span>
<span class="bday-line l3"><span>To My</span></span>
<span class="bday-line l4"><span>Baby!</span></span>
```

**Chat bubble messages** (in `index.html`):
```html
<div class="chat-bubble" id="bubble-cat">
  Meow~ Happy Birthday! 🐱  <!-- Change this -->
</div>

<div class="chat-bubble right" id="bubble-dog">
  Woof! We love you! 🐶  <!-- Change this -->
</div>
```

**Pet names** (in `index.html`):
```html
<span class="pet-name" id="cat-name">Kitty</span>  <!-- Change this -->
<span class="pet-name" id="dog-name">Puppy</span>  <!-- Change this -->
```

**Card text** (in `index.html`):
```html
<div class="front-text">A little something<br>just for you ♡</div>
<div class="card-back-top">With all our love…</div>
<div class="card-back-bottom">You make every day brighter ✨</div>
```

### 🎨 Changing Colors

In `styles.css`, at the top you'll find the color palette:

```css
:root {
  --warm1: #fff8f0;  /* Lightest background */
  --warm2: #fde8d0;  /* Light surfaces */
  --warm3: #f9c89a;  /* Medium accents */
  --warm4: #e8956d;  /* Main accent color */
  --warm5: #c0623a;  /* Dark accents */
  --cream: #fdf6ee;  /* Card inside */
  --text-warm: #5c3317;  /* Dark text */
  --text-soft: #9b6b4a;  /* Muted text */
}
```

Change these hex values to customize the entire color scheme!

## 📱 Testing

1. Open `index.html` in your browser
2. Click through each stage:
   - Stage 1: Matrix → Birthday popup → Click anywhere
   - Stage 2: Tap paw → Tap card to open → "Ready for your next surprise?"
   - Click "Not yet" to see "Take your time!" animation
   - Click "Yes" to go to Stage 3

## 🐛 Troubleshooting

**Images not showing?**
- Make sure image files are in the same folder as index.html
- Or use full URLs (https://...)
- Check file names match exactly (case-sensitive!)

**Animations not working?**
- Make sure all 3 files are uploaded together
- Check browser console (F12) for errors

**Mobile issues?**
- The site is fully responsive
- Test on your phone before sharing!

## ✨ What Happens

1. **Stage 1 - Matrix**: Black & white Matrix rain → Birthday popup appears
2. **Stage 2 - Warm Scene**: Transitions to warm colors → Floating petals → Paw appears → Card opens → Cat & dog greet with speech bubbles → "Ready for next surprise?" button
3. **Not Yet Button**: Shows "Take your time!" text that fades
4. **Yes Button**: Goes to Stage 3 (ready for your next surprise!)

## 💝 Next Steps

The "Stage 3" (#stage-yes) is ready for you to add more surprises! Just edit the content in `index.html` around line 145.

Enjoy making her birthday special! 🎂✨