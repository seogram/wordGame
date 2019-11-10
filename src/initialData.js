const initialData = {
  allWords: {
    'word-1': {
      id: 'word-1',
      content: 'a',
      destination: 'column-4'
    },
    'word-2': {
      id: 'word-2',
      content: 'b',
      destination: 'column-4'
    },
    'word-3': {
      id: 'word-3',
      content: 'c',
      destination: 'column-2'
    },
    'word-4': {
      id: 'word-4',
      content: 'd',
      destination: 'column-2'
    },
    'word-5': {
      id: 'word-5',
      content: 'e',
      destination: 'column-5'
    },
    'word-6': {
      id: 'word-6',
      content: 'f',
      destination: 'column-5'
    },
    'word-7': {
      id: 'word-7',
      content: 'g',
      destination: 'column-3'
    },
    'word-8': {
      id: 'word-8',
      content: 'h',
      destination: 'column-3'
    },
    'word-9': {
      id: 'word-9',
      content: 'i',
      image: '',
      destination: 'column-4'
    },
    'word-10': {
      id: 'word-10',
      content: 'j',
      image: '',
      destination: 'column-2'
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'All Words',
      wordIds: [
        'word-1',
        'word-2',
        'word-3',
        'word-4',
        'word-5',
        'word-6',
        'word-7',
        'word-8',
        'word-9',
        'word-10'
      ]
    },
    'column-2': {
      id: 'column-2',
      title: 'Place 1',
      wordIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Place 2',
      wordIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'FruPlace 3',
      wordIds: []
    },
    'column-5': {
      id: 'column-5',
      title: 'Place 5',
      wordIds: []
    }
  },
  // Facilitate reordering of the columns
  firstColumn: ['column-1'],
  categoryColumns: ['column-2', 'column-3', 'column-4', 'column-5']
};

export default initialData;
