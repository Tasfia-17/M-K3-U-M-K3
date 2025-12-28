# MΔK3 UΝMΔK3 - Neural Deconstruction System

An advanced multimodal AI system that transforms a single photo of a real-world object into a fully illustrated, narrated, and animated reconstruction guide.

## What It Does

Upload a photo of any everyday object (fan, chair, tool, gadget) and the system generates:

- **Fictional but plausible blueprints** with technical details
- **Step-by-step assembly/disassembly instructions**
- **AI-generated technical diagrams** for each step
- **Instructional video tutorials** showing motion and assembly
- **Voice narration** for hands-free learning
- **Conversational AI assistant** that understands the generated blueprint

This turns curiosity ("How is this made?") into a hands-on learning experience, blending engineering education, storytelling, and creativity.

---

## Technology Stack

### Frontend
- React 19.2
- TypeScript
- Vite
- TailwindCSS (custom archival/technical theme)

### Backend
- Supabase Edge Functions (6 functions)
- Minimax AI APIs (100% of AI features)

### AI Models Used
- **MiniMax-Text-01**: Vision, chat, blueprint generation
- **image-generation-01**: Technical diagram generation
- **video-01**: Instructional video tutorials
- **speech-01-hd**: Voice narration

---

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MINIMAX_API_KEY=your-minimax-api-key
```

Get your Minimax API key at: https://platform.minimax.io

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

---

## How It Works

### 1. Image Capture/Upload
User uploads or captures an image of a physical object.

### 2. Object Detection (Minimax Vision API)
- Detects all physical objects in the image
- Returns bounding boxes for each object
- User selects the target object

### 3. Blueprint Generation (Minimax Text + Vision)
- Analyzes the selected object
- Generates a detailed blueprint with:
  - Archival-style technical title
  - Materials list (5-10 components)
  - Tools required (5-8 items)
  - Sequential steps (5-8 steps)
  - Difficulty and time estimate
  - Educational summary

### 4. Multimodal Synthesis (On-Demand)
For each step, the system generates:
- **Technical Diagram** (Minimax Image API): Exploded views, cross-sections, labeled components
- **Video Tutorial** (Minimax Video API): 4-6 second motion demonstrations
- **Voice Narration** (Minimax Audio API): Step-by-step spoken instructions

### 5. AI Assembly Assistant (Minimax Chat API)
Conversational AI that:
- Understands the complete blueprint context
- Answers questions about specific steps
- Explains engineering principles
- Suggests alternatives and safety tips

---

## System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                     │
│  • Image upload/capture                                │
│  • Object selection UI                                 │
│  • Blueprint viewer                                    │
│  • Chat interface                                      │
└────────────────┬───────────────────────────────────────┘
                 │
                 │ All API calls via Supabase Edge Functions
                 │
┌────────────────▼───────────────────────────────────────┐
│         SUPABASE EDGE FUNCTIONS (6 functions)          │
│                                                         │
│  • minimax-vision     - Object detection               │
│  • minimax-blueprint  - Blueprint generation           │
│  • minimax-image      - Diagram generation             │
│  • minimax-video      - Video tutorials                │
│  • minimax-audio      - Voice narration                │
│  • minimax-chat       - AI assistant                   │
└────────────────┬───────────────────────────────────────┘
                 │
                 │ Bearer token authentication
                 │
┌────────────────▼───────────────────────────────────────┐
│                    MINIMAX API                         │
│  • Vision & multimodal understanding                   │
│  • Structured JSON generation                          │
│  • Image, video, and audio generation                  │
└────────────────────────────────────────────────────────┘
```

---

## Key Features

### 1. Complete Minimax Integration
- **No Google APIs**: Previously used Gemini & Imagen, now 100% Minimax
- **Cost-effective**: Minimax pricing is competitive for multimodal workflows
- **Unified ecosystem**: Single API provider for all AI features

### 2. Advanced System Instructions
Each edge function has carefully crafted system instructions:
- **Vision**: Expert computer vision system with precise localization
- **Blueprint**: Expert reverse engineer creating educational guides
- **Diagrams**: Technical illustrator focused on clarity over realism
- **Videos**: Instructional video director emphasizing motion and clarity
- **Chat**: Lead Archival Architect with deep blueprint knowledge

### 3. Structured Output (JSON Mode)
All text generation uses `response_format: { type: 'json_object' }` for:
- Predictable data structures
- Easy parsing and validation
- Seamless chaining between steps

