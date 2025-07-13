<div align="center">
  <h3 align="center">Anonymous Reporting App</h3>
   <div align="center">
     A secure platform for anonymous incident reporting
    </div>
</div>


## <a name="introduction">🤖 Introduction</a>

This cutting-edge anonymous reporting system is developed using Next.js 14, offering a secure platform for incident reporting while ensuring absolute anonymity.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js 14
- TypeScript
- Prisma with Neon Database
- NextAuth.js for Authentication
- Tailwind CSS
- React Hook Form
- GeminiAI
- BCrypt for Password Encryption

## <a name="quick-start">🤸 Quick Start</a>

**Installation**

```bash
# Clone the repository
git clone <your-repo-url>
cd anonymous-reporting-system

# Install dependencies
npm install

# Set up the database
npx prisma generate
npx prisma db push

# Start the development server
npm run dev
```

## <a name="environment">🕸️ Environment Setup</a>

Create a `.env` file in the root directory with the following variables:

```env

NEXT_PUBLIC_MAPBOX_API_KEY=your-mapbox-key
DATABASE_URL=postgresql:your-database-url
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000/api/auth"
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-access-api-key


```
