export type Match = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  status: 'Anfitrião' | 'Visitante';
  gameLogo: any;
};

export const mockCategories = [
  {
    id: '1',
    label: 'Ranqueada',
    icon: require('../../assets/images/icon-ranqueada.png'),
  },
  {
    id: '2',
    label: 'Duelo 1x1',
    icon: require('../../assets/images/duelo.png'),
  },
  {
    id: '3',
    label: 'Diversão',
    icon: require('../../assets/images/icone-diversão.png'),
  },
];

export const mockMatches: Match[] = [
  {
    id: '1',
    title: 'Lendários',
    category: 'Ranqueada',
    date: '18/06',
    time: '21:00h',
    status: 'Anfitrião',
    gameLogo: require('../../assets/images/logo-lol.png'),
  },
  {
    id: '2',
    title: 'Bora queimar tudo',
    category: 'Diversão',
    date: '20/06',
    time: '19:00h',
    status: 'Visitante',
    gameLogo: require('../../assets/images/logo-cs.png'),
  },
  {
    id: '3',
    title: 'Rumo ao topo',
    category: 'Ranqueada',
    date: '22/06',
    time: '20:00h',
    status: 'Anfitrião',
    gameLogo: require('../../assets/images/logo-apex.png'),
  }
];