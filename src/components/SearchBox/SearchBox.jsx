import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { selectFilter } from '../../redux/filters/selectors';
import styles from './SearchBox.module.css';

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className={styles.searchBox}>
      <label className={styles.label}>
        Find contacts by name or number
        <input
          type="text"
          value={filter}
          onChange={(e) => dispatch(changeFilter(e.target.value))}
          className={styles.input}
        />
      </label>
    </div>
  );
}

export default SearchBox;