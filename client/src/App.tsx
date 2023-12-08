import { ChangeEvent, useRef, useState } from 'react';
import './App.css';
import { TagButton } from './TagButton';

const testSentences = [];

const tokenizeSentence = (sentence: string) => {
	const tokens = sentence.split(' ').filter((token) => token !== '');
	return tokens;
};

function App() {
	const [inputSentence, setInputSentence] = useState<string>('');

	const [res, setRes] = useState<string>('');

	const makeRequest = async () => {
		const response = await fetch('http://127.0.0.1:8000/srl-tag', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ tokens: tokenizedSentence }),
		});
		const data = await response.json();
		setRes(data);
	};

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setInputSentence(event.target.value);
	};

	const tokenizedSentence = tokenizeSentence(inputSentence);

	const hiddenInputRef = useRef(null);
	const customDisplayAreaRef = useRef(null);

	const handleClickOnCustomArea = () => {
		// When the custom area is clicked, focus the hidden input.
		if (hiddenInputRef.current) {
			console.log('Did it work?');
			hiddenInputRef.current.focus();
		}
	};

	return (
		<div className='w-full flex flex-col items-center justify-center text-lg'>
			<div className='pt-24'>
				<textarea
					onChange={handleInputChange}
					value={inputSentence}
					ref={hiddenInputRef}
					className='w-md border border-gray-300 h-12 outline-none'
				/>
				<div
					className='h-min w-[720px] rounded-lg border-2 p-4 flex flex-col'
					onClick={handleClickOnCustomArea}>
					<div className='flex flex-row flex-wrap items-center justify-center border'>
						{tokenizedSentence.map((token, index) => (
							<span
								className='border-b border-l border-gray-200 mx-1 mb-2'
								key={index}>
								{token}
							</span>
						))}
						<div className='h-6 w-[2px] bg-black border-black animate-cursor-blink' />
					</div>
					<div className='w-full mt-4'>
						<TagButton onClick={makeRequest} />
					</div>
				</div>
				<p className='text-sm'>{JSON.stringify(res)}</p>
			</div>
		</div>
	);
}

export default App;
