const { NumberPrompt } = require("enquirer");
const csv = require("csv-parser");
const fs = require("fs");

const MAX_ROUNDS = 10000;
const NEW_TASK_EVERY_10 = 3; // For every 10 tasks created, how many tasks are added to the sprint after it started?

function simulateSprint(targetNumberOfStories, historicStoryPointsPerSprint, sprintAllocation) {
	let storyPoints = targetNumberOfStories;
	let sprintIterations = 0;
	while (storyPoints > 0) {
		storyPoints =
			storyPoints -
			sprintAllocation *
				historicStoryPointsPerSprint[
					Math.floor(Math.random() * historicStoryPointsPerSprint.length)
				];
		sprintIterations++;
	}
	return sprintIterations;
}

function generateConfidenceTable(sprintIterations) {
	const confidenceTable = new Map();
	for (value of sprintIterations) {
		previousValue = confidenceTable.get(value);
		confidenceTable.set(value, previousValue != null ? previousValue + 1 : 1);
	}
	return confidenceTable;
}

function generateCumulativeTable(confidenceTable) {
	cumulative = 0;
	cumulativeTable = new Map();
	confidenceTable.forEach(function (value, key) {
		cumulative += value;
		cumulativeTable.set(key, cumulative);
	});
	return cumulativeTable;
}

function printCumulativeTable(cumulativeTable) {
	console.log("Sprint\t\tTotal\t| Percentage of Confidence of finishing project");
	cumulativeTable.forEach(function (value, key) {
		console.log(key + "\t=\t" + value + "\t| " + (value / MAX_ROUNDS) * 100 + "%");
	});
}

function runSprints(targetNumberOfStories, historicStoryPointsPerSprint, sprintAllocation) {
	const sprintIterations = [];
	for (i = 0; i < MAX_ROUNDS; i++) {
		sprintIterations.push(
			simulateSprint(targetNumberOfStories, historicStoryPointsPerSprint, sprintAllocation)
		);
	}
	sprintIterations.sort();
	return sprintIterations;
}

function readSprintsHistory() {
	const historicStoriesPerSprint = [];
	fs.createReadStream("sprints.csv")
		.pipe(csv())
		.on("data", (row) => {
			historicStoriesPerSprint.push(row["completed_story_points"]);
		});
	return historicStoriesPerSprint;
}

async function main() {
	const questions = [
		{
			message: "What is the target number of story points for the project? ",
		},
		{
			message:
				"What is the percentage of story points for this project over the entire sprint (from 0 to 1)? ",
		},
	];
	const historicStoryPointsPerSprint = readSprintsHistory();
	const prompt1 = new NumberPrompt(questions[0]);
	const prompt2 = new NumberPrompt(questions[1]);
	prompt1.run().then((targetNumberOfStories) => {
		prompt2.run().then((sprintAllocation) => {
			sprintAllocation = sprintAllocation <= 0 || sprintAllocation > 1 ? 1 : sprintAllocation;
			targetNumberOfStories = targetNumberOfStories + targetNumberOfStories * (NEW_TASK_EVERY_10 / 10);
			const finalResult = runSprints(
				targetNumberOfStories,
				historicStoryPointsPerSprint,
				sprintAllocation
			);
			const confidenceTable = generateConfidenceTable(finalResult);
			const cumulativeTable = generateCumulativeTable(confidenceTable);
			printCumulativeTable(cumulativeTable);
		});
	});
}

main();
