# MΔK3 UΝMΔK3 - Complete Minimax Integration Guide

## Overview

The MΔK3 UΝMΔK3 system has been fully migrated to use **Minimax APIs exclusively** for all AI-powered features. Google Gemini and Imagen have been completely removed and replaced with Minimax's multimodal capabilities.

---

## What Changed

### Before (Google APIs)
- **Object Detection**: Google Gemini Vision
- **Blueprint Generation**: Google Gemini Pro with structured output
- **Diagram Generation**: Google Imagen 4.0
- **Video Generation**: Minimax (already implemented)
- **Audio/TTS**: Minimax (already implemented)
- **Chat Assistant**: Minimax (already implemented)

### After (100% Minimax)
- **Object Detection**: Minimax Vision API (via edge function)
- **Blueprint Generation**: Minimax Text API with vision + JSON output
- **Diagram Generation**: Minimax Text-to-Image API
- **Video Generation**: Minimax Video API
- **Audio/TTS**: Minimax Audio API
- **Chat Assistant**: Minimax Chat API

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React App)                     │
│                                                             │
│  • Image Upload/Capture                                    │
│  • User Interface                                          │
│  • State Management                                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ All requests go through Supabase Edge Functions
                  │ (CORS-safe, API key management)
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTIONS                        │
│                                                             │
│  ┌──────────────────┐  ┌─────────────────┐                │
│  │ minimax-vision   │  │ minimax-blueprint│                │
│  │ Object Detection │  │ Blueprint Gen    │                │
│  └──────────────────┘  └─────────────────┘                │
│                                                             │
│  ┌──────────────────┐  ┌─────────────────┐                │
│  │ minimax-image    │  │ minimax-video   │                │
│  │ Diagram Gen      │  │ Tutorial Videos │                │
│  └──────────────────┘  └─────────────────┘                │
│                                                             │
│  ┌──────────────────┐  ┌─────────────────┐                │
│  │ minimax-audio    │  │ minimax-chat    │                │
│  │ Voice Narration  │  │ AI Assistant    │                │
│  └──────────────────┘  └─────────────────┘                │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Bearer token authentication
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    MINIMAX API                              │
│                                                             │
│  • MiniMax-Text-01 (Vision + Chat + JSON)                  │
│  • image-generation-01 (Text-to-Image)                     │
│  • video-01 (Text-to-Video)                               │
│  • speech-01-hd (Text-to-Speech)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## New Edge Functions

### 1. minimax-vision (Object Detection)

**Purpose**: Detect and localize physical objects in images

**Location**: `supabase/functions/minimax-vision/index.ts`

**System Instruction**:
```
You are an expert computer vision system specialized in object detection and localization.

TASK: Analyze the provided image and identify ALL physical objects present.

For each detected object, provide:
1. NAME: A clear, descriptive name for the object
2. BOUNDING BOX: Normalized coordinates [ymin, xmin, ymax, xmax] where values range from 0-1000

GUIDELINES:
- Focus on primary, distinct physical objects (not backgrounds or surfaces)
- Be specific with names (e.g., "ceiling fan" not just "fan")
- Ensure bounding boxes tightly fit each object
- Return ONLY the objects array in strict JSON format
- If multiple similar objects exist, identify each one separately

OUTPUT: Return a JSON object with an "objects" array containing name and box_2d for each detected object.
```

**Key Features**:
- Uses Minimax vision capabilities with image URLs
- Returns structured JSON with object names and bounding boxes
- Normalized coordinates (0-1000 scale)
- Error handling with detailed messages

**Frontend Usage**:
```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/minimax-vision`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    imageBase64: imageDataUrl,
    apiKey: MINIMAX_API_KEY,
  }),
});

const { objects } = await response.json();
// objects = [{ name: "ceiling fan", box_2d: [100, 200, 500, 600] }, ...]
```

---

### 2. minimax-blueprint (Blueprint Generation)

**Purpose**: Generate detailed assembly/disassembly blueprints from object images

**Location**: `supabase/functions/minimax-blueprint/index.ts`

**System Instruction** (Enhanced & Detailed):
```
You are an Expert Reverse Engineer and Mechanical Illustrator specializing in deconstructing physical objects into educational blueprints.

ROLE:
- Analyze the object in the provided image
- Create a fictional but plausible assembly/disassembly guide
- Generate detailed prompts for AI video and diagram generation

GENERATION REQUIREMENTS:

1. TITLE: Create an archival-style technical name
   Example: "Mark IV Rotary Blade Assembly System"

2. MATERIALS: List 5-10 realistic components
   - Be specific: "M4 hex bolts" not "bolts"
   - Include quantities: "4x M4 hex bolts"
   - Use technical terminology: "6061-T6 aluminum housing"

3. TOOLS: List 5-8 realistic tools
   - Be specific: "Phillips head screwdriver #2"
   - Include safety equipment if relevant

