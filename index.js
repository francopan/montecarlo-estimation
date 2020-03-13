var readline = require('readline');
let historicStoriesPerSprint = [7, 8, 10, 10, 12, 12, 6, 5, 11, 7, 10, 13, 7, 20, 12, 11, 9, 12, 5, 22, 12, 14, 17, 13, 10, 18, 21, 9];
//let historicStoriesPerSprint = [6,2,9,0,8,8,10,5,7,10];
let sprintIterationsFinal = [];

const MAX = 10000;
const NEW_TASK_EVERY_10 = 3;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is the target number of stories? ', (answer) => {

    rl.question('What is the sprint alocation (from 0 to 1)? ', (sprintAllocation) => {
        // Run thousands of sprints simulations
        answer = Number(answer) + (answer * (NEW_TASK_EVERY_10 / 10));
        for (i = 0; i < MAX; i++) {
            storyPoints = answer;
            sprintIterations = 0;
            while (storyPoints > 0) {
                storyPoints = storyPoints - (sprintAllocation * (historicStoriesPerSprint[Math.floor(Math.random() * historicStoriesPerSprint.length)]));
                sprintIterations++;
            }
            sprintIterationsFinal.push(sprintIterations);
        }
        sprintIterationsFinal.sort();

        // Generates Confidence Table
        confidenceTable = new Map();
        for (value of sprintIterationsFinal) {
            previousValue = confidenceTable.get(value);
            confidenceTable.set(value, previousValue != null ? previousValue + 1 : 1);
        }

        // Generate Cumulative Percentages
        cumulative = 0;
        confidenceTable.forEach(function (value, key) {
            cumulative += value;
            console.log(key + '\t=\t' + value + '\t| ' + (cumulative / MAX) * 100 + '%');
        });

        rl.close();
    });





});

