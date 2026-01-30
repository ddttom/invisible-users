---
title: "MX Media Metadata Specification"
date: 2026-01-28
ld:
  "@type": TechArticle
  headline: "MX Media Metadata Specification"
  proficiencyLevel: Intermediate
  author:
    "@type": Person
    name: Tom Ledger
    jobTitle: Principal Consultant
    worksFor:
      "@type": Organization
      name: Digital Domain Technologies Ltd
  publisher:
    "@type": Organization
    name: MX Community
  isPartOf:
    "@type": CreativeWorkSeries
    name: "MX: The Bible"
  inLanguage: en-GB
  mx:audience: both
  mx:status: draft
  mx:source: ai-assisted
  mx:verifiedBy:
    "@type": Person
    name: Tom Ledger
  mx:volatility: periodic
  mx:reviewDate: 2026-04-02
  mx:chunkBoundary: heading
  mx:chunkSize: 500
  mx:standalone: true
  mx:canonicalFor: https://mx.community/spec/media-metadata
  mx:accessLevel: public
  mx:licenseType: attribution
  mx:citationRequired: true
  mx:completeness: 0.9
  mx:accuracy: 0.85
  mx:confidence: 0.8
  mx:prerequisites:
    - /spec/structured-data/
  mx:inheritable:
    - author
    - publisher
    - inLanguage
    - mx:accessLevel
    - mx:licenseType
---

# MX Media Metadata Specification

Version: 1.0.0-draft
Status: Draft
Last Updated: January 2026

---

## Introduction

This specification defines how media assets — images, video, audio, and documents — declare metadata for machine processors. The approach enables AI agents to understand media context, content, rights, and appropriate use without analysing the binary content.

This specification extends the **MX Base Specification** (`mx.community/spec/base`) and inherits all core properties defined there.

The specification covers:

- Sidecar metadata files
- Embedded metadata alignment
- Image metadata
- Video metadata
- Audio metadata
- Document metadata
- Asset collections and galleries
- Rights and licensing
- AI agent interpretation guidance
- Inheritance and extensions

### Relationship to Base Specification

This specification inherits from MX Base:

- All core properties (`mx:audience`, `mx:status`, `mx:volatility`, etc.)
- All inheritance properties (`mx:inheritable`, `mx:inherit`, etc.)
- All AI properties (`ai.training`, `ai.extraction`, etc.)
- All classification properties
- Extension framework

This specification adds:

- Sidecar file format (`.mx.yaml`)
- Media-specific content properties (alt text, captions, chapters)
- Technical metadata (dimensions, codec, duration)
- Rights and licensing framework
- Media-specific AI properties (`ai.description_confidence`, `ai.transcript_source`, etc.)
- Asset collection structures

---

## Sidecar Metadata Files

Media metadata is declared in sidecar files that accompany the media asset. This approach keeps metadata human-readable and editable without modifying the binary asset.

### File Naming Convention

Sidecar files use the same filename as the asset with an `.mx.yaml` extension:

```
/assets/
├── hero-image.jpg
├── hero-image.mx.yaml      # Metadata for hero-image.jpg
├── product-demo.mp4
├── product-demo.mx.yaml    # Metadata for product-demo.mp4
├── podcast-ep-42.mp3
└── podcast-ep-42.mx.yaml   # Metadata for podcast-ep-42.mp3
```

### Alternative: Directory Metadata

For directories with many assets, a single `_mx.yaml` file can provide defaults and per-file overrides:

```
/assets/products/
├── _mx.yaml                # Directory defaults + per-file metadata
├── widget-blue.jpg
├── widget-red.jpg
└── widget-green.jpg
```

```yaml
# /assets/products/_mx.yaml
mx:
  defaults:
    type: ProductImage
    category: product-photography
    license: proprietary
    ai:
      training: prohibited
      
  files:
    widget-blue.jpg:
      alt: "Blue widget, front view"
      color: blue
    widget-red.jpg:
      alt: "Red widget, front view"
      color: red
    widget-green.jpg:
      alt: "Green widget, front view"
      color: green
```

### Sidecar File Structure

```yaml
# hero-image.mx.yaml
mx:
  version: "1.0"
  asset: hero-image.jpg      # Explicit link to asset (optional if filename matches)
  
  # Schema.org alignment
  schema:
    "@type": ImageObject
    name: "Company headquarters at sunset"
    description: "Aerial view of headquarters building"
    contentUrl: /assets/hero-image.jpg
    
  # Core metadata
  content:
    # ... content-specific properties
    
  # Technical metadata
  technical:
    # ... format, dimensions, etc.
    
  # Rights and licensing
  rights:
    # ... ownership, usage rights
    
  # AI-specific metadata
  ai:
    # ... AI processing guidance
```

