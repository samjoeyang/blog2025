#!/bin/bash
# Cron wrapper for auto-publish-108.mjs
# Called by crontab at midnight daily
cd /Users/samjoeyang/workspace/blog2025
node scripts/auto-publish-108.mjs >> /tmp/108-publish.log 2>&1
