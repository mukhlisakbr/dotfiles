#!/bin/bash

# Function to get the current public IP
get_ip() {
  curl -s https://ipv4.icanhazip.com
}

# Function to log with timestamp
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Function to log with timestamp and color
log_colored() {
  echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Get the current IP before reconnect
log "🔍 Checking current public IP address..."
old_ip=$(get_ip)
if [ -n "$old_ip" ]; then
  log "📍 Current IP: $old_ip"
else
  log "❌ Failed to retrieve current IP address"
  exit 1
fi

# Disconnect and reconnect WARP
log "🔄 Starting WARP reconnection process..."
log "⏹️  Disconnecting from WARP..."
disconnect_result=$(warp-cli disconnect 2>&1)
if [[ "$disconnect_result" == *"Success"* ]]; then
  log "✅ Successfully disconnected from WARP"
else
  log "❌ Failed to disconnect from WARP: $disconnect_result"
  exit 1
fi

log "⏳ Waiting 2 seconds before reconnecting..."
sleep 2

log "🔗 Connecting to WARP..."
connect_result=$(warp-cli connect 2>&1)
if [[ "$connect_result" == *"Success"* ]]; then
  log "✅ Successfully connected to WARP"
else
  log "❌ Failed to connect to WARP: $connect_result"
  exit 1
fi

log "⏳ Waiting 5 seconds for connection to stabilize..."
sleep 5

# Get the new IP
log "🔍 Checking new public IP address..."
new_ip=$(get_ip)
if [ -n "$new_ip" ]; then
  log "📍 New IP: $new_ip"
else
  log "❌ Failed to retrieve new IP address"
  exit 1
fi

# Compare IPs and show result
log "🔍 Comparing IP addresses..."
if [ "$old_ip" != "$new_ip" ]; then
  log "🎉 Success! IP address has changed successfully"
  log "📊 IP Change Summary:"
  log "   • Old IP: $old_ip"
  log "   • New IP: $new_ip"
  log_colored "\033[32m✅ WARP reconnection completed successfully - IP changed!\033[0m"
else
  log "⚠️  Warning: IP address has NOT changed"
  log "📊 IP Status:"
  log "   • Previous IP: $old_ip"
  log "   • Current IP:  $new_ip"
  log "💡 This might indicate:"
  log "   • WARP server assignment didn't change"
  log "   • Connection issue with WARP"
  log "   • ISP routing configuration"
  log_colored "\033[31m❌ WARP reconnection completed but IP remained the same\033[0m"
fi

log "🏁 WARP reconnection process completed"
