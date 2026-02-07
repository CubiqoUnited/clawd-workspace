# Daily Journal (Rozana) Report

## Overview
Daily journaling feature for Cubiqo - capturing daily insights, thoughts, and progress.

**"Rozana"** = Daily (Urdu/Hindi)

## Concept
A daily reflection and journaling system integrated with the Cubiqo experience.

## Current State
- **No dedicated journal feature** currently implemented
- **Keywords panel** serves as basic capture
- **RGY chats** could serve as journal categories
- **No date-based organization**

## Proposed Features

### 1. Daily Entry System
```javascript
{
  date: "2026-02-07",
  entries: [
    {
      timestamp: "09:30",
      type: "voice", // or "text"
      content: "Morning reflection...",
      color: "GREEN_BLUE", // RGY category
      mood: "focused",
      keywords: ["work", "goals", "progress"]
    }
  ],
  summary: "Productive morning, focused on goals..."
}
```

### 2. Visual Integration

#### Calendar View
```
February 2026
Mon Tue Wed Thu Fri Sat Sun
                  1🟢  2🟡
 3🔴  4🟢  5🟢  6🟡  7🟢  8   9
```
- **Color-coded days** based on dominant emotion
- **Quick overview** of emotional patterns
- **Click to expand** day's entries

#### Timeline View
```
Today - Feb 7
─────────────
09:30 🟢 Morning reflection
12:45 🟡 Lunch thoughts
15:20 🔴 Urgent insight
18:00 🟢 Evening review
```

### 3. Categories (RGY Integration)

#### Red Journal
- **Urgent matters**
- **Important decisions**
- **Deep desires**
- **Whisper-mode thoughts**

#### Yellow Journal
- **Daily observations**
- **Friendly reflections**
- **Candid thoughts**
- **Sarcastic notes**

#### Green Journal
- **Goals and ambitions**
- **Focus areas**
- **Driven actions**
- **Sincere commitments**

### 4. Entry Methods

#### Voice Entry
1. Press record
2. Speak naturally
3. AI transcribes
4. Auto-categorizes by tone
5. Saves with timestamp

#### Text Entry
1. Type freely
2. Manual color selection
3. Add keywords
4. Save instantly

#### Quick Capture
- Voice command: "Note to self..."
- Instant save
- Review later
- Auto-organize

### 5. Features

#### Daily Prompt
```
Morning: "What's your intention for today?"
Evening: "What's one thing you learned?"
```

#### Mood Tracking
- Emotional patterns over time
- Color distribution charts
- Energy level trends
- Insight frequency

#### Search & Filter
```
// Find entries
search("work goals") 
filterBy(color: "GREEN")
filterBy(date: "last week")
filterBy(keyword: "project")
```

#### Export & Backup
- **PDF export** (daily/weekly/monthly)
- **Text format** (markdown)
- **JSON backup** (full data)
- **Cloud sync** (optional)

## UI Design

### Daily View
```
┌─────────────────────────────┐
│   Today - February 7        │
│   🟢 Focused, productive    │
├─────────────────────────────┤
│                             │
│  [Voice Record Button]      │
│  [Text Entry Field]         │
│                             │
│  Recent Entries:            │
│  ├─ 09:30 🟢 Morning...     │
│  ├─ 12:45 🟡 Lunch...       │
│  └─ 15:20 🔴 Important...   │
│                             │
│  [View Full Day]            │
└─────────────────────────────┘
```

### Entry Card
```
┌─────────────────────────────┐
│  🟢 Green - Focused          │
│  Feb 7, 2026 - 09:30 AM     │
├─────────────────────────────┤
│                             │
│  Started the day with       │
│  clear goals. Want to       │
│  finish the Mare reports.   │
│                             │
│  Keywords: #work #goals     │
│  Mood: Energized ⚡         │
│                             │
│  [Edit] [Delete] [Share]    │
└─────────────────────────────┘
```

## Technical Implementation

