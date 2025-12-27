export interface League {
  id: string;
  name: string;
  type: 'club' | 'national';
  region: string;
  country: string;
  season: string;
  teamIds: string[];
  logo: string;
  color: string;
}

export const LEAGUES: League[] = [
  {
    id: 'premier_league',
    name: 'Premier League',
    type: 'club',
    region: 'Europe',
    country: 'England',
    season: '2024/25',
    teamIds: [
      'mancity', 'arsenal', 'manutd', 'liverpool', 'chelsea', 
      'tottenham', 'newcastle', 'astonvilla', 'brighton', 'westham'
    ],
    logo: '/assets/textures/ui/leagues/premier_league.png',
    color: '#38003c'
  },
  {
    id: 'la_liga',
    name: 'La Liga',
    type: 'club',
    region: 'Europe',
    country: 'Spain',
    season: '2024/25',
    teamIds: [
      'realmadrid', 'barcelona', 'atleticomadrid', 'sevilla',
      'realsociedad', 'betis', 'valencia', 'villareal'
    ],
    logo: '/assets/textures/ui/leagues/la_liga.png',
    color: '#ff6b00'
  },
  {
    id: 'world_cup',
    name: 'FIFA World Cup',
    type: 'national',
    region: 'World',
    country: 'International',
    season: '2026',
    teamIds: [
      'argentina', 'brazil', 'france', 'england', 
      'spain', 'germany', 'portugal', 'netherlands',
      'belgium', 'italy', 'croatia', 'uruguay'
    ],
    logo: '/assets/textures/ui/leagues/world_cup.png',
    color: '#0056b3'
  },
  {
    id: 'afcon',
    name: 'Africa Cup of Nations',
    type: 'national',
    region: 'Africa',
    country: 'International',
    season: '2025',
    teamIds: [
      'nigeria', 'senegal', 'egypt', 'morocco',
      'cameroon', 'ghana', 'ivorycoast', 'algeria',
      'tunisia', 'mali', 'drcongo', 'southafrica'
    ],
    logo: '/assets/textures/ui/leagues/afcon.png',
    color: '#ffd700'
  }
];