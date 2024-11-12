import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const getFormattedDate = () => {
		const date = new Date().toISOString();
		return date.replace('T', ' ').slice(0, 19);
	};

	const onInputButtonClick = (e) => {
		const promptValue = prompt('Введите значение');

		if (promptValue && promptValue.length >= 3) {
			setError('');
			setValue(promptValue);
		} else {
			setError(
				'Введенное значение должно содержать минимум 3 символа',
			);
		}
	};

	const onAddButtonClick = (e) => {
		if (!error && value) {
			setList((updatedList) => [
				...updatedList,
                { id: Date.now(), value: value, date: getFormattedDate() },
			]);
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>
					{value}
				</output>
			</p>
			<div className={styles['error']}>{error}</div>
			<div className={styles['buttons-container']}>
				<button
					className={styles['button']}
					onClick={onInputButtonClick}
				>
					Ввести новое
				</button>
				<button
					className={styles['button']}
					disabled={!!error || !value}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length === 0 ? (
					<p className={styles['no-margin-text']}>
						Нет добавленных элементов
					</p>
				) : (
					<ul className={styles['list']}>
						{list.map((item) => (
							<li
								key={item.id}
								className={styles['list-item']}
							>
								{item.value} (создано: {item.date})
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
