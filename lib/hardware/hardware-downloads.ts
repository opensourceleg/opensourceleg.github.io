export type JointSelection = 'knee' | 'ankle' | 'both';
export type SEASelection = 'with-sea' | 'without-sea';

// Base URLs for cleaner configuration
const GDRIVE_BASE = 'https://drive.google.com';

export const DOWNLOAD_URLS: Record<FolderKey, DownloadUrls> = {
  'osl-w-sea': {
    cadDownloadUrl: `${GDRIVE_BASE}/drive/folders/1mIMOlmVQX8Xdgtd782tyHEGqLrVzspa6?usp=drive_link`
  },
  'osl-wo-sea': {
    cadDownloadUrl: `${GDRIVE_BASE}/drive/folders/1rE2bNcRiYNKi9Il1L8-3KTZlCniRvrYs?usp=drive_link`
  },
  'knee-w-sea': {
    cadDownloadUrl: `${GDRIVE_BASE}/file/d/1RmPL3H8yjOe8R1sCtS2mi2Imjb5i6eQP/view?usp=drive_link`
  },
  'knee-wo-sea': {
    cadDownloadUrl: `${GDRIVE_BASE}/file/d/1_v9M9H_Q2yBjffZOukBJ9bpz5KsenRK_/view?usp=drive_link`
  },
  'ankle-w-sea': {
    cadDownloadUrl: `${GDRIVE_BASE}/file/d/1lwjw-H0knNHXrif-XEhnv_7gMxsDlrKk/view?usp=drive_link`
  },
  'ankle-wo-sea': {
    cadDownloadUrl: `${GDRIVE_BASE}/file/d/1LrLjmYephrcWrxV4gxMsumwfNIaIHx_-/view?usp=drive_link`
  }
} as const;

export interface DownloadConfig {
  joints: JointSelection;
  sea: SEASelection;
}

export interface JointOption {
  value: JointSelection;
  label: string;
  desc: string;
}

export interface SEAOption {
  value: SEASelection;
  label: string;
  desc: string;
  iconType: 'zap' | 'zap-off';
  iconColor: string;
}

export interface DownloadInfo {
  title: string;
  description: string;
  folder: string;
  cadDownloadUrl: string;
}

export interface DownloadUrls {
  cadDownloadUrl: string;
}

export type FolderKey = 'osl-w-sea' | 'osl-wo-sea' | 'knee-w-sea' | 'knee-wo-sea' | 'ankle-w-sea' | 'ankle-wo-sea';

export const jointOptions: JointOption[] = [
  { 
    value: 'both', 
    label: 'Complete System (Knee + Ankle)', 
    desc: 'Full prosthetic leg system' 
  },
  { 
    value: 'knee', 
    label: 'Knee Only', 
    desc: 'Knee joint assembly' 
  },
  { 
    value: 'ankle', 
    label: 'Ankle Only', 
    desc: 'Ankle joint assembly' 
  }
];

export const seaOptions: SEAOption[] = [
  { 
    value: 'with-sea', 
    label: 'With SEA', 
    desc: 'Includes springs for compliance and shock absorption at the joint(s)',
    iconType: 'zap',
    iconColor: 'text-blue-500'
  },
  { 
    value: 'without-sea', 
    label: 'Without SEA', 
    desc: 'No springs resulting in a stiffer joint(s) but simpler assembly process',
    iconType: 'zap-off',
    iconColor: 'text-gray-500'
  }
];

export const getDownloadInfo = (config: DownloadConfig): DownloadInfo => {
  const { joints, sea } = config;
  
  // Generate folder key and get URLs
  const folder = `${joints === 'both' ? 'osl' : joints}-${sea === 'with-sea' ? 'w' : 'wo'}-sea` as FolderKey;
  const urls = DOWNLOAD_URLS[folder];
  
  // Generate titles and descriptions
  const jointLabel = joints === 'both' ? 'Complete OSL System' : `${joints.charAt(0).toUpperCase() + joints.slice(1)} Joint`;
  const seaLabel = sea === 'with-sea' ? 'with SEA' : 'without SEA';
  const springDesc = sea === 'with-sea' ? 'with springs' : 'without springs';
  const systemDesc = joints === 'both' ? 'Full knee and ankle system' : `${jointLabel.split(' ')[0]} joint assembly`;
  
  return {
    title: `${jointLabel} ${seaLabel}`,
    description: `${systemDesc} ${springDesc}`,
    folder,
    cadDownloadUrl: urls.cadDownloadUrl
  };
};

export const defaultConfig: DownloadConfig = {
  joints: 'both',
  sea: 'with-sea'
}; 