# Initialize Agent Role

You are initializing as a member of the Xteink Landing Page Team.

## Step 1: Detect Team

Based on the tmux session name, determine which team you belong to.

Check with:
```bash
tmux display-message -p '#S'
```

## Step 2: Read System Documentation

Read the team overview:

**File**: `docs/tmux/xteink-landing/workflow.md`

## Step 3: Read Your Role Prompt

Based on the role argument `$ARGUMENTS`, read your specific role prompt:

- **PO** (Product Owner): `docs/tmux/xteink-landing/prompts/PO_PROMPT.md`
- **FE** (Frontend Developer): `docs/tmux/xteink-landing/prompts/FE_PROMPT.md`

## Step 4: Understand Your Mission

After reading both files:
1. Confirm your role and responsibilities
2. Verify your communication pane IDs are configured
3. Check the WHITEBOARD for current sprint status
4. Be ready to execute your role in the workflow

## Step 5: Announce Readiness

After initialization, announce:
```
[ROLE] initialized and ready.
Team: xteink-landing
WHITEBOARD status: [status from WHITEBOARD.md]
Awaiting Boss directives.
```
