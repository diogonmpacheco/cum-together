# Cum Together Design Brief

**Live prototype:** [https://diogonmpacheco.github.io/cum-together/](https://diogonmpacheco.github.io/cum-together/)

## One-Line Concept

Cum Together is an adult-only, no-face, silent video room for shared presence without feeds, rankings, DMs, tips, or public exposure.

The name is a deliberate adult wordplay on “Come Together.” It should feel clever and culturally legible, but the design should not borrow Beatles artwork, lyrics, typography, or visual identity.

## Why It Exists

Most adult video spaces copy the same pattern: people are browsed, ranked, messaged, skipped, tipped, saved, and treated as inventory. This excludes many people and makes others unsafe.

Cum Together starts from a different premise: people should be able to participate in a shared adult room without showing their face, competing for attention, receiving messages, revealing contact details, or becoming a public profile.

## Product Promise

See and be seen, without being chased or exposed.

The room should feel like a protected shared space, not a cam marketplace, dating app, porn tube, social feed, or nightclub flyer.

## Primary Audiences

- Adults who want shared presence instead of isolated porn consumption.
- Women and femme users who need protection from messages, pursuit, and saved identities.
- Queer communities that already use improvised tools like Zoom or Telegram but lack purpose-built safety.
- Older people, fat people, disabled people, trans and nonbinary people, shy people, couples, and people with bodies ignored by mainstream adult platforms.
- Witnesses who may want to be present without performing, if the room explicitly allows it.

## Non-Negotiables

- Adults only.
- No faces by default.
- No microphones, voice, music, chat, DMs, comments, or inboxes by default.
- No public discovery feed of bodies.
- No rankings, likes, tips, followers, promoted tiles, or popularity mechanics.
- No contact exchange: names, handles, emails, phone numbers, links, and QR codes should be forbidden.
- No built-in recording, screenshots, streaming, or sharing tools.
- Pause, hide, leave, report, and host removal should feel immediate and available.

## Current Prototype

The first prototype demonstrates:

- first-time project intro
- public room and private link room entry
- no-face room agreement
- no-face camera setup before entry
- camera preview with local face guard where supported
- silent-only media access
- equal video tile direction
- safety guard panel
- host controls prototype
- manual WebRTC offer/answer for peer testing
- 20-window room layout direction for mobile and desktop

It is not production-ready. The prototype is a design and product direction artifact.

## Foundation Docs

- [Room model](room-model.md)
- [Signaling plan](signaling.md)
- [Safety and age policy](safety-and-age.md)
- [Ethical monetization](monetization.md)

## Redesign Goals

- Make the project feel serious, safe, and adult without looking clinical or corporate.
- Explain the idea quickly enough that a new visitor understands why it is different.
- Make no-face participation feel normal and dignified, not secretive or shameful.
- Keep the room interface calm, low-pressure, and easy to leave.
- Support mobile-first use without making the room feel tiny or chaotic.
- Show many people can be present while only rendering what the user is actually viewing.
- Communicate privacy honestly: peer-to-peer first, no microphones, but no false promise that browsers can prevent all recording.

## Visual Direction

Aim for:

- warm privacy
- calm confidence
- adult but not porn-branded
- inclusive, body-neutral, non-glossy
- quiet operational controls
- clear safety states
- low-pressure entry

Avoid:

- neon nightlife aesthetics
- porn tube visual language
- crypto/startup hype
- glossy influencer branding
- gamified ranking cues
- overly medical or therapy-like design
- shame-heavy language

## Key Design Questions

- What should the first 30 seconds feel like for someone nervous but curious?
- How do we communicate “no face expected” without making users feel policed?
- How can a room with many people feel collective, not overwhelming?
- How should witness mode work without turning visible participants into objects?
- What does “safe for women” look like in layout, defaults, and controls?
- How does the UI show that everyone is equally present?
- What should the pause/hide/leave controls look like so they feel instinctive?
- How do we make privacy limitations honest without scaring people away?

## Possible Next Design Deliverables

- redesigned first-time intro
- mobile-first room layout for 20 visible people
- desktop room layout with safety guard and host controls
- room-entry agreement flow
- no-face camera setup screen
- witness mode rules and indicators
- host moderation panel
- visual identity system: type, color, icons, tone, imagery
