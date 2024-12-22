const MOBILEBAR_HEIGHT = '56px';

const MIN_HEIGHT_CONTAINER = `calc(100vh - ${MOBILEBAR_HEIGHT})`;
const HALF_MIN_HEIGHT_CONTAINER = `calc(50vh - ${MOBILEBAR_HEIGHT})`;

const BASIC_EMOTIONS = {
  'Joy': {
    id: 3,
    color: '#FFD700',
  },
  'Fear': {
    id: 20,
    color: '#FF6347',
  },
  'Sadness': {
    id: 24,
    color: '#1E90FF',
  },
  'Anger': {
    id: 15,
    color: '#FF4500',
  },
}

export {MOBILEBAR_HEIGHT, MIN_HEIGHT_CONTAINER, HALF_MIN_HEIGHT_CONTAINER, BASIC_EMOTIONS};