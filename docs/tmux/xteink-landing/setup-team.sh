#!/bin/bash

# Xteink Landing Page Team - Automated Setup Script
# Creates a tmux session with 2 Claude Code instances (PO, FE)

set -e

PROJECT_ROOT="/Users/phuhung/Documents/Studies/AIProjects/xteink"
SESSION_NAME="xteink-landing"

echo "Starting Xteink Landing Page Team Setup..."
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

# 4. Create 2-pane layout (horizontal split)
tmux split-window -h -t $SESSION_NAME
tmux select-layout -t $SESSION_NAME even-horizontal

# 5. Resize for proper pane widths
tmux resize-window -t $SESSION_NAME -x 400 -y 50

# 6. Set pane titles and role names
tmux select-pane -t $SESSION_NAME:0.0 -T "PO"
tmux select-pane -t $SESSION_NAME:0.1 -T "FE"

tmux set-option -p -t $SESSION_NAME:0.0 @role_name "PO"
tmux set-option -p -t $SESSION_NAME:0.1 @role_name "FE"

# 7. Get pane IDs
echo "Getting pane IDs..."
PANE_IDS=$(tmux list-panes -t $SESSION_NAME -F "#{pane_id}")
PO_PANE=$(echo "$PANE_IDS" | sed -n '1p')
FE_PANE=$(echo "$PANE_IDS" | sed -n '2p')

echo "Pane IDs:"
echo "  PO (Pane 0): $PO_PANE"
echo "  FE (Pane 1): $FE_PANE"

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

# PO - Opus (needs high reasoning for brand alignment decisions)
tmux send-keys -t $SESSION_NAME:0.0 "cd $PROJECT_ROOT && claude --model opus" C-m

# FE - Sonnet (implementation work)
tmux send-keys -t $SESSION_NAME:0.1 "cd $PROJECT_ROOT && claude --model sonnet" C-m

# 10. Wait for Claude Code to start
echo "Waiting 20 seconds for Claude Code instances..."
sleep 20

# 11. Initialize roles
echo "Initializing agent roles..."
tmux send-keys -t $SESSION_NAME:0.0 "/init-role PO" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.0 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.1 "/init-role FE" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.1 C-m

# 12. Wait for initialization
echo "Waiting 15 seconds for role initialization..."
sleep 15

# 13. Summary
echo ""
echo "Setup Complete!"
echo ""
echo "Session: $SESSION_NAME"
echo "Project: $PROJECT_ROOT"
echo ""
echo "Team Layout:"
echo "  +------------------+------------------+"
echo "  | PO (Opus)        | FE (Sonnet)      |"
echo "  | Pane 0           | Pane 1           |"
echo "  | $PO_PANE             | $FE_PANE             |"
echo "  +------------------+------------------+"
echo ""
echo "Workflow:"
echo "  Boss → PO: Sprint goals"
echo "  PO → FE: Requirements + brand guidance"
echo "  FE → PO: Completion reports"
echo ""
echo "Next steps:"
echo "  1. Attach: tmux attach -t $SESSION_NAME"
echo "  2. Boss provides Sprint Goal to PO via >>>"
echo ""
echo "To detach: Ctrl+B, then D"
echo "To kill: tmux kill-session -t $SESSION_NAME"

# 14. Move cursor to PO pane
tmux select-pane -t $SESSION_NAME:0.0
echo "Cursor in Pane 0 (PO)."