### Database Schema
```javascript
// Journal Entry
{
  id: string,
  userId: string,
  date: Date,
  timestamp: Date,
  type: "voice" | "text",
  content: string,
  colorCategory: "RED" | "YELLOW" | "GREEN_BLUE",
  mood: string,
  keywords: string[],
  audioUrl?: string, // if voice
  metadata: {
    duration?: number,
    wordCount: number,
    sentiment: number // -1 to 1
  }
}

// Daily Summary
{
  date: Date,
  entryCount: number,
  dominantColor: string,
  avgMood: number,
  topKeywords: string[],
  highlights: string[]
}
```

### Storage Options
1. **Local Storage** (basic)
2. **IndexedDB** (better)
3. **Cloud Backend** (sync across devices)
4. **Hybrid** (local + sync)

### Privacy
- **Encrypted storage**
- **Local-first** (data stays on device)
- **Optional cloud backup**
- **User controls all data**

## Integration with Existing Features

### Keyword Panel
- **Quick journal from keywords**
- **Auto-categorize by color**
- **Keywords become journal tags**

### RGY Chats
- **Chat history = journal entries**
- **Color-coded conversations**
- **Easy review of past discussions**

### Voice Mode
- **Seamless voice journaling**
- **Transcription included**
- **Audio playback optional**

## Analytics & Insights

### Personal Dashboard
```
This Week:
├─ 23 entries total
├─ 12 🟢 Green (focused days)
├─ 8 🟡 Yellow (casual days)
├─ 3 🔴 Red (important matters)
└─ Top themes: work, goals, health
```

### Patterns
- **Best productivity time**: 9-11 AM
- **Mood trends**: Improving over month
- **Frequent topics**: Identified automatically
- **Reflection prompts**: Personalized

## Roadmap

### Phase 1: Basic Journal (Week 1-2)
- [ ] Daily text entries
- [ ] Color categorization
- [ ] Simple timeline view
- [ ] Basic search

### Phase 2: Voice Integration (Week 3-4)
- [ ] Voice recording
- [ ] Auto-transcription
- [ ] Voice playback
- [ ] Tone detection

### Phase 3: Advanced Features (Month 2)
- [ ] Calendar view
- [ ] Mood tracking
- [ ] Analytics dashboard
- [ ] Export options

### Phase 4: Smart Features (Month 3+)
- [ ] AI summaries
- [ ] Pattern recognition
- [ ] Personalized prompts
- [ ] Insight generation

## Open Questions

1. **Storage limit**: How much history to keep?
2. **Sync**: Cloud backup or local-only?
3. **Sharing**: Should entries be shareable?
4. **Templates**: Pre-defined journal templates?
5. **Reminders**: Daily prompts via notifications?

## User Stories

### Morning Routine
> "I wake up, open Cubiqo, see the morning prompt, 
> record a quick voice note about my intentions, 
> and it's saved as a Green (focused) entry."

### Capture Urgent Thought
> "In the middle of the day, I have an important 
> realization. I quickly speak into Cubiqo, 
> it detects the urgency and saves as Red."

### Evening Reflection
> "Before bed, I review my day in timeline view,
> see 12 entries color-coded, and smile at 
> the pattern of progress."

### Weekly Review
> "On Sunday, I open the calendar view, see 
> the week mostly green and yellow, and feel 
> good about my balance."

## Success Metrics

- **Daily active journaling** (target: 5+ entries/day)
- **User retention** (30-day journal streak)
- **Entry variety** (mix of voice/text, RGY balance)
- **User satisfaction** (NPS score)
- **Data insights** (users value analytics)

## Notes

- Keep it simple - journaling should be effortless
- Privacy is paramount - user owns their data
- Voice-first - natural way to capture thoughts
- Visual - color coding makes review intuitive
- Insightful - patterns emerge over time
- **"Rozana"** - daily practice, not a chore

---

**Status**: Design phase - ready for implementation
**Priority**: High - core feature for Cubiqo experience
**Dependencies**: Voice system, color animations, keyword panel
