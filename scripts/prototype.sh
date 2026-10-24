#!/usr/bin/env bash
# Serve design/ in the background so the prototype is at http://localhost:PORT/prototype/
# Usage: scripts/prototype.sh [start|stop|status]   (PORT defaults to 8000)
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
port="${PORT:-8000}"
pidfile="${TMPDIR:-/tmp}/estuary-prototype-$port.pid"
logfile="${TMPDIR:-/tmp}/estuary-prototype-$port.log"

running() { [[ -f "$pidfile" ]] && kill -0 "$(cat "$pidfile")" 2>/dev/null; }

case "${1:-start}" in
  start)
    if running; then
      echo "Already running (PID $(cat "$pidfile")): http://localhost:$port/prototype/"
      exit 0
    fi
    nohup python3 -m http.server "$port" --directory "$root/design" \
      >"$logfile" 2>&1 </dev/null &
    echo $! >"$pidfile"
    sleep 0.5
    if ! running; then
      echo "Failed to start; see $logfile" >&2
      rm -f "$pidfile"
      exit 1
    fi
    echo "Started (PID $(cat "$pidfile")): http://localhost:$port/prototype/"
    ;;
  stop)
    if running; then
      kill "$(cat "$pidfile")"
      echo "Stopped."
    else
      echo "Not running."
    fi
    rm -f "$pidfile"
    ;;
  status)
    if running; then
      echo "Running (PID $(cat "$pidfile")): http://localhost:$port/prototype/"
    else
      echo "Not running."
      exit 1
    fi
    ;;
  *)
    echo "Usage: $0 [start|stop|status]" >&2
    exit 2
    ;;
esac
