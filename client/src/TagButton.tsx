import React from 'react';

interface TagButtonProps {
	onClick: () => void;
	disabled?: boolean;
	loading?: boolean;
}

export const TagButton = ({ onClick, loading, disabled }: TagButtonProps) => {
	return (
		<button
			className='flex flex-row items-center justify-center bg-gray-100
			hover:bg-gray-300 transition-all duration-300 px-2 py-1 text-base
			font-medium space-x-1 text-[#353740] rounded-lg w-[68px]
			disabled:bg-[#ACACBD]'
			onClick={onClick}
			disabled={disabled}>
			<div className='flex flex-row items-center space-x-1'>
				{loading ? (
					<div>Loading</div>
				) : (
					<>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-5 h-5 p-0 m-0'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
							/>
						</svg>
						<span>Tag</span>
					</>
				)}
			</div>
		</button>
	);
};
