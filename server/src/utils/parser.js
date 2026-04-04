/**
 * Parses and cleans raw GitHub PR diff
 * before sending to Claude for review
 */

const MAX_DIFF_LENGTH = 8000; // Claude token limit safety

/**
 * Files jo review ke liye useful nahi hain
 * inhe skip kar denge
 */
const IGNORED_FILE_PATTERNS = [
  /package-lock\.json$/,
  /yarn\.lock$/,
  /pnpm-lock\.yaml$/,
  /\.min\.js$/,
  /\.min\.css$/,
  /dist\//,
  /build\//,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.svg$/,
  /\.ico$/,
  /\.pdf$/,
  /\.zip$/,
];

/**
 * Check karo file ignore karni chahiye ya nahi
 * @param {string} filename
 * @returns {boolean}
 */
const shouldIgnoreFile = (filename) => {
  return IGNORED_FILE_PATTERNS.some((pattern) => pattern.test(filename));
};

/**
 * Raw GitHub diff ko parse karke clean chunks mein todta hai
 * @param {string} rawDiff - GitHub se aaya raw diff
 * @returns {Array<{filename: string, diff: string}>} - Clean file diffs
 */
export const parseDiff = (rawDiff) => {
  if (!rawDiff || typeof rawDiff !== "string") {
    throw new Error("Invalid diff: expected a non-empty string");
  }

  // Diff ko file-wise chunks mein todo
  const fileChunks = rawDiff.split(/^diff --git /m).filter(Boolean);

  const parsedFiles = [];

  for (const chunk of fileChunks) {
    // Filename extract karo
    const filenameMatch = chunk.match(/^a\/(.+?) b\//);
    if (!filenameMatch) continue;

    const filename = filenameMatch[1];

    // Ignored files skip karo
    if (shouldIgnoreFile(filename)) {
      continue;
    }

    // Binary files skip karo
    if (chunk.includes("Binary files")) {
      continue;
    }

    parsedFiles.push({
      filename,
      diff: chunk.trim(),
    });
  }

  return parsedFiles;
};

/**
 * Parsed files ko ek clean string mein format karta hai
 * Claude ke liye ready
 * @param {Array<{filename: string, diff: string}>} parsedFiles
 * @returns {string} - Formatted diff string
 */
export const formatDiffForReview = (parsedFiles) => {
  if (!parsedFiles || parsedFiles.length === 0) {
    throw new Error("No reviewable files found in this PR");
  }

  let formatted = "";

  for (const file of parsedFiles) {
    formatted += `\n### File: ${file.filename}\n`;
    formatted += "```diff\n";
    formatted += file.diff;
    formatted += "\n```\n";
  }

  // Agar diff bahut lamba hai toh trim karo
  if (formatted.length > MAX_DIFF_LENGTH) {
    formatted = formatted.slice(0, MAX_DIFF_LENGTH);
    formatted += "\n\n⚠️ Diff was too large and has been truncated.";
  }

  return formatted.trim();
};