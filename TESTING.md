# Testing Your MΔK3 UΝMΔK3 App

## What Was Fixed

1. **Updated Minimax API Key** - Added your new API key to `.env`
2. **Simplified App** - Removed complex video/audio synthesis
3. **Core Features Working**:
   - Image upload
   - Object detection with bounding boxes
   - Blueprint generation
   - Chat assistant

## How to Test

### Option 1: Test Page (Recommended First)

1. Open `test-simple.html` in your browser
2. Upload an image (JPEG or PNG)
3. Click "Detect Objects"
4. Check the results

This will help diagnose any API issues.

### Option 2: Full App

```bash
npm run dev
```

Then:
1. Open http://localhost:3000
2. Click "Start Your Journey"
3. Click "Archival Dropzone" to upload an image
4. Click the large capture button
5. Select a detected object
6. Click "Deconstruct [Object Name]"

## What to Expect

**Object Detection**: 10-15 seconds
- Returns list of objects with bounding boxes
- Shows objects on the image

**Blueprint Generation**: 15-20 seconds
- Creates assembly/disassembly guide
- Shows materials, tools, and steps

**Chat**: 3-5 seconds
- AI assistant answers questions about the blueprint

## If Vision Detection Fails

Check these in order:

1. **Image Format**: Use JPEG or PNG, under 5MB
2. **Clear Image**: Well-lit, single object
3. **Browser Console**: Press F12, check for errors
4. **API Key**: Verify it's correct in `.env`
5. **Balance**: Check at https://platform.minimax.io

## API Endpoints Used

According to Minimax docs, we're using:

- **Text/Vision**: `https://api.minimax.io/v1/text/chatcompletion_v2`
- **Model**: `MiniMax-M2` (supports vision + text)
- **Image Input**: Base64 data URI format

## Troubleshooting

### Error: "API key not provided"
Restart dev server after editing `.env`

### Error: "Failed to parse response"
API might be returning non-JSON. Check browser console.

### JavaScript Error on Upload
Check browser console (F12) for specific error message.

## Project Structure

```
/
├── App.tsx              (Main app logic)
├── components/
│   ├── LandingScreen    (Entry screen)
│   ├── Dashboard        (Image upload)
│   ├── ObjectScanner    (Camera/upload interface)
│   ├── AnalysisPanel    (Object selection)
│   └── BlueprintResult  (Blueprint display + chat)
├── supabase/functions/
│   ├── minimax-vision   (Object detection)
│   ├── minimax-blueprint(Blueprint generation)
│   └── minimax-chat     (AI assistant)
└── test-simple.html     (Quick API test)
```

## Next Steps

1. Test with `test-simple.html` first
2. If that works, try the full app
3. If issues persist, check browser console for specific errors
4. Share the error message for further help

## Support

- Minimax Dashboard: https://platform.minimax.io
- Minimax Docs: https://platform.minimax.io/docs