---

## Embedded Metadata Alignment

Many media formats support embedded metadata (EXIF, IPTC, XMP, ID3). MX sidecar files can reference, extend, or override embedded metadata.

### Relationship to Embedded Metadata

```yaml
mx:
  embedded:
    source: preserve          # preserve | override | ignore
    sync: false               # Whether to sync sidecar back to embedded
    
  # These override embedded values if present
  content:
    title: "Corrected title"  # Overrides embedded title
    
  # These extend embedded values
  ai:
    alt_text: "Detailed description for screen readers"
```

### Source Options

| Value | Behaviour |
|-------|-----------|
| `preserve` | Use embedded metadata as base, sidecar extends/overrides |
| `override` | Sidecar takes precedence, embedded ignored |
| `ignore` | Do not read embedded metadata |

### Sync Behaviour

When `sync: true`, build systems SHOULD write sidecar metadata back to embedded metadata fields where possible. This keeps embedded and sidecar in alignment for tools that only read embedded metadata.

---

## Image Metadata

### Core Image Properties

```yaml
# product-photo.mx.yaml
mx:
  version: "1.0"
  
  schema:
    "@type": ImageObject
    name: "Widget Pro - Product Photo"
    description: "Professional product photograph of Widget Pro on white background"
    
  content:
    title: "Widget Pro - Product Photo"
    alt: "Silver Widget Pro device standing upright on white background, showing front panel with blue LED indicator"
    caption: "The new Widget Pro, available Q2 2026"
    category: product-photography
    subject:
      - product
      - widget-pro
      - electronics
    
  technical:
    format: jpeg
    width: 4000
    height: 3000
    aspect_ratio: "4:3"
    color_space: sRGB
    color_profile: sRGB IEC61966-2.1
    bit_depth: 8
    compression: lossy
    quality: 85
    
  capture:
    date: 2026-01-15
    location: "Studio A, London"
    device: "Canon EOS R5"
    lens: "RF 100mm f/2.8L Macro"
    settings:
      aperture: f/8
      shutter: "1/125"
      iso: 100
    photographer: "Jane Smith"
    
  rights:
    owner: "Acme Corporation"
    copyright: "© 2026 Acme Corporation. All rights reserved."
    license: proprietary
    usage:
      internal: true
      marketing: true
      press: true
      third_party: false
    expiry: null
    
  ai:
    training: prohibited
    generation_source: false
    description_confidence: 0.95
    alt_text: "Silver Widget Pro device standing upright on white background, showing front panel with blue LED indicator and company logo"
    content_tags:
      - product
      - technology
      - minimal
      - professional
    detected_objects:
      - type: product
        label: "Widget Pro"
        confidence: 0.98
        bounds: [100, 200, 3800, 2800]
    detected_text:
      - text: "ACME"
        confidence: 0.99
        bounds: [1500, 1200, 1800, 1300]
    sensitive_content: false
    faces_present: false
```

### Image Content Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | Text | Human-readable title |
| `alt` | Text | Alternative text for accessibility |
| `caption` | Text | Display caption |
| `category` | Text | Image category |
| `subject` | Array | Subject matter tags |
| `keywords` | Array | Search keywords |

### Image Technical Properties

| Property | Type | Description |
|----------|------|-------------|
| `format` | Text | File format (jpeg, png, webp, etc.) |
| `width` | Number | Width in pixels |
| `height` | Number | Height in pixels |
| `aspect_ratio` | Text | Aspect ratio (e.g., "16:9") |
| `color_space` | Text | Color space (sRGB, Adobe RGB, etc.) |
| `color_profile` | Text | ICC profile name |
| `bit_depth` | Number | Bits per channel |
| `compression` | Text | Compression type (lossy, lossless, none) |
| `quality` | Number | Compression quality (0-100) |
| `file_size` | Number | File size in bytes |
| `dpi` | Number | Resolution in dots per inch |

### Image Capture Properties

| Property | Type | Description |
|----------|------|-------------|
| `date` | Date | Capture date |
| `location` | Text | Capture location |
| `coordinates` | Object | GPS coordinates (lat, lon) |
| `device` | Text | Camera or device |
| `lens` | Text | Lens used |
| `settings` | Object | Camera settings (aperture, shutter, ISO) |
| `photographer` | Text | Photographer name |

### Image Variants

For responsive images or format alternatives:

```yaml
mx:
  content:
    title: "Hero Image"
    
  variants:
    - file: hero-image-2x.jpg
      purpose: retina
      width: 4000
      height: 2000
      
    - file: hero-image-1x.jpg
      purpose: standard
      width: 2000
      height: 1000
      
    - file: hero-image.webp
      purpose: modern-format
      width: 2000
      height: 1000
      format: webp
      
    - file: hero-image-thumb.jpg
      purpose: thumbnail
      width: 400
      height: 200
      
  ai:
    preferred_variant: hero-image-1x.jpg
    thumbnail_variant: hero-image-thumb.jpg
```

---

## Video Metadata

### Core Video Properties

```yaml
# product-demo.mx.yaml
mx:
  version: "1.0"
  
  schema:
    "@type": VideoObject
    name: "Widget Pro Demo"
    description: "Product demonstration showing key features"
    duration: PT3M24S
    thumbnailUrl: /assets/product-demo-thumb.jpg
    uploadDate: 2026-01-20
    
  content:
    title: "Widget Pro Demo"
    description: "Three-minute demonstration of Widget Pro features including setup, daily use, and advanced configuration."
    category: product-demo
    subject:
      - product
      - tutorial
      - widget-pro
    language: en-GB
    
  technical:
    format: mp4
    codec:
      video: h264
      audio: aac
    width: 1920
    height: 1080
    aspect_ratio: "16:9"
    frame_rate: 30
    bit_rate:
      video: 8000000
      audio: 192000
    duration: 204          # seconds
    duration_formatted: "3:24"
    file_size: 245000000   # bytes
    
  production:
    date: 2026-01-18
    location: "Studio B, London"
    director: "John Director"
    producer: "Jane Producer"
    editor: "Sam Editor"
    
  structure:
    chapters:
      - title: "Introduction"
        start: 0
        end: 15
      - title: "Unboxing"
        start: 15
        end: 45
      - title: "Setup"
        start: 45
        end: 90
      - title: "Daily Use"
        start: 90
        end: 150
      - title: "Advanced Features"
        start: 150
        end: 195
      - title: "Conclusion"
        start: 195
        end: 204
        
  accessibility:
    captions:
      - language: en
        file: product-demo.en.vtt
        type: closed
      - language: es
        file: product-demo.es.vtt
        type: closed
    audio_description:
      available: true
      file: product-demo-ad.mp4
    transcript:
      file: product-demo-transcript.txt
      
  rights:
    owner: "Acme Corporation"
    copyright: "© 2026 Acme Corporation"
    license: proprietary
    usage:
      website: true
      social_media: true
      advertising: false
      third_party: false
      
  ai:
    training: prohibited
    description_confidence: 0.9
    transcript_source: human      # human | ai-generated | ai-assisted
    transcript_accuracy: 0.98
    content_tags:
      - product-demo
      - tutorial
      - technology
    scene_detection:
      - scene: 1
        start: 0
        end: 15
        description: "Presenter introduces video"
      - scene: 2
        start: 15
        end: 45
        description: "Product unboxing sequence"
    faces_present: true
    faces_identified: false       # No PII in face detection
    sensitive_content: false
    brand_safety: safe
```

### Video Technical Properties

| Property | Type | Description |
|----------|------|-------------|
| `format` | Text | Container format (mp4, webm, mov) |
| `codec.video` | Text | Video codec (h264, h265, vp9, av1) |
| `codec.audio` | Text | Audio codec (aac, opus, mp3) |
| `width` | Number | Width in pixels |
| `height` | Number | Height in pixels |
| `aspect_ratio` | Text | Aspect ratio |
| `frame_rate` | Number | Frames per second |
| `bit_rate.video` | Number | Video bitrate in bps |
| `bit_rate.audio` | Number | Audio bitrate in bps |
| `duration` | Number | Duration in seconds |
| `file_size` | Number | File size in bytes |

### Video Structure Properties

| Property | Type | Description |
|----------|------|-------------|
| `chapters` | Array | Chapter markers with title, start, end |
| `scenes` | Array | Scene breakdown |
| `keyframes` | Array | Key frame timestamps |
| `segments` | Array | Logical segments for streaming |

### Video Accessibility Properties

| Property | Type | Description |
|----------|------|-------------|
| `captions` | Array | Caption tracks (language, file, type) |
| `audio_description` | Object | Audio description track |
| `transcript` | Object | Full transcript file |
| `sign_language` | Object | Sign language interpretation track |

---

## Audio Metadata

### Core Audio Properties