### 4. Educational Focus
- Fictional but plausible content
- Balances technical accuracy with storytelling
- Explains engineering principles
- Promotes curiosity and sustainable repair practices

### 5. On-Demand Asset Generation
- Assets (diagrams, videos, audio) generated per-step when user clicks "Synthesize"
- Reduces API costs
- Faster initial load
- User controls what gets generated

---

## Edge Functions Documentation

### minimax-vision
**Purpose**: Object detection and localization

**Input**:
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "apiKey": "your-minimax-key"
}
```

**Output**:
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

### minimax-blueprint
**Purpose**: Generate assembly/disassembly blueprints

**Input**:
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "objectName": "ceiling fan",
  "mode": "disassembly",
  "apiKey": "your-minimax-key"
}
```

**Output**:
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

### minimax-image
**Purpose**: Generate technical diagrams

**Input**:
```json
{
  "prompt": "Create a clean technical illustration...",
  "apiKey": "your-minimax-key"
}
```

**Output**:
```json
{
  "imageUrl": "https://api.minimax.io/v1/files/retrieve?file_id=...",
  "fileId": "...",
  "taskId": "..."
}
```

### minimax-video
**Purpose**: Generate instructional videos

**Input**:
```json
{
  "prompt": "Generate a short instructional video...",
  "apiKey": "your-minimax-key"
}
```

**Output**:
```json
{
  "videoUrl": "https://api.minimax.io/v1/files/retrieve?file_id=...",
  "fileId": "...",
  "taskId": "..."
}
```

### minimax-audio
**Purpose**: Text-to-speech narration

**Input**:
```json
{
  "text": "Lead Architect instructions for Step 1...",
  "voiceId": "male-qn-qingse",
  "model": "speech-01-hd",
  "speed": 1.0,
  "apiKey": "your-minimax-key"
}
```

**Output**:
```json
{
  "audioData": "base64-encoded-mp3",
  "audioUrl": "data:audio/mp3;base64,...",
  "usage": {...}
}
```

### minimax-chat
**Purpose**: Conversational AI assistant

**Input**:
```json
{
  "messages": [
    { "role": "system", "content": "You are the Lead Archival Architect..." },
    { "role": "user", "content": "Why is this step needed?" }
  ],
  "apiKey": "your-minimax-key"
}
```

**Output**:
```json
{
  "message": "This step is crucial because...",
  "usage": {...}
}
```

---

## Error Handling

All edge functions include:
- API key validation
- Minimax error code mapping (1004, 1008, 1002, 1039)
- Graceful degradation (missing assets show placeholders)
- User-friendly error messages

Common errors:
- **1004**: Authentication failed → Check API key
- **1008**: Insufficient balance → Add funds at platform.minimax.io
- **1002**: Rate limited → Wait and retry
- **1039**: Token limit exceeded → Shorter prompts

---

## Cost Estimates

Per complete blueprint (with all assets):

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

## Design Philosophy

### Visual Aesthetic
- **Archival/Technical theme**: Sepia tones, blueprint grids, technical doodles
- **Dark mode**: Paper (#0C0A09), Espresso (#1C1917), Mocha (#24211E)
- **Accent colors**: Warm cream (#F5F2F0), Cyan highlights for interactive elements
- **Typography**: Space Mono (mono), Playfair Display (serif), Poppins (body)

### User Experience
- **Minimal friction**: Upload → Detect → Select → Generate → Synthesize
- **Progressive disclosure**: Assets generated on-demand, not upfront
- **Educational focus**: Explanations, analogies, safety tips
- **Tactile interactions**: Bounding box selection, step navigation, chat

---

## Troubleshooting

### Build errors after cloning
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Edge functions not working
Ensure Supabase project is properly configured and edge functions are deployed.

### Videos taking too long
Video generation can take 30-90 seconds. Increase timeout if needed.

### Diagrams don't match steps
Refine the `diagramPrompt` generation in the blueprint system instruction.

---

## Future Enhancements

- [ ] Streaming chat responses
- [ ] Save blueprints to database
- [ ] Share blueprints via links
- [ ] Multi-language support
- [ ] Export blueprints as PDF
- [ ] User accounts and history
- [ ] Community blueprint gallery

---

## Resources

- [Minimax Platform](https://platform.minimax.io)
- [Minimax Documentation](https://platform.minimax.io/document/introduction)
- [Add Funds](https://platform.minimax.io/user-center/payment/balance)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

## License

MIT

---

## Credits

Built with Minimax AI APIs and Supabase Edge Functions.

Inspired by the curiosity of how everyday objects work.
