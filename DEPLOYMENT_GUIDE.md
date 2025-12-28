# MΔK3 UΝMΔK3 - Deployment & Testing Guide

## Quick Start

### 1. Environment Setup

Your `.env` file is already configured with:
- ✅ Supabase URL
- ✅ Supabase Anon Key
- ✅ Minimax API Key

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Test Minimax Integration

Open the test page in your browser:
```bash
# The file is already created at:
# /tmp/cc-agent/61750159/project/test-minimax.html
```

Open `test-minimax.html` in your browser to verify all Minimax APIs are working:
- ✅ Environment variables check
- ✅ Chat API test
- ✅ Vision API test (Object Detection)
- ✅ Blueprint Generation test

---

## Edge Functions Deployment Status

All 6 Minimax edge functions are already created in `supabase/functions/`:

1. ✅ **minimax-vision** - Object detection with bounding boxes
2. ✅ **minimax-blueprint** - Blueprint generation with vision + text
3. ✅ **minimax-image** - Technical diagram generation
4. ✅ **minimax-video** - Instructional video tutorials
5. ✅ **minimax-audio** - Voice narration (TTS)
6. ✅ **minimax-chat** - Conversational AI assistant

---

## How the System Works

### 1. Image Upload → Object Detection

**User Action**: Upload or capture a photo of an object

**API Call**: `minimax-vision` edge function
```javascript
POST ${SUPABASE_URL}/functions/v1/minimax-vision
Body: {
  imageBase64: "data:image/jpeg;base64,...",
  apiKey: MINIMAX_API_KEY
}
```

**Response**:
```json
{
  "objects": [
    {
      "name": "ceiling fan",
      "box_2d": [100, 200, 500, 600]
    }
  ]
}
```

**What It Does**:
- Analyzes the image using Minimax Vision API
- Detects all physical objects
- Returns normalized bounding boxes (0-1000 scale)
- User selects the object they want to deconstruct

---

### 2. Object Selection → Blueprint Generation

**User Action**: Select an object from detection results

**API Call**: `minimax-blueprint` edge function
```javascript
POST ${SUPABASE_URL}/functions/v1/minimax-blueprint
Body: {
  imageBase64: "data:image/jpeg;base64,...",
  objectName: "ceiling fan",
  mode: "disassembly",
  apiKey: MINIMAX_API_KEY
}
```

**Response**:
```json
{
  "blueprint": {
    "title": "Mark IV Rotary Blade Assembly System",
    "mode": "disassembly",
    "difficulty": "Intermediate",
    "time": "45-60 minutes",
    "materials": ["4x M4 hex bolts", "..."],
    "tools": ["Phillips screwdriver #2", "..."],
    "steps": [
      {
        "id": 1,
        "text": "Remove the four M4 hex bolts...",
        "videoPrompt": "Camera at 45-degree angle. Hands remove bolts...",
        "diagramPrompt": "Isometric exploded view showing motor housing..."
      }
    ],
    "summary": "The rotary blade assembly demonstrates..."
  }
}
```

**What It Does**:
- Uses Minimax Text-01 with vision capabilities
- Generates fictional but plausible blueprints
- Creates three prompts per step:
  - **text**: Clear instructions
  - **videoPrompt**: Motion-focused video prompt
  - **diagramPrompt**: Static technical illustration prompt

---

### 3. Step Synthesis → Multimodal Assets (On-Demand)

**User Action**: Click "Synthesize Archival Guide" for a step

**Three Parallel API Calls**:

#### A. Technical Diagram Generation

**API Call**: `minimax-image` edge function
```javascript
POST ${SUPABASE_URL}/functions/v1/minimax-image
Body: {
  prompt: "Create a clean, instructional technical illustration...",
  apiKey: MINIMAX_API_KEY
}
```

**Response**:
```json
{
  "imageUrl": "https://api.minimax.io/v1/files/retrieve?file_id=...",
  "fileId": "...",
  "taskId": "..."
}
```

**What It Does**:
- Generates diagram using Minimax Text-to-Image API
- Async generation with polling (5-second intervals)
- Returns CDN URL for display

---

#### B. Voice Narration

**API Call**: `minimax-audio` edge function
```javascript
POST ${SUPABASE_URL}/functions/v1/minimax-audio
Body: {
  text: "Lead Architect instructions for Step 1: ...",
  voiceId: "male-qn-qingse",
  model: "speech-01-hd",
  speed: 1.0,
  apiKey: MINIMAX_API_KEY
}
```

**Response**:
```json
{
  "audioData": "base64-encoded-mp3",
  "audioUrl": "data:audio/mp3;base64,...",
  "usage": {...}
}
```

**What It Does**:
- Converts step instructions to speech
- Returns base64 MP3 audio
- Decoded to AudioBuffer for playback

---

#### C. Instructional Video

**API Call**: `minimax-video` edge function
```javascript
POST ${SUPABASE_URL}/functions/v1/minimax-video
Body: {
  prompt: "Generate a short instructional video...",
  apiKey: MINIMAX_API_KEY
}
```

**Response**:
```json
{
  "videoUrl": "https://api.minimax.io/v1/files/retrieve?file_id=...",
  "fileId": "...",
  "taskId": "..."
}
```

**What It Does**:
- Generates 4-6 second instructional video
- Async generation with polling (5-second intervals, 5-minute timeout)
- Shows motion and assembly/disassembly actions

---

### 4. Conversational AI Assistant