```yaml
# podcast-ep-42.mx.yaml
mx:
  version: "1.0"
  
  schema:
    "@type": PodcastEpisode
    name: "Episode 42: The Future of AI"
    description: "Discussion on AI trends and implications"
    duration: PT45M30S
    episodeNumber: 42
    partOfSeries:
      "@type": PodcastSeries
      name: "Tech Perspectives"
      
  content:
    title: "Episode 42: The Future of AI"
    description: "In this episode, we discuss emerging AI trends, their implications for business, and what to expect in 2026 and beyond."
    category: technology
    subject:
      - artificial-intelligence
      - technology
      - business
    language: en-GB
    explicit: false
    
  technical:
    format: mp3
    codec: mp3
    bit_rate: 192000
    sample_rate: 44100
    channels: 2
    duration: 2730          # seconds
    duration_formatted: "45:30"
    file_size: 65520000     # bytes
    loudness:
      integrated: -16       # LUFS
      true_peak: -1         # dBTP
      
  production:
    date: 2026-01-25
    studio: "Podcast Studio, London"
    host: "Alex Host"
    guests:
      - name: "Dr Sarah Expert"
        role: guest
        affiliation: "Tech University"
      - name: "Mike Industry"
        role: guest
        affiliation: "AI Corp"
    producer: "Pat Producer"
    editor: "Sam Editor"
    
  structure:
    chapters:
      - title: "Introduction"
        start: 0
        end: 120
      - title: "AI Current State"
        start: 120
        end: 900
      - title: "Future Predictions"
        start: 900
        end: 1800
      - title: "Business Implications"
        start: 1800
        end: 2400
      - title: "Q&A and Wrap-up"
        start: 2400
        end: 2730
        
  distribution:
    podcast_feeds:
      - platform: apple-podcasts
        url: https://podcasts.apple.com/podcast/tech-perspectives
      - platform: spotify
        url: https://open.spotify.com/show/xxx
    publication_date: 2026-01-27
    season: 4
    episode: 42
    
  accessibility:
    transcript:
      file: podcast-ep-42-transcript.txt
      format: plain
      accuracy: 0.98
    captions:
      - language: en
        file: podcast-ep-42.en.vtt
        
  rights:
    owner: "Tech Perspectives Ltd"
    copyright: "© 2026 Tech Perspectives"
    license: cc-by-nc
    usage:
      streaming: true
      download: true
      redistribution: false
      clips: true
      clip_max_duration: 60
      
  ai:
    training: conditional
    training_conditions:
      - "Attribution required"
      - "Non-commercial use only"
    transcript_source: ai-assisted
    transcript_accuracy: 0.95
    speaker_diarization:
      - speaker: "Alex Host"
        segments: [[0, 120], [850, 900], [1750, 1800]]
      - speaker: "Dr Sarah Expert"
        segments: [[120, 500], [900, 1200]]
      - speaker: "Mike Industry"
        segments: [[500, 850], [1200, 1750]]
    content_tags:
      - artificial-intelligence
      - technology
      - interview
      - discussion
    sensitive_content: false
    music_detected:
      - type: intro
        start: 0
        end: 15
        rights: licensed
      - type: outro
        start: 2715
        end: 2730
        rights: licensed
```

### Audio Technical Properties

| Property | Type | Description |
|----------|------|-------------|
| `format` | Text | File format (mp3, wav, flac, ogg) |
| `codec` | Text | Audio codec |
| `bit_rate` | Number | Bitrate in bps |
| `sample_rate` | Number | Sample rate in Hz |
| `channels` | Number | Number of audio channels |
| `duration` | Number | Duration in seconds |
| `file_size` | Number | File size in bytes |
| `loudness.integrated` | Number | Integrated loudness in LUFS |
| `loudness.true_peak` | Number | True peak in dBTP |

### Audio Structure Properties

| Property | Type | Description |
|----------|------|-------------|
| `chapters` | Array | Chapter markers |
| `segments` | Array | Logical segments |
| `cue_points` | Array | Cue points for playback |

### Music-Specific Properties

```yaml
# track-01.mx.yaml
mx:
  schema:
    "@type": MusicRecording
    name: "Track Title"
    byArtist:
      "@type": MusicGroup
      name: "Artist Name"
    duration: PT4M32S
    
  content:
    title: "Track Title"
    artist: "Artist Name"
    album: "Album Name"
    track_number: 1
    disc_number: 1
    genre:
      - electronic
      - ambient
    mood:
      - relaxed
      - contemplative
    bpm: 90
    key: "C minor"
    
  rights:
    isrc: "GBXXX2600001"
    composer: "Composer Name"
    publisher: "Publisher Name"
    license: all-rights-reserved
    
  ai:
    training: prohibited
    sampling: prohibited
    remix: prohibited
    sync_licensing: contact_required
```

---

## Document Metadata

### Core Document Properties

