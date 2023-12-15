import random


def ner_tagger(sentence):
		"""
		Returns a list of NER tags corresponding to the input list of tokens

		This is an example of a terrible NER tagger! 
		TODO: Fix this to use a real NER tagger. It would be nice to also compare
		the HMM, MEMM, FFNN, RNN, and even other taggers like Stanford's NER tagger.
		"""
		tags = []
		for token in sentence:
				if token[0].isupper():
					# Randomly pick which B tag to use
					if random.random() > 0.5:
						tags.append("B-PER")
					else:
						tags.append("B-ORG")
				else:
						tags.append("O")
		return tags