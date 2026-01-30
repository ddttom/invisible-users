---
title: "MX Specifications: Chapter 5"
date: 2026-01-28
ld:
  "@type": Chapter
  headline: "Media Metadata"
  author:
    "@type": Person
    name: Tom Ledger
  isPartOf:
    "@type": Book
    name: "MX: Specifications"
  inLanguage: en-GB
  mx:audience: human
  mx:status: draft
  mx:confidence: 0.85
---

# Chapter 5: Media Metadata

A photograph is worth a thousand words — but machines can't read any of them.

When you look at an image, you see composition, lighting, subject matter, mood. You might recognise a product shot, understand it's meant for marketing, notice the careful staging. You bring context that the pixels don't contain.

AI has become remarkably good at describing what's *in* an image. It can identify objects, read text, describe scenes. But it still can't know what the image is *for*. It can't know who owns it, what you're allowed to do with it, whether it's approved for publication, or if using it for AI training would violate your licensing agreement.

The MX Media Metadata Specification provides this context. It describes images, video, audio, and documents in ways that tell machines not just what media contains, but how it should be used.

---

## The Sidecar Approach

Media files are binary. You can't embed YAML in a JPEG the way you embed frontmatter in Markdown.

MX uses sidecar files — separate metadata files that accompany media assets. For an image called `product-hero.jpg`, the metadata lives in `product-hero.jpg.mx.yaml`.

```
/assets/
  product-hero.jpg
  product-hero.jpg.mx.yaml
  team-photo.png
  team-photo.png.mx.yaml
  demo-video.mp4
  demo-video.mp4.mx.yaml
```

The sidecar approach has advantages:

- **Non-destructive** — Original media files remain unchanged
- **Readable** — Metadata is plain text you can edit with any tool
- **Portable** — Sidecars travel with assets when you move or copy them
- **Flexible** — Works for any media type without format-specific embedding

---

## Basic Media Metadata

Every media asset benefits from basic identification and description:

```yaml
# /assets/product-hero.jpg.mx.yaml
mx:
  version: "1.0"

asset:
  title: "Widget Pro Hero Image"
  description: "Product hero shot showing Widget Pro on white background"
  alt_text: "Widget Pro device shown at three-quarter angle on white background"
  
  type: image
  format: jpeg
  
  created: 2026-01-10
  modified: 2026-01-12

mx:status: published
mx:audience: both
```

### Core Properties

| Property | Description |
|----------|-------------|
| `title` | Human-readable name for the asset |
| `description` | Detailed description of content and purpose |
| `alt_text` | Accessibility text for images |
| `type` | Media type: image, video, audio, document |
| `format` | File format: jpeg, png, mp4, pdf, etc. |
| `created` | When the asset was created |
| `modified` | When last modified |

### Alt Text vs Description

These serve different purposes:

**Alt text** is for accessibility — what a screen reader should announce. It should be concise and describe what's visually present.

**Description** is for context — what the asset is for, how it should be used, what it represents. It can be longer and include information not visible in the image.

```yaml
asset:
  alt_text: "Bar chart showing quarterly revenue growth"
  description: |
    Q4 2025 revenue visualization for investor presentation.
    Shows 23% YoY growth. Approved by finance team.
    Use only in financial reports and investor materials.
```

---

## Technical Metadata

Technical properties describe the asset's physical characteristics:

### Images

```yaml
asset:
  type: image
  format: jpeg
  
  technical:
    width: 2400
    height: 1600
    aspect_ratio: "3:2"
    color_space: sRGB
    bit_depth: 8
    file_size: 1248576
    dpi: 300
```

### Video

```yaml
asset:
  type: video
  format: mp4
  
  technical:
    width: 1920
    height: 1080
    aspect_ratio: "16:9"
    duration: 180          # seconds
    frame_rate: 30
    codec: h264
    bitrate: 8000000       # bits per second
    file_size: 180000000
    
    audio:
      codec: aac
      channels: 2
      sample_rate: 48000
      bitrate: 256000
```

### Audio

```yaml
asset:
  type: audio
  format: mp3
  
  technical:
    duration: 245
    codec: mp3
    channels: 2
    sample_rate: 44100
    bitrate: 320000
    file_size: 9800000
```

### Documents

```yaml
asset:
  type: document
  format: pdf
  
  technical:
    pages: 24
    file_size: 2450000
    
    # PDF-specific
    pdf_version: "1.7"
    tagged: true           # Accessibility tagging
    searchable: true       # Text is extractable
```

---

## Capture Metadata

For photographs and recorded media, capture metadata describes how and where the asset was created:

