# Repair Whop checkout and header branding

## Changes
- Replace the current mixed payment flow with Whop’s official React checkout using the live MAGEYE plan.
- Use one reliable embedded checkout per non-Mobile-Money choice, with adaptive pricing, supported wallet/card methods, loading, error, and completion states.
- Add a real checkout completion page that handles Whop’s `success` and `error` return statuses and returns viewers to their film.
- Keep Mobile Money separate as requested and clearly unavailable until its provider is connected.
- Remove the exposed Whop API key from source code and store it securely for server-only use.
- Make the header logo smaller and show “MAGEYE” beside it without disrupting centered navigation.

## Technical details
- Stop dynamically creating plans during checkout; use the existing active, unlimited-stock USD 5.99 monthly plan.
- Remove duplicate checkout widgets and fake card fields so customers only enter payment details inside Whop’s secure checkout.
- Preserve the current subscription modal and film access flow while improving return handling.
- Verify the live plan loads in the browser, payment errors are visible, and desktop/mobile header layout remains clean.
