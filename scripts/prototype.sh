#!/usr/bin/env bash
# Serve design/ in the background so the prototype is at http://localhost:PORT/prototype/
# Usage: scripts/prototype.sh [start|stop|status]   (PORT defaults to 8000)
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
port="${PORT:-8000}"
pidfile="${TMPDIR:-/tmp}/estuary-prototype-$port.pid"
logfile="${TMPDIR:-/tmp}/estuary-prototype-$port.log"
server_pid=""

running() {
  server_pid=""
  [[ -f "$pidfile" ]] || return 1
  local pid command expected
  pid="$(cat "$pidfile")"
  if [[ ! "$pid" =~ ^[0-9]+$ ]] || ! kill -0 "$pid" 2>/dev/null; then
    rm -f "$pidfile"
    return 1
  fi
  command="$(ps -p "$pid" -o args= 2>/dev/null)" || command=""
  expected="python3 -m http.server $port --directory $root/design"
  case "$command" in
    "$expected"|*/"$expected") server_pid="$pid"; return 0 ;;
  esac
  rm -f "$pidfile"
  return 1
}

case "${1:-start}" in
  start)
    if running; then
      echo "Already running (PID $server_pid): http://localhost:$port/prototype/"
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
    echo "Started (PID $server_pid): http://localhost:$port/prototype/"
    ;;
  stop)
    if running; then
      kill "$server_pid"
      echo "Stopped."
    else
      echo "Not running."
    fi
    rm -f "$pidfile"
    ;;
  status)
    if running; then
      echo "Running (PID $server_pid): http://localhost:$port/prototype/"
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