```yaml
# annual-report-2025.mx.yaml
mx:
  version: "1.0"
  
  schema:
    "@type": Report
    name: "Annual Report 2025"
    description: "Company annual report for fiscal year 2025"
    datePublished: 2026-01-15
    
  content:
    title: "Annual Report 2025"
    subtitle: "Building the Future"
    description: "Comprehensive annual report covering financial performance, strategic initiatives, and outlook for Acme Corporation."
    category: corporate
    document_type: annual-report
    language: en-GB
    
  technical:
    format: pdf
    pages: 48
    file_size: 12500000
    version: "1.0"
    created: 2026-01-10
    modified: 2026-01-15
    
  structure:
    toc:
      - title: "Letter from the CEO"
        page: 2
      - title: "Financial Highlights"
        page: 4
      - title: "Business Overview"
        page: 8
      - title: "Financial Statements"
        page: 24
      - title: "Notes to Financials"
        page: 36
      - title: "Corporate Governance"
        page: 44
    sections:
      - title: "Financial Highlights"
        pages: [4, 5, 6, 7]
        contains:
          - charts
          - tables
          - key-metrics
          
  accessibility:
    tagged_pdf: true
    reading_order: logical
    alt_text_complete: true
    language_tagged: true
    
  rights:
    owner: "Acme Corporation"
    copyright: "© 2026 Acme Corporation"
    license: public
    confidentiality: public
    
  ai:
    training: permitted
    extraction: permitted
    summarisation: permitted
    ocr_confidence: 0.99
    tables_detected: 12
    charts_detected: 8
    sensitive_content:
      - type: financial
        pages: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
      - type: forward-looking-statements
        pages: [2, 3, 46, 47]
```

### Document Technical Properties

| Property | Type | Description |
|----------|------|-------------|
| `format` | Text | File format (pdf, docx, pptx, xlsx) |
| `pages` | Number | Page count |
| `file_size` | Number | File size in bytes |
| `version` | Text | Document version |
| `created` | Date | Creation date |
| `modified` | Date | Last modification date |
| `word_count` | Number | Word count |
| `encrypted` | Boolean | Whether document is encrypted |
| `password_protected` | Boolean | Whether password protected |

### Document Structure Properties

| Property | Type | Description |
|----------|------|-------------|
| `toc` | Array | Table of contents |
| `sections` | Array | Document sections |
| `bookmarks` | Array | Document bookmarks |
| `headings` | Array | Heading hierarchy |
| `attachments` | Array | Embedded attachments |

### Presentation-Specific Properties

```yaml
# quarterly-review.mx.yaml
mx:
  schema:
    "@type": PresentationDigitalDocument
    name: "Q4 2025 Review"
    
  content:
    title: "Q4 2025 Quarterly Review"
    presenter: "Jane Executive"
    audience: internal
    
  technical:
    format: pptx
    slides: 24
    
  structure:
    slides:
      - number: 1
        title: "Title Slide"
        type: title
        speaker_notes: true
      - number: 2
        title: "Agenda"
        type: agenda
      - number: 3
        title: "Q4 Highlights"
        type: content
        contains: [bullet-points, chart]
        
  ai:
    training: prohibited
    confidentiality: internal
    extractable_charts: 8
    speaker_notes_sensitive: true
```

---

## Rights and Licensing

### Rights Properties

All media types share common rights properties:

```yaml
rights:
  owner: "Entity Name"
  copyright: "© 2026 Entity Name"
  license: proprietary           # See license types below
  
  attribution:
    required: true
    format: "Photo by {photographer} / {owner}"
    
  usage:
    internal: true
    marketing: true
    editorial: true
    commercial: false
    advertising: false
    social_media: true
    print: false
    broadcast: false
    third_party: false
    derivative_works: false
    
  territorial:
    allowed: [GB, US, EU]
    restricted: [CN, RU]
    
  temporal:
    valid_from: 2026-01-01
    valid_until: 2027-01-01
    perpetual: false
    
  contact:
    licensing: licensing@example.com
    permissions: permissions@example.com
```

### License Types

| License | Description |
|---------|-------------|
| `proprietary` | All rights reserved |
| `public-domain` | No rights reserved |
| `cc-by` | Creative Commons Attribution |
| `cc-by-sa` | Creative Commons Attribution-ShareAlike |
| `cc-by-nc` | Creative Commons Attribution-NonCommercial |
| `cc-by-nc-sa` | Creative Commons Attribution-NonCommercial-ShareAlike |
| `cc-by-nd` | Creative Commons Attribution-NoDerivatives |
| `cc-by-nc-nd` | Creative Commons Attribution-NonCommercial-NoDerivatives |
| `cc0` | Creative Commons Zero (public domain dedication) |
| `editorial` | Editorial use only |
| `royalty-free` | Royalty-free license |
| `rights-managed` | Rights-managed license |
| `custom` | Custom license (see `license_url`) |

