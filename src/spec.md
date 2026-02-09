# Specification

## Summary
**Goal:** Display and manage the cafe’s address, phone number, and business hours consistently across the public site footer and Contact & Location section.

**Planned changes:**
- Update the public footer “Visit Us” block to show address, phone, and hours sourced from `HomePageContent.contactInfo` when available, with fallbacks to existing default values.
- Update the admin Editor “Contact Info” tab to edit and save `contactInfo.address`, `contactInfo.phone`, and `contactInfo.hours` without overwriting other contact/location content.
- Verify the public Contact & Location section renders address/phone/hours in their dedicated UI areas and supports multiline hours (split on newlines), with fallbacks when fields are missing.

**User-visible outcome:** Visitors can see the cafe’s full address, phone number, and business hours in the footer and Contact & Location section, and admins can edit these three fields in the editor and have them persist after saving and reloading.
