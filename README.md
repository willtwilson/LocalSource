# Jersey Produce Vendors

A mobile-first Progressive Web App (PWA) to map local produce vendors in Jersey, with a special focus on "Hedge Veg" stalls and farm shops.

## Features

- 🗺️ Interactive map showing vendor locations across Jersey
- 🥕 Browse locally available produce by type
- 🔍 Search for vendors by name, parish, or produce type
- ⭐ Save favorite vendors for quick access
- 📱 Mobile-first responsive design
- 🌟 Review system for sharing experiences
- 📷 Photo gallery for each vendor location
- 📋 Detailed vendor information including operating hours

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Leaflet for interactive maps
- Supabase for backend (Auth, Database, Storage)
- PostGIS for geospatial features
- Tailwind CSS for styling
- Docker for containerization

## Prerequisites

- Node.js 20 or later
- Docker and Docker Compose
- Supabase account and project
- Tailscale (for development)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/willtwilson/jersey-produce-vendors.git
   cd jersey-produce-vendors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## Database Setup

The application requires a Supabase database with the following tables:
- vendors
- produce
- vendor_produce
- operating_hours
- vendor_photos
- reviews

SQL scripts for database setup are located in the `scrapers` directory:
- `create_vendors_table.sql`: Creates the table structure
- `seed_vendors.sql`: Seeds the database with initial vendor data

To set up the database:
1. Create a new Supabase project
2. Run the SQL scripts in the Supabase SQL editor
3. Enable Row Level Security (RLS) policies as needed

## Project Structure

```
jersey-produce-vendors/
├── src/
│   ├── components/    # Reusable components
│   │   └── ui/        # UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React context providers
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Library code
│   ├── services/      # Service layer
│   └── types/         # TypeScript types
├── public/            # Static assets
└── scrapers/          # SQL scripts for database setup
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.