### Photography

```yaml
asset:
  capture:
    device: "Canon EOS R5"
    lens: "RF 24-70mm F2.8 L IS USM"
    
    settings:
      aperture: 2.8
      shutter_speed: "1/250"
      iso: 400
      focal_length: 50
      
    photographer:
      name: "Sarah Chen"
      contact: "sarah@photography.example.com"
      
    location:
      name: "Acme Studio, London"
      latitude: 51.5074
      longitude: -0.1278
      
    date: 2026-01-10T14:30:00Z
```

### Video Recording

```yaml
asset:
  capture:
    device: "Sony FX6"
    
    settings:
      resolution: "4K"
      frame_rate: 24
      codec: "ProRes 422"
      
    director: "James Wilson"
    cinematographer: "Emily Zhang"
    
    location:
      name: "Pinewood Studios"
      
    date: 2026-01-08
    
    production:
      project: "Product Launch 2026"
      shoot_day: 2
      scene: "B-roll product shots"
```

### Audio Recording

```yaml
asset:
  capture:
    device: "Shure SM7B"
    interface: "Universal Audio Apollo"
    
    settings:
      sample_rate: 96000
      bit_depth: 24
      
    engineer: "Michael Park"
    
    location:
      name: "Voice recording booth"
      type: studio
      
    date: 2026-01-15
```

---

## Rights and Licensing

Rights metadata is crucial for media. It tells machines what they're allowed to do with an asset.

### Basic Rights

```yaml
asset:
  rights:
    owner: "Acme Corporation"
    copyright: "© 2026 Acme Corporation. All rights reserved."
    
    license:
      type: proprietary
      
    usage:
      internal: true
      external: false
      commercial: true
      editorial: true
```

### Creative Commons

```yaml
asset:
  rights:
    owner: "Sarah Chen"
    copyright: "© 2026 Sarah Chen"
    
    license:
      type: creative-commons
      variant: CC-BY-NC-SA-4.0
      url: https://creativecommons.org/licenses/by-nc-sa/4.0/
      
    attribution:
      required: true
      text: "Photo by Sarah Chen"
      url: https://sarahchen.photography
```

### Stock Media

```yaml
asset:
  rights:
    source: "Getty Images"
    license_id: "GTY-12345678"
    
    license:
      type: royalty-free
      purchased: 2026-01-05
      
    usage:
      territories: [GB, US, EU]
      channels: [web, print, social]
      duration: perpetual
      
    restrictions:
      - "No use in sensitive contexts"
      - "No resale or sublicensing"
      - "Maximum print run: 500,000"
```

### Rights-Managed

```yaml
asset:
  rights:
    source: "Photographer direct"
    
    license:
      type: rights-managed
      
    usage:
      territories: [GB]
      channels: [web]
      duration:
        start: 2026-01-01
        end: 2026-12-31
      exclusivity: false
      
    fee:
      amount: 500
      currency: GBP
      
    renewal:
      available: true
      contact: "licensing@photographer.example"
```

---

## AI-Specific Properties

Media metadata needs explicit AI permissions. What AI can do with an image differs from what humans can do.

### Training Permissions

```yaml
asset:
  ai:
    # Can this asset be used to train AI models?
    training:
      permitted: false
      reason: "Proprietary product imagery"
      
    # Can AI use this for in-context learning (RAG)?
    retrieval:
      permitted: true
      
    # Can AI generate descriptions of this asset?
    description:
      permitted: true
      
    # Can AI use this as reference for generation?
    reference:
      permitted: false
```

### AI-Generated Content

For AI-generated or AI-assisted media:

```yaml
asset:
  ai:
    generated: true
    
    generation:
      model: "DALL-E 3"
      prompt: "Professional product photo of a modern widget device..."
      date: 2026-01-12
      
      human_review:
        reviewed: true
        reviewer: "Jane Smith"
        date: 2026-01-12
        notes: "Minor color correction applied"
```

### Description Confidence

When AI generates descriptions or alt text:

```yaml
asset:
  ai:
    description:
      source: ai-generated
      model: "Claude Vision"
      confidence: 0.92
      
      human_verified: true
      verifier: "Content team"
      verified_date: 2026-01-15
```

---

## Accessibility

Accessibility metadata ensures media works for everyone:

### Images

```yaml
asset:
  accessibility:
    alt_text: "Widget Pro device shown at three-quarter angle"
    long_description: |
      The Widget Pro is displayed against a white background,
      positioned at a three-quarter angle to show both the
      front panel controls and the side port configuration.
      
    decorative: false
```

### Video

