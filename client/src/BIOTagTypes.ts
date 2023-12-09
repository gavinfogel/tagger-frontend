export type BIOTag =
	| 'B-LOC'
	| 'I-LOC'
	| 'B-PER'
	| 'I-PER'
	| 'B-ORG'
	| 'I-ORG'
	| 'B-MISC'
	| 'I-MISC'
	| 'O'
	| ''; // Token which is not yet tagged

export const BIOColorMap: { [key in BIOTag]: string } = {
	'B-LOC': 'red',
	'I-LOC': 'red',
	'B-PER': 'blue',
	'I-PER': 'blue',
	'B-ORG': 'green',
	'I-ORG': 'green',
	'B-MISC': 'purple',
	'I-MISC': 'purple',
	O: 'gray',
	'': 'black', // not yet tagged
};

// Must ensure these are the same length
export type TaggedSequence = TaggedToken[];

export type TaggedToken = {
	token: string;
	tag: BIOTag;
};
