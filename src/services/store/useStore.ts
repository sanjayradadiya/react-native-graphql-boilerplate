import {useDispatch, useSelector} from 'react-redux';
import {ReducersType} from './rootReducers';

interface Props {
  selector: any;
  dispatch: Function;
}

const useStore = (selectorName: ReducersType): Props => {
  const dispatch = useDispatch();

  const selector = useSelector(state => state[selectorName]);

  return {
    dispatch,
    selector,
  };
};
export default useStore;
