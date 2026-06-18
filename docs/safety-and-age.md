# Safety And Age Policy

## Launch Boundary

Cum Together must not launch as a public adult room product until the minors policy, reporting flow, host controls, and abuse response process are real. The prototype is for design and technical feedback.

## Non-Negotiable Rules

- Adults only.
- No minors present, visible, nearby, or able to enter the camera frame.
- No faces by default.
- No contact exchange.
- No recording, screenshots, streaming, or sharing.
- No chat, DMs, comments, voice, music, tips, rankings, likes, followers, or public profiles by default.
- Pause, hide, leave, report, and host removal must be immediate.

## Age Strategy

The product needs layered age protection:

1. Adult-only warning before entry.
2. Explicit 18+ agreement per room.
3. Host responsibility for room membership.
4. Report and immediate removal for suspected minors.
5. Stronger verification before public rooms become real.
6. Clear permanent bans for minors, people inviting minors, or people exposing minors to rooms.

Automated age estimation must not be the only protection. It can be wrong, biased, and dangerous if treated as proof. If used later, it should only trigger conservative safety actions such as pausing a camera, escalating review, or requiring verification.

## No-Face Enforcement

No-face is both a privacy feature and a leveling principle.

- The camera setup should teach face-out framing.
- Local face blur should cover detected faces before room video where supported.
- Safari should use the local MediaPipe fallback when native face detection is missing.
- If a detector returns no face, the expected face zone should stay blurred instead of exposing a raw frame.
- Unsupported browsers must be presented as manual framing only when they cannot create a protected canvas video stream.
- A stronger local model can be added later for broader browser support.
- Face rooms can exist later, but must be separate and explicit.

## Contact Exchange Prevention

Contact exchange creates stalking, harassment, and off-platform pressure. The app should block or remove:

- names and handles
- emails and phone numbers
- links and invite codes
- QR codes
- written signs in camera
- profile fields that become contact fields

Local text and QR detection can help, but cannot replace reporting and host controls.

## Reporting Reasons

The first report reasons are:

- contact shown
- recording concern
- suspected minor
- harassment
- consent concern

Reports should locally hide the reported tile immediately for the reporter. Host removal can happen separately.

## Witness Mode Safety

Witness mode may help shy or lonely users participate, but it can also recreate one-way extraction. It should be controlled by room policy:

- witnesses allowed
- witnesses not allowed
- maximum witness ratio
- host can remove witnesses
- visible participants can leave without penalty

Women and other users who are often targeted should never become objects for an unlimited silent audience.

## Recording Honesty

Browsers cannot fully prevent screen recording. The product can:

- forbid recording culturally and legally
- avoid built-in recording tools
- detect some suspicious behavior later
- make reporting easy
- remove and ban violators

It must not promise impossible technical guarantees.

## Moderator And Host Actions

Host tools should include:

- admit
- remove
- lock room
- end room
- set witness policy
- set max size
- mute is unnecessary because rooms are silent by design

Moderation should feel protective and calm, not punitive theater.
