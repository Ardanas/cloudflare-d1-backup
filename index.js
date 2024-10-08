import { createBackup } from "@cretezy/cloudflare-d1-backup";
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function generateBackup(accountId, databaseId, apiKey, limit = 1000) {
  try {
    return await createBackup({
      accountId,
      databaseId,
      apiKey,
      limit,
    });
  } catch (error) {
    console.error('Error generating backup:', error.message);
    throw error;
  }
}

async function ensureBackupDirectory(dirName) {
  try {
    await fs.mkdir(dirName, { recursive: true });
    return dirName;
  } catch (error) {
    console.error('Error creating backup directory:', error.message);
    throw error;
  }
}

function generateFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return `backup_${timestamp}.sql`;
}

async function saveBackupFile(backupDir, fileName, data) {
  try {
    const filePath = path.join(backupDir, fileName);
    await fs.writeFile(filePath, data);
    return filePath;
  } catch (error) {
    console.error('Error saving backup file:', error.message);
    throw error;
  }
}

async function backupDatabase() {
  console.log('Starting database backup...');
  try {
    if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_DATABASE_ID || !process.env.CLOUDFLARE_API_KEY) {
      throw new Error('Missing required environment variables. Please check your .env file.');
    }

    const backup = await generateBackup(
      process.env.CLOUDFLARE_ACCOUNT_ID,
      process.env.CLOUDFLARE_DATABASE_ID,
      process.env.CLOUDFLARE_API_KEY
    );
    console.log('Backup generated successfully.');

    const backupDir = await ensureBackupDirectory('backups');
    console.log('Backup directory ensured.');

    const fileName = generateFileName();
    console.log(`Generated filename: ${fileName}`);

    const filePath = await saveBackupFile(backupDir, fileName, backup);
    console.log(`Database backup successfully saved to ${filePath}`);
  } catch (error) {
    console.error('Error during backup process:', error.message);
    process.exit(1);
  }
}

backupDatabase();