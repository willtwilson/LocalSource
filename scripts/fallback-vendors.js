import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback list of Jersey vendors to use if web scraping fails
const fallbackVendors = [
  {
    name: "La Robeline Cider",
    description: "Traditional craft cider made in Jersey from locally grown apples",
    address: "La Robeline, St Mary, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "Jersey Dairy",
    description: "Providing the island with fresh, high-quality dairy products",
    address: "Trinity, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "Vienna Bakery",
    description: "Artisan bread and pastries made fresh daily on the island",
    address: "Rue du Pont Marquet, St. Peter JE3 7AE, Jersey",
    vendorType: "Bakery"
  },
  {
    name: "Manor Farm",
    description: "Family-run farm shop selling seasonal fruits and vegetables",
    address: "La Grande Route de St. Jean, St. John, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "Classic Herd Farm Shop",
    description: "Selling organic dairy, meats, and produce from their farm",
    address: "Manor Farm, St. Peter, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "Jersey Oyster Company",
    description: "Fresh oysters and other seafood harvested from Jersey's waters",
    address: "St. Catherine's Bay, Jersey",
    vendorType: "Fishmonger"
  },
  {
    name: "Le Petit Coin",
    description: "Small specialty shop selling organic fruits and vegetables",
    address: "St. Martin, Jersey",
    vendorType: "Grocery Store"
  },
  {
    name: "Woodside Farm",
    description: "Organic farm with a wide selection of seasonal produce",
    address: "St. Mary, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "Valley Foods",
    description: "Local butcher and grocer with quality Jersey produce",
    address: "St. Peter's Valley, Jersey",
    vendorType: "Butcher"
  },
  {
    name: "Jersey Crab Shack",
    description: "Fresh local seafood direct from the fishermen",
    address: "St. Brelade, Jersey",
    vendorType: "Fishmonger"
  },
  {
    name: "La Mare Wine Estate",
    description: "Local winery producing wines, spirits, and gourmet products",
    address: "St. Mary, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "Fungi Delecti",
    description: "Specialist mushroom grower offering exotic and local varieties",
    address: "Trinity, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "Jersey Lavender Farm",
    description: "Lavender farm with shop selling lavender products and local goods",
    address: "Rue du Pont Marquet, St. Brelade, Jersey",
    vendorType: "Farm Shop"
  },
  {
    name: "The Fresh Fish Company",
    description: "Daily fresh catch from local Jersey waters",
    address: "St. Helier Fish Market, Jersey",
    vendorType: "Fishmonger"
  },
  {
    name: "Brooklands Farm Shop",
    description: "Family-run farm shop selling locally grown produce",
    address: "St. Saviour, Jersey",
    vendorType: "Farm Shop"
  }
];

// Create the fallback vendor data
const vendorsData = {
  source: 'Fallback Jersey Vendors',
  scrapedAt: new Date().toISOString(),
  vendors: fallbackVendors
};

// Save the fallback data
function saveFallbackData() {
  const outputDir = path.join(__dirname, '../data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'fallback-vendors.json');
  fs.writeFileSync(outputPath, JSON.stringify(vendorsData, null, 2));
  
  console.log(`Fallback vendor data saved to ${outputPath}`);
  console.log(`Created ${fallbackVendors.length} fallback vendors`);
}

// Execute the script
saveFallbackData(); 