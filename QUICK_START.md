# MΔK3 UΝMΔK3 - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Verify Integration
```bash
./verify-edge-functions.sh
```

**Expected Output:**
```
✓ All edge functions are ready for deployment!
Passed: 6
Failed: 0
```

---

### Step 2: Build & Test
```bash
npm run build
```

**Expected Output:**
```
✓ built in 3.00s
```

Then open `test-minimax.html` in your browser to test APIs.

---

### Step 3: Launch the App
```bash
npm run dev
```

The app will start at `http://localhost:3000`

---

## 🎯 Testing the Complete Workflow

### 1. Open the App
Navigate to `http://localhost:3000` in your browser.

### 2. Click "Start Your Journey"
You'll see the archival dashboard.

### 3. Upload an Image
Click the "Archival Dropzone" and upload a photo of any everyday object:
- Ceiling fan
- Office chair
- Desk lamp
- Power drill
- Coffee maker
- Water bottle

**Best Results:**
- Clear, well-lit photo
- Single object in focus
- JPEG or PNG format
- Under 5MB

### 4. Scan the Object
After upload, you'll see a scanner view with your image.
Click the large circular button to "Capture Neural Stamp".

**Wait Time:** 10-15 seconds

### 5. Select the Object
Multiple objects may be detected with bounding boxes.
Click on the object you want to deconstruct.

### 6. Choose Mode
Toggle between:
- **Assembly:** How to build it
- **Disassembly:** How to take it apart

Click "Deconstruct [Object Name]"

**Wait Time:** 15-20 seconds

### 7. View the Blueprint
You'll see:
- Technical title
- Materials list (5-10 items)
- Tools required (5-8 items)
- Step-by-step instructions (5-8 steps)
- Difficulty level
- Time estimate
- Educational summary

### 8. Synthesize a Step
Click "Synthesize Archival Guide" for any step.

**Wait Time:** 60-120 seconds

You'll get:
- Technical diagram (exploded view, annotations)
- Instructional video (4-6 second motion clip)
- Voice narration (click speaker icon to play)

### 9. Ask the AI Assistant
Scroll down to "Archival Assembly Assistant"

Try asking:
- "Why is this step needed?"
- "What if I don't have this tool?"
- "Can you explain this more simply?"
- "What are the safety concerns?"

**Response Time:** 3-5 seconds

---

## 🔍 What to Look For

### Object Detection Should:
- Return 1-5 detected objects
- Show bounding boxes on the image
- Allow you to select the target object

### Blueprint Should Include:
- Archival-style technical title
- 5-10 specific materials (e.g., "4x M4 hex bolts")
- 5-8 specific tools (e.g., "Phillips screwdriver #2")
- 5-8 steps with clear instructions

### Each Step Should Have:
- **Text:** Clear assembly/disassembly instructions
- **Diagram:** Technical illustration (isometric, exploded view)
- **Video:** 4-6 second motion demonstration
- **Audio:** Voice narration (optional playback)

### AI Assistant Should:
- Reference specific blueprint details
- Explain engineering principles
- Provide safety guidance
- Suggest alternatives
- Maintain archival/technical tone

---

## ⚠️ Common Issues

### "Neural sync error during object detection"

**Fix:**
1. Check your internet connection
2. Verify Minimax API key in `.env`
3. Check balance at https://platform.minimax.io/user-center/payment/balance
4. Try a different image (JPEG/PNG, < 5MB)

### Videos/Diagrams Stuck Loading

**Expected behavior:** 30-90 seconds to generate

**If timeout occurs:**
1. Check Minimax API status
2. Verify sufficient balance
3. Check browser console for errors

### Chat Not Responding

**Fix:**
1. Verify Minimax API key
2. Check network tab in browser devtools
3. Ensure blueprint was generated successfully

---

## 📊 Performance Expectations

| Feature | Time | Cost |
|---------|------|------|
| Object Detection | 10-15s | $0.01 |
| Blueprint Generation | 15-20s | $0.02 |
| Diagram (per step) | 30-60s | $0.05 |
| Video (per step) | 30-90s | $0.20 |
| Audio (per step) | 5-10s | $0.001 |
| Chat (per message) | 3-5s | $0.005 |

**Full blueprint with 5 synthesized steps:** $1.30-2.50

---

## 🎨 Design Features to Notice

The system preserves the original archival/technical aesthetic:

- **Blueprint grid backgrounds**
- **Tech corner decorations**
- **Animated scanner beams**
- **Sepia/espresso color palette**
- **Mono/serif typography**
- **Technical doodles** (gears, pistons, oscilloscopes)

All visual elements are intact. Only the AI backend was upgraded to Minimax.

---

## 📦 What's Integrated

- **Minimax Vision API** - Object detection
- **Minimax Text-01** - Blueprint generation + chat
- **Minimax Image Generation** - Technical diagrams
- **Minimax Video Generation** - Instructional videos
- **Minimax Speech-01-HD** - Voice narration

**No Google APIs are used.** Everything runs on Minimax.

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Browser Console:**
   Press F12 → Console tab
   Look for red error messages

2. **Check Network Tab:**
   Press F12 → Network tab
   Filter by "minimax"
   Check for failed requests

3. **Verify Environment:**
   ```bash
   cat .env
   ```
   Ensure all three variables are set

4. **Check Minimax Balance:**
   https://platform.minimax.io/user-center/payment/balance

5. **Review Logs:**
   Check Supabase edge function logs
   https://supabase.com/dashboard

---

## ✅ Success Criteria

Your system is working correctly if:

- [x] Object detection returns bounding boxes
- [x] You can select a detected object
- [x] Blueprint generates with valid JSON structure
- [x] Steps include text, videoPrompt, and diagramPrompt
- [x] Diagrams appear after synthesis
- [x] Videos play in the browser
- [x] Audio narration works
- [x] Chat assistant responds contextually
- [x] Design looks archival/technical
- [x] No console errors

---

## 🎓 Learning Tips

**Start with simple objects:**
- Fan
- Lamp
- Chair
- Bottle

**Avoid:**
- Blurry images
- Multiple overlapping objects
- Very complex machinery (first time)

**Experiment with:**
- Different objects
- Assembly vs. disassembly mode
- Various questions for AI assistant
- Multiple steps synthesis

---

## 🔗 Resources

- **Test Page:** `test-minimax.html`
- **Verification Script:** `verify-edge-functions.sh`
- **Deployment Guide:** `DEPLOYMENT_GUIDE.md`
- **Integration Status:** `INTEGRATION_COMPLETE.md`

- **Minimax Platform:** https://platform.minimax.io
- **API Docs:** https://platform.minimax.io/document/introduction

---

**Ready to deconstruct reality!** 🛠️

Start by running:
```bash
npm run dev
```

Then open http://localhost:3000 and upload your first object!
