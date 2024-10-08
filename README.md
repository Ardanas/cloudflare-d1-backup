 # Cloudflare D1 Backup

This project provides an automated backup solution for Cloudflare D1 databases. It creates SQL backups of your D1 database and stores them locally with timestamped filenames.

## Features

- Automated backups of Cloudflare D1 databases
- Timestamped backup files for easy version tracking
- Environment variable configuration for secure credential management
- Error handling and logging


## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/cloudflare-d1-backup.git
   cd cloudflare-d1-backup
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then, edit the `.env` file and fill in your Cloudflare credentials.

## Configuration

Edit the `.env` file and provide the following information:

- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_DATABASE_ID`: Your D1 database ID
- `CLOUDFLARE_API_KEY`: Your Cloudflare API key

## Usage

To create a backup, run:
```shell
node index.js
```
This will create a backup file in the `backups` directory with a timestamp in the filename.


## License
This project is licensed under the MIT License - see the LICENSE file for details.