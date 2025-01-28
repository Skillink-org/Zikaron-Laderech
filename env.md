# Guide to Creating a .env File

1. Create a new file in the root directory named `.env`.
2. Copy and fill out the following variables based on your configuration:

   ```plaintext
   # ENV:
   NODE_ENV=''

   # Database:
   DB_LINK='mongodb+srv://<USER>:<PASS>@...'
   DB_USER=''
   DB_PASS=''

   # JWT:
   JWT_SECRET=''
   JWT_EXPIRES=''

   # Email:
   EMAIL_USER=''
   EMAIL_PASS=''
   EMAIL_PORT=''
   EMAIL_HOST=''

   # Cloudinary:
   CLOUDINARY_URL='cloudinary://<CLOUDINARY_KEY>:<CLOUDINARY_SECRET>@<CLOUDINARY_NAME>'
   CLOUDINARY_NAME=''
   CLOUDINARY_KEY=''
   CLOUDINARY_SECRET=''
   ```

3. Descriptions:

   - **NODE_ENV**: Environment mode (development or production).
   - **DB_USER / DB_PASS / DB_LINK**: Database credentials and connection string.
   - **JWT_SECRET / JWT_EXPIRES**: Token signing key and token expiration time.
   - **EMAIL_USER / EMAIL_PASS / EMAIL_PORT / EMAIL_HOST**: Email service credentials.
   - **CLOUDINARY_URL / CLOUDINARY_NAME / CLOUDINARY_KEY / CLOUDINARY_SECRET**: Cloudinary account details.

4. Ensure the `.env` file is in your `.gitignore` to keep secrets out of version control.