4. STEPS: Generate 5-8 sequential steps with THREE distinct elements:

   a) TEXT: Clear instructional language
      - Action verbs: Remove, Insert, Align, Secure
      - Specific details: torque settings, alignment notes
      - Example: "Remove the four M4 hex bolts securing the motor housing using a 3mm Allen key..."

   b) VIDEO PROMPT: Motion-focused description
      - Specify movement: "slowly rotate 90 degrees counterclockwise"
      - Camera angle: "isometric front view"
      - Visual cues: "highlight connection points with arrows"
      - Duration: "4-6 seconds of deliberate motion"
      - Example: "Camera at 45-degree angle. Hands remove bolts in sequence, each location highlighted..."

   c) DIAGRAM PROMPT: Static technical illustration
      - Technical terms: "exploded view", "cross-section", "isometric"
      - Annotations: "arrows showing rotation", "component labels"
      - Style: "clean line art on white background"
      - Example: "Isometric exploded view with 2cm component spacing, dimension lines, labeled parts..."

5. DIFFICULTY: Beginner, Intermediate, Advanced, or Expert

6. TIME: Realistic estimate (e.g., "45-60 minutes", "2-3 hours")

7. SUMMARY: 2-3 sentences explaining:
   - Object purpose
   - Why this process matters
   - Engineering principles involved

OUTPUT: Return valid JSON matching the exact schema.
```

**Key Features**:
- Vision + text multimodal input
- Structured JSON output with strict schema
- Detailed prompts for downstream video and image generation
- Educational and technically plausible content
- Temperature: 0.7 for creative yet consistent outputs

**Frontend Usage**:
```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/minimax-blueprint`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    imageBase64: imageDataUrl,
    objectName: "ceiling fan",
    mode: "disassembly", // or "assembly"
    apiKey: MINIMAX_API_KEY,
  }),
});

const { blueprint } = await response.json();
// blueprint = { title, mode, difficulty, time, materials, tools, steps, summary }
```

---

### 3. minimax-image (Diagram Generation)

**Purpose**: Generate technical diagrams and instructional illustrations

**Location**: `supabase/functions/minimax-image/index.ts`

**Model**: `image-generation-01`

**Key Features**:
- Text-to-image generation
- Polling mechanism for async generation (5-second intervals, 2.5 minute timeout)
- Returns image URL from Minimax CDN
- Square aspect ratio (1:1) optimized for technical diagrams

**Prompt Pattern**:
```
Create a clean, instructional technical illustration of [OBJECT].
The image should be a diagram-style illustration showing the object in an isometric view
with clearly separated parts, similar to an exploded engineering diagram.
Focus on clarity and education rather than realism.
Use simple colors to differentiate components, subtle arrows to indicate movement.
Avoid textures, shadows, branding, or decorative elements.
Specifically: [STEP_DIAGRAM_PROMPT]
Professional drafting quality on pure white background.
```

**Frontend Usage**:
```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/minimax-image`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: diagramPrompt,
    apiKey: MINIMAX_API_KEY,
  }),
});

const { imageUrl } = await response.json();
// Display image: <img src={imageUrl} />
```

---

## System Instructions Philosophy

### 1. Role-Based Prompting

Each API endpoint uses a specific persona:
- **Vision AI**: Computer vision expert
- **Blueprint Generator**: Reverse engineer + mechanical illustrator
- **Diagram Generator**: Technical illustrator (implicit in prompt)
- **Video Generator**: Instructional video director (implicit in prompt)
- **Chat Assistant**: Lead Archival Architect

### 2. Structured Output Requirements

All text-generation tasks use JSON mode (`response_format: { type: 'json_object' }`) to ensure:
- Predictable data structures
- Easy parsing and rendering
- Seamless chaining between steps (text → image → video)

### 3. Educational Focus

All prompts emphasize:
- **Clarity over realism**: Educational diagrams, not photorealistic renders
- **Technical accuracy**: Plausible but fictional details
- **Storytelling**: Engaging explanations of engineering principles
- **Accessibility**: Complex concepts explained simply

### 4. Prompt Engineering Patterns

#### For Vision Tasks:
- Explicit output format specification
- Normalization requirements (0-1000 scale)
- Focus on primary objects, ignore backgrounds

#### For Blueprint Generation:
- Three-part step structure (text, video, diagram)
- Specific examples in instructions
- Temperature tuning (0.7) for creativity + consistency

#### For Image/Video Generation:
- Style keywords: "exploded view", "isometric", "diagram-style"
- Visual constraints: "white background", "no textures"
- Motion keywords: "slowly", "deliberately", "4-6 seconds"

---

## Environment Variables

Add to your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MINIMAX_API_KEY=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Complete User Flow

### Step 1: Upload/Capture Image
User uploads an image or captures from camera → `ObjectScanner` component

### Step 2: Object Detection (Minimax Vision)
```
Frontend → minimax-vision edge function → Minimax API
         ← JSON { objects: [...] }
```

User sees bounding boxes overlaid on image and selects target object

### Step 3: Blueprint Generation (Minimax Text + Vision)
```
Frontend → minimax-blueprint edge function → Minimax API
         ← JSON { blueprint: {...} }
