## SR5 ActiveEffect Negation Filter

This Shadowrun 5e module for Foundry VTT adds a compact "NOT" checkbox next to SR5 ActiveEffect Apply-To selection groups and stores per-entry negation as flags on the ActiveEffect.

- UI injection into SR5 ActiveEffect Config to show NOT checkboxes.
- Persists negation state in `effect.flags['sr5-ae-neg-filter']`.
- Patches effect application logic to respect negated selections.

This module is a required addition for automated running/sprinting active effects in modulr sr5-walk-run-modes.

<img width="682" height="883" alt="image" src="https://github.com/user-attachments/assets/ebfc6ec8-fb07-47d4-836d-8d35480db8ac" />


--

