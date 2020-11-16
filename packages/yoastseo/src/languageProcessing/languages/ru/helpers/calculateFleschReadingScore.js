import formatNumber from "../../../../helpers/formatNumber.js";

/**
 * Returns the Flesch reading score for Russian.
 *
 * @param {Object} statistics The Flesch reading statistics.
 *
 * @returns {number} The Flesch reading score for Russian.
 */
export default function calculateScore( statistics ) {
	const score = 206.835 - ( 1.3 * statistics.numberOfWords / statistics.numberOfSentences ) -
		( 60.1 * statistics.numberOfSyllables / statistics.numberOfWords );

	return formatNumber( score );
}
