import { BIOTag, TaggedSequence } from './BIOTagTypes';

export default async function tagSequence(tokens: string[]) {
	const response = await fetch('http://127.0.0.1:8000/ner-tag', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ tokens }),
	});
	const data = await response.json();

	console.log({ data });

	const tokensRes = data.tokens as string[];
	const tagsRes = data.tags as BIOTag[];

	// Loop through each of the tokens, tags together
	const taggedSequence: TaggedSequence = [];
	for (let i = 0; i < tokens.length; i++) {
		taggedSequence.push({
			token: tokensRes[i],
			tag: tagsRes[i],
		});
	}

	return taggedSequence;
}
