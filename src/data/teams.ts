export interface Team {
  id: string;
  name: string;
  shortName: string;
  leagueId: string;
  country: string;
  founded: number;
  stadium: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
  logo: string;
  kit: {
    home: string;
    away: string;
    third?: string;
  };
  playerIds: string[];
  formation: string;
  rating: number;
}

export const TEAMS: Team[] = [
  {
    id: 'mancity',
    name: 'Manchester City',
    shortName: 'Man City',
    leagueId: 'premier_league',
    country: 'England',
    founded: 1880,
    stadium: 'Etihad Stadium',
    colors: {
      primary: '#6CABDD',
      secondary: '#1C2C5B',
      tertiary: '#FFFFFF'
    },
    logo: '/assets/textures/ui/teams/mancity.png',
    kit: {
      home: '/assets/textures/kits/mancity_home.png',
      away: '/assets/textures/kits/mancity_away.png'
    },
    playerIds: ['haaland', 'debruyne', 'foden', 'rodri', 'ederson'],
    formation: '4-3-3',
    rating: 89
  },
  {
    id: 'realmadrid',
    name: 'Real Madrid',
    shortName: 'Real Madrid',
    leagueId: 'la_liga',
    country: 'Spain',
    founded: 1902,
    stadium: 'Santiago Bernabéu',
    colors: {
      primary: '#FFFFFF',
      secondary: '#004481',
      tertiary: '#FEBE10'
    },
    logo: '/assets/textures/ui/teams/realmadrid.png',
    kit: {
      home: '/assets/textures/kits/realmadrid_home.png',
      away: '/assets/textures/kits/realmadrid_away.png'
    },
    playerIds: ['bellingham', 'vinijr', 'modric', 'courtois'],
    formation: '4-3-1-2',
    rating: 88
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    shortName: 'Nigeria',
    leagueId: 'afcon',
    country: 'Nigeria',
    founded: 1945,
    stadium: 'Moshood Abiola Stadium',
    colors: {
      primary: '#008751',
      secondary: '#FFFFFF',
      tertiary: '#000000'
    },
    logo: '/assets/textures/ui/teams/nigeria.png',
    kit: {
      home: '/assets/textures/kits/nigeria_home.png',
      away: '/assets/textures/kits/nigeria_away.png'
    },
    playerIds: ['osimhen', 'chukuweze', 'ndidi', 'iwobi'],
    formation: '4-2-3-1',
    rating: 83
  },
  {
    id: 'argentina',
    name: 'Argentina',
    shortName: 'Argentina',
    leagueId: 'world_cup',
    country: 'Argentina',
    founded: 1893,
    stadium: 'Estadio Monumental',
    colors: {
      primary: '#75AADB',
      secondary: '#FFFFFF',
      tertiary: '#F6B40E'
    },
    logo: '/assets/textures/ui/teams/argentina.png',
    kit: {
      home: '/assets/textures/kits/argentina_home.png',
      away: '/assets/textures/kits/argentina_away.png'
    },
    playerIds: ['messi', 'dimaria', 'martinez', 'otamendi'],
    formation: '4-3-3',
    rating: 86
  }
  // Add more teams as needed
];