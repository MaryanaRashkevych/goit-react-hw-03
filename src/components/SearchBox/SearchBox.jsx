import css from './SearchBox.module.css'

export default function SearchBox({ value, onFilter }) {
    return (
      <div className={css.container}>
        <p className={css.label}>Find contacts by name:</p>
        <input
          type="text"
          value={value}
          className={css.input}
          onChange={(e) => onFilter(e.target.value)}
        />
      </div>
    );
  }
  