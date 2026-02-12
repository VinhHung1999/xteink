#!/bin/bash

# Xteink Website Team - Automated Setup Script
# Creates a tmux session with 6 Claude Code instances (PO, SM, TL, FE, BE, QA)

set -e

PROJECT_ROOT="/Users/hungphu/Documents/AI_Projects/xteink"
SESSION_NAME="xteink-landing"

echo "Starting Xteink Website Team Setup (6 agents)..."
echo "Project Root: $PROJECT_ROOT"
echo "Session Name: $SESSION_NAME"

# 1. Check if session already exists
if tmux has-session -t $SESSION_NAME 2>/dev/null; then
    echo "Session '$SESSION_NAME' already exists!"
    read -p "Kill existing session and create new one? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        tmux kill-session -t $SESSION_NAME
        echo "Killed existing session"
    else
        echo "Aborted. Use 'tmux attach -t $SESSION_NAME' to attach"
        exit 0
    fi
fi

# 2. Verify tm-send is installed globally
echo "Verifying tm-send installation..."
if command -v tm-send >/dev/null 2>&1; then
    echo "tm-send is installed at: $(which tm-send)"
else
    echo ""
    echo "ERROR: tm-send is not installed!"
    echo "tm-send is a GLOBAL tool that must be installed to ~/.local/bin/tm-send"
    echo "Install it first, then re-run this script."
    exit 1
fi

# 3. Start new tmux session
echo "Creating tmux session '$SESSION_NAME'..."
cd "$PROJECT_ROOT"
tmux new-session -d -s $SESSION_NAME

# 4. Create 6-pane layout (2 rows x 3 columns)
# Split horizontally first (top/bottom)
tmux split-window -v -t $SESSION_NAME
# Split top row into 3
tmux split-window -h -t $SESSION_NAME:0.0
tmux split-window -h -t $SESSION_NAME:0.0
# Split bottom row into 3
tmux split-window -h -t $SESSION_NAME:0.3
tmux split-window -h -t $SESSION_NAME:0.3

# Even out the layout
tmux select-layout -t $SESSION_NAME tiled

# 5. Resize for proper pane sizes
tmux resize-window -t $SESSION_NAME -x 600 -y 60

# 6. Set pane titles and role names
# After tiled layout, pane order: 0=PO, 1=SM, 2=TL, 3=FE, 4=BE, 5=QA
ROLES=("PO" "SM" "TL" "FE" "BE" "QA")
for i in "${!ROLES[@]}"; do
    tmux select-pane -t "$SESSION_NAME:0.$i" -T "${ROLES[$i]}"
    tmux set-option -p -t "$SESSION_NAME:0.$i" @role_name "${ROLES[$i]}"
done

# 7. Get pane IDs
echo "Getting pane IDs..."
PANE_IDS=$(tmux list-panes -t $SESSION_NAME -F "#{pane_id}")
PO_PANE=$(echo "$PANE_IDS" | sed -n '1p')
SM_PANE=$(echo "$PANE_IDS" | sed -n '2p')
TL_PANE=$(echo "$PANE_IDS" | sed -n '3p')
FE_PANE=$(echo "$PANE_IDS" | sed -n '4p')
BE_PANE=$(echo "$PANE_IDS" | sed -n '5p')
QA_PANE=$(echo "$PANE_IDS" | sed -n '6p')

echo "Pane IDs:"
echo "  PO (Pane 0): $PO_PANE"
echo "  SM (Pane 1): $SM_PANE"
echo "  TL (Pane 2): $TL_PANE"
echo "  FE (Pane 3): $FE_PANE"
echo "  BE (Pane 4): $BE_PANE"
echo "  QA (Pane 5): $QA_PANE"

# 8. Verify SessionStart hook
HOOK_FILE="$PROJECT_ROOT/.claude/hooks/post_compact_tmux_reminder.sh"

if [ ! -f "$HOOK_FILE" ]; then
    echo ""
    echo "WARNING: SessionStart hook not found at $HOOK_FILE"
    echo "Without this hook, agents will lose context after auto-compact!"
    echo ""
fi

# 9. Start Claude Code in each pane
echo "Starting Claude Code in all panes..."

# PO - Opus (product decisions, brand alignment)
tmux send-keys -t $SESSION_NAME:0.0 "cd $PROJECT_ROOT && claude --model opus" C-m

# SM - Sonnet (process facilitation, lightweight)
tmux send-keys -t $SESSION_NAME:0.1 "cd $PROJECT_ROOT && claude --model sonnet" C-m

# TL - Opus (architecture decisions, code review)
tmux send-keys -t $SESSION_NAME:0.2 "cd $PROJECT_ROOT && claude --model opus" C-m

# FE - Opus (frontend implementation)
tmux send-keys -t $SESSION_NAME:0.3 "cd $PROJECT_ROOT && claude --model opus" C-m

# BE - Opus (backend implementation)
tmux send-keys -t $SESSION_NAME:0.4 "cd $PROJECT_ROOT && claude --model opus" C-m

# QA - Sonnet (testing, validation)
tmux send-keys -t $SESSION_NAME:0.5 "cd $PROJECT_ROOT && claude --model sonnet" C-m

# 10. Wait for Claude Code to start
echo "Waiting 30 seconds for Claude Code instances..."
sleep 30

# 11. Initialize roles
echo "Initializing agent roles..."
for i in "${!ROLES[@]}"; do
    tmux send-keys -t "$SESSION_NAME:0.$i" "/init-role ${ROLES[$i]}" C-m
    sleep 0.3
    tmux send-keys -t "$SESSION_NAME:0.$i" C-m
    sleep 2
done

# 12. Wait for initialization
echo "Waiting 30 seconds for role initialization..."
sleep 30

# 13. Summary
echo ""
echo "Setup Complete!"
echo ""
echo "Session: $SESSION_NAME"
echo "Project: $PROJECT_ROOT"
echo ""
echo "Team Layout (2x3 grid):"
echo "  +------------------+------------------+------------------+"
echo "  | PO (Opus)        | SM (Sonnet)      | TL (Opus)        |"
echo "  | Pane 0           | Pane 1           | Pane 2           |"
echo "  | $PO_PANE             | $SM_PANE             | $TL_PANE             |"
echo "  +------------------+------------------+------------------+"
echo "  | FE (Opus)        | BE (Opus)        | QA (Sonnet)      |"
echo "  | Pane 3           | Pane 4           | Pane 5           |"
echo "  | $FE_PANE             | $BE_PANE             | $QA_PANE             |"
echo "  +------------------+------------------+------------------+"
echo ""
echo "Workflow:"
echo "  Boss → PO: Sprint goals"
echo "  PO → SM: Sprint planning"
echo "  SM → Team: Coordinate ceremonies"
echo "  TL → FE/BE: Technical direction + code review"
echo "  QA → FE/BE: Bug reports"
echo "  FE/BE → TL: Code review requests"
echo ""
echo "Next steps:"
echo "  1. Attach: tmux attach -t $SESSION_NAME"
echo "  2. Boss provides Sprint Goal to PO"
echo ""
echo "To detach: Ctrl+B, then D"
echo "To kill: tmux kill-session -t $SESSION_NAME"

# 14. Move cursor to PO pane
tmux select-pane -t $SESSION_NAME:0.0
echo "Cursor in Pane 0 (PO)."
