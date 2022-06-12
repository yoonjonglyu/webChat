import Modal from './modal';
import System from './system';
import Config from './config';

const RootState: Array<{ initState: Object; setContext: Function }> = [
  ...Modal,
  ...System,
  ...Config,
];

export default RootState;