```

System generates:
- Title, materials, tools, difficulty, time
- 5-8 steps with text, videoPrompt, diagramPrompt

### Step 4: Multimodal Synthesis (Per Step, On-Demand)

When user clicks "Synthesize Archival Guide":

```
┌─────────────────────────────────────────────────────────┐
│ Parallel Synthesis (all 3 at once)                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 1. DIAGRAM GENERATION (Minimax Image)                  │
│    Frontend → minimax-image edge function              │
│             → Minimax Text-to-Image API                │
│             ← Image URL                                │
│                                                         │
│ 2. AUDIO NARRATION (Minimax Audio)                     │
│    Frontend → minimax-audio edge function              │
│             → Minimax TTS API                          │
│             ← Base64 audio (MP3)                       │
│             → Decoded to AudioBuffer                   │
│                                                         │
│ 3. VIDEO TUTORIAL (Minimax Video)                      │
│    Frontend → minimax-video edge function              │
│             → Minimax Video Generation API             │
│             → Polling for completion (30-60s)          │
│             ← Video URL                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

All three assets are cached and displayed together.

### Step 5: Conversational AI Assistant (Minimax Chat)

User can ask questions about the blueprint:
```
Frontend → minimax-chat edge function → Minimax Chat API
         ← Contextual response

System instruction includes:
- Blueprint context (object, mode, current step)
- Materials and tools list
- Current step focus
- Guidance principles (safety, alternatives, analogies)
```

---

## Cost Optimization

### Lazy Loading Strategy

Assets are only generated when the user clicks "Synthesize Archival Guide" for each step, not all upfront. This:
- Reduces API costs
- Improves initial load time
- Allows users to skip steps they don't need

### Caching

Generated assets (diagrams, videos, audio) are:
- Stored in component state
- Persisted for the session
- Not regenerated when user navigates between steps

### Batch Requests

Vision detection and blueprint generation happen together (single image analysis), minimizing redundant API calls.

---

## Error Handling

All edge functions include:

1. **API Key Validation**
   ```typescript
   if (!apiKey) {
     return Response with error message
   }
   ```

2. **Minimax Error Code Mapping**
   ```typescript
   const ERROR_MESSAGES = {
     1004: 'Authentication failed',
     1008: 'Insufficient balance',
     1002: 'Rate limited',
     1039: 'Token limit exceeded',
   };
   ```

3. **Graceful Degradation**
   - If diagram generation fails → show placeholder
   - If video generation fails → alert user, continue with other assets
   - If audio fails → silent failure, no narration button

---

## Testing Checklist

- [ ] Object detection identifies multiple objects correctly
- [ ] Bounding boxes are accurate and normalized
- [ ] Blueprint generation produces valid JSON
- [ ] All step fields (text, videoPrompt, diagramPrompt) are populated
- [ ] Diagram generation creates relevant technical illustrations
- [ ] Video generation completes within timeout (60 seconds)
- [ ] Audio narration plays correctly
- [ ] Chat assistant understands blueprint context
- [ ] Build completes without errors (`npm run build`)
- [ ] All Google Gemini references removed

---

## Troubleshooting

### "API key not configured"
Ensure `VITE_MINIMAX_API_KEY` is in your `.env` file and restart dev server.

### "Insufficient balance"
Add funds at: https://platform.minimax.io/user-center/payment/balance

### Video generation times out
Increase timeout in `minimax-video` edge function (currently 5 minutes max).

### Diagrams look wrong
Refine the diagram prompts in the blueprint generation system instruction.

### Chat assistant gives generic responses
Ensure the system instruction in `handleSendMessage` includes full blueprint context.

---

## Future Enhancements

1. **Streaming Responses**: Use Minimax streaming API for real-time chat
2. **Video Frame Control**: Pass first-frame images to guide video generation
3. **Multi-Language Support**: Translate instructions and narration
4. **Save Blueprints**: Persist generated blueprints to Supabase database
5. **Share Links**: Generate shareable URLs for blueprints

---

## Resources

- [Minimax Platform](https://platform.minimax.io)
- [Minimax API Documentation](https://platform.minimax.io/document/introduction)
- [Add Funds](https://platform.minimax.io/user-center/payment/balance)

---

## Summary

The MΔK3 UΝMΔK3 system now uses **Minimax exclusively** for all AI features:

- ✅ Object Detection (Vision)
- ✅ Blueprint Generation (Multimodal Text + Vision)
- ✅ Diagram Generation (Text-to-Image)
- ✅ Video Tutorials (Text-to-Video)
- ✅ Voice Narration (Text-to-Speech)
- ✅ Conversational Assistant (Chat)

All features are accessible through **6 Supabase Edge Functions** that proxy requests to Minimax APIs with proper CORS handling and error management.

The system maintains its original **archival/technical aesthetic** and **educational focus** while leveraging Minimax's cost-effective multimodal capabilities.
