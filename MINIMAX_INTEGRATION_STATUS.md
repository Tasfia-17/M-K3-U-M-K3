# Minimax Integration Status

## What Was Done

Your MΔK3 UΝMΔK3 system has been configured to use **100% Minimax AI APIs**. All Google APIs have been removed.

---

## Environment Configuration

Your Minimax API key has been added to `.env`:

```
VITE_MINIMAX_API_KEY=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Edge Functions Status

All 6 Supabase Edge Functions are properly configured:

1. **minimax-vision** - Object detection with bounding boxes
2. **minimax-blueprint** - Blueprint generation (vision + text)
3. **minimax-image** - Technical diagram generation
4. **minimax-video** - Instructional video tutorials
5. **minimax-audio** - Voice narration (TTS)
6. **minimax-chat** - Conversational AI assistant

---

## System Instructions Enhanced

### Vision API (minimax-vision)

The system instruction has been enhanced with:
- Explicit JSON output format example
- Clear bounding box coordinate requirements (0-1000 normalized)
- Specific guidelines for object naming
- Better error handling and logging

### Blueprint API (minimax-blueprint)

Already has comprehensive system instructions with:
- Expert Reverse Engineer persona
- Three-part step structure (text, videoPrompt, diagramPrompt)
- Detailed material and tool requirements
- Educational summaries

### Image API (minimax-image)

Generates technical diagrams with:
- Isometric exploded views
- Clean technical illustration style
- Async generation with polling

### Video API (minimax-video)

Generates instructional videos with:
- 4-6 second motion clips
- Diagram-style visuals
- Clear assembly/disassembly demonstrations

### Audio API (minimax-audio)

Text-to-speech narration with:
- Professional male voice (male-qn-qingse)
- Clear instructional tone
- Base64 MP3 output

### Chat API (minimax-chat)

Conversational AI assistant with:
- Full blueprint context awareness
- Engineering expertise
- Safety-first guidance

---

## Testing the Integration

### Option 1: Use the Test Page

Open `test-detection.html` in your browser to test:
1. Upload an image
2. Click "Test Object Detection"
3. Review the console output for detailed debugging info

### Option 2: Use the Development Server

```bash
npm run dev
```

Then:
1. Click "Start Your Journey"
2. Upload an image of an object (fan, lamp, chair, etc.)
3. Click the capture button
4. Select the detected object
5. Generate the blueprint

---

## Troubleshooting the "Neural Sync Error"

If you see "Neural sync error during object detection", check:

### 1. API Key Validation

Verify your API key is correct:
```bash
cat .env | grep MINIMAX
```

### 2. API Balance

Check your Minimax account balance:
https://platform.minimax.io/user-center/payment/balance

### 3. Image Format

Ensure your image:
- Is in JPEG or PNG format
- Is under 5MB
- Has clear, well-lit objects
- Uses base64 encoding with data URI prefix

### 4. Edge Function Deployment

**CRITICAL**: The edge functions in `supabase/functions/` are local files. They need to be deployed to Supabase to work.

To deploy (requires Supabase CLI):
```bash
supabase functions deploy minimax-vision
supabase functions deploy minimax-blueprint
supabase functions deploy minimax-image
supabase functions deploy minimax-video
supabase functions deploy minimax-audio
supabase functions deploy minimax-chat
```

### 5. Check Console Logs

Open browser DevTools (F12) and check:
- Network tab for API calls
- Console tab for error messages
- Look for detailed error responses from the edge functions

---

## Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 1004 | Authentication failed | Check your API key |
| 1008 | Insufficient balance | Add funds to Minimax account |
| 1002 | Rate limited | Wait and retry |
| 1039 | Token limit exceeded | Use shorter prompts |

---

## API Endpoints Used

All edge functions use the correct Minimax endpoints:
- Text/Chat: `https://api.minimax.chat/v1/text/chatcompletion_v2`
- Image: `https://api.minimax.chat/v1/text_to_image`
- Video: `https://api.minimax.chat/v1/video_generation`
- Audio: `https://api.minimax.chat/v1/t2a_v2`