### AI-Specific Rights

```yaml
ai:
  training: prohibited           # prohibited | permitted | conditional
  training_conditions:
    - "Attribution required"
    - "Non-commercial only"
    - "Exclude from image generation models"
    
  generation_source: false       # Can this be used to generate new content?
  
  extraction: permitted          # Can AI extract information?
  summarisation: permitted       # Can AI summarise?
  
  embedding: conditional         # Can AI create embeddings?
  embedding_conditions:
    - "Internal use only"
    
  reproduction: prohibited       # Can AI reproduce in responses?
  
  citation_required: true        # Must AI cite when referencing?
```

---

## Asset Collections

### Gallery Metadata

```yaml
# /galleries/product-launch-2026/_mx.yaml
mx:
  version: "1.0"
  
  schema:
    "@type": ImageGallery
    name: "Product Launch 2026"
    description: "Official product photography for 2026 launch"
    
  collection:
    title: "Product Launch 2026"
    description: "Official photography from the Widget Pro product launch event"
    category: product-photography
    date: 2026-01-20
    
  defaults:
    rights:
      owner: "Acme Corporation"
      license: proprietary
      usage:
        marketing: true
        press: true
    ai:
      training: prohibited
      
  assets:
    - file: hero-shot.jpg
      featured: true
      sort_order: 1
      content:
        alt: "Widget Pro hero shot"
        
    - file: detail-01.jpg
      sort_order: 2
      content:
        alt: "Widget Pro detail - front panel"
        
    - file: detail-02.jpg
      sort_order: 3
      content:
        alt: "Widget Pro detail - connectivity ports"
        
    - file: lifestyle-01.jpg
      sort_order: 4
      content:
        alt: "Widget Pro in home office setting"
        
  presentation:
    layout: grid
    columns: 3
    thumbnail_size: 400
    featured_position: top
    
  ai:
    collection_description: "Professional product photography showing Widget Pro device from multiple angles and in lifestyle settings"
    suggested_uses:
      - product-pages
      - marketing-materials
      - press-releases
```

### Album Metadata (Audio)

```yaml
# /albums/album-name/_mx.yaml
mx:
  schema:
    "@type": MusicAlbum
    name: "Album Name"
    byArtist:
      "@type": MusicGroup
      name: "Artist Name"
      
  collection:
    title: "Album Name"
    artist: "Artist Name"
    release_date: 2026-02-01
    genre: [electronic, ambient]
    total_tracks: 10
    total_duration: 2700
    
  defaults:
    rights:
      owner: "Record Label"
      license: all-rights-reserved
    ai:
      training: prohibited
      
  tracks:
    - file: 01-opening.mp3
      track_number: 1
      title: "Opening"
      duration: 245
      
    - file: 02-journey.mp3
      track_number: 2
      title: "Journey"
      duration: 312
```

### Video Series Metadata

```yaml
# /series/tutorial-series/_mx.yaml
mx:
  schema:
    "@type": VideoGallery
    name: "Widget Pro Tutorial Series"
    
  collection:
    title: "Widget Pro Tutorial Series"
    description: "Complete tutorial series for Widget Pro"
    category: tutorials
    
  defaults:
    content:
      language: en-GB
    rights:
      license: proprietary
    ai:
      training: prohibited
      transcript_source: ai-assisted
      
  episodes:
    - file: 01-getting-started.mp4
      episode_number: 1
      title: "Getting Started"
      duration: 480
      
    - file: 02-basic-features.mp4
      episode_number: 2
      title: "Basic Features"
      duration: 720
      prerequisites:
        - 01-getting-started.mp4
```

---

## Inheritance

Media metadata supports inheritance from directory to asset, reducing repetition.

### Directory to Asset Inheritance

```yaml
# /assets/products/_mx.yaml
mx:
  defaults:
    rights:
      owner: "Acme Corporation"
      license: proprietary
    ai:
      training: prohibited
  mx:inheritable:
    - rights
    - ai
```

Individual assets inherit these defaults:

```yaml
# /assets/products/widget.mx.yaml
mx:
  content:
    title: "Widget Product Photo"
    alt: "Widget device on white background"
  # rights and ai inherited from directory
```

### Inheritance Chain

```
/assets/_mx.yaml                    # Repository asset defaults
  → /assets/products/_mx.yaml       # Product category defaults
    → /assets/products/widget.mx.yaml  # Individual asset
```

### Override Behaviour

Assets override inherited properties by declaring them:

