import React from 'react';
import { BIOColorMap, TaggedToken } from './BIOTagTypes';

interface TokenDisplayProps {
	tagging: TaggedToken;
}

export const TokenDisplay = ({ tagging }: TokenDisplayProps) => {
	return (
		<span
			className='border border-gray-200 mx-[2px] px-[2px] rounded'
			style={{
				color: BIOColorMap[tagging.tag],
			}}>
			{tagging.token}
		</span>
	);
};
