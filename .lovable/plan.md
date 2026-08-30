# Daily Goal as a real mechanic + profile avatar fix

## 1. Fix the avatar in the round frame

In the profile card the 3D character sits off-center in its circle. Fix the framing so the head is centered horizontally and the shoulders fill the bottom edge, then verify with a screenshot of the card before and after.

Note: in the current preview capture of `/me`, the profile card area rendered blank (only the layout gap is visible). That will be investigated as part of this fix — the image sizing/animation may be pushing it out of view.

## 2. Make the Daily Study Goal drive everything

Today the goal buttons (15/30/45/60) only write a number to storage; nothing reads it. The streak uses a fixed 5-minute target instead. The plan unifies them:

- The chosen goal becomes **the** daily target. Reaching it earns the day and keeps the streak alive.
- Only real study time counts — video watch time, PDF reading, quiz answering — never just having the app open. This already exists as the "focus" timer; the app-open timer stays only for the "this week" effort number.
- Daily focus minutes are already stored per date (`{"2026-08-30": 18, ...}`), so no data migration is needed; the goal value moves into the same store so every screen reads one source.

## 3. New Daily Goal UI (Me page)

Replace the plain label + four buttons with a goal card:

```text
        Daily Study Goal
              (flame)
             18m / 30m
     ███████████░░░░░░░
      You're 12 minutes away

   15m    30m    45m    60m
          ^selected
```

Progress-aware message:
- 0m — Let's get started
- partway — X minutes to go
- reached — Goal complete, your streak is protected
- beyond — Goal crushed

Ring/bar animates as progress changes; completion gets a brief celebratory moment.

## 4. Goal card on the Learning (home) tab

Add a compact "Today's Goal" card at the top of Learning showing today's minutes vs goal, the progress bar, minutes left, and a **Continue studying** button that opens the most recently studied subject (falling back to the first unstarted one).

## 5. Smart goal suggestion

Once there are at least 5 days of history, show the user's recent daily average and suggest the nearest goal option (e.g. "You've been studying ~28 min/day — recommended goal: 30m") with a one-tap apply.

## 6. Keep the About Streak page truthful

That page currently hard-codes a 5-minute rule. Update its copy to describe the user-chosen goal instead.

## Technical notes

- `src/lib/activity.ts`: move the goal into the activity store (with the existing `biovision_daily_goal` value read once as a fallback), replace the constant `STREAK_GOAL_SECONDS` with a goal-aware check used by `earnedDay`/`streakDays`, and add helpers for today's progress, percent, and the suggested goal average.
- `src/routes/_tabs/me.tsx`: new goal card component using the live activity hook.
- `src/routes/_tabs/learning.tsx`: today's-goal card + Continue studying link.
- `src/routes/_tabs/streak.tsx`: copy update.
- Verify with Playwright screenshots (profile card, goal card empty/partial/complete states).