```yaml
# /assets/products/widget-press.mx.yaml
mx:
  content:
    title: "Widget Press Photo"
  rights:
    usage:
      press: true
      third_party: true    # Overrides inherited false
  # ai still inherited from directory
```

### Blocking Inheritance

```yaml
mx:
  mx:inherit: false        # No inheritance from parent
  content:
    title: "Standalone Asset"
  rights:
    # Must declare everything
```

---

## Extensions

Media metadata supports extensions using the same namespace pattern as other MX specifications.

### DAM Extensions

Digital Asset Management system extensions:

```yaml
mx:
  content:
    title: "Product Photo"
    
  # DAM system extension
  dam:asset_id: "IMG-2026-00142"
  dam:workflow_status: approved
  dam:approval_date: 2026-01-18
  dam:approved_by: "Jane Manager"
  dam:collections:
    - "2026 Product Launch"
    - "Website Assets"
  dam:usage_count: 47
  dam:last_used: 2026-01-25
```

### Photography Extensions

```yaml
mx:
  content:
    title: "Portrait"
    
  # Photography extension
  photo:model_release: true
  photo:model_release_file: releases/MR-2026-001.pdf
  photo:property_release: false
  photo:retouching: minimal
  photo:raw_available: true
  photo:raw_file: archive/IMG_1234.CR3
```

### Broadcast Extensions

```yaml
mx:
  content:
    title: "News Package"
    
  # Broadcast extension
  broadcast:ready: true
  broadcast:standards: [ofcom, ebu-r128]
  broadcast:clearance: worldwide
  broadcast:embargo_until: 2026-02-01T09:00:00Z
  broadcast:kill_date: 2026-02-07
```

### Social Media Extensions

```yaml
mx:
  content:
    title: "Campaign Video"
    
  # Social media extension
  social:platforms:
    instagram:
      format: square
      variant: campaign-video-ig.mp4
      caption: "Introducing Widget Pro! 🚀"
      hashtags: [WidgetPro, Innovation, Tech]
    tiktok:
      format: vertical
      variant: campaign-video-tiktok.mp4
    youtube:
      format: landscape
      variant: campaign-video-yt.mp4
      title: "Widget Pro - Official Launch Video"
      description: "..."
      tags: [widget, technology, launch]
```

---

## Interpretation by AI Agents

### Processing Media Metadata

AI agents encountering media with MX sidecar files SHOULD:

1. Check for `.mx.yaml` sidecar before processing media
2. Respect rights and AI-specific permissions
3. Use provided descriptions rather than generating new ones
4. Follow usage restrictions

### Rights Interpretation

| Property | Agent Behaviour |
|----------|-----------------|
| `ai.training: prohibited` | Do not use for training or fine-tuning |
| `ai.generation_source: false` | Do not use to generate new content |
| `ai.extraction: prohibited` | Do not extract information from content |
| `ai.reproduction: prohibited` | Do not reproduce in responses |
| `ai.citation_required: true` | Always cite source when referencing |

### Description Handling

When `ai.alt_text` or `ai.description_confidence` is present:

- Use provided description rather than generating new one
- Note confidence level when relying on description
- If confidence is low (<0.7), consider generating supplementary description

### Sensitive Content Handling

When `ai.sensitive_content: true` or specific sensitivity flags are set:

- Do not display or reproduce without warning
- Respect content category (violence, adult, etc.)
- Follow platform-specific guidelines

### Collection Handling

When processing asset collections:

- Apply directory defaults to all assets
- Respect individual asset overrides
- Use collection context for better understanding
- Follow `ai.suggested_uses` when recommending assets

### Temporal Rights

When `rights.temporal` is present:

- Check `valid_from` and `valid_until` against current date
- Do not use expired assets
- Warn when approaching expiry

### Territorial Rights

When `rights.territorial` is present:

- Consider user location if known
- Flag territorial restrictions in responses
- Suggest alternatives for restricted territories

---

## Migration Guidance

### Phase 1: Audit Existing Assets

Inventory media assets and existing metadata:

```bash
# Find all media files
find /assets -type f \( -name "*.jpg" -o -name "*.mp4" -o -name "*.mp3" \)

# Check for existing embedded metadata
exiftool -json /assets/**/*.jpg > existing-metadata.json
```

### Phase 2: Create Directory Defaults

Start with directory-level defaults:

```yaml
# /assets/_mx.yaml
mx:
  version: "1.0"
  defaults:
    rights:
      owner: "Company Name"
      license: proprietary
    ai:
      training: prohibited
```

### Phase 3: Prioritise Key Assets

Create sidecar files for:

