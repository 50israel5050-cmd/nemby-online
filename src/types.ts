export type PlatformType = 'all' | 'windows' | 'mac' | 'linux' | 'pwa' | 'web';

export interface SoftwareTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  badge: string;
  platforms: ('windows' | 'mac' | 'linux' | 'pwa' | 'web')[];
  features: string[];
  techStack: string[];
  samplePrompt: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

export interface SoftwareBlueprint {
  appName: string;
  appType: string;
  targetOS: string[];
  offlineSupport: boolean;
  databaseType: string;
  features: string[];
  suggestedStack: string;
  architectureNotes: string[];
  packagingCommand: string;
}
