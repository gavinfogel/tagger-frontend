import { useSpring } from '@react-spring/web';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
	BIOColorMap,
	BIOTag,
	TaggedSequence,
	flattenedBIOColorMap,
} from './BIOTagTypes';
import { TagButton } from './TagButton';
import tagSequence from './taggerClient';

type CursorStatus = 'blinking' | 'typing';

const splitOnSpace = (sentence: string) => {
	return sentence.split(' ').filter((token) => token !== '');
};

export const App2 = () => {
	const [input, setInput] = useState<string>('');

	const tokenizedText = splitOnSpace(input);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Skip newlines and tabs
		if (event.target.value.includes('\n')) {
			return;
		}
		if (event.target.value.includes('\t')) {
			return;
		}
		if (event.target.value.includes('Shift')) {
			console.log('SHIFT EVENT');
		}
		setInput(event.target.value);
	};

	// const tokensWithoutPunctuation = removePunctuation;

	const [cursorStatus, setCursorStatus] = useState<CursorStatus>('blinking');

	const typing = cursorStatus === 'typing';

	// Listen for keystrokes and if typing, change cursor status to typing
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			setCursorStatus('typing');
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const hiddenInputRef = useRef(null);

	const handleClickOnCustomArea = () => {
		// When the custom area is clicked, focus the hidden input.
		if (hiddenInputRef.current) {
			hiddenInputRef.current.focus();
		}
	};

	const [showTokenization, setShowTokenization] = useState<boolean>(false);

	const [taggedSequence, setTaggedSequence] = useState<
		TaggedSequence | 'loading'
	>([]);

	const endsInSpace = input[input.length - 1] === ' ';
	const emptyInput = input === '';

	return (
		<div className='text-5xl flex items-center justify-center mt-20'>
			<div className='w-full max-w-3xl mx-8'>
				<h1 className='uppercase text-base font-medium text-stone-300'>
					Named Entity Recognition
				</h1>
				<div className='uppercase text-sm font-medium mt-4 text-stone-300 flex flex-row space-x-1 items-center'>
					<span>MEMM</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-4 h-4'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 8.25l-7.5 7.5-7.5-7.5'
						/>
					</svg>
				</div>
				<input
					autoFocus={true}
					className='h-0 w-0'
					ref={hiddenInputRef}
					onChange={handleInputChange}
					value={input}
				/>
				<div
					className='flex flex-wrap text-stone-700 border p-4 rounded'
					onClick={handleClickOnCustomArea}>
					{tokenizedText.map((word, i) =>
						i + 1 === tokenizedText.length && !endsInSpace ? (
							<div
								key={i}
								className={`bg-green-100 mb-2 px-[2px] mr-[6px] rounded border
								border-green-100`}>
								{word}
							</div>
						) : (
							<div
								key={i}
								className={`px-[2px] mb-2 mr-[6px] border border-opacity-0 ${
									!showTokenization ? 'border-white' : ''
								} rounded`}>
								{word}
							</div>
						)
					)}
					<div className='h-[50px] flex items-center justify-center'>
						<div
							className={`inline-block w-[2px] bg-black animate animate-cursor-blink ${
								cursorStatus === 'blinking' && ''
							} ${
								!endsInSpace && !emptyInput ? '-translate-x-[8px]' : ''
							} h-[44px]`}
						/>
					</div>
				</div>
				<div className='w-full flex flex-row justify-end items-center mt-2 space-x-2'>
					<button
						className='flex flex-row items-center justify-center bg-gray-100
			hover:bg-gray-300 transition-all duration-300 px-2 py-1 text-lg
			font-medium space-x-1 text-[#353740] rounded-lg disabled:bg-[#ACACBD]
			w-[170px]'
						type={'button'}
						onClick={() => setShowTokenization(!showTokenization)}>
						<div className='flex flex-row items-center space-x-1'>
							{showTokenization ? 'Hide Tokenization' : 'Show Tokenization'}
						</div>
					</button>
					<TagButton
						onClick={async () => {
							const tagging = tagSequence(tokenizedText);
							setTaggedSequence('loading');
							setTaggedSequence(await tagging);
						}}
						type={'submit'}
					/>
				</div>
				<div className='text-xs border w-min px-4 py-2 rounded'>
					<ul className='flex flex-row space-x-8'>
						{Object.entries(flattenedBIOColorMap).map(([tag, color], index) => (
							<li
								key={index}
								style={{ color: color }}
								className='flex flex-row space-x-1 items-center justify-center font-semibold'>
								<div
									className='h-3 w-3 rounded-full'
									style={{ backgroundColor: color }}
								/>
								<span>{tag}</span>
							</li>
						))}
					</ul>
				</div>
				<div className='mt-8'>
					{taggedSequence === 'loading' ? (
						'loading'
					) : taggedSequence.length === 0 ? (
						''
					) : (
						<div className='border p-4'>
							<div className='text-lg flex flex-row flex-wrap space-x-2'>
								{taggedSequence.map((taggedToken, i) => (
									<div
										key={i}
										className='border-b-2 w-min'
										style={{
											borderColor: BIOColorMap[taggedToken.tag],
										}}>
										{taggedToken.token}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