1. Hero images and featured content
2. Assets with complex rights
3. Assets requiring accessibility metadata
4. Frequently used assets

### Phase 4: Automate Where Possible

Extract metadata from embedded sources:

```bash
# Generate sidecar from EXIF/IPTC
mx-media extract /assets/photo.jpg > /assets/photo.mx.yaml
```

Bulk generate from asset database:

```bash
# Export DAM metadata to sidecar files
mx-media import --from dam-export.csv --to /assets/
```

### Phase 5: Validate and Refine

```bash
# Validate all sidecar files
mx-media validate /assets/**/*.mx.yaml

# Check for missing alt text
mx-media audit --missing alt /assets/
```

---

## Appendix A: Quick Reference

### Sidecar File Naming

| Asset | Sidecar |
|-------|---------|
| `image.jpg` | `image.mx.yaml` |
| `video.mp4` | `video.mx.yaml` |
| `audio.mp3` | `audio.mx.yaml` |
| Directory default | `_mx.yaml` |

### Common Properties by Media Type

| Property | Image | Video | Audio | Document |
|----------|-------|-------|-------|----------|
| `content.title` | ✓ | ✓ | ✓ | ✓ |
| `content.alt` | ✓ | | | |
| `content.description` | ✓ | ✓ | ✓ | ✓ |
| `technical.format` | ✓ | ✓ | ✓ | ✓ |
| `technical.duration` | | ✓ | ✓ | |
| `technical.pages` | | | | ✓ |
| `structure.chapters` | | ✓ | ✓ | |
| `accessibility.captions` | | ✓ | ✓ | |
| `accessibility.transcript` | | ✓ | ✓ | |

### AI Properties Summary

| Property | Values | Purpose |
|----------|--------|---------|
| `ai.training` | `prohibited`, `permitted`, `conditional` | Training data permission |
| `ai.generation_source` | Boolean | Can be used to generate new content |
| `ai.extraction` | `prohibited`, `permitted` | Information extraction permission |
| `ai.summarisation` | `prohibited`, `permitted` | Summarisation permission |
| `ai.reproduction` | `prohibited`, `permitted` | Reproduction in responses |
| `ai.citation_required` | Boolean | Must cite when referencing |
| `ai.description_confidence` | 0-1 | Confidence in provided description |
| `ai.transcript_source` | `human`, `ai-generated`, `ai-assisted` | Transcript origin |
| `ai.transcript_accuracy` | 0-1 | Transcript accuracy level |

### License Quick Reference

| License | Commercial | Derivatives | Attribution |
|---------|------------|-------------|-------------|
| `proprietary` | No | No | N/A |
| `cc-by` | Yes | Yes | Required |
| `cc-by-sa` | Yes | ShareAlike | Required |
| `cc-by-nc` | No | Yes | Required |
| `cc-by-nd` | Yes | No | Required |
| `cc0` | Yes | Yes | Not required |

---

## Appendix B: Schema.org Alignment

### Image Types

| MX Category | Schema.org Type |
|-------------|-----------------|
| Product photo | `ImageObject` with `Product` |
| Logo | `ImageObject` |
| Photograph | `Photograph` |
| Infographic | `ImageObject` |
| Illustration | `ImageObject` |

### Video Types

| MX Category | Schema.org Type |
|-------------|-----------------|
| Product demo | `VideoObject` |
| Tutorial | `HowToVideo` or `VideoObject` |
| Webinar | `VideoObject` with `Event` |
| Podcast video | `PodcastEpisode` |
| Advertisement | `VideoObject` with `Advertisement` |

### Audio Types

| MX Category | Schema.org Type |
|-------------|-----------------|
| Podcast | `PodcastEpisode` |
| Music track | `MusicRecording` |
| Audiobook | `Audiobook` |
| Sound effect | `AudioObject` |

### Document Types

| MX Category | Schema.org Type |
|-------------|-----------------|
| Report | `Report` |
| Whitepaper | `TechArticle` |
| Presentation | `PresentationDigitalDocument` |
| Spreadsheet | `SpreadsheetDigitalDocument` |
| Manual | `TechArticle` |

---

## Appendix C: References

- MX Base Specification: https://mx.community/spec/base
- MX Structured Data Specification: https://mx.community/spec/structured-data
- MX Code Metadata Specification: https://mx.community/spec/code-metadata
- Schema.org: https://schema.org/
- IPTC Photo Metadata: https://iptc.org/standards/photo-metadata/
- ID3 Tags: https://id3.org/
- XMP Specification: https://www.adobe.com/devnet/xmp.html
- Creative Commons Licenses: https://creativecommons.org/licenses/

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0-draft | January 2026 | Initial draft |