---

## Complete Workflow

### 1. Image Upload
User uploads or captures a photo → `ObjectScanner` component

### 2. Object Detection
```
Frontend → minimax-vision → Minimax API
         ← JSON { objects: [...] }
```

### 3. Blueprint Generation
```
Frontend → minimax-blueprint → Minimax API
         ← JSON { blueprint: {...} }
```

### 4. Multimodal Synthesis (On-Demand)
When user clicks "Synthesize Archival Guide":

**Parallel Generation:**
```
┌─────────────────────────────────────┐
│ 1. Diagram (minimax-image)          │
│    → Technical illustration         │
│    → 30-60 seconds                  │
│                                     │
│ 2. Audio (minimax-audio)            │
│    → Voice narration                │
│    → 5-10 seconds                   │
│                                     │
│ 3. Video (minimax-video)            │
│    → Instructional motion clip      │
│    → 30-90 seconds                  │
└─────────────────────────────────────┘
```

### 5. AI Assistant
```
Frontend → minimax-chat → Minimax API
         ← Contextual response
```

---

## Cost Estimates

Per complete blueprint with all assets:

| Feature | Cost | Notes |
|---------|------|-------|
| Object Detection | ~$0.01 | One-time per image |
| Blueprint Generation | ~$0.02 | One-time per object |
| Diagram (per step) | ~$0.05 | On-demand, 5-8 steps |
| Video (per step) | ~$0.20 | On-demand, 5-8 steps |
| Audio (per step) | ~$0.001 | On-demand, 5-8 steps |
| Chat (per message) | ~$0.005 | User-initiated |

**Total per blueprint:** $1-3 depending on how many steps user synthesizes.

---

## Key Improvements Made

### 1. Enhanced Vision API System Instruction
- Added explicit JSON format example
- Improved bounding box coordinate guidance
- Better object naming specifications

### 2. Added Comprehensive Logging
- Request/response logging in edge functions
- Detailed error messages
- Debug information for troubleshooting

### 3. Environment Variables
- Added VITE_MINIMAX_API_KEY to .env
- Verified all three required variables are present

### 4. Build Verification
- Project builds successfully
- No Google API dependencies remain
- All imports and references updated

---

## Next Steps for Production

### 1. Deploy Edge Functions to Supabase

You'll need to deploy the edge functions to Supabase:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref 0ec90b57d6e95fcbda19832f

# Deploy all functions
supabase functions deploy minimax-vision
supabase functions deploy minimax-blueprint
supabase functions deploy minimax-image
supabase functions deploy minimax-video
supabase functions deploy minimax-audio
supabase functions deploy minimax-chat
```

### 2. Set Environment Secrets in Supabase

While the current setup passes the API key from the frontend, for production security, you should set it as a Supabase secret:

```bash
supabase secrets set MINIMAX_API_KEY=your-api-key
```

Then update edge functions to use it from `Deno.env.get('MINIMAX_API_KEY')` instead of the request body.

### 3. Test in Production

Once deployed:
1. Test object detection with various images
2. Verify blueprint generation works
3. Test multimodal synthesis (diagrams, videos, audio)
4. Test the AI chat assistant

---

## Support Resources

- **Minimax Platform**: https://platform.minimax.io
- **Minimax Documentation**: https://platform.minimax.io/document/introduction
- **Add Funds**: https://platform.minimax.io/user-center/payment/balance
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions

---

## Design Preservation

All visual design elements have been preserved:
- Color palette unchanged
- Typography unchanged
- Layout unchanged
- Animations unchanged
- Visual aesthetic maintained

Only the backend API logic has been updated to use Minimax.

---

## Success Criteria

- [x] Environment variables configured
- [x] All 6 edge functions created
- [x] System instructions enhanced
- [x] Build succeeds without errors
- [x] No Google API dependencies remain
- [x] Test page created
- [x] Documentation complete

**Status**: Ready for edge function deployment and testing.