**User Action**: Ask a question about the blueprint

**API Call**: `minimax-chat` edge function
```javascript
POST ${SUPABASE_URL}/functions/v1/minimax-chat
Body: {
  messages: [
    {
      role: 'system',
      content: 'You are the Lead Archival Architect...'
    },
    {
      role: 'user',
      content: 'Why is this step needed?'
    }
  ],
  apiKey: MINIMAX_API_KEY
}
```

**Response**:
```json
{
  "message": "This step is crucial because...",
  "usage": {...}
}
```

**What It Does**:
- Contextual AI chat with full blueprint knowledge
- Answers questions about specific steps
- Explains engineering principles
- Provides safety tips and alternatives

---

## System Instructions (Prompts)

### 1. Object Detection (minimax-vision)

```
You are an expert computer vision system specialized in object detection and localization.

TASK: Analyze the provided image and identify ALL physical objects present.

For each detected object, provide:
1. NAME: A clear, descriptive name
2. BOUNDING BOX: Normalized coordinates [ymin, xmin, ymax, xmax] (0-1000)

GUIDELINES:
- Focus on primary, distinct objects
- Be specific with names
- Tight bounding boxes
- JSON output only
```

### 2. Blueprint Generation (minimax-blueprint)

```
You are an Expert Reverse Engineer and Mechanical Illustrator.

ROLE:
- Analyze object in image
- Create plausible assembly/disassembly guide
- Generate prompts for video and diagram generation

REQUIREMENTS:
1. TITLE: Technical archival-style name
2. MATERIALS: 5-10 specific components with quantities
3. TOOLS: 5-8 specific tools
4. STEPS: 5-8 steps with THREE elements:
   a) TEXT: Clear instructions with action verbs
   b) VIDEO PROMPT: Motion-focused, camera angles, visual cues
   c) DIAGRAM PROMPT: Technical illustration style, annotations
5. DIFFICULTY: Beginner/Intermediate/Advanced/Expert
6. TIME: Realistic estimate
7. SUMMARY: Educational explanation

OUTPUT: Strict JSON matching schema
```

### 3. Diagram Generation (minimax-image)

```
Create a clean, instructional technical illustration of [OBJECT].

Style: Diagram-style, isometric view, exploded parts
Focus: Clarity and education over realism
Elements: Simple colors, arrows, no textures/shadows
Background: Pure white
Details: [STEP_DIAGRAM_PROMPT]
Quality: Professional drafting
```

### 4. Video Generation (minimax-video)

```
Generate a short instructional video demonstrating [STEP].

Duration: 4-6 seconds
Style: Diagram-style on white background
Camera: Static isometric angle
Animation: Slow, deliberate part movement
Goal: Educational clarity, not cinematic realism
Details: [STEP_VIDEO_PROMPT]
```

### 5. AI Assembly Assistant (minimax-chat)

```
You are the Lead Archival Architect, a sophisticated AI guide.

EXPERTISE:
- Master engineer understanding every component
- Technical precision with archival sophistication
- Clear explanations balancing accuracy with accessibility

CONTEXT:
- Object: [BLUEPRINT_TITLE]
- Mode: [ASSEMBLY/DISASSEMBLY]
- Current Step: [STEP_ID]
- Materials: [MATERIALS_LIST]
- Tools: [TOOLS_LIST]

RESPONSE GUIDELINES:
- Reference specific steps, materials, or tools
- Prioritize safety
- Suggest alternatives
- Explain engineering reasoning
- Use analogies for complex concepts
- Maintain archival/technical aesthetic
```

---

## Troubleshooting

### Error: "Neural sync error during object detection"

**Possible Causes**:
1. Minimax API key is invalid or expired
2. Insufficient balance in Minimax account
3. Image is too large or in unsupported format
4. Network/CORS issues

**Solutions**:
1. Verify API key at https://platform.minimax.io
2. Check balance at https://platform.minimax.io/user-center/payment/balance
3. Ensure image is JPEG/PNG and under 10MB
4. Check browser console for specific error messages

### Error: "API error: 1004"
**Solution**: Authentication failed. Check your Minimax API key.

### Error: "API error: 1008"
**Solution**: Insufficient balance. Add funds to your Minimax account.

### Error: "API error: 1002"
**Solution**: Rate limited. Wait a moment and try again.

### Error: "API error: 1039"
**Solution**: Token limit exceeded. Simplify your prompt or request.

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

**Total per blueprint**: $1-3 depending on how many steps user synthesizes.

---

## Next Steps

1. Open test-minimax.html in browser to verify APIs
2. Run `npm run dev` to start the application
3. Upload an image of an everyday object
4. Test the complete workflow:
   - Object detection
   - Object selection
   - Blueprint generation
   - Step synthesis (diagram + video + audio)
   - AI chat assistant

---

## Resources

- [Minimax Platform](https://platform.minimax.io)
- [Minimax API Documentation](https://platform.minimax.io/document/introduction)
- [Add Funds](https://platform.minimax.io/user-center/payment/balance)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

## Success Criteria

✅ Build completes without errors
✅ All 6 edge functions deployed
✅ Object detection returns bounding boxes
✅ Blueprint generation produces valid JSON
✅ Diagrams generate (30-60 seconds)
✅ Videos generate (30-90 seconds)
✅ Audio narration plays
✅ Chat assistant responds contextually
✅ Design/aesthetic unchanged
✅ Cost per blueprint < $3

**Status**: All systems ready for testing!