```yaml
asset:
  accessibility:
    captions:
      available: true
      languages: [en-GB, de-DE, fr-FR]
      format: WebVTT
      location: /captions/demo-video/
      
    transcript:
      available: true
      location: /transcripts/demo-video.txt
      
    audio_description:
      available: true
      location: /audio-desc/demo-video-ad.mp4
      
    sign_language:
      available: false
```

### Audio

```yaml
asset:
  accessibility:
    transcript:
      available: true
      location: /transcripts/podcast-ep-42.txt
      languages: [en-GB]
      
    transcript_source: human  # human, ai-generated, ai-assisted
    transcript_accuracy: 0.99
```

---

## Variants and Derivatives

Media often exists in multiple versions — different sizes, formats, crops. Variant metadata tracks these relationships.

### Image Variants

```yaml
# /assets/product-hero.jpg.mx.yaml
asset:
  title: "Widget Pro Hero Image"
  
  variants:
    - name: original
      path: product-hero.jpg
      width: 4800
      height: 3200
      
    - name: web-large
      path: product-hero-1200.jpg
      width: 1200
      height: 800
      purpose: "Web hero sections"
      
    - name: web-medium
      path: product-hero-800.jpg
      width: 800
      height: 533
      purpose: "Blog posts, cards"
      
    - name: thumbnail
      path: product-hero-thumb.jpg
      width: 200
      height: 133
      purpose: "Gallery thumbnails"
      
    - name: social
      path: product-hero-social.jpg
      width: 1200
      height: 630
      purpose: "Open Graph / Twitter cards"
      crop: "center-weighted"
```

### Format Variants

```yaml
asset:
  variants:
    - name: original
      path: demo-video.mov
      format: prores
      purpose: "Archive master"
      
    - name: web-hd
      path: demo-video.mp4
      format: h264
      resolution: 1080p
      bitrate: 8000000
      purpose: "Web playback"
      
    - name: web-sd
      path: demo-video-720.mp4
      format: h264
      resolution: 720p
      bitrate: 4000000
      purpose: "Lower bandwidth"
      
    - name: webm
      path: demo-video.webm
      format: vp9
      resolution: 1080p
      purpose: "WebM fallback"
```

---

## Collections and Albums

Media often belongs to collections — a photo shoot, a campaign, a product line.

### Collection Definition

```yaml
# /assets/campaigns/q1-2026/.mx.yaml
mx:
  version: "1.0"

collection:
  name: "Q1 2026 Product Launch"
  description: "Visual assets for the Q1 2026 Widget Pro launch campaign"
  
  created: 2026-01-05
  
  owner:
    team: creative
    contact: creative@acme.example.com
    
  defaults:
    rights:
      owner: "Acme Corporation"
      license:
        type: proprietary
    ai:
      training:
        permitted: false
        
  members:
    - product-hero.jpg
    - product-lifestyle-*.jpg
    - demo-video.mp4
    - product-360/*.jpg
```

### Album Membership

Individual assets can reference their collection:

```yaml
asset:
  title: "Widget Pro Lifestyle Shot 1"
  
  collections:
    - name: "Q1 2026 Product Launch"
      path: /assets/campaigns/q1-2026/
      role: hero
      
    - name: "Widget Pro Product Library"
      path: /assets/products/widget-pro/
      role: lifestyle
```

---

## Workflow Metadata

Media assets move through workflows — review, approval, publication. Tracking this state helps machines know what's ready to use.

### Approval Status

```yaml
asset:
  workflow:
    status: approved
    
    review:
      - reviewer: "Creative Director"
        date: 2026-01-12
        decision: approved
        notes: "Good composition, approved for all channels"
        
      - reviewer: "Legal"
        date: 2026-01-13
        decision: approved
        notes: "Rights cleared for intended use"
        
    approved_for:
      - web
      - print
      - social
      - advertising
      
    restrictions:
      - "Not approved for use in Germany (model release limitation)"
```

### Version History

```yaml
asset:
  workflow:
    version: 3
    
    history:
      - version: 1
        date: 2026-01-10
        author: "Sarah Chen"
        notes: "Initial capture"
        
      - version: 2
        date: 2026-01-11
        author: "Post-production"
        notes: "Color correction, retouching"
        
      - version: 3
        date: 2026-01-12
        author: "Creative Director"
        notes: "Final crop adjustment"
```

---

## Directory Inheritance

Like other MX specifications, media metadata supports inheritance. Set defaults at the directory level, override at the asset level.

### Directory Defaults

