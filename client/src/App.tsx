import { ChangeEvent, useRef, useState } from 'react';
import './App.css';
import { TagButton } from './TagButton';
import { BIOTag, TaggedSequence, TaggedToken } from './BIOTagTypes';
import { TokenDisplay } from './TokenDisplay';

const testSentences = [];

const tokenizeSentence = (sentence: string) => {
	const tokens = sentence.split(' ').filter((token) => token !== '');
	return tokens;
};

function App() {
	const [inputSentence, setInputSentence] = useState<string>('');

	const [previousSequences, setPreviousSequences] = useState<TaggedSequence[]>(
		[]
	);

	const makeRequest = async () => {
		const response = await fetch('https://tagger-frontend.vercel.app/ner-tag', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ tokens: tokenizedSentence }),
		});
		const data = await response.json();

		console.log({ data });

		const tokens = data.tokens as string[];
		const tags = data.tags as BIOTag[];

		// Loop through each of the tokens, tags together
		const taggedSequence: TaggedSequence = [];
		for (let i = 0; i < tokens.length; i++) {
			taggedSequence.push({
				token: tokens[i],
				tag: tags[i],
			});
		}

		// Update the list of previous sequences.
		setPreviousSequences([...previousSequences, taggedSequence]);
	};

	const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		// Skip newlines and tabs
		if (event.target.value.includes('\n')) {
			return;
		}
		if (event.target.value.includes('\t')) {
			return;
		}
		setInputSentence(event.target.value);
	};

	const tokenizedSentence = tokenizeSentence(inputSentence);

	const hiddenInputRef = useRef(null);
	const customDisplayAreaRef = useRef(null);

	const handleClickOnCustomArea = () => {
		// When the custom area is clicked, focus the hidden input.
		if (hiddenInputRef.current) {
			hiddenInputRef.current.focus();
		}
	};

	const endsInSpace = inputSentence[inputSentence.length - 1] === ' ';

	const handleTagButtonClick = () => {
		makeRequest();
		setInputSentence('');
	};

	// Store the position for the carrot to be placed
	const [carrotPosition, setCarrotPosition] = useState<number>(0);

	// Get the position of the far

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
					<div className='flex flex-row flex-wrap items-center'>
						{tokenizedSentence.map((token, index) => (
							<TokenDisplay
								tagging={{
									token,
									tag: '',
								}}
								key={index}
							/>
						))}
						<div className='h-6 w-[2px] bg-neutral-900 inline-block' />
					</div>
					<div className='w-full mt-4'>
						<TagButton onClick={handleTagButtonClick} />
					</div>
				</div>
				{previousSequences.map((sequence: TaggedToken[], index) => {
					return (
						<div
							className='flex flex-row flex-wrap items-center justify-center border'
							key={index}>
							{sequence.map((tokenTagPair, index) => (
								<TokenDisplay
									tagging={{
										token: tokenTagPair.token,
										tag: tokenTagPair.tag,
									}}
									key={index}
								/>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
