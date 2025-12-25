# Οδηγίες Εγκατάστασης - MagicTales Studio

Αυτός ο οδηγός θα σας βοηθήσει να ρυθμίσετε το MagicTales Studio με MongoDB integration.

## Βήμα 1: MongoDB Connection

1. Αν δεν έχετε MongoDB, μπορείτε να:
   - Εγκαταστήσετε MongoDB local: https://www.mongodb.com/try/download/community
   - Χρησιμοποιήσετε MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. Πάρτε το connection string σας:
   - **Local MongoDB**: `mongodb://localhost:27017/magictales`
   - **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/magictales?retryWrites=true&w=majority`

3. Προσθέστε το connection string στο `.env.local` (στο root directory):
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

   Ή δημιουργήστε ένα `.env` αρχείο στον φάκελο `server`:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=5000
   ```

## Βήμα 2: Backend Server Setup

1. Μεταβείτε στον φάκελο server:
   ```bash
   cd server
   ```

2. Εγκαταστήστε τις dependencies:
   ```bash
   npm install
   ```

3. Εκκινήστε τον server:
   ```bash
   npm run dev
   ```

   Ο server θα τρέξει στο `http://localhost:5000`

## Βήμα 3: Frontend Setup (Main App)

1. Στο root directory, εγκαταστήστε τις dependencies (αν δεν το έχετε ήδη):
   ```bash
   npm install
   ```

2. Προσθέστε στο `.env.local` (στο root directory):
   ```
   VITE_API_URL=http://localhost:5000
   ```

3. Εκκινήστε το frontend:
   ```bash
   npm run dev
   ```

## Βήμα 4: Admin Dashboard Setup

1. Μεταβείτε στον φάκελο admin:
   ```bash
   cd admin
   ```

2. Εγκαταστήστε τις dependencies (αν δεν το έχετε ήδη):
   ```bash
   npm install
   ```

3. Δημιουργήστε ένα `.env` αρχείο στον φάκελο `admin`:
   ```
   REACT_APP_API_URL=http://localhost:5000
   PORT=5001
   ```

4. Εγκαταστήστε το `cross-env` (για Windows compatibility):
   ```bash
   npm install cross-env --save-dev
   ```

4. Εκκινήστε το admin dashboard:
   ```bash
   npm start
   ```

   Το admin dashboard θα τρέξει στο `http://localhost:5001` (default port για React, ή 5001 αν ορίσατε PORT στο .env)

## Χρήση

1. **Main App** (`http://localhost:3000`): Οι χρήστες μπορούν να δημιουργήσουν βιβλία και να υποβάλουν δεδομένα
2. **Backend Server** (`http://localhost:5000`): API server για MongoDB
3. **Admin Dashboard** (`http://localhost:5001`): Μπορείτε να δείτε όλες τις υποβολές στο menu "Submissions"

## Σημειώσεις

- Βεβαιωθείτε ότι ο backend server τρέχει πριν από το frontend
- Οι εικόνες αποθηκεύονται ως base64 strings στη MongoDB
- Για production, συνιστάται να χρησιμοποιήσετε cloud storage για τις εικόνες

## Troubleshooting

### MongoDB Connection Error
- Ελέγξτε ότι το MongoDB τρέχει (αν είναι local)
- Ελέγξτε ότι το connection string είναι σωστό
- Ελέγξτε ότι έχετε πρόσβαση στο network (αν είναι cloud)

### CORS Errors
- Ο backend server έχει ήδη CORS enabled
- Αν συνεχίζετε να έχετε προβλήματα, ελέγξτε ότι το `VITE_API_URL` και `REACT_APP_API_URL` είναι σωστά

### Port Conflicts
- Αν το port 5000 είναι κατειλημμένο, αλλάξτε το στο `.env` του server
- Αν το port 3000 είναι κατειλημμένο, το Vite θα επιλέξει αυτόματα άλλο port