```yaml
# /assets/products/.mx.yaml
mx:
  version: "1.0"

directory:
  description: "Product photography library"
  
  defaults:
    rights:
      owner: "Acme Corporation"
      copyright: "© 2026 Acme Corporation"
      license:
        type: proprietary
        
    ai:
      training:
        permitted: false
      retrieval:
        permitted: true
        
    mx:status: published
    mx:audience: both
    
  mx:inheritable:
    - rights
    - ai
    - mx:status
    - mx:audience
```

### Asset Override

```yaml
# /assets/products/widget-pro-press.jpg.mx.yaml
asset:
  title: "Widget Pro Press Kit Image"
  
  # Override the default proprietary license
  rights:
    owner: "Acme Corporation"
    license:
      type: press
      usage:
        editorial: true
        commercial: false
      attribution:
        required: true
        text: "Image courtesy of Acme Corporation"
```

---

## Integration with DAM Systems

Many organisations use Digital Asset Management systems. MX metadata can integrate with or complement DAM workflows.

### DAM Reference

```yaml
asset:
  dam:
    system: "Adobe Experience Manager Assets"
    asset_id: "aem-asset-12345"
    repository: "marketing-assets"
    
    sync:
      direction: bidirectional
      last_sync: 2026-01-15T10:30:00Z
      
    fields_mapped:
      title: dc:title
      description: dc:description
      rights.owner: xmpRights:Owner
```

### Metadata Preservation

When assets move between systems:

```yaml
asset:
  preservation:
    # Embedded metadata to preserve
    embedded:
      exif: true
      iptc: true
      xmp: true
      
    # External metadata sources
    external:
      - source: dam
        priority: 1
      - source: sidecar
        priority: 2
        
    # Conflict resolution
    conflicts: sidecar-wins
```

---

## Putting It Together

Here's a complete example for a product image:

```yaml
# /assets/products/widget-pro/hero.jpg.mx.yaml
mx:
  version: "1.0"

asset:
  title: "Widget Pro Hero Image"
  description: |
    Primary hero image for Widget Pro product pages and marketing.
    Shot on white background with soft lighting to emphasise
    the device's premium finish and clean design lines.
  alt_text: "Widget Pro device displayed at three-quarter angle on white background"
  
  type: image
  format: jpeg
  
  created: 2026-01-10
  modified: 2026-01-12
  
  technical:
    width: 4800
    height: 3200
    aspect_ratio: "3:2"
    color_space: sRGB
    dpi: 300
    file_size: 8540000
    
  capture:
    device: "Canon EOS R5"
    lens: "RF 100mm F2.8 L Macro"
    photographer:
      name: "Sarah Chen"
    location:
      name: "Acme Product Studio"
    date: 2026-01-10T14:30:00Z
    
  rights:
    owner: "Acme Corporation"
    copyright: "© 2026 Acme Corporation. All rights reserved."
    license:
      type: proprietary
    usage:
      internal: true
      external: true
      commercial: true
      
  ai:
    training:
      permitted: false
      reason: "Proprietary product imagery"
    retrieval:
      permitted: true
    description:
      permitted: true
      
  accessibility:
    alt_text: "Widget Pro device displayed at three-quarter angle on white background"
    decorative: false
    
  variants:
    - name: original
      path: hero.jpg
      width: 4800
      height: 3200
      
    - name: web
      path: hero-1200.jpg
      width: 1200
      height: 800
      
    - name: thumbnail
      path: hero-thumb.jpg
      width: 300
      height: 200
      
    - name: social
      path: hero-og.jpg
      width: 1200
      height: 630
      
  collections:
    - name: "Widget Pro Product Library"
      path: /assets/products/widget-pro/
      role: hero
      
  workflow:
    status: approved
    version: 3
    approved_for: [web, print, social, advertising]

mx:status: published
mx:audience: both
mx:volatility: stable
mx:confidence: 1.0
```

This metadata tells machines everything they need to know:

- What the image shows and what it's for
- Technical specifications for rendering decisions
- Who created it and how
- What you can and can't do with it
- Whether AI can use it and how
- What accessibility features exist
- What variants are available
- Where it belongs and what it's approved for

An AI encountering this asset can make informed decisions about whether to use it, how to describe it, and what restrictions to respect.

---

## Beyond Static Assets

The patterns in this chapter apply to any binary content — not just traditional media. Design files, 3D models, data visualisations, interactive content — anything that can't carry embedded frontmatter benefits from sidecar metadata.

The key insight is that binary content has context that matters. A file's bytes tell you what it contains. Metadata tells you what it means, who owns it, and what you're allowed to do with it.

---

*The following chapter covers the Content Fragment Specification — how to describe headless content for multi-channel delivery.*
