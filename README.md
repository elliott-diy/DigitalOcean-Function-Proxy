# Cloudflare Worker for Digital Ocean Functions

This Cloudflare Worker script is designed to protect Digital Ocean Functions by providing rate limiting and DDoS protection. Digital Ocean Functions do not have built-in capabilities for these protections, so this worker acts as a front layer to handle these concerns. Additionally, it includes a maintenance mode feature.

## Features

- **Rate Limiting**: Limits the number of requests from a single IP address to prevent abuse.
- **DDoS Protection**: Helps mitigate DDoS attacks by rate limiting, filtering requests and utilizing Cloudflares WAF. 
- **Maintenance Mode**: Allows you to disable access to the function for maintenance purposes temporarily.

## Environment Variables

- `MAINTENANCE`: Set to `"true"` to enable maintenance mode.
- `TARGET_URL`: The URL of the Digital Ocean Function to be protected.
- `RATE_LIMITER`: A rate limiter instance to manage request limits.

## Usage

1. **Deploy the Worker**: Deploy this script as a Cloudflare Worker.
2. **Configure Environment Variables**: Set the required environment variables in the Cloudflare Worker settings.
3. **Enable Maintenance Mode**: Set `MAINTENANCE` to `"true"` to enable maintenance mode.